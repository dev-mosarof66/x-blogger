import Blog from "../models/blog.models.js";
import Tag from "../models/tag.models.js";
import fs from 'fs'
import Comment from "../models/comment.models.js";
import User from "../models/user.models.js";
import imagekit from "../utils/imagekit.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, status } = req.body;
        console.log('inside creating new blogs : ', req.body)
        console.log(req.file)

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

        const path = req?.file;


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


        if (!upload) {
            return res.status(402).json({
                message: "Error while uploading image.",
                success: false
            })
        }

        console.log(upload)

        fs.unlinkSync(req.file.path);

        const blog = await Blog({
            title,
            content,
            tags,
            coverImage: {
                public_id: upload.fileId,
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

        const deletedBlog = await Blog.findByIdAndDelete(blog._id)
        if (!deletedBlog) {
            return res.status(401).json({
                success: false,
                message: "Error while deleting the blog"
            })
        }
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, message: "Blog deleted successfully", blogs });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return res.status(201).json({ success: true, blogs });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Blog id not found."
            })
        }
        const blog = await Blog.findById(id);
        return res.status(201).json({ success: true, blog });
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
        const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(401).json({
                success: false,
                message: "No User Id found."
            })
        }
        const user = await User.findById(id)

        if (user.avatar.public_id) {
            const deletedCoverImage = await imagekit.deleteFile(user.avatar.public_id)

            if (!deletedCoverImage) {
                return res.status(402).json({ success: false, message: 'Error while deleting the cover iamge.' });
            }
        }

        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(401).json({
                success: false,
                message: "Error while deleting  user."
            })
        }
        const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });

        return res.status(201).json({
            success: true,
            message: "User fetched successfully.",
            users

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });

        user.isBanned = !user.isBanned;
        await user.save({
            validateBeforeSave: false
        });

        const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: `User ${user.isBanned ? "banned" : "unbanned"} successfully`,
            users
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


        let totalViews = 0;
        for (let i = 0; i < totalBlogs.length; i++) {
            totalViews += totalBlogs[i].views
        }
        let totalReactions = 0;
        for (let i = 0; i < totalBlogs.length; i++) {
            totalReactions += totalBlogs[i].reactions.length
        }

        return res.status(200).json({
            success: true,
            status: {
                blogs: totalBlogs,
                readers: totalUsers,
                comments: totalComments,
                views: totalViews,
                reactions: totalReactions
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
