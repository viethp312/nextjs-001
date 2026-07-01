import { queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { GetPostDetailOptions, Post } from "@/modules/posts/types";
import { queryKey } from "./query-key";

export function getPostsOptions() {
  return queryOptions({
    queryKey: queryKey.posts.all,
    queryFn: () => api.get<Post[]>("/posts").json(),
    meta: {
      // skipToastError: true,
    },
  });
}

export function getPostDetailOptions(options: GetPostDetailOptions) {
  return queryOptions({
    queryKey: queryKey.posts.detail(options),
    queryFn: () =>
      api
        .get<Post>(`/posts/${options.id}`, {
          searchParams: options.params,
        })
        .json(),
  });
}
