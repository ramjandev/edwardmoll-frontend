import { baseAPI } from "../BaseApi/baseAPI";

export interface DashboardStats {
  servicesCount?: number;
  galleryCount?: number;
  postsCount?: number;
  unreadInquiriesCount?: number;
  totalServices?: number;
  totalGalleryImages?: number;
  totalPublishedPosts?: number;
  unreadInquiries?: number;
}

export const adminApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<DashboardStats, void>({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard" as any],
    }),
  }),
});

export const { useGetDashboardQuery } = adminApi;
