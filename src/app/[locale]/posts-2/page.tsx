import type { Metadata } from "next";

import { PostsView } from "@/modules/posts/ui/views/posts.view";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts page Client Side",
    description: "Posts page Client Side",
  };
}

export default async function Posts1Page() {
  return <PostsView />;
}
