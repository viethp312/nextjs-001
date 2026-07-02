import { useMutation } from "@tanstack/react-query";
import { DeleteIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { deletePostOptions, updatePostOptions } from "@/modules/posts/api/posts.query";
import type { Post } from "@/modules/posts/types";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  const { id, body, title } = post;

  const deletePostMutation = useMutation(deletePostOptions());
  const _updatePostMutation = useMutation(updatePostOptions());

  function handleDeletePost() {
    deletePostMutation.mutate(id);
  }

  function handleUpdatePost() {
    _updatePostMutation.mutate({ id, body: { body: "Hello", title: "hello" } });
  }

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{body}</CardDescription>
        <CardAction>
          <Button size="icon" variant="ghost" onClick={handleDeletePost}>
            <DeleteIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button size="sm" className="w-full" onClick={handleUpdatePost}>
          Update
        </Button>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/posts/${id}`}>Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
