/* eslint-disable no-unused-vars */
import React from "react";
import { Construction, Hammer } from "lucide-react";
import { motion } from "motion/react";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-800 dark:text-gray-200">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-center mb-6 bg-yellow-100 p-6 rounded-full shadow-lg"
      >
        <Construction className="w-16 h-16 text-yellow-500" />
      </motion.div>

      {/* Text Content */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-2"
      >
        Settings Page Under Construction
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mb-6 text-center max-w-md"
      >
        We’re currently building something awesome here! Check back soon to manage your preferences and account settings.
      </motion.p>

      {/* Optional: Animated Button or Icon */}
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="flex items-center gap-2 text-yellow-600 font-semibold"
      >
        <Hammer className="w-5 h-5" />
        <span>Work in progress...</span>
      </motion.div>
    </div>
  );
};

export default Settings;
