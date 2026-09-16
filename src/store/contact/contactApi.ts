import { baseAPI } from "../BaseApi/baseAPI";

export interface Inquiry {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const contactApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    submitInquiry: build.mutation<void, Partial<Inquiry>>({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
    getInquiries: build.query<Inquiry[], void>({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      providesTags: ["Inquiry" as any],
    }),
    markAsRead: build.mutation<Inquiry, string>({
      query: (id) => ({
        url: `/contact/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Inquiry" as any],
    }),
  }),
});

export const {
  useSubmitInquiryMutation,
  useGetInquiriesQuery,
  useMarkAsReadMutation,
} = contactApi;
