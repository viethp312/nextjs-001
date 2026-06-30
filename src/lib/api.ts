import ky, { type AfterResponseState, type BeforeRequestState } from "ky";

import { env } from "@/env";

const beforeRequest = (state: BeforeRequestState) => {
  state.request.headers.set("Authorization", "Bearer token");
};

const afterResponse = (_state: AfterResponseState) => {};

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
