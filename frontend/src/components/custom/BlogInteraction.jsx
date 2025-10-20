import React, { useState } from "react";
import { FaHeart, FaThumbsUp, FaFaceSurprise, FaThumbsDown } from "react-icons/fa6";

const allReactions = [
    {
        id: "love",
        name: "Love",
        icon: <FaHeart className="text-red-500" />,
    },
    {
        id: "like",
        name: "Like",
        icon: <FaThumbsUp className="text-blue-500" />,
    },
    {
        id: "wow",
        name: "Wow",
        icon: <FaFaceSurprise className="text-yellow-500" />,
    },
    {
        id: "dislike",
        name: "Dislike",
        icon: <FaThumbsDown />,
    },
];

const BlogInteractions = () => {
    const [reactions, setReactions] = useState("");
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    // Handle reaction clicks
    const handleReaction = (type) => {
        setReactions(type)
    };

    // Handle comment submission
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            text: commentText,
        };

        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
    };

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full flex flex-col gap-4">
                {/* Reactions */}
                <div className="flex items-center gap-4">
                    {allReactions.map((reaction) => (
                        <div
                            key={reaction.id}
                            onClick={() => handleReaction(reaction.id)}
                            className={`flex items-center gap-1  px-3 py-1 rounded-lg ${reactions === reaction.id ? 'bg-purple-950 dark:bg-purple-600' : ' bg-gray-400 dark:bg-gray-700  hover:bg-purple-400/20'} active:scale-95 hover:text-white transition cursor-pointer duration-300 delay-75`}
                        >
                            {reaction.icon}
                        </div>
                    ))}
                </div>

                <div className="w-full">
                    {/* Comment Box */}
                    <form onSubmit={handleAddComment} className="w-full max-w-lg flex flex-col gap-4">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full h-32 resize-none border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            rows={3}
                        />
                        <button
                            type="submit"
                            className="w-full xs:w-fit bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 active:scale-95 transition cursor-pointer duration-300 delay-75"
                        >
                            Post Comment
                        </button>
                    </form>
                </div>

            </div>
            {/* Comments List */}
            <div className="w-full h-96 flex flex-col gap-4 rounded-md border border-purple-600  shadow shadow-black items-center justify-center">
                {comments.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
                )}
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                    >
                        {comment.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogInteractions;
