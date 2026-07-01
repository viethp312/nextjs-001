"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostsOptions } from "@/modules/posts/api/query-options";
import { PostCard } from "../components/post-card";

export function PostsView() {
  const { data: posts, isLoading, isError, error } = useQuery(getPostsOptions());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
