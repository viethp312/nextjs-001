import type { Locale } from "next-intl";

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export interface GetAlbumsOptions {
  params: {
    locale: Locale;
  };
}

export interface GetAlbumDetailOptions {
  id: number;
  params: {
    locale: Locale;
  };
}

export interface UpdateAlbumsOptions {
  id: number;
  body: Pick<Album, "title">;
}
