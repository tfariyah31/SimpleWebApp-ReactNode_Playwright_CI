const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getProducts } = require('../controllers/products');
const authMiddleware = require('../middleware/auth');
const { requireRole } = authMiddleware; 

function isInvalidObjectId(err) {
  return err.name === 'CastError' && err.path === '_id';
}

router.get('/', authMiddleware, async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET single product
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {               // ← must be `err`, not `error`
    if (isInvalidObjectId(err)) { // ← must match the catch parameter
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create product (merchant+ only)
router.post('/', authMiddleware, requireRole('merchant', 'superadmin'), async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {                          
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update product (merchant+ only)
router.put('/:id', authMiddleware, requireRole('merchant','superadmin'), async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        if (isInvalidObjectId(error)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete product (merchant+ only)
router.delete('/:id', authMiddleware, requireRole('merchant','superadmin'), async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        if (isInvalidObjectId(error)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.all('/', (req, res) => {
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
    allowedMethods: ['GET', 'POST']
  });
});



module.exports = router;