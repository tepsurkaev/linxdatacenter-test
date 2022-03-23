require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.json("Authorization error");
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.json("Wrong token's type");
    }

    req.user = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    return next();
  } catch (e) {
    return res.status(401).json({ error: e.toString() });
  }
};
