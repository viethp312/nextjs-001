import type { Post } from "@/modules/posts/types";
import { PostCard } from "@/modules/posts/ui/components/post-card";

type Props = {
  post: Post;
};

export function PostDetailView({ post }: Props) {
  return <PostCard post={post} />;
}
