import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BlogEditor = ({ quillRef, value, setValue, modules }) => {
    return (
        <div className="p-0 text-black dark:text-white h-[400px]">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                className="h-full rounded-md"
            />
        </div>
    )
}

export default BlogEditor