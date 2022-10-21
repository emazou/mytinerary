var express = require("express");
var router = express.Router();
let passport = require('../config/passport')
const {
  signUp,
  verifyMail,
  signIn,
  signOut,
  verifyToken,
  editProfile
} = require("../controllers/userController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.patch("/editProfile", passport.authenticate('jwt', { session: false }), editProfile)
router.get("/token", passport.authenticate('jwt', { session: false }), verifyToken)
router.get("/verify/:code", verifyMail);
module.exports = router;
