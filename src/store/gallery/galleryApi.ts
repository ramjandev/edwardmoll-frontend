import { baseAPI } from "../BaseApi/baseAPI";

export interface GalleryImage {
  id: string;
  _id?: string;
  imageUrl?: string;
  url?: string;
  caption?: string;
  category?: string;
  sortOrder?: number;
  createdAt?: string;
}

export const galleryApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getGallery: build.query<GalleryImage[], string | void>({
      query: (category) => ({
        url: "/gallery",
        method: "GET",
        params: category ? { category } : undefined,
      }),
      providesTags: ["Gallery" as any],
    }),
    createGalleryImage: build.mutation<GalleryImage, Partial<GalleryImage>>({
      query: (data) => ({
        url: "/gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Gallery" as any],
    }),
    updateGalleryImage: build.mutation<GalleryImage, { id: string; data: Partial<GalleryImage> }>({
      query: ({ id, data }) => ({
        url: `/gallery/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Gallery" as any],
    }),
    deleteGalleryImage: build.mutation<void, string>({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery" as any],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useCreateGalleryImageMutation,
  useUpdateGalleryImageMutation,
  useDeleteGalleryImageMutation,
} = galleryApi;
