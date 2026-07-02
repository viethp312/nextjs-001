import { api } from "@/lib/api";
import type { GetPostDetailOptions, GetPostsOptions, Post, UpdatePostsOptions } from "@/modules/posts/types";

export function getPosts(options: GetPostsOptions) {
  return api
    .get<Post[]>("/posts", {
      searchParams: options.params,
    })
    .json();
}

export function getPostDetail(options: GetPostDetailOptions) {
  return api
    .get<Post>(`/posts/${options.id}`, {
      searchParams: options.params,
    })
    .json();
}

export function deletePost(id: number) {
  return api.delete<Post>(`/posts/${id}`).json();
}

export function updatePost(options: UpdatePostsOptions) {
  return api
    .put<Post>(`/posts/${options.id}`, {
      json: options.body,
    })
    .json();
}
