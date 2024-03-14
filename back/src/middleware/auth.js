import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(400)
      .json({ error: "Access denied. Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const secretKey = process.env.JWT_SECRET;
    const { _id } = jwt.verify(token, secretKey);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ error: "Access denied. Request is not authorized " });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Access denied. Admin rights are not confirmed" });
  }
};
