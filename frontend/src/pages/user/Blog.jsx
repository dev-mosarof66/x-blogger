import React from "react";
import { useParams } from "react-router-dom";
import BlogInteractions from "../../components/custom/BlogInteraction";

const dummyBlogs = [
    {
        id: 1,
        title: "Understanding AI: A Beginner's Guide",
        content: "Artificial Intelligence (AI) is transforming industries...",
        image: "https://picsum.photos/seed/tech1/600/400",
        tags: ["AI", "Machine Learning"],
    },
    {
        id: 2,
        title: "Top 10 Web Development Frameworks in 2025",
        content: "Web development continues to evolve...",
        image: "https://picsum.photos/seed/tech2/600/400",
        tags: ["Web Development", "Frontend"],
    },
    {
        id: 3,
        title: "Cloud Computing Essentials for Developers",
        content: "Cloud computing powers modern apps...",
        image: "https://picsum.photos/seed/tech3/600/400",
        tags: ["Cloud", "DevOps"],
    },
    {
        id: 1,
        title: "Understanding AI: A Beginner's Guide",
        content: "Artificial Intelligence (AI) is transforming industries...",
        image: "https://picsum.photos/seed/tech1/600/400",
        tags: ["AI", "Machine Learning"],
    },
    {
        id: 2,
        title: "Top 10 Web Development Frameworks in 2025",
        content: "Web development continues to evolve...",
        image: "https://picsum.photos/seed/tech2/600/400",
        tags: ["Web Development", "Frontend"],
    },
    {
        id: 3,
        title: "Cloud Computing Essentials for Developers",
        content: "Cloud computing powers modern apps...",
        image: "https://picsum.photos/seed/tech3/600/400",
        tags: ["Cloud", "DevOps"],
    },

];

const Blog = () => {
    const { id } = useParams();
    const blog = dummyBlogs.find((b) => b.id.toString() === id.toString());

    if (!blog) {
        return (
            <div className="w-full max-w-7xl mx-auto min-h-screen py-20 text-center text-gray-600 dark:text-gray-400">
                Blog not found.
            </div>
        );
    }

    return (
        <div className="w-full max-w-[90%] min-h-screen mx-auto py-20">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{blog.title}</h1>

            {/* Author and Date */}
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <span>{blog.date}</span>
            </div>
            {/* Tags */}
            <div className="clear-left flex flex-wrap gap-2 py-4">
                {blog.tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-md text-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            {/* Blog content with floating image */}
            <div className="overflow-auto">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="lg:float-left w-full max-w-xl h-72 mb-4 mr-0 md:mr-6 rounded-xl shadow-md"
                />

                <div className="w-full">
                    {blog.content.split("\n").map((line, i) => (
                        <p key={i}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, ad libero! Nobis odio harum debitis similique totam impedit dicta beatae accusantium nesciunt nostrum dolores, non minima ab a vel quae eum magnam praesentium maxime ea vero quibusdam eveniet. Reiciendis corrupti, voluptates commodi iusto laborum consequuntur fugit aspernatur magnam eveniet recusandae doloremque et modi accusantium id dignissimos magni? Tempora alias a eos numquam nemo deserunt odit earum soluta. Illum sit rem, perspiciatis facilis enim cupiditate consectetur in harum quia iusto corrupti voluptatum quibusdam ut cum consequatur tenetur excepturi molestias qui error assumenda. Tempora hic quam dignissimos, voluptatum maxime ab rem velit laboriosam. Vero, molestiae nam! Dolorem rem excepturi quia veritatis porro ad qui neque nostrum accusamus, fuga officia minus consequatur. Quas error at modi quod animi aliquid! Nulla, rem fuga dicta vel quas necessitatibus.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, ad libero! Nobis odio harum debitis similique totam impedit dicta beatae accusantium nesciunt nostrum dolores, non minima ab a vel quae eum magnam praesentium maxime ea vero quibusdam eveniet. Reiciendis corrupti, voluptates commodi iusto laborum consequuntur fugit aspernatur magnam eveniet recusandae doloremque et modi accusantium id dignissimos magni? Tempora alias a eos numquam nemo deserunt odit earum soluta. Illum sit rem, perspiciatis facilis enim cupiditate consectetur in harum quia iusto corrupti voluptatum quibusdam ut cum consequatur tenetur excepturi molestias qui error assumenda. Tempora hic quam dignissimos, voluptatum maxime ab rem velit laboriosam. Vero, molestiae nam! Dolorem rem excepturi quia veritatis porro ad qui neque nostrum accusamus, fuga officia minus consequatur. Quas error at modi quod animi aliquid! Nulla, rem fuga dicta vel quas necessitatibus.
                        </p>
                    ))}
                </div>


            </div>
            <div className="w-full bg-gradient-to-r my-10 from-transparent via-purple-700 to-transparent h-0.5" />
            <div>
                <BlogInteractions />
            </div>
        </div>
    );
};

export default Blog;
