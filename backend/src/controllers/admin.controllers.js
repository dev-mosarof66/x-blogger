import Blog from "../models/blog.models.js";
import Tag from "../models/tag.models.js";
import fs from 'fs'
import Comment from "../models/comment.models.js";
import User from "../models/user.models.js";
import imagekit from "../utils/imagekit.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, status } = req.body;

        if (!title) {
            return res.status(401).json({
                message: "Title is required.",
                success: false
            })
        }
        if (!content) {
            return res.status(401).json({
                message: "Blog content is required.",
                success: false
            })
        }
        if (!tags) {
            return res.status(401).json({
                message: "Tags are required.",
                success: false
            })
        }

        const path = req?.files;

        if (!path) {
            return res.status(401).json({
                message: "No cover image found.",
                success: false
            })
        }

        const upload = await imagekit.upload({
            file: fs.readFileSync(req.file.path),
            fileName: req.file.originalname,
            folder: "/blogger/coverImage"
        })

        fs.unlinkSync(req.file.path);




        const blog = await Blog({
            title,
            content,
            tags,
            coverImage: {
                public_ic: upload.fileId,
                url: upload.url
            },
            status: status || "draft",
        });

        if (!blog) {
            return res.status(402).json({
                message: "Error while creating new blog.",
                success: false
            })
        }

        await blog.save({
            validateBeforeSave: false
        })

        return res.status(201).json({ success: true, message: "Blog created successfully", blog });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {

        const { id } = req.params;

        const updates = req.body;

        const path = req?.files;

        let upload = null
        if (path) {
            upload = await imagekit.upload({
                file: fs.readFileSync(req.file.path),
                fileName: req.file.originalname,
                folder: "/blogs"
            })

            fs.unlinkSync(req.file.path);
        }

        updates = {
            ...updates,
            coverImage: {
                public_id: upload && upload.fileId,
                url: upload && upload.url
            }
        }




        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updatedBlog)
            return res.status(404).json({ success: false, message: "Error while updating the blog." });

        return res.status(200).json({ success: true, message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(402).json({ success: false, message: 'No blog found.' });
        }

        const deletedCoverImage = await imagekit.deleteFile(blog.coverImage.public_id)

        if (!deletedCoverImage) {
            return res.status(402).json({ success: false, message: 'Error while deleting the cover iamge.' });
        }

        await Blog.findByIdAndDelete(blog._id)
        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



export const toggleBlogStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog)
            return res.status(404).json({ success: false, message: "Blog not found" });

        blog.status = blog.status === "published" ? "draft" : "published";
        await blog.save();

        return res.status(200).json({ success: true, message: `Blog set to ${blog.status}`, blog });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const createTag = async (req, res) => {
    try {
        const { name } = req.body;


        if (!name) {
            return res.status(401).json({ success: false, message: "Tag is required." });

        }

        const existingTag = await Tag.findOne({ name });

        if (existingTag)
            return res.status(400).json({ success: false, message: "Tag already exists" });

        const tag = await Tag.create({ name });
        return res.status(201).json({ success: true, message: "Tag created successfully", tag });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        return res.status(200).json({ success: true, tags });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByIdAndDelete(id);

        if (!tag)
            return res.status(404).json({ success: false, message: "Tag not found" });

        return res.status(200).json({ success: true, message: "Tag deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};




export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });

        user.isBanned = !user.isBanned;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `User ${user.isBanned ? "banned" : "unbanned"} successfully`,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const getAnalytics = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments();
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalComments = await Comment.countDocuments();

        const topBlogs = await Blog.find({ status: "published" })
            .sort({ views: -1 })
            .limit(5)
            .select("title views");

       return res.status(200).json({
            success: true,
            status: {
                totalBlogs,
                totalUsers,
                totalComments,
                topBlogs,
            },
        });
    } catch (error) {
       return res.status(500).json({ success: false, message: error.message });
    }
};
