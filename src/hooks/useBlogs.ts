import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Blog } from "@/types/blog";
import { getBlogs, getBlogById, createBlog } from "@/api/blogs";

export const useBlogs = () =>
  useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

export const useBlog = (id: number) =>
  useQuery<Blog, Error>({
    queryKey: ["blogs", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<Blog, Error, Omit<Blog, "id">>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
