/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import GoogleAuthButton from "../components/custom/GoogleAuthButton";
import axiosInnstance from "../utils/axios";
import { toast } from 'react-hot-toast'
import { useSelector } from "react-redux";
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login Data:", form);

        if (form.email.trim() === '' || form.password.trim() === '') {
            toast.error("All fields are required.")
        }
        setLoading(true)
        try {
            const res = await axiosInnstance.post('/user/login', {
                email: form.email,
                password: form.password
            })

            if (res.status === 201) {
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('login error ', error)
            if (error.response.status === 401) {
                toast.error(error.response?.data.message)
            }
            if (error.response.status === 500) {
                navigate("/not-found")
            }
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg ring-2 ring-gray-300 dark:ring-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg ring-2 ring-gray-300 dark:ring-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 dark:text-gray-400"
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold transition-all cursor-pointer duration-300 delay-75"
                    >
                        {loading ? "Logging in.." : "Log In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-5 flex items-center">
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
                    <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Google Login */}
                <GoogleAuthButton />

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-purple-600 hover:underline">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
