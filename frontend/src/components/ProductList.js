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
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://127.0.0.1:5001/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Handle both array and object responses
        const productsData = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear the token from local storage
      localStorage.removeItem('token');
      
      // Show success message
      setLogoutSuccess(true);
      
      // Redirect to login page after 1.5 seconds
      setTimeout(() => navigate('/'), 1500);
      
    } catch (err) {
      setError('Logout failed. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setLogoutSuccess(false);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !logoutSuccess) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* Logout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          color="error"
          onClick={handleLogout}
          sx={{ textTransform: 'none' }}
        >
          Logout
        </Button>
      </Box>

      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Rating: {product.rating}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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