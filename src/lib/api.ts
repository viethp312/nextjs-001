import ky, { type AfterResponseState, type BeforeRequestState } from "ky";

import { env } from "@/env";

const beforeRequest = (state: BeforeRequestState) => {
  console.info(`[API][Request] ${state.request.method} ${state.request.url}`);
  state.request.headers.set("Authorization", "Bearer token");
};

const afterResponse = (state: AfterResponseState) => {
  console.info(`[API][Response] ${state.request.method} ${state.request.url}`);
};

const api = ky.create({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [beforeRequest],
    afterResponse: [afterResponse],
  },
  timeout: 10_000,
  retry: 0,
});

export { api };
