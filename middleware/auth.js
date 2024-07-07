import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Please Login" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = jwtData.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please Login" });
  }
}

export function reviewAuth(req, res, next) {
  if (!req.headers.authorization) {
    req.userId = "Anon";
    next();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = jwtData.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please Login" });
  }
}
