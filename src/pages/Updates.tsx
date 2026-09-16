import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CommonWrapper from "../components/shared/CommonWrapper";
import CommonSpace from "../components/shared/space/CommonSpace";
import { useGetPostsQuery } from "../store/posts/postsApi";
import { format } from "date-fns";
import { Heart, MessageSquare } from "lucide-react";

const Updates = () => {
  const { data: rawPosts = [], isLoading } = useGetPostsQuery();

  const posts = Array.isArray(rawPosts) ? rawPosts : [];
  const publishedPosts = posts.filter(post => post.isPublished ?? (post.status === "Published"));

  return (
    <div className="bg-[#071425] min-h-screen pt-20">
      <CommonSpace>
        <CommonWrapper>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-barlow text-white uppercase tracking-wider mb-4">
              News &amp; Updates
            </h1>
            <p className="text-offYellow max-w-2xl mx-auto">
              Stay informed with the latest tips, news, and updates from AAAAAffordable Moving.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64 text-offYellow">
              Loading posts...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.map((post, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={post.id || post._id}
                  className="bg-[#0d1e33] rounded-xl overflow-hidden border border-border hover:border-[#f0c03e] transition-colors duration-300 flex flex-col"
                >
                  <Link to={`/updates/${post.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#071425]">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-offYellow/50">
                        No Image
                      </div>
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[#f0c03e] text-sm font-semibold mb-2 block">
                      {format(new Date(post.createdAt), "MMM dd, yyyy")}
                    </span>
                    <Link to={`/updates/${post.slug}`}>
                      <h3 className="text-xl font-bold text-white mb-3 hover:text-[#f0c03e] transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-offYellow text-sm flex-grow mb-4">
                      {post.content.length > 100
                        ? post.content.substring(0, 100) + "..."
                        : post.content}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <Link
                        to={`/updates/${post.slug}`}
                        className="text-[#f0c03e] font-semibold text-sm hover:underline inline-flex items-center"
                      >
                        Read More &rarr;
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-offYellow/70">
                        <span className="inline-flex items-center gap-1" title="Likes">
                          <Heart className="w-3.5 h-3.5 text-rose-400" />
                          {post.likesCount || 0}
                        </span>
                        <span className="inline-flex items-center gap-1" title="Comments">
                          <MessageSquare className="w-3.5 h-3.5 text-[#f0c03e]" />
                          {(post as any)._count?.comments ?? post.comments?.length ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CommonWrapper>
      </CommonSpace>
    </div>
  );
};

export default Updates;
