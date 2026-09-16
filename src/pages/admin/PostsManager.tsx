import { format } from "date-fns";
import { Check, Edit2, ExternalLink, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CommonButton from "../../components/shared/button/CommonButton";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
  type Post,
} from "../../store/posts/postsApi";
import { useUploadImageMutation } from "../../store/upload/uploadApi";

const PostsManager = () => {
  const { data: rawPosts = [], isLoading } = useGetAllPostsQuery();
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const posts = Array.isArray(rawPosts) ? rawPosts : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCoverImage("");
    clearFile();
    setIsPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (post: Post) => {
    setEditingId(post.id || post._id || "");
    setTitle(post.title || "");
    setContent(post.content || "");
    setCoverImage(post.coverImage || "");
    clearFile();
    setIsPublished(post.isPublished ?? post.status === "Published");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    clearFile();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please provide both title and content.");
      return;
    }

    let finalCoverImage = coverImage.trim() || undefined;

    // If a file was selected from the user's local machine, upload via FormData first
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await uploadImage(formData).unwrap();
        finalCoverImage = res.url;
      } catch (err: any) {
        console.error("Upload error:", err);
        toast.error(
          err?.data?.message || "Failed to upload image file to server.",
        );
        return;
      }
    }

    try {
      if (editingId) {
        await updatePost({
          id: editingId,
          data: {
            title: title.trim(),
            content: content.trim(),
            coverImage: finalCoverImage,
            isPublished,
          },
        }).unwrap();
        toast.success("Post updated successfully!");
      } else {
        await createPost({
          title: title.trim(),
          content: content.trim(),
          coverImage: finalCoverImage,
          isPublished,
        }).unwrap();
        toast.success("Post created successfully!");
      }
      closeModal();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save post.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id).unwrap();
      toast.success("Post deleted.");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete post.");
    }
  };

  if (isLoading) {
    return <div className="text-offYellow p-8">Loading posts...</div>;
  }

  return (
    <div className="p-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-barlow font-bold uppercase tracking-wide text-white">
            Posts & Updates
          </h1>
          <p className="text-offYellow mt-1">
            Publish news, company updates, and moving advice articles.
          </p>
        </div>
        <CommonButton onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2 inline" /> New Post
        </CommonButton>
      </div>

      <div className="bg-[#0d1e33] rounded-xl border border-border overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-offYellow">
            <thead className="bg-[#071425] text-white uppercase font-barlow tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const postId = post.id || post._id || "";
                const isPub = post.isPublished ?? post.status === "Published";

                return (
                  <tr
                    key={postId}
                    className="border-b border-border hover:bg-[#071425]/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">
                        {post.title}
                      </div>
                      <div className="text-xs text-offYellow/60 font-mono mt-0.5">
                        /updates/{post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isPub
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {isPub ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {post.createdAt
                        ? format(new Date(post.createdAt), "MMM dd, yyyy")
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {isPub && post.slug ? (
                        <Link
                          to={`/updates/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-yellow hover:underline"
                        >
                          View Live <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-500">
                          Draft only
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                        title="Edit Post"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(postId)}
                        className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {posts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-offYellow"
                  >
                    No posts yet. Click &quot;New Post&quot; above to create
                    one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="bg-[#0d1e33] border border-border rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-[#071425]">
              <h2 className="text-xl font-barlow font-bold uppercase tracking-wider text-white">
                {editingId ? "Edit Post" : "Create New Post"}
              </h2>
              <button
                onClick={closeModal}
                className="text-offYellow hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 overflow-y-auto flex-1"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Post Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 5 Tips for a Stress-Free Move in Phoenix"
                  className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                />
              </div>

              {/* Cover Image Upload (Local Device) + Direct URL */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow">
                  Cover Image (Optional)
                </label>

                {/* Upload from Local Machine */}
                <div>
                  <label className="block text-xs text-offYellow/80 mb-1">
                    Upload from local device
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-offYellow file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:uppercase file:bg-yellow file:text-black hover:file:bg-yellow/90 file:cursor-pointer bg-[#071425] p-2 rounded border border-yellow/20"
                  />
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-4 text-xs uppercase text-offYellow/50 font-bold">
                    Or provide image URL
                  </span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    disabled={!!selectedFile}
                    className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow disabled:opacity-50"
                  />
                  {selectedFile && (
                    <p className="text-xs text-yellow mt-1">
                      Local file selected: <strong>{selectedFile.name}</strong>.{" "}
                      <button
                        type="button"
                        onClick={clearFile}
                        className="underline hover:text-white ml-1"
                      >
                        Remove file to enter URL instead
                      </button>
                    </p>
                  )}
                </div>

                {/* Cover Image Preview */}
                {(filePreview || coverImage) && (
                  <div className="mt-2 flex items-center gap-3 p-2 rounded bg-[#071425] border border-border">
                    <div className="w-16 h-16 rounded overflow-hidden bg-black/40 flex-shrink-0 border border-border">
                      <img
                        src={filePreview || coverImage}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="text-xs text-offYellow flex-1">
                      <div className="font-semibold text-white">Cover Image Preview</div>
                      <div className="text-offYellow/70 truncate max-w-xs">
                        {selectedFile ? selectedFile.name : coverImage}
                      </div>
                    </div>
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={clearFile}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                        title="Remove local file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
                  Content / Article Body *
                </label>
                <textarea
                  required
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your update or article text here..."
                  className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPublishedToggle"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-yellow focus:ring-yellow"
                />
                <label
                  htmlFor="isPublishedToggle"
                  className="text-sm font-semibold text-white cursor-pointer select-none"
                >
                  Publish Immediately (Visible on public /updates page)
                </label>
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
                  disabled={isCreating || isUpdating || isUploading}
                >
                  <Check className="w-4 h-4 mr-1 inline" />
                  {isUploading
                    ? "Uploading Image..."
                    : isCreating || isUpdating
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Publish Post"}
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsManager;
