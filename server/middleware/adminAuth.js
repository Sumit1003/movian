import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies.adminToken || req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Admin token missing",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.admin)
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });

    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
