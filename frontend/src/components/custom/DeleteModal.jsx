/* eslint-disable no-unused-vars */
import React from "react";
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DeleteModal = ({ isOpen, title, onConfirm, onCancel, loading }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                // Backdrop
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Modal */}
                    <motion.div
                        className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-lg p-6 w-80"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-pink-600 text-4xl">
                                <FaTrash />
                            </div>
                            <p className="text-center">
                                Are you sure you want to delete{" "} -
                                <span className="text-purple-600">{title}</span>?
                            </p>

                            <div className="flex gap-4 mt-4 w-full">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 cursor-pointer transition-all duration-300 delay-75"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => onConfirm()}
                                    className="flex-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-lg py-2  cursor-pointer transition-all duration-300 delay-75"
                                >
                                    {
                                        loading ? <span className="loading loading-spinner loading-xs"></span>
                                            : "Delete"
                                    }
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteModal;
