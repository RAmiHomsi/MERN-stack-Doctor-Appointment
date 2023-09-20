const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "authentication failed" });
        } else {
          req.body.userId = decoded.id; //attach userId to request body loaded with token
          next();
        }
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "authentication failed" + error.message });
  }
};
