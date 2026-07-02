"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { getPostsOptions } from "@/modules/posts/api/posts.query";
import { PostCard } from "@/modules/posts/ui/components/post-card";

export function PostsView() {
  const locale = useLocale();
  const { data: posts, isPending, isError } = useQuery(getPostsOptions({ params: { locale } }));

  if (isPending) {
    return <div>Loading UI</div>;
  }

  if (isError) {
    return <div>Error UI</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
