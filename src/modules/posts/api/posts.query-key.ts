import type { GetPostDetailOptions, GetPostsOptions } from "@/modules/posts/types";

export const queryKey = {
  posts: {
    all: (options: GetPostsOptions) => ["posts", options.params],
    detail: (options: GetPostDetailOptions) => ["posts", options.id, options.params],
  },
};
