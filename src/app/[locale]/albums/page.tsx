import type { Locale } from "next-intl";

import { api } from "@/lib/api";
import type { Album } from "@/modules/albums/type";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export default async function Albums({ params }: Props) {
  const { locale } = await params;

  const albums = await api.get<Album[]>("/albums", { searchParams: { locale } }).json();
  return <div>{albums.length}</div>;
}
