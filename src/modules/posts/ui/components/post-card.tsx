import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/modules/posts/types";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  const { id, body, title } = post;

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{body}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/posts/${id}`}>Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
