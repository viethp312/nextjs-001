import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { use } from "react";

import { routing } from "@/i18n/routing";
import { getPostDetailOptions, getPostsOptions } from "@/modules/posts/api/query-options";
import { PostDetailView } from "@/modules/posts/ui/views/post-detail.view";
import { getRandomImageUrl } from "@/utils/random-image";

type Props = {
  params: Promise<{ locale: Locale; postId: string }>;
};

export async function generateStaticParams() {
  const queryClient = new QueryClient();
  const posts = await queryClient.fetchQuery(getPostsOptions());

  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      postId: String(post.id),
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId, locale } = await params;
  const queryClient = new QueryClient();

  const post = await queryClient.fetchQuery(getPostDetailOptions({ id: Number(postId), params: { locale } }));
  const imageUrl = getRandomImageUrl({ text: post.title });

  return {
    title: `Post detail ${post.title}`,
    description: `Post description`,
    openGraph: {
      title: post.title,
      images: [imageUrl],
    },
    twitter: {
      images: [imageUrl],
    },
  };
}

export default async function PostDetail({ params }: Props) {
  const { locale, postId } = await params;
  const queryClient = new QueryClient();

  const post = await queryClient.fetchQuery(getPostDetailOptions({ id: Number(postId), params: { locale } }));

  return <PostDetailView post={post} />;
}
