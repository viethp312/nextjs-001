import type { GetPostDetailOptions } from "@/modules/posts/types";

export const queryKey = {
  posts: {
    all: ["posts"],
    detail: (options: GetPostDetailOptions) => ["posts", options.id, options.params],
  },
};
