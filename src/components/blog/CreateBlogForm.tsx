import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateBlog } from "@/hooks/useBlogs";

export const CreateBlogForm = () => {
  const { mutate, isPending } = useCreateBlog();

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      title,
      category: category.split(",").map((c) => c.trim()),
      description,
      coverImage,
      content,
      date: new Date().toISOString(),
    });

    // Clear form after submit
    setTitle("");
    setCategory("");
    setDescription("");
    setCoverImage("");
    setContent("");
  };

  return (
    <div className="border border-blue-500 rounded-none p-4 mb-4 bg-black shadow-[0_0_15px_rgba(59,130,246,0.2)]">
      <div className="border-b border-blue-500/30 pb-3 mb-4">
        <h2 className="text-sm font-bold text-blue-400">{"$ "} Create New Blog</h2>
        <p className="text-xs text-zinc-500 mt-1">Share your story with the world</p>
      </div>
      <div className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-blue-400 uppercase">Blog Title</label>
            <Input
              placeholder="Enter a captivating title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-8 bg-transparent border border-zinc-800 text-blue-300 placeholder:text-zinc-600 focus:border-blue-500 outline-none rounded-none text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-blue-400 uppercase">Categories</label>
            <Input
              placeholder="e.g. Technology, Design, Business (comma separated)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="h-8 bg-transparent border border-zinc-800 text-blue-300 placeholder:text-zinc-600 focus:border-blue-500 outline-none rounded-none text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-blue-400 uppercase">Description</label>
            <Textarea
              placeholder="Brief summary of your blog post"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="resize-none min-h-[60px] bg-transparent border border-zinc-800 text-blue-300 placeholder:text-zinc-600 focus:border-blue-500 outline-none rounded-none text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-blue-400 uppercase">Cover Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
              className="h-8 bg-transparent border border-zinc-800 text-blue-300 placeholder:text-zinc-600 focus:border-blue-500 outline-none rounded-none text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-blue-400 uppercase">Content</label>
            <Textarea
              placeholder="Write your complete blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
              className="resize-none bg-transparent border border-zinc-800 text-blue-300 placeholder:text-zinc-600 focus:border-blue-500 outline-none rounded-none text-xs"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-8 bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all font-semibold rounded-none text-xs mt-2"
          >
            {isPending ? "publishing..." : <>{"$ "} publish blog</>}
          </Button>
        </form>
      </div>
    </div>
  );
};
