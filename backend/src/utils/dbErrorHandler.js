// Database error handler utility
export const handleDBError = (error) => {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return {
      status: 400,
      message: 'Validation failed',
      errors
    };
  }

  if (error.code === 11000) {
    return {
      status: 409,
      message: 'Duplicate entry found',
      error: error.message
    };
  }

  return {
    status: 500,
    message: 'Database error occurred',
    error: error.message
  };
};