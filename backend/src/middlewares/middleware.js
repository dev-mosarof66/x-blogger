import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const verifyToken = async (req, res, next) => {
    try {
        console.log('inside the middleware.', req.cookies)
        let token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ success: false, message: "No token found." });
        }
        console.log(token)
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


        if (!decoded) {
            res.status(401).json({
                message: "Login session expired.",
                success: false
            })
        }

        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.cookie('access_token', null)
        return res.status(401).json({ success: false, message: "Login session expired.", });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Admin access required" });
    }
    next();
};
