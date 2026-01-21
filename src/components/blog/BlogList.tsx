import { Skeleton } from "@/components/ui/skeleton";
import type { Blog } from "@/types/blog";
import { useBlogs } from "@/hooks/useBlogs";
import { BlogCard } from "./BlogCard";
import { useState } from "react";

interface Props {
  onSelect: (id: number) => void;
}

export const BlogList = ({ onSelect }: Props) => {
  const { data, isLoading, error } = useBlogs();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    onSelect(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-zinc-800 rounded-none p-4 bg-black">
            <div className="space-y-3">
              <Skeleton className="h-3 w-20 bg-zinc-900" />
              <Skeleton className="h-4 w-full bg-zinc-900" />
              <Skeleton className="h-3 w-4/5 bg-zinc-900" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-600/50 bg-red-950/10 rounded-xl p-4">
        <p className="text-sm text-red-400 font-medium">{error instanceof Error ? error.message : "Failed to load blogs"}</p>
        <p className="text-xs text-red-500 mt-2 opacity-75">Check that JSON Server is running on port 3001</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="border border-zinc-800 rounded-none p-4 bg-black">
        <p className="text-sm text-center text-zinc-500 py-8">No blogs yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {data.map((blog: Blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onSelect={handleSelect}
          isSelected={selectedId === blog.id}
        />
      ))}
    </div>
  );
};
