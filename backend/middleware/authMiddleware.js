
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Not authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const adminOnly = (req, res, next) => {
//   if (req.user && req.user.isAdmin) next();
//   else res.status(403).json({ message: "Admin access only" });
// };
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    console.log("------ AUTH DEBUG START ------");
    console.log("Authorization header:", req.headers.authorization);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ User authenticated:", req.user._id);
    console.log("------ AUTH DEBUG END ------");

    next();
  } catch (error) {
    console.log("❌ JWT ERROR:", error.message);
    console.log("------ AUTH DEBUG END ------");
    res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else res.status(403).json({ message: "Admin access only" });
};
