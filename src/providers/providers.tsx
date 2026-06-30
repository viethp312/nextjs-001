import { I18nProvider } from "./i18n.provider";
import { ReactQueryProvider } from "./react-query.provider";

type Props = {
  children: React.ReactNode;
};

const providers = [I18nProvider, ReactQueryProvider];

export function Providers({ children }: Props) {
  return providers.reduceRight((acc, Provider) => {
    return <Provider key={Provider.name}>{acc}</Provider>;
  }, children);
}
