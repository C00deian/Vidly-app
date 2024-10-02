module.exports = function asyncHandler(handler) {
    return async (req, res, next) => {
      
    try {
      await handler(req, res);
    } catch (error) {
        console.log('Something failed' , error.message)
      next();
    }
  };
}
