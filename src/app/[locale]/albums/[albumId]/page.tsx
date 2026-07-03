import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { routing } from "@/i18n/routing";
import { getAlbumDetail, getAlbums } from "@/modules/albums/api/albums.api";
import { AlbumDetailView } from "@/modules/albums/ui/views/album-detail.view";
import { getRandomImageUrl } from "@/utils/random-image";

type Props = {
  params: Promise<{ locale: Locale; albumId: string }>;
};

export async function generateStaticParams() {
  const albums = await getAlbums({ params: { locale: "en" } });

  return routing.locales.flatMap((locale) =>
    albums.map((album) => ({
      locale,
      albumId: String(album.id),
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { albumId, locale } = await params;

  const album = await getAlbumDetail({ id: Number(albumId), params: { locale } });
  const imageUrl = getRandomImageUrl({ text: album.title });

  return {
    title: `Album detail ${album.title}`,
    description: `Album description`,
    openGraph: {
      title: album.title,
      images: [imageUrl],
    },
    twitter: {
      images: [imageUrl],
    },
  };
}

export default async function AlbumDetail({ params }: Props) {
  const { albumId, locale } = await params;

  const album = await getAlbumDetail({ id: Number(albumId), params: { locale } });

  return <AlbumDetailView album={album} />;
}
