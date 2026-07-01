import type { routing } from "@/i18n/routing";
import type messages from "./messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: {
      skipToastError?: boolean;
    };
    mutationMeta: {
      skipToastError?: boolean;
    };
  }
}
