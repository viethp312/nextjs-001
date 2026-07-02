import type { Post } from "@/modules/posts/types";
import { PostCardDetail } from "@/modules/posts/ui/components/post-detail-card";

type Props = {
  post: Post;
};

export function PostDetailView({ post }: Props) {
  return <PostCardDetail post={post} />;
}
