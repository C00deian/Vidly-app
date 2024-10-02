module.exports = function asyncHandler(handler) {
    return async (req, res, next) => {
      
    try {
      await handler(req, res);
    } catch (error) {
        console.error('Somthing failed:', error.message);
      next();
    }
  };
}
