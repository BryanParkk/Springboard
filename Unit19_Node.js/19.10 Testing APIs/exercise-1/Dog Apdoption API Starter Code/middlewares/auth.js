// middlewares/auth.js
const jwt = require("jsonwebtoken");

exports.authRequired = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ error: "missing bearer token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: String(payload.sub), username: payload.username };
    return next();
  } catch (err) {
    return res.status(401).json({ error: "invalid or expired token" });
  }
};
