import { baseAPI } from "../BaseApi/baseAPI";
import type { ApiResponse } from "../quotes/quoteApi";

export interface CreateInvoicePayload {
  bookingId: string;
}

export interface PaymentLinkResponse {
  paymentId: string;
  invoiceId: string;
  invoiceNumber: string | null;
  /** Jobber Client Hub link where the customer pays by card. */
  paymentUrl: string | null;
  amount: number;
  currency: string;
  type: "DEPOSIT" | "BALANCE" | "REFUND";
  status: string;
}

export interface PaymentStatusResponse {
  bookingId: string;
  status: string;
  depositPaid: boolean;
  balancePaid: boolean;
  depositAmount: number;
  balanceAmount: number;
  totalAmount: number;
  depositInvoiceUrl: string | null;
  balanceInvoiceUrl: string | null;
}

export const paymentAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createDepositInvoice: build.mutation<
      PaymentLinkResponse,
      CreateInvoicePayload
    >({
      query: (data) => ({
        url: "/payments/deposit-invoice",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<PaymentLinkResponse>) =>
        response.data,
    }),
    getPaymentStatus: build.query<PaymentStatusResponse, string>({
      query: (bookingId) => ({
        url: `/payments/${bookingId}/status`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PaymentStatusResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useCreateDepositInvoiceMutation,
  useGetPaymentStatusQuery,
  useLazyGetPaymentStatusQuery,
} = paymentAPI;
