import type { Blog } from "@/types/blog";

const BASE_URL = "http://localhost:3001";

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await fetch(`${BASE_URL}/blogs`);
    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Make sure JSON Server is running on http://localhost:3001");
    }
    throw error;
  }
};

export const getBlogById = async (id: number): Promise<Blog> => {
  try {
    const res = await fetch(`${BASE_URL}/blogs/${id}`);
    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Make sure JSON Server is running on http://localhost:3001");
    }
    throw error;
  }
};

export const createBlog = async (blog: Omit<Blog, "id">): Promise<Blog> => {
  try {
    const res = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });
    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Make sure JSON Server is running on http://localhost:3001");
    }
    throw error;
  }
};
