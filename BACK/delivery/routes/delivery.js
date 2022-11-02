const express = require("express");
const {
  register,
  login,
  getAuth,
  forgotPassword,
  resetPassword,
  editDeliveryUser,
  updatePassword,
  logout,
  // deliveryUserPhotoUpload,
} = require("../controllers/deliveryController");

const router = express.Router();
const { protect,authorize } = require("../middleware/auth");

// router.route('/:id/photo').put(protect,authorize('delivery_man'),deliveryUserPhotoUpload);
router.post("/register",register);
router.post("/login", login);
router.get("/me", protect, getAuth);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/updateprofile", protect, editDeliveryUser);
router.put("/updatepassword", protect, updatePassword);
router.get("/logout",protect, logout);

module.exports = router;
