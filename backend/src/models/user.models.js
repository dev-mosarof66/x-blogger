import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        avatar: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            },
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog",
            },
        ],
        read: [
            {
                blogId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Blog",
                },
                readAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isBanned: {
            type: Boolean,
            default: false,
        },
        provider: {
            type: String,
            enum: ['manual', 'google'],
            default: "manual"
        },
        isPro: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};
const User = mongoose.model("User", userSchema)
export default User;
