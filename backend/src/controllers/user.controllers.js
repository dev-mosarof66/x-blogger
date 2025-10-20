import Blog from '../models/blog.models.js'
import User from "../models/user.models.js";
import Comment from "../models/comment.models.js";
import { generateVerificationCode } from '../utils/code.js';
import ejs from 'ejs'
import path from "path";
import { fileURLToPath } from "url";
import imagekit from '../utils/imagekit.js';
import { sendEmail } from '../utils/nodemailer.js'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return res.status(201).json({ success: true, blogs });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("req body in register user.")

        if (!name) {
            return res.status(401).json({
                message: "Full name is required.",
                success: false
            })
        }
        if (!email) {
            return res.status(401).json({
                message: "Email is required.",
                success: false
            })
        }
        if (!password) {
            return res.status(401).json({
                message: "Password is required.",
                success: false
            })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(402).json({ success: false, message: "Email already in user.Try another." });

        const code = generateVerificationCode();
        const template = await ejs.renderFile(path.join(__dirname, "../views/verification-mail.ejs"), { code, name })



        const mail = sendEmail(email, 'Email Verfication', template)
        if (!mail) return res.status(402).json({ success: false, message: "Error while sending email." });
        const token = await jwt.sign(
            {
                code, user: {
                    name,
                    email,
                    password
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2m' }
        );
        res.cookie('token', token)
        return res.status(201).json({ success: true, message: "Verfication email sent successfully.", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code)
            return res.status(401).json({ success: false, message: "Verfication code not found." });

        const { code: savedCode, user } = req.cookies.user;

        if (code !== savedCode) {
            return res.status(401).json({ success: false, message: "Verfication code is invalid." });
        }
        await user.save({ validateBeforeSave: false });

        return res.status(201).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email) {
            return res.status(401).json({
                message: "Email is required.",
                success: false
            })
        }
        if (!password) {
            return res.status(401).json({
                message: "Password is required.",
                success: false
            })
        }
        const user = await User.findOne({ email })
        console.log(user)

        if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });


        if (user.provider != 'manual') {
            return res.status(401).json({
                message: "This Email registed with Google. Please login with that.",
                success: false
            })
        }

        const isValid = await user.isPasswordValid(password);
        console.log(isValid)
        if (!isValid) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        res.cookie('access_token', accessToken)
        res.cookie('refresh_token', refreshToken)

        return res.status(201).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePassword = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("+password")

        const { oldPassword, newPassword, confirmNewPassword } = req.body;


        if (!newPassword || !oldPassword || !confirmNewPassword) {
            return res.status(401).json({
                message: 'All fields are required.',
                success: false
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(401).json({
                message: 'The choosen new password must be same.',
                success: false
            })
        }

        const isPasswordValid = user.isPasswordValid(oldPassword)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'The old password not matched.',
                success: false
            })
        }

        user.password = newPassword

        await user.save({
            validateBeforeSave: false
        })
        return res.status(201).json({ success: true, user, message: "Password updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
export const forgetPassword = async (req, res) => {
    try {

        const user = req.user;

        const { email } = req.body;

        if (!email) {
            return res.status(401).json({
                message: "Email is required.",
                success: false
            })
        }
        const code = generateVerificationCode();
        const template = ejs.renderFile(path.join(__dirname, "../views/forget-password.ejs"))
        const mail = sendEmail(email, 'Password Reset Email', template)

        if (!mail) {
            return res.status(402).json({
                message: "Error while sending email",
                success: false
            })
        }
        return res.status(201).json({ success: true, user, message: "Email sent successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
export const resetPassword = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("+password")

        const { code, newPassword, confirmNewPassword } = req.body;


        if (!newPassword || !code || !confirmNewPassword) {
            return res.status(401).json({
                message: 'All fields are required.',
                success: false
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(401).json({
                message: 'The choosen new password must be same.',
                success: false
            })
        }

        const isPasswordValid = user.isPasswordValid(oldPassword)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'The old password not matched.',
                success: false
            })
        }

        user.password = newPassword

        await user.save({
            validateBeforeSave: false
        })
        return res.status(201).json({ success: true, user, message: "Password updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const logoutUser = async (req, res) => {

    req.cookie('access_token', null)
    req.cookie('refresh_token', null)
    return res.status(201).json({ success: true, message: "Logged out successfully" });
};

export const getProfile = async (req, res) => {
    try {
        console.log('inside the get profile controllers')
        const user = req.user;
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const user = req.user
        let updates = req.body;


        const avatarPath = req.files.path

        if (!avatarPath) {
            return res.status(402).json({
                message: "No avatar found.",
                success: false
            })
        }
        const upload = await imagekit.upload({
            file: fs.readFileSync(req.file.path),
            fileName: req.file.originalname,
            folder: "/blogger/avatar"
        })

        fs.unlinkSync(req.file.path);

        updates = {
            ...updates,
            avatar: {
                public_id: upload.fileId,
                url: upload.url
            }
        }


        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { updates },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(402).json({
                message: "Error while updating the user.",
                success: false
            })
        }
        return res.status(201).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const user = req.user

        if (user.avatar.public_id) {
            await imagekit.deleteFile(user.avatar.public_id)
        }
        await User.findByIdAndDelete(req.user._id);
        return res.status(200).json({ success: true, message: "Profile deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const bookmarkBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const user = await User.findById(req.user._id);

        if (user.bookmarks.includes(blogId)) {
            user.bookmarks.pull(blogId);
        } else {
            user.bookmarks.push(blogId);
        }

        await user.save();
        return res.status(200).json({ success: true, bookmarks: user.bookmarks });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const trackBlogRead = async (req, res) => {
    try {
        const { blogId } = req.params;
        const user = await User.findById(req.user._id);

        const alreadyRead = user.read.find((r) => r.blogId.toString() === blogId);
        if (!alreadyRead) user.read.push({ blogId, readAt: new Date() });

        await user.save();
        return res.status(200).json({ success: true, readHistory: user.read });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const reactBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { reaction } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        const userReacted = blog.reactions.filter((t) => t.userId === req.user._id)

        if (userReacted.length > 0) {
            blog.reactions = blog.reactions.filter((t) => t.userId != req.user._id)
        }
        else {
            blog.reactions.push({ emoji: reaction, userId: req.user._id })
        }


        await blog.save({
            validateBeforeSave: false
        });
        return res.status(201).json({ success: true, blog });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const commentOnBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(401).json({
                success: false,
                message: "No comment found."
            })
        }

        const comment = await Comment({
            blog: blogId,
            user: req.user._id,
            text,
            replies: [],
        });

        if (!comment) {
            return res.status(402).json({
                success: false,
                message: "Error while creating comment."
            })
        }

        res.status(201).json({ success: true, comment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const replyToComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { reply } = req.body;

        const comment = await Comment.findById(commentId);

        if (!comment)
            return res.status(404).json({ success: false, message: "Comment not found." });

        comment.replies.push({ reply, date: new Date() });

        await comment.save({
            validateBeforeSave: false
        });

        return res.status(200).json({ success: true, message: "Reply added successfully", comment });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// GOOGLE AUTH

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        console.log(process.env.GOOGLE_CLIENT_ID)

        console.log(credential)

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        console.log(ticket)

        const payload = ticket.getPayload();
        const { email, name } = payload;

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const access_token = await existingUser.generateAccessToken();
            const refresh_token = await existingUser.generateRefreshToken()
            res.cookie("access_token", access_token)
            res.cookie("refresh_token", refresh_token)
            return res.status(201).json({
                success: true,
                message: `Welcome back ${name}`,
                existingUser
            })
        }


        const salt = await bcrypt.genSalt(10);
        const password = bcrypt.hash('google-login', salt)
        const user = await User({
            email,
            name,
            password
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Error while google login",
            })
        }

        user.provider = 'google'

        await user.save({
            validateBeforeSave: false
        })
        const access_token = await user.generateAccessToken();
        const refresh_token = await user.generateRefreshToken()
        res.cookie("access_token", access_token)
        res.cookie("refresh_token", refresh_token)
        res.status(201).json({
            success: true,
            message: "Google login successfull.",
            user
        })
    } catch (error) {
        console.error("Google login error:", error);
        res.status(400).json({ success: false, message: "Invalid Google token" });
    }
}

