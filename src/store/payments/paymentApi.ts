import { baseAPI } from "../BaseApi/baseAPI";

export interface CreateIntentPayload {
  bookingId: string;
}

export interface CreateIntentResponse {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

import type { ApiResponse } from "../quotes/quoteApi";

export const paymentAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createPaymentIntent: build.mutation<CreateIntentResponse, CreateIntentPayload>({
      query: (data) => ({
        url: "/payments/create-intent",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<CreateIntentResponse>) => response.data,
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentAPI;
