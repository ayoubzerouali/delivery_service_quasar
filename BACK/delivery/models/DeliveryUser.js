const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DeliveryUserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastname:{
    type: String,
    required: [true, "Please enter your last name"],
  },
  phone:{
    type:String,
    require:[true,"Please enter your phone number"]
  },
  address:{
    type:String,
    required:[true,'Please enter your address']
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  inCharge:{
    type:Boolean,
  },
  // cart:[
  //   {food:mongoose.SchemaTypes.ObjectId , require:true},
  //   {unit:Number,require:true}
  // ],
  verified:{
    type:Boolean,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // role: { 
  //   type: String,
  //   enum: ["user","delivery_man"],
  //   default: "user", 
  // },
  // photo:{ // idk why 
  //   type:String,
  //   default:'no-photo.jpg',
  // },
});


// Encrypt Password using bcrypt
DeliveryUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return
DeliveryUserSchema.methods.getSignJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Match user entered password to hashed pass in db
DeliveryUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generate and hash password token
DeliveryUserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("DeliveryUser", DeliveryUserSchema);
