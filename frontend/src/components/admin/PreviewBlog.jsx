/* eslint-disable no-unused-vars */
import React from 'react'
import {AnimatePresence,motion} from 'motion/react'
import { FaTimes } from 'react-icons/fa'
import "react-quill-new/dist/quill.snow.css";

const PreviewBlog = ({isPreviewOpen,setIsPreviewOpen,value}) => {
    return (
        <AnimatePresence>
            {isPreviewOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/40  backdrop-blur-sm flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white dark:bg-gray-800 w-full max-w-3xl p-6 rounded-2xl shadow-xl overflow-y-auto h-[80vh] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">👀 Preview</h3>
                            <div
                                onClick={() => setIsPreviewOpen(false)}
                                className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-purple-600 dark:hover:bg-purple-700 active:scale-95 cursor-pointer transition-all duration-300 delay-75"
                            >
                                <FaTimes size={20} />
                            </div>
                        </div>
                        <div className="ql-snow ql-editor">
                            <div
                                className="prose dark:prose-invert max-w-none ql-snow ql-editor"
                                dangerouslySetInnerHTML={{ __html: value }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PreviewBlog