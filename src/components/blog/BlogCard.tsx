import type { Blog } from "@/types/blog";

interface Props {
  blog: Blog;
  onSelect: (id: number) => void;
  isSelected?: boolean;
}

export const BlogCard = ({ blog, onSelect, isSelected }: Props) => (
  <div
    className={`overflow-hidden cursor-pointer transition-all duration-200 border rounded-none p-4 mb-4 bg-black ${
      isSelected
        ? "border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-black"
        : "border border-zinc-800 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
    }`}
    onClick={() => onSelect(blog.id)}
  >
    <div className="space-y-2">
      <div className="flex justify-between items-start gap-2">
        <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
          {blog.category[0] || "Blog"}
        </span>
        <span className="text-xs text-zinc-500 shrink-0">
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-sm line-clamp-2 text-blue-400 leading-tight">
          {blog.title}
        </h3>
        <p className="text-xs text-orange-300 line-clamp-2 leading-relaxed">
          {blog.description}
        </p>
      </div>
    </div>
  </div>
);
