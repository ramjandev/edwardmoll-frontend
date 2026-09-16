import { Check, ImagePlus, Trash2, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import CommonButton from "../../components/shared/button/CommonButton";
import {
  useCreateGalleryImageMutation,
  useDeleteGalleryImageMutation,
  useGetGalleryQuery,
} from "../../store/gallery/galleryApi";
import { useUploadImageMutation } from "../../store/upload/uploadApi";

const categories = [
  "Residential",
  "Commercial",
  "Packing",
  "Storage",
  "Specialty",
];

const GalleryManager = () => {
  const { data: rawImages = [], isLoading } = useGetGalleryQuery();
  const [createImage, { isLoading: isCreating }] =
    useCreateGalleryImageMutation();
  const [deleteImage] = useDeleteGalleryImageMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const images = Array.isArray(rawImages) ? rawImages : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Residential");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openModal = () => {
    setCaption("");
    setCategory("Residential");
    setImageUrl("");
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalUrl = imageUrl.trim();

    // If user selected a file, upload to Cloudinary first
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await uploadImage(formData).unwrap();
        finalUrl = res.url;
      } catch (err: any) {
        console.error("Upload error", err);
        toast.error(
          err?.data?.message || "Failed to upload image file to server.",
        );
        return;
      }
    }

    if (!finalUrl) {
      toast.error("Please provide an image URL or choose a file to upload.");
      return;
    }

    try {
      await createImage({
        imageUrl: finalUrl,
        caption: caption.trim() || undefined,
        category,
      }).unwrap();
      toast.success("Image added to gallery!");
      closeModal();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save gallery item.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteImage(id).unwrap();
      toast.success("Image deleted.");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete image.");
    }
  };

  if (isLoading) {
    return <div className="text-offYellow p-8">Loading gallery...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-barlow font-bold uppercase tracking-wide text-white">
            Gallery Management
          </h1>
          <p className="text-offYellow mt-1">
            Showcase your completed moves, crew, and equipment.
          </p>
        </div>
        <CommonButton onClick={openModal}>
          <ImagePlus className="w-4 h-4 mr-2 inline" /> Add Photo
        </CommonButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => {
          const imageId = image.id || image._id || "";
          const displayUrl = image.imageUrl || image.url || "";

          return (
            <div
              key={imageId}
              className="bg-[#0d1e33] border border-border rounded-xl overflow-hidden group shadow-md"
            >
              <div className="aspect-square relative overflow-hidden bg-[#071425]">
                {displayUrl ? (
                  <img
                    src={displayUrl}
                    alt={image.caption || "Gallery item"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-offYellow/50">
                    No image URL
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(imageId)}
                    className="bg-red-500 text-white p-2.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-[#f0c03e] uppercase font-bold tracking-wider block mb-1">
                  {image.category || "Uncategorized"}
                </span>
                <p
                  className="text-white text-sm truncate"
                  title={image.caption}
                >
                  {image.caption || "No caption"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16 bg-[#0d1e33] rounded-xl border border-border text-offYellow">
          No photos in gallery yet. Click &quot;Add Photo&quot; above to
          showcase your work!
        </div>
      )}

      {/* Upload/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="bg-[#0d1e33] border border-border rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-[#071425]">
              <h2 className="text-xl font-barlow font-bold uppercase tracking-wider text-white">
                Add Photo to Gallery
              </h2>
              <button
                onClick={closeModal}
                className="text-offYellow hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Caption / Description (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. 3-Bedroom Move in Scottsdale"
                  className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Image File Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-offYellow file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:uppercase file:bg-yellow file:text-black hover:file:bg-yellow/90 file:cursor-pointer"
                />
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-xs uppercase text-offYellow/50 font-bold">
                  Or provide image URL
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Direct Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm rounded text-offYellow hover:bg-[#071425] transition-colors"
                >
                  Cancel
                </button>
                <CommonButton
                  type="submit"
                  size="md"
                  disabled={isUploading || isCreating}
                >
                  {isUploading ? (
                    <UploadCloud className="w-4 h-4 mr-1 inline animate-pulse" />
                  ) : (
                    <Check className="w-4 h-4 mr-1 inline" />
                  )}
                  {isUploading
                    ? "Uploading..."
                    : isCreating
                      ? "Saving..."
                      : "Add to Gallery"}
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
