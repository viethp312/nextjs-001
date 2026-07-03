import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { getPostsOptions } from "@/modules/posts/api/posts.query";
import { PostsView } from "@/modules/posts/ui/views/posts.view";

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts page Client Side (prefetch)",
    description: "Posts page Client Side (prefetch)",
  };
}

export default async function PostsPage({ params }: Props) {
  const { locale } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getPostsOptions({ params: { locale } }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsView />
    </HydrationBoundary>
  );
}
