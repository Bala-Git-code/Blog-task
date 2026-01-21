import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreateBlogForm } from "@/components/blog/CreateBlogForm";
import { BlogList } from "@/components/blog/BlogList";
import { BlogDetails } from "@/components/blog/BlogDetails";

export const Home = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <AppLayout
      left={
        <>
          <CreateBlogForm />
          <BlogList onSelect={setSelectedId} />
        </>
      }
      right={<BlogDetails id={selectedId} />}
    />
  );
};
