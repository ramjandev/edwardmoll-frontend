import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import CommonWrapper from "../components/shared/CommonWrapper";
import { useGetPostBySlugQuery, useLikePostMutation } from "../store/posts/postsApi";
import { ShareButtons } from "../components/posts/ShareButtons";
import { CommentsSection } from "../components/posts/CommentsSection";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useGetPostBySlugQuery(slug || "");
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();

  const postId = post?.id || post?._id || "";
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (postId) {
      setIsLiked(Boolean(localStorage.getItem(`liked_post_${postId}`)));
    }
  }, [postId]);

  const handleLike = async () => {
    if (!postId || isLiking) return;
    const nextAction = isLiked ? "unlike" : "like";
    try {
      if (isLiked) {
        localStorage.removeItem(`liked_post_${postId}`);
        setIsLiked(false);
      } else {
        localStorage.setItem(`liked_post_${postId}`, "true");
        setIsLiked(true);
      }
      await likePost({ id: postId, action: nextAction }).unwrap();
    } catch (err) {
      console.error("Like action failed", err);
      // Revert local state on error
      setIsLiked(!isLiked);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#071425] min-h-screen flex justify-center items-center text-offYellow pt-20">
        Loading post...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-[#071425] min-h-screen flex flex-col justify-center items-center text-white pt-20">
        <h2 className="text-2xl mb-4">Post not found</h2>
        <Link to="/updates" className="text-[#f0c03e] hover:underline">
          &larr; Back to Updates
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#071425] min-h-screen pt-24 pb-20">
      <CommonWrapper>
        <div className="max-w-4xl mx-auto">
          <Link
            to="/updates"
            className="inline-flex items-center text-offYellow hover:text-[#f0c03e] transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Updates
          </Link>

          {post.coverImage && (
            <div className="w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden mb-10 bg-[#0d1e33] border border-border">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <header className="mb-10 text-center">
            <span className="text-[#f0c03e] font-semibold tracking-widest uppercase text-sm mb-4 block">
              {format(new Date(post.createdAt), "MMMM dd, yyyy")}
            </span>
            <h1 className="text-3xl md:text-5xl font-barlow text-white uppercase tracking-wide leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none text-offYellow">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Engagement Bar (Like & Share) */}
          <div className="mt-12 py-4 px-6 rounded-xl bg-[#0d1e33] border border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer ${
                isLiked
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-rose-500/20 shadow-md"
                  : "bg-[#071425] text-offYellow hover:text-white hover:bg-rose-500/10 border border-yellow/20"
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-transform active:scale-125 duration-150 ${
                  isLiked ? "fill-rose-500 text-rose-500" : "text-offYellow group-hover:text-rose-400"
                }`}
              />
              <span>{post.likesCount || 0}</span>
              <span className="text-xs font-normal opacity-70">
                {post.likesCount === 1 ? "Like" : "Likes"}
              </span>
            </button>

            {/* Share Buttons */}
            <ShareButtons title={post.title} />
          </div>

          {/* Comments & Replies Thread */}
          <CommentsSection postId={postId} comments={post.comments} />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default PostDetail;
