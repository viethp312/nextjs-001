import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { routing } from "@/i18n/routing";
import { getAlbums } from "@/modules/albums/api/albums.api";
import { AlbumsView } from "@/modules/albums/ui/views/albums.view";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Albums page ISR",
    description: "Albums page ISR",
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function AlbumsPage({ params }: Props) {
  const { locale } = await params;
  const albums = await getAlbums({ params: { locale } });

  return <AlbumsView albums={albums} />;
}
