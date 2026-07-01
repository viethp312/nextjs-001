import { I18nProvider } from "./i18n.provider";
import { ReactQueryProvider } from "./react-query.provider";

type Props = {
  children: React.ReactNode;
};

const providers = {
  I18nProvider,
  // Client side
  ReactQueryProvider,
};

export function AppProvider({ children }: Props) {
  return Object.entries(providers).reduce((acc, [key, Provider]) => {
    return <Provider key={key}>{acc}</Provider>;
  }, children);
}
