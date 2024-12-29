import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import { useAuthContext } from '../contexts/AuthContext';
import ShippingForm from '../components/checkout/ShippingForm';
import { Box, Typography, Button, Container, Paper, Alert } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

export default function Checkout() {
  const { items, total, clearCart } = useCartContext();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isAuthenticated) {
    navigate('/profile');
    return null;
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Return to Homepage
          </Button>
        </Paper>
      </Container>
    );
  }

  const handlePlaceOrder = async (shippingDetails: any) => {
    try {
      // Place order logic here
      await clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Order Placed Successfully!
          </Alert>
          <Typography variant="h6" gutterBottom>
            Thank you for your order. We will process it soon.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Payment Method: Cash on Delivery
          </Typography>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Return to Homepage
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          {items.map((item) => (
            <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>
                {item.name} x {item.quantity}
              </Typography>
              <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, borderTop: 1, pt: 1 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>
        </Box>
        <ShippingForm onSubmit={handlePlaceOrder} />
      </Paper>
    </Container>
  );
}