module.exports = function errorHandler(err, req, res, next) {
    // Logic for handling different types of errors can be added here
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  };
