import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Album } from "@/modules/albums/types";

type Props = {
  album: Album;
};

export function AlbumDetailCard({ album }: Props) {
  const { title } = album;
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{title}</p>
      </CardContent>
    </Card>
  );
}
