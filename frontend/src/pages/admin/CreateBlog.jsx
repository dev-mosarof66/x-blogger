import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaEye, FaSave } from "react-icons/fa";
import PreviewBlog from "../../components/admin/PreviewBlog";
import { toast } from 'react-hot-toast'
import BlogModal from "../../components/admin/AdminBlogModal";


function BlogEditor() {
  const [value, setValue] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saveBlogModal, setSaveBlogModal] = useState(false)
  const quillRef = useRef(null);

  // Image upload handler
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  const handleSaveDraft =  () => {
    if (value.trim() === '') {
      toast.error('No word found in your blog.')
      return;
    }
    setSaveBlogModal(true)
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 text-black dark:text-white border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">📝 Blog Editor</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setIsPreviewOpen(true)}
            disabled={value.trim() === '' ? true : false}
            className="flex items-center justify-center gap-1 px-2 py-2 text-sm rounded-lg border border-purple-500 hover:bg-purple-600 text-gray-900 dark:text-gray-100 active:scale-95 cursor-pointer transition-all duration-300 delay-75"
          >
            <FaEye />
            <span className="hidden sm:block md:hidden xl:block">Preview</span>
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex items-center justify-center gap-1 px-2 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 active:scale-95 cursor-pointer transition-all duration-300 delay-75"
          >
            <FaSave />
            <span className="hidden sm:block md:hidden xl:block">Save Draft</span>
          </button>

        </div>
      </div>

      {/* Editor */}
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

      {/* Preview Modal */}
      <PreviewBlog value={value} isPreviewOpen={isPreviewOpen} setIsPreviewOpen={setIsPreviewOpen} />
      <BlogModal open={saveBlogModal} setOpen={setSaveBlogModal} content={value} />
    </div>
  );
}

export default BlogEditor;
