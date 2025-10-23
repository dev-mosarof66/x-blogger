import { createBlog, updateBlog, deleteBlog, getAllTags, createTag, deleteTag, getAllUsers, getAnalytics, toggleBlogStatus, toggleUserStatus, getAllBlogs, getBlogById, deleteUserById } from '../controllers/admin.controllers.js'
import { Router } from 'express'
import { upload } from '../utils/multer.js'
import { verifyAdmin, verifyToken } from '../middlewares/middleware.js'
const router = Router()


router.route('/blogs').get(verifyToken, verifyAdmin, getAllBlogs)
router.route('/blogs').post(verifyToken, verifyAdmin, upload.single('file'),createBlog)

router.route('/blogs/:id').get(verifyToken, verifyAdmin, getBlogById)
router.route('/blogs/:id').put(verifyToken, verifyAdmin, upload.single('file'), updateBlog)
router.route('/blogs/:id').delete(verifyToken, verifyAdmin, deleteBlog)
router.route('/tags').get(verifyToken, verifyAdmin, getAllTags)
router.route('/tags').post(verifyToken, verifyAdmin, createTag)
router.route('/tags/:id').delete(verifyToken, verifyAdmin, deleteTag)
router.route('/users').get(verifyToken, verifyAdmin, getAllUsers)
router.route('/stats').get(verifyToken, verifyAdmin, getAnalytics)
router.route('/auth/blog-status/:id').get(verifyToken, verifyAdmin, toggleBlogStatus)
router.route('/auth/user/:id').put(verifyToken, verifyAdmin, toggleUserStatus)
router.route('/auth/user/:id').delete(verifyToken, verifyAdmin, deleteUserById)

export default router