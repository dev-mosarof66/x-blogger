/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import axionInstance from '../../utils/axios'

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { user } = useSelector(state => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '') { toast.error("Email can't be empty."); return; }
    if (!user) { toast.error('Please login to subscribe.'); setEmail(""); return; }
    try {
      const res = await axionInstance.post("/user/news-letter", { email })
      if (res.data.success) {
        toast.success('You have successfully subscribed.')
        setSubmitted(true)
      }
    } catch (error) {
      toast.error('Please check your internet connection.')
      console.log('Error while subscribing to news letter.Please Try again.')
    }
  };

  return (
    <section className="w-full min-h-screen py-20 flex items-center justify-center bg-gradient-to-b from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Subscribe to Our <span className="text-purple-600">Tech Newsletter</span>
        </motion.h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get the latest insights, tutorials, and news about AI, web development, and cloud computing — straight to your inbox.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-2/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-fit px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold transition-all transform hover:scale-105 cursor-pointer shadow-md"
          >
            Subscribe
          </button>
        </motion.form>

        {/* Success Message */}
        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-green-600 dark:text-green-400"
          >
            ✅ Thanks for subscribing! Stay tuned for awesome content.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default NewsLetter;
