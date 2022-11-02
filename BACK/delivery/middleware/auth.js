const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse')
const DeliveryUser = require('../models/DeliveryUser');


// Protect routes
exports.protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        // console.log(token);
    }
    else if(req.cookies.token){
        token = req.cookies.token
    }
    // Make sure token exists
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route',401))
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);

        req.user = await DeliveryUser.findById(decoded.id);
        console.log(req.user)

        next();
    } catch (error) {
        return next(new ErrorResponse(`Resource Not found `,404))
    }
});


// Grant access to specific roles
exports.authorize = (...roles)=> {
    return (req,res,next)=>{
        if(!roles.includes(req.delivery_user.role)){
            return next(new ErrorResponse(`User rol ${req.delivery_user.role} is not authorized to access this route`,403))
        }
        next()
    }
}

exports.getSignJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  