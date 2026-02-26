import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress,
  Alert,
  Button,
  Snackbar,
  Box
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔄 ProductList component mounted');
    
    const fetchProducts = async () => {
      // Get token from localStorage
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      
      console.log('🔑 Token found:', token ? 'YES' : 'NO');
      console.log('🔑 Token (first 20 chars):', token ? token.substring(0, 20) + '...' : 'N/A');
      
      // If no token, redirect to login
      if (!token) {
        console.error('❌ No auth token found');
        setError('Please login to view products');
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      try {
        // ✅ FIXED: Changed from /api/auth/products to /api/products
        console.log('📡 Fetching products from: http://127.0.0.1:5001/api/products');
        
        const res = await axios.get('http://127.0.0.1:5001/api/products', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        console.log('✅ Products response:', res.data);
        console.log('✅ Response status:', res.status);

        // Handle different response formats
        if (res.data.success && res.data.products) {
          console.log('📦 Setting products (success format):', res.data.products.length, 'items');
          setProducts(res.data.products);
        } else if (Array.isArray(res.data)) {
          console.log('📦 Setting products (array format):', res.data.length, 'items');
          setProducts(res.data);
        } else {
          console.error('❌ Unexpected response format:', res.data);
          setError('Unexpected data format from server');
        }

      } catch (err) {
        console.error('❌ Fetch products error:', err);
        console.error('❌ Error response:', err.response);
        console.error('❌ Error status:', err.response?.status);
        console.error('❌ Error data:', err.response?.data);
        
        // Handle different error scenarios
        if (err.response?.status === 401) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 2000);
        } else if (err.response?.status === 403) {
          setError('You do not have permission to view products.');
        } else if (err.response) {
          setError(err.response.data?.message || 'Failed to fetch products');
        } else if (err.request) {
          setError('Cannot connect to server. Please check if backend is running on port 5001.');
          console.error('❌ No response received. Backend might be down.');
        } else {
          setError('Failed to fetch products. Please try again later.');
        }
      } finally {
        console.log('✅ Setting loading to false');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleLogout = async () => {
    console.log('🚪 Logout initiated');
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

      // Optional: Call logout endpoint
      if (token) {
        try {
          await axios.post('http://127.0.0.1:5001/api/auth/logout', {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('✅ Logout API call successful');
        } catch (err) {
          console.log('⚠️ Logout API call failed, but clearing local storage anyway');
        }
      }

      // Clear all tokens from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      console.log('✅ Tokens cleared from localStorage');
      
      // Show success message
      setLogoutSuccess(true);
      
      // Redirect to login page after 1.5 seconds
      setTimeout(() => {
        console.log('➡️ Redirecting to login');
        navigate('/login');
      }, 1500);

    } catch (err) {
      console.error('❌ Logout error:', err);
      setError('Logout failed. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setLogoutSuccess(false);
  };

  console.log('🎨 Rendering ProductList - State:', { 
    loading, 
    error, 
    productsCount: products.length 
  });

  if (loading) {
    console.log('⏳ Showing loading spinner');
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading products...</Typography>
      </Container>
    );
  }

  if (error && !logoutSuccess) {
    console.log('❌ Showing error:', error);
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  console.log('✅ Rendering products grid with', products.length, 'products');

  return (
    <Container sx={{ mt: 4 }}>
      {/* Header with Logout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Product List ({products.length} items)
        </Typography>
        <Button 
          variant="contained" 
          color="error"
          onClick={handleLogout}
          sx={{ textTransform: 'none' }}
        >
          Logout
        </Button>
      </Box>

      {/* Products Grid */}
      {products.length === 0 ? (
        <Alert severity="info">No products available. The database might be empty.</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, index) => {
            console.log(`🏷️ Rendering product ${index}:`, product);
            return (
              <Grid item key={product._id || index} xs={12} sm={6} md={4}>
                <Card>
                  {product.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x140?text=No+Image';
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name || 'Unnamed Product'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description || 'No description'}
                    </Typography>
                    {product.price && (
                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        ${product.price}
                      </Typography>
                    )}
                    {product.rating && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Rating: {product.rating} ⭐
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Logout Success Snackbar */}
      <Snackbar
        open={logoutSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Logout successful! Redirecting to login page...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductList;