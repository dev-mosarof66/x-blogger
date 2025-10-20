import { Router } from "express";
import { bookmarkBlog, commentOnBlog, deleteProfile, forgetPassword, getAllBlogs, getProfile, googleLogin, loginUser, logoutUser, reactBlog, registerUser, replyToComment, trackBlogRead, updatePassword, updateProfile, verifyEmail } from "../controllers/user.controllers.js";
import { verifyToken } from '../middlewares/middleware.js'
const router = Router()


router.route('/register').post(registerUser)
router.route('/verify-email').post(verifyEmail)
router.route('/login').post(loginUser)
router.route('/password').put(verifyToken,updatePassword)
router.route('/password').post(verifyToken,updatePassword)
router.route('/profile').get(verifyToken, getProfile)
router.route('/profile/:id').delete(verifyToken, deleteProfile)
router.route('/profile/:id').put(verifyToken, updateProfile)
router.route("/logout").post(verifyToken, logoutUser)
router.route('/blog/:id').post(reactBlog)
router.route('/comment/:id').post(commentOnBlog)
router.route('/reply/:id').post(replyToComment)
router.route('/all-blogs').get(trackBlogRead)
router.route('/blogs').get(getAllBlogs)
router.route('/bookmark').post(bookmarkBlog)
router.route('/google-auth').post(googleLogin)

export default router