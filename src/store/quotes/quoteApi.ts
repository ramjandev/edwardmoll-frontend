import { baseAPI } from "../BaseApi/baseAPI";

export interface CreateQuotePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  houseSize: string;
  stairs: number;
  heavyItems: string[];
  distance: number;
}

export interface QuoteResponse {
  quoteId: string;
  estimatedTotal: number;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const quoteAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createQuote: build.mutation<QuoteResponse, CreateQuotePayload>({
      query: (data) => ({
        url: "/quotes",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<QuoteResponse>) => response.data,
      invalidatesTags: ["Quote"],
    }),
    updateQuote: build.mutation<QuoteResponse, { id: string; data: CreateQuotePayload }>({
      query: ({ id, data }) => ({
        url: `/quotes/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<QuoteResponse>) => response.data,
      invalidatesTags: ["Quote"],
    }),
  }),
});

export const { useCreateQuoteMutation, useUpdateQuoteMutation } = quoteAPI;
