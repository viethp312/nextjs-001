import type { Locale } from "next-intl";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface GetPostsOptions {
  params: {
    locale: Locale;
  };
}

export interface GetPostDetailOptions {
  id: number;
  params: {
    locale: Locale;
  };
}

export interface UpdatePostsOptions {
  id: number;
  body: Pick<Post, "title" | "body">;
}
