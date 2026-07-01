"use client";

import { environmentManager, MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 50 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError(error, query) {
        const meta = query.meta;
        if (meta?.skipToastError) {
          return;
        }
        toast.error(`[QueryError] ${error.message}`); //TODO: show error detail
      },
    }),
    mutationCache: new MutationCache({
      onError(error, _variables, _onMutateResult, mutation, _context) {
        const meta = mutation.meta;
        if (meta?.skipToastError) {
          return;
        }
        toast.error(`[MutationError] ${error.message}`); //TODO: show error detail
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const queryClient = getQueryClient();

export function ReactQueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
