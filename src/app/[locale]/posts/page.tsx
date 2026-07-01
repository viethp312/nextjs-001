import type { Metadata } from "next";

import { PostsView } from "@/modules/posts/ui/views/posts.view";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts page",
    description: "Posts page",
  };
}

export default function PostsPage() {
  return <PostsView />;
}
