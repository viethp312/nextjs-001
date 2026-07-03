import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { Album } from "@/modules/albums/types";

type Props = {
  album: Album;
};

export function AlbumCard({ album }: Props) {
  const { id, title } = album;

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/albums/${id}`}>Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
