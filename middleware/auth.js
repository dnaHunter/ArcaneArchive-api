import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ messgae: "Please Login" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = jwtData.userId;
    next();
  } catch (error) {
    res.status(401).json({ messgae: "Please Login" });
  }
}
