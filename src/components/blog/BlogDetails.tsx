import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlog } from "@/hooks/useBlogs";

interface Props {
  id: number | null;
}

export const BlogDetails = ({ id }: Props) => {
  const { data, isLoading, error } = useBlog(id || 0);

  if (!id) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-blue-400">No blog selected</p>
          <p className="text-sm text-zinc-500">Select a blog from the list to view its full details</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="border border-zinc-800 rounded-none p-0 overflow-hidden bg-black">
        <div className="pt-0 space-y-6 p-6">
          <Skeleton className="w-full h-80 rounded-none bg-zinc-900" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-zinc-900" />
            <Skeleton className="h-4 w-1/2 bg-zinc-900" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-zinc-900" />
            <Skeleton className="h-4 w-full bg-zinc-900" />
            <Skeleton className="h-4 w-4/5 bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-red-600/50 bg-red-950/10 rounded-none p-6">
        <p className="text-sm text-red-400 font-medium">{error instanceof Error ? error.message : "Failed to load blog details"}</p>
        <p className="text-xs text-red-500 mt-2 opacity-75">Please try selecting another blog or refresh the page</p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-none p-0 overflow-hidden bg-black">
      <div className="relative h-80 overflow-hidden bg-black">
        <img
          src={data.coverImage}
          alt={data.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {!data.coverImage && (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <span className="text-orange-500 font-medium text-2xl">Blog Cover Image</span>
          </div>
        )}
      </div>
      <div className="pt-6 px-6 space-y-6 pb-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight text-green-500">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-blue-400">
            <span className="font-medium">{data.category[0] || "Blog"}</span>
            <span>|</span>
            <time className="font-medium">
              {new Date(data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 space-y-6">
          <p className="text-green-400 text-base leading-relaxed">
            {data.description}
          </p>
          <div className="prose prose-invert max-w-none">
            <p className="text-green-400 leading-relaxed whitespace-pre-wrap text-base">
              {data.content}
            </p>
          </div>
        </div>
        {data.category.length > 0 && (
          <div className="border-t border-zinc-800 pt-6 flex flex-wrap gap-2">
            {data.category.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="text-xs border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10"
              >
                {cat}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
