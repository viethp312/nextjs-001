import { NextIntlClientProvider } from "next-intl";

type Props = {
  children: React.ReactNode;
};
export function I18nProvider({ children }: Props) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
