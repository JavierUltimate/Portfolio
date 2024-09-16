const jwt = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({ msg: "Not found token" });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).json({ msg: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: "Invalid Token" });
  }
};
module.exports = { validateToken };
