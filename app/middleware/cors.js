module.exports = function() {
    return function(req, res, next) {
     res.setHeader("Access-Control-Allow-Methods", "POST, GET");
     res.setHeader("Access-Control-Max-Age", "3600");
     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
     //res.setHeader("Access-Control-Allow-Headers: Accept");
      next();
    };
  }