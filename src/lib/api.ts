import ky, { type AfterResponseState, type BeforeErrorState, type BeforeRequestState } from "ky";

import { env } from "@/env";
import { ApiError } from "@/lib/api-error";

const beforeRequest = (state: BeforeRequestState) => {
  console.info(`[API][Request] ${state.request.method} ${state.request.url}`);
  state.request.headers.set("Authorization", "Bearer token");
};

const afterResponse = (state: AfterResponseState) => {
  console.info(`[API][Response] ${state.request.method} ${state.request.url}`);
};

const beforeError = ({ error }: BeforeErrorState) => {
  const apiError = ApiError.from(error);
  console.error(`[API][Error] ${apiError.code}`, apiError);
  return apiError;
};

const api = ky.create({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [beforeRequest],
    afterResponse: [afterResponse],
    beforeError: [beforeError],
  },
  timeout: 10_000,
  retry: 0,
});

export { api };
