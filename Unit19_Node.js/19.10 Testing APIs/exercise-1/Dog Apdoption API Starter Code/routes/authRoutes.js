// routes/authRoutes.js
const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register); // (1)
router.post("/login", login); // (2)

module.exports = router;
