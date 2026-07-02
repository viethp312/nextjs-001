import { mutationOptions, queryOptions } from "@tanstack/react-query";

import type { GetPostDetailOptions, GetPostsOptions, UpdatePostsOptions } from "@/modules/posts/types";
import { deletePost, getPostDetail, getPosts, updatePost } from "./posts.api";
import { queryKey } from "./posts.query-key";

export function getPostsOptions(options: GetPostsOptions) {
  return queryOptions({
    queryKey: queryKey.posts.all(options),
    queryFn: () => getPosts(options),
  });
}

export function getPostDetailOptions(options: GetPostDetailOptions) {
  return queryOptions({
    queryKey: queryKey.posts.detail(options),
    queryFn: () => getPostDetail(options),
  });
}

export function deletePostOptions() {
  return mutationOptions({
    mutationFn: (id: number) => deletePost(id),
    meta: {
      invalidateQueries: ["posts"],
    },
  });
}

export function updatePostOptions() {
  return mutationOptions({
    mutationFn: (options: UpdatePostsOptions) => updatePost(options),
    meta: {
      invalidateQueries: ["posts"],
    },
  });
}
