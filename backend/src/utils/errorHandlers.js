// Handle database operation errors
export const handleDBError = (error, res) => {
  console.error('Database Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(error.errors).map(err => err.message)
    });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }
  
  if (error.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate key error'
    });
  }
  
  return res.status(500).json({
    message: 'Internal server error'
  });
}; 