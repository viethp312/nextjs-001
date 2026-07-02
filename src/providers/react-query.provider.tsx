"use client";

import { environmentManager, MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
    mutationCache: new MutationCache({
      onError(error, _variables, _onMutateResult, mutation, _context) {
        const meta = mutation.meta;
        if (!meta?.skipToastError) {
          toast.error(`[MutationError] ${error.message}`); //TODO: check error and show error detail
        }
      },
      onSuccess(_data, _variables, _onMutateResult, mutation, context) {
        const meta = mutation.meta;
        if (meta?.invalidateQueries) {
          context.client.invalidateQueries({
            queryKey: meta.invalidateQueries,
          });
        }
        if (!meta?.skipToastError) {
          toast.success("[MutationSuccess]"); //TODO: check data and show message detail
        }
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
