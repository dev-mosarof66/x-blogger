import upload from '../utils/multer.js'
import { createBlog, updateBlog, deleteBlog, getAllTags, createTag, deleteTag, getAllUsers, getAnalytics, toggleBlogStatus, toggleUserStatus } from '../controllers/admin.controllers.js'
import { Router } from 'express'
import { verifyAdmin, verifyToken } from '../middlewares/middleware.js'
const router = Router()

router.route('/blogs').post(verifyToken, verifyAdmin, upload.single('coverImage'), createBlog)
router.route('/blogs/:id').put(verifyToken, verifyAdmin, upload.single('coverImage'), updateBlog)
router.route('/blogs/:id').delete(verifyToken, verifyAdmin, deleteBlog)
router.route('/tags').get(verifyToken, verifyAdmin, getAllTags)
router.route('/tags').post(verifyToken, verifyAdmin, createTag)
router.route('/tags/:id').delete(verifyToken, verifyAdmin, deleteTag)
router.route('/').get(verifyToken, verifyAdmin, getAllUsers)
router.route('/analytics').get(verifyToken, verifyAdmin, getAnalytics)
router.route('/auth/blog-status/:id').get(verifyToken, verifyAdmin, toggleBlogStatus)
router.route('/auth/user-status/:id').get(verifyToken, verifyAdmin, toggleUserStatus)

export default router