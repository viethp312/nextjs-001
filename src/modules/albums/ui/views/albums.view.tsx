import type { Album } from "@/modules/albums/types";
import { AlbumCard } from "@/modules/albums/ui/components/album-card";

type Props = {
  albums: Album[];
};

export function AlbumsView({ albums }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
