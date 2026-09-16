import { baseAPI } from "../BaseApi/baseAPI";

export interface Service {
  id: string;
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const servicesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<Service[], void>({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["Service" as any],
    }),
    createService: build.mutation<Service, Partial<Service>>({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service" as any],
    }),
    updateService: build.mutation<Service, { id: string; data: Partial<Service> }>({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service" as any],
    }),
    deleteService: build.mutation<void, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service" as any],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
