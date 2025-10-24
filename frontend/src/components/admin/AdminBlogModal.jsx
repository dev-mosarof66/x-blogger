/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaTimes } from "react-icons/fa";
import "react-quill-new/dist/quill.snow.css";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";

export default function BlogModal({ open, setOpen, content,tagList }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [status, setStatus] = useState("draft");

    const handleNext = () => setStep((s) => Math.min(s + 1, 4));
    const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("Title and content are required!");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        tags.forEach(tag => formData.append('tags[]', tag));
        formData.append('status', status || 'draft');
        if (thumbnail) formData.append('file', thumbnail);

        setLoading(true);
        try {
            console.log(formData, thumbnail)
            const res = await axiosInstance.post("/admin/blogs", formData, {
                headers: {
                    'Content-Type': "multipart/formdata"
                }
            });
            if (res.data.success) {
                console.log(res.data);
                toast.success(res.data.message)
                setOpen(false);
                setStep(1);
            }
        } catch (error) {
            console.error('Error creating new blog:', error);
            alert("Failed to create blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const handleTags = (tag) => {
        if (tags.includes(tag)) {
            const newTags = tags.filter((t) => t != tag)
            setTags(newTags)
        }
        else {

            setTags((prev) => [
                ...prev,
                tag
            ])
        }
    }


    return (
        <div className="w-full flex justify-center">
            {open && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-lg w-full flex flex-col gap-4 max-w-lg p-6 relative overflow-hidden">
                        {/* header */}
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                                Create New Blog
                            </h2>

                            <div
                                onClick={() => setOpen(false)}
                                className="text-purple-600 hover:text-purple-500 active:scale-95 cursor-pointer transition-all duration-300 delay-75"
                            >
                                <FaTimes size={22} />
                            </div>
                        </div>

                        {/* steps */}
                        <div className="relative h-60">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -50, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex flex-col gap-6"
                                    >
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-base font-medium">
                                                Blog Title
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter blog title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="border-none outline-none rounded-md px-3 py-2 w-full ring ring-purple-600 focus:ring-purple-700"
                                            />
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-base font-medium">Status</label>
                                            <div className="flex gap-3">
                                                {["draft", "published"].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => setStatus(s)}
                                                        className={`px-4 py-2 border border-purple-600 rounded-md ${status === s ? "bg-purple-600" : "hover:bg-purple-600"} active:scale-95 cursor-pointer transition-all duration-300 delay-75`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>


                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -50, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-purple-600 border-dashed rounded-lg p-6 cursor-pointer overflow-hidden"
                                    >

                                        {
                                            !thumbnail &&
                                            <p className="text-gray-600">Upload Thumbnail</p>
                                        }
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setThumbnail(
                                                    e.target.files ? e.target.files[0] : null
                                                )
                                            }
                                            className="opacity-0 absolute w-full h-full cursor-pointer"
                                        />
                                        {thumbnail && (
                                            <div className="flex flex-col items-center gap-2">
                                                <img
                                                    src={URL.createObjectURL(thumbnail)}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain rounded-md shadow-md"
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -50, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex flex-col gap-3"
                                    >
                                        <div className="w-full flex flex-col gap-2">
                                            <p className="text-lg font-medium">
                                                Select Tags
                                            </p>
                                            <div className="w-full grid grid-cols-2 xs:grid-cols-3 gap-4">
                                                {
                                                    tagList.map((tag, index) => (
                                                        <p key={index}

                                                            onClick={() => handleTags(tag.name)}

                                                            className={`text-xs border px-1 py-2 rounded-md border-purple-500 text-center ${tags.includes(tag.name) ? "bg-purple-600" : "hover:bg-purple-500"}  active:scale-95 cursor-pointer transition-all duration-300 delay-75`}>{tag.name}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {step === 4 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -50, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex flex-col gap-3 overflow-y-scroll"
                                    >
                                        <div className="w-full flex flex-col gap-2">
                                            <p className="text-lg font-medium">
                                                Content Overview
                                            </p>
                                            <div className="ql-snow ql-editor">
                                                <div
                                                    className="prose dark:prose-invert max-w-none ql-snow ql-editor"
                                                    dangerouslySetInnerHTML={{ __html: content }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* navigation */}
                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={handlePrev}
                                disabled={step === 1}
                                className={`px-4 py-2 rounded-md ${step === 1
                                    ? "bg-purple-800 text-gray-300 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700 text-white"
                                    } active:scale-95 cursor-pointer transition-all duration-300 delay-75`}
                            >
                                Prev
                            </button>

                            {step < 4 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-4 py-2 border border-purple-600 hover:bg-purple-600 active:scale-95 text-black dark:text-white rounded-md cursor-pointer transition-all duration-300 delay-75"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 border border-purple-600 hover:bg-purple-600 active:scale-95 text-black dark:text-white rounded-md cursor-pointer transition-all duration-300 delay-75"
                                >
                                    {
                                        loading ? <span className="loading loading-spinner loading-sm"></span>
                                            : <p>Create Blog</p>
                                    }
                                </button>
                            )}
                        </div>

                        <p className="text-center text-xs text-gray-400 mt-3">
                            Step {step} of 4
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}


