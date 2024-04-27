import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
    let token = req.cookies.token;
    try {
        if (!token) {
            res.json({ message: "There is no token", success: false });
        }
        const decoded = await jwt.verify(token, process.env.SECRET_JWT);
        if (!decoded) {
            res.json({ message: "Invalid token", success: false });
        }
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

const isAdmin = async (req, res, next) => {
    let user = req.user;
    if (!user.role === 'admin') {
        res.json({ message: "You are not admin", success: false });
    }
    next();
};

const isFreelencer = async (req, res, next) => {
    let user = req.user;
    if (!user.role === 'freelencer') {
        res.json({ message: "You are not freelancer", success: false });
    }
    next();
};

const isClient = async (req, res, next) => {
    let user = req.user;
    if (!user.role === 'user') {
        res.json({ message: "You are not client", success: false });
    }
    next();
};

const isBlocked = async (req, res, next) => {
    const user = req.user;
    if (user.blocked) {
        res.status(403).json({ success: false, message: "Your account has been blocked" });
    }
    next();
};

const isVerified = async (req, res, next) => {
    const user = req.user;
    if (!user.verified) {
        res.status(403).json({ success: false, message: "You should verify your account" });
    }
    next();
};

export {
    authMiddleware,
    isFreelencer,
    isAdmin,
    isVerified,
    isBlocked,
    isClient
};
