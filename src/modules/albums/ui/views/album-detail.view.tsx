import type { Album } from "@/modules/albums/types";
import { AlbumDetailCard } from "@/modules/albums/ui/components/album-detail-card";

type Props = {
  album: Album;
};

export function AlbumDetailView({ album }: Props) {
  return <AlbumDetailCard album={album} />;
}
