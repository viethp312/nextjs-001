import { isHTTPError, isNetworkError, isTimeoutError } from "ky";

type ApiErrorCode = "HTTP_ERROR" | "NETWORK_ERROR" | "TIMEOUT_ERROR" | "UNKNOWN_ERROR";

type ApiErrorOptions = {
  code: ApiErrorCode;
  status?: number;
  data?: unknown;
  cause?: unknown;
};

class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  readonly data?: unknown;

  constructor(message: string, { code, status, data, cause }: ApiErrorOptions) {
    super(message, { cause });
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.data = data;
  }

  static from(error: Error): ApiError {
    if (isHTTPError(error)) {
      return new ApiError(getMessageFromData(error.data) ?? `Request failed with status ${error.response.status}`, {
        code: "HTTP_ERROR",
        status: error.response.status,
        data: error.data,
        cause: error,
      });
    }

    if (isTimeoutError(error)) {
      return new ApiError("Request timed out", { code: "TIMEOUT_ERROR", cause: error });
    }

    if (isNetworkError(error)) {
      return new ApiError("Network error occurred", { code: "NETWORK_ERROR", cause: error });
    }

    return new ApiError(error.message, { code: "UNKNOWN_ERROR", cause: error });
  }
}

function getMessageFromData(data: unknown): string | undefined {
  if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") {
    return data.message;
  }
  return undefined;
}

export type { ApiErrorCode };
export { ApiError };
