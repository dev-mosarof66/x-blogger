/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroImg from '../../assets/hero.jpg'

const Hero = ({user}) => {
  return (
          <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-5 md:w-1/2"
                >
                    <h1 className="w-full max-w-sm text-3xl xs:text-4xl lg:text-5xl bg-gradient-to-r from-purple-600 to-cyan-400 text-transparent bg-clip-text">
                        Start Your Tech Career
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Join a global tech community. Read cutting-edge tutorials, AI insights,
                        DevOps guides, and more. Engage, learn, and grow with every blog.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <Link
                            to={user ? "/blogs" : "/register"}
                            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition flex items-center gap-2"
                        >
                            Start Reading
                        </Link>
                        <Link
                            to="/blogs"
                            className="px-6 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition"
                        >
                            Explore Blogs
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:w-1/2 mt-10 md:mt-0 rounded-xl overflow-hidden"
                >
                    <img
                        src={HeroImg}
                        alt="Tech Hero"
                        className="w-full mx-auto drop-shadow-xl"
                    />
                </motion.div>
            </section>

  )
}

export default Hero