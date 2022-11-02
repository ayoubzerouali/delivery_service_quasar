// const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const DeliveryUser = require("../models/DeliveryUser");
const path = require("path");
const axios = require("axios");

// @desc    Register delivery_user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const response = await axios({
      method: 'post',
      url: 'http://51.254.123.129:8050/api/users',
      data: {
        fname: req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        type:req.body.type
      }
    });
    res.json({data : response.data})

  // console.log(response.data.headers["Content-Type"]); // 'application/json;charset=utf-8',
});

// @desc    Login delivery_user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and pass
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }
  // Check for delivery_user
  const delivery_user = await DeliveryUser.findOne({ email }).select(
    "+password"
  );

  if (!delivery_user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }
  // Check if password matches
  const isMatch = await delivery_user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  sendTokenResponse(delivery_user, 200, res);
});

// @desc    Logout atuh
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: "logged out ",
  });
});

// @desc    GET current logged delivery_user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getAuth = asyncHandler(async (req, res, next) => {
  const delivery_user = await DeliveryUser.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: delivery_user,
  });
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const delivery_user = await DeliveryUser.findOne({ email: req.body.email });
  if (!delivery_user) {
    return next(
      new ErrorResponse(`There is no delivery_user with that email `, 404)
    );
  }

  // Get reset token
  const resetToken = delivery_user.getResetPasswordToken();
  await delivery_user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: delivery_user,
  });
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  console.log(req.params.resettoken);
  //   const resetPasswordToken = crypto.createHash("sha256").update(req.params.resettoken).digest("hex");

  const delivery_user = await DeliveryUser.findOne({
    resetPasswordToken: req.params.resettoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  console.log(delivery_user);
  if (!delivery_user) {
    return next(new ErrorResponse("Invalid token", 400));
  }
  //   Set new password
  delivery_user.password = req.body.password;
  delivery_user.resetPasswordToken = undefined;
  delivery_user.resetPasswordExpire = undefined;

  await delivery_user.save();

  sendTokenResponse(delivery_user, 200, res);
});

// @desc    Update auth delivery_user email
// @route   PUT /api/v1/auth/updateuser
// @access  Private
exports.editDeliveryUser = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const delivery_user = await DeliveryUser.findByIdAndUpdate(
    req.user.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: delivery_user,
  });
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  const delivery_user = await DeliveryUser.findById(req.user.id).select(
    "+password"
  );
  //   Check current delivery_user
  if (!(await delivery_user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse(`Bad password input`, 401));
  }
  delivery_user.password = req.body.newPassword;
  await delivery_user.save();

  sendTokenResponse(delivery_user, 200, res);
});

// @desc Link shipper to a delivery order
// @route PUT /api/v1/users/auth/:id
// @access Private
exports.deliveryUserOrderLink = asyncHandler(async (req, res, next) => {
  const delivery_user = await DeliveryUser.findById(req.user.id);
  const order = [];
});

// @desc    Upload photo for delivery_user
// @route   PUT /api/v1/users/delivery/:id/photo
// @access  Private
exports.deliveryUserPhotoUpload = asyncHandler(async (req, res, next) => {
  const delivery_user = await DeliveryUser.findById(req.params.id);

  if (!delivery_user) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }
  // Ownership
  // if(delivery_user.delivery_user.toString() !== req.delivery_user.id && req.delivery_user.role !== 'admin'){
  //   return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this delivery_user`))
  // }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  // console.log(req.files.file);
  const file = req.files.file;

  // Make sure the file is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload less then ${process.env.MAX_FILE_UPLOAD / 1000000} mb`,
        400
      )
    );
  }

  // Create cutsom filename
  file.name = `photo_${delivery_user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await DeliveryUser.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(201).json({
      success: true,
      data: file.name,
    });
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (delivery_user, statusCode, res) => {
  // Create token
  const token = delivery_user.getSignJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
