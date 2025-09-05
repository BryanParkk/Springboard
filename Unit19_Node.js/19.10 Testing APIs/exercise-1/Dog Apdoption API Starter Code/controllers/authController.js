// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const TOKEN_TTL = "24h"; // (2) 24-hour validity

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "username and password are required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(409).json({ error: "username already taken" });

    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ username, passwordHash });

    return res
      .status(201)
      .json({
        id: user._id,
        username: user.username,
        createdAt: user.createdAt,
      });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "username and password are required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { sub: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_TTL }
    );
    return res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    next(err);
  }
};
