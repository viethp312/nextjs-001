"use server";

import { deletePost } from "@/modules/posts/api/posts.api";

export async function deletePostAction(id: number) {
  await deletePost(id);
}
