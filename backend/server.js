const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Middleware
app.use(cors());
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGO_URI); // Debugging line

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Serve static files from the 'uploads' folder
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));