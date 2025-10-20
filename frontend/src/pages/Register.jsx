/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import axiosInnstance from "../utils/axios";
import { toast } from "react-hot-toast";
import GoogleAuthButton from "../components/custom/GoogleAuthButton";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [customRegisterLoader, setCustomRegisterLoader] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Register Data:", form);

        if (form.name.trim() === "" || form.email.trim() === "" || form.password.trim() === "") {
            toast.error("All fields are required.");
            return;
        }
        try {
            setCustomRegisterLoader(true)
            const res = await axiosInnstance.post('/user/register', {
                name: form.name,
                email: form.email,
                password: form.password
            })
            console.log(res.data)
            if (res.status === 201 && res.data.success) {
                toast.success('Verification mail sent successfully')
                navigate(`/verify-email/${res.data.token}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setCustomRegisterLoader(false)
        }
    };

    const handleGoogleRegister = () => {
        console.log("Google Register Clicked");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Create an Account 🚀
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg ring-2 ring-gray-300 dark:ring-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
                            placeholder="John Doe"
                        />
                    </div>

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

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold transition-all cursor-pointer duration-300 delay-75"
                    >
                        {
                            customRegisterLoader ? "Registering.." : "  Register"
                        }
                    </button>
                </form>

                {/* Divider */}
                <div className="my-5 flex items-center">
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
                    <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
                </div>
                {/* google auth  */}
                <GoogleAuthButton />
                {/* Footer */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
