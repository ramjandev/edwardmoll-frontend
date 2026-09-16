/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import type { RootState } from "../store";

// Original baseQueryAPI
const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    //Read from Redux state (persisted), not cookies directly
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithToasts: typeof baseQueryAPI = async (
  args,
  api,
  extraOptions: any,
) => {
  const result = await baseQueryAPI(args, api, extraOptions);

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  if (method !== "GET") {
    if (
      result?.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      const message = (result.data as { message?: string }).message;
      if (message && !extraOptions?.silent) {
        if (method === "DELETE") {
          toast.warning(message);
        } else {
          toast.success(message);
        }
      }
    }

    if (result?.error) {
      const errorData = result.error.data as {
        message?: string;
        error?: string;
      };
      const isSessionExpired =
        result.error.status === 401 && errorData?.error === "Unauthorized";

      if (isSessionExpired) {
      } else {
        const networkDown =
          result.error.status === "FETCH_ERROR" ||
          result.error.status === "TIMEOUT_ERROR";
        toast.error(
          networkDown
            ? "Cannot reach the API at " +
                (import.meta.env.VITE_API_URL || "the backend") +
                ". Start the backend (port 3000) and try again."
            : errorData?.message || "Something went wrong. Please try again.",
        );
      }
    }
  }

  // If response is wrapped by NestJS TransformInterceptor ({ statusCode, success, data }),
  // unwrap the inner data so RTK Query hooks receive the direct model/array payload
  if (
    result?.data &&
    typeof result.data === "object" &&
    "data" in result.data &&
    ("statusCode" in result.data || "success" in result.data)
  ) {
    return {
      ...result,
      data: (result.data as any).data,
    };
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithToasts,
  tagTypes: [
    "Admin",
    "Customer",
    "Fee",
    "PriceMatrix",
    "Vendor",
    "EmailThread",
    "Campaign",
    "Brand",
    "Category",
    "Product",
    "ProfileShop",
    "Me",
    "Quote",
    "LineItemCustomization",
    "Job",
    "Invoice",
    "InvoiceInformation",
    "PaymentTerm",
    "WhatsAppConversation",
    "Service",
    "Gallery",
    "Post",
    "Inquiry",
    "Dashboard"
  ],

  endpoints: () => ({}),
});
