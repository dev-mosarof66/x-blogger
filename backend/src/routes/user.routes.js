import { Router } from "express";
import { bookmarkBlog, changeAvatar, commentOnBlog, deleteProfile, forgetPassword, getAllBlogs, getAllTags, getBlogById, getProfile, googleLogin, incrementView, loginUser, logoutUser, reactBlog, registerUser, replyToComment, trackBlogRead, trendingBlogs, updatePassword, updateProfile, verifyEmail } from "../controllers/user.controllers.js";
import { verifyToken } from '../middlewares/middleware.js'
import { upload } from "../utils/multer.js";
const router = Router()


router.route('/register').post(registerUser)
router.route('/verify-email').post(verifyEmail)
router.route('/login').post(loginUser)
router.route('/password').put(verifyToken, updatePassword)
router.route('/password').post(verifyToken, updatePassword)
router.route('/profile').get(verifyToken, getProfile)
router.route('/profile/:id').delete(verifyToken, deleteProfile)
router.route('/profile/:id').put(verifyToken, updateProfile)
router.route('/avatar/:id').post(verifyToken, upload.single('file'), changeAvatar)
router.route("/logout").post(verifyToken, logoutUser)
router.route("/subscription").post(verifyToken, logoutUser)
router.route('/blog/:id').post(reactBlog)
router.route('/comment/:id').post(commentOnBlog)
router.route('/reply/:id').post(replyToComment)
router.route('/all-blogs').get(trackBlogRead)
router.route('/bookmark').post(bookmarkBlog)
router.route('/google-auth').post(googleLogin)


//public routes

router.route("/trending").get(trendingBlogs)
router.route('/blogs').get(getAllBlogs)
router.route('/blogs/:id').get(getBlogById)
router.route('/views/:id').post(incrementView)
router.route('/tags').get(getAllTags)

export default router