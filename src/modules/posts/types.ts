import type { Locale } from "next-intl";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface GetPostDetailOptions {
  id: number;
  params: {
    locale: Locale;
  };
}
