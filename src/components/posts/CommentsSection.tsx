import React, { useState } from "react";
import { format } from "date-fns";
import { MessageSquare, CornerDownRight, Send, X, User } from "lucide-react";
import { toast } from "react-toastify";
import { useAddCommentMutation, type Comment } from "../../store/posts/postsApi";

interface CommentsSectionProps {
  postId: string;
  comments?: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  comments = [],
}) => {
  const [addComment, { isLoading: isSubmitting }] = useAddCommentMutation();

  // Saved author name in localStorage for convenience
  const storedAuthor =
    typeof window !== "undefined"
      ? localStorage.getItem("comment_author_name") || ""
      : "";

  // Main comment form state
  const [mainAuthor, setMainAuthor] = useState(storedAuthor);
  const [mainContent, setMainContent] = useState("");

  // Replying state: parentId where the inline reply form is open
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = useState(storedAuthor);
  const [replyContent, setReplyContent] = useState("");

  // Count total comments including nested replies
  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + (comment.replies?.length || 0),
    0
  );

  const handleMainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainAuthor.trim() || !mainContent.trim()) {
      toast.error("Please provide both your name and a comment.");
      return;
    }

    try {
      localStorage.setItem("comment_author_name", mainAuthor.trim());
      await addComment({
        postId,
        author: mainAuthor.trim(),
        content: mainContent.trim(),
      }).unwrap();

      toast.success("Comment posted!");
      setMainContent("");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to post comment.");
    }
  };

  const handleReplySubmit = async (parentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyAuthor.trim() || !replyContent.trim()) {
      toast.error("Please provide both your name and reply.");
      return;
    }

    try {
      localStorage.setItem("comment_author_name", replyAuthor.trim());
      await addComment({
        postId,
        parentId,
        author: replyAuthor.trim(),
        content: replyContent.trim(),
      }).unwrap();

      toast.success("Reply posted!");
      setReplyContent("");
      setReplyingToId(null);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to post reply.");
    }
  };

  return (
    <div className="mt-14 pt-10 border-t border-border">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-[#f0c03e]" />
        <h3 className="text-2xl font-barlow font-bold uppercase tracking-wider text-white">
          Comments ({totalComments})
        </h3>
      </div>

      {/* Main Comment Form */}
      <form
        onSubmit={handleMainSubmit}
        className="bg-[#0d1e33] border border-border rounded-xl p-6 mb-10 shadow-lg"
      >
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
          Leave a comment
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              maxLength={60}
              value={mainAuthor}
              onChange={(e) => {
                setMainAuthor(e.target.value);
                setReplyAuthor(e.target.value);
              }}
              placeholder="e.g. John Doe"
              className="w-full sm:w-80 rounded bg-[#071425] border border-yellow/20 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-offYellow mb-1">
              Comment *
            </label>
            <textarea
              required
              rows={4}
              maxLength={2000}
              value={mainContent}
              onChange={(e) => setMainContent(e.target.value)}
              placeholder="Join the discussion..."
              className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#f0c03e] hover:bg-[#d9ab32] text-[#071425] font-bold text-sm tracking-wider uppercase transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-10 bg-[#0d1e33]/50 rounded-xl border border-border text-offYellow">
            Be the first to leave a comment on this post!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#0d1e33] border border-border rounded-xl p-5 sm:p-6 shadow-md"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0c03e]/10 border border-[#f0c03e]/30 flex items-center justify-center text-[#f0c03e] font-bold text-sm">
                    {comment.author.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-tight">
                      {comment.author}
                    </h5>
                    <span className="text-xs text-offYellow/60">
                      {comment.createdAt
                        ? format(new Date(comment.createdAt), "MMM dd, yyyy · h:mm a")
                        : ""}
                    </span>
                  </div>
                </div>

                {/* Reply Trigger Button */}
                <button
                  onClick={() => {
                    if (replyingToId === comment.id) {
                      setReplyingToId(null);
                    } else {
                      setReplyingToId(comment.id);
                      setReplyContent("");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold text-offYellow hover:text-[#f0c03e] hover:bg-[#071425] transition-colors border border-transparent hover:border-yellow/20"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  Reply
                </button>
              </div>

              {/* Comment Body */}
              <p className="text-sm text-offYellow leading-relaxed whitespace-pre-wrap pl-12">
                {comment.content}
              </p>

              {/* Inline Reply Form */}
              {replyingToId === comment.id && (
                <form
                  onSubmit={(e) => handleReplySubmit(comment.id, e)}
                  className="mt-4 ml-8 sm:ml-12 p-4 bg-[#071425] border border-yellow/30 rounded-lg space-y-3 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#f0c03e]">
                      Replying to {comment.author}
                    </span>
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="text-offYellow hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      placeholder="Your name"
                      className="w-full sm:w-64 rounded bg-[#0d1e33] border border-yellow/20 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-yellow focus:outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={2}
                      maxLength={2000}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      className="w-full rounded bg-[#0d1e33] border border-yellow/20 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-yellow focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="px-3 py-1.5 text-xs rounded text-offYellow hover:bg-[#0d1e33]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#f0c03e] hover:bg-[#d9ab32] text-[#071425] font-bold text-xs uppercase transition-all disabled:opacity-50"
                    >
                      <Send className="w-3 h-3" />
                      {isSubmitting ? "Submitting..." : "Submit Reply"}
                    </button>
                  </div>
                </form>
              )}

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-6 sm:ml-12 pl-4 sm:pl-6 border-l-2 border-[#f0c03e]/40 space-y-4 pt-2">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-[#071425]/60 border border-border/80 rounded-lg p-3.5"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="w-7 h-7 rounded-full bg-[#f0c03e]/20 border border-[#f0c03e]/30 flex items-center justify-center text-[#f0c03e] font-bold text-xs">
                          {reply.author.charAt(0).toUpperCase() || "R"}
                        </div>
                        <div>
                          <h6 className="text-xs font-bold text-white leading-tight">
                            {reply.author}
                          </h6>
                          <span className="text-[10px] text-offYellow/60">
                            {reply.createdAt
                              ? format(new Date(reply.createdAt), "MMM dd, yyyy · h:mm a")
                              : ""}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-offYellow leading-relaxed whitespace-pre-wrap pl-9">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
