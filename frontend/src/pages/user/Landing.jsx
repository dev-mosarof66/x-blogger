/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdTrendingUp } from "react-icons/md";
import HeroImg from '../../assets/hero.jpg'
import BlogCard from "../../components/custom/BlogCard";
import { useSelector } from "react-redux";
const Landing = () => {

    const { user } = useSelector(state => state.user)

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-20">
            {/* Hero Section */}
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

            {/* Trending Tech Blogs */}
            <section className="max-w-7xl mx-auto px-6 lg:px-0 py-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold mb-8 flex items-center gap-2 relative"
                >
                    Trending Blogs
                    <div className="absolute h-[2px] bg-purple-500 w-28 -bottom-1" />
                </motion.h2>

                <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[1, 2, 3].map((i) => (
                        <BlogCard key={i} i={i} />
                    ))}
                </div>
            </section>

            {/* all blogs  */}
            <section className="max-w-7xl mx-auto px-6 lg:px-0 py-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold mb-8 flex items-center gap-2 relative"
                >
                    Other Blogs
                    <div className="absolute h-[2px] bg-purple-500 w-16 -bottom-1" />
                </motion.h2>

                <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <BlogCard key={i} i={i} />
                    ))}
                </div>
            </section>

            {/* Call To Action */}
            {
                !user && <section className="py-20 bg-gradient-to-r from-purple-600 to-cyan-400  text-center flex flex-col gap-4 text-gray-900">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl font-extrabold"
                    >
                        Start Your Tech Blogging Journey
                    </motion.h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-900">
                        We are 100% guranteed to provide the latest tech news and informations.
                    </p>
                    <Link
                        to="/register"
                        className="w-[80%] sm:w-xs mx-auto px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition duration-300 delay-75"
                    >
                        Get Started
                    </Link>
                </section>
            }
        </div>
    );
};

export default Landing;
