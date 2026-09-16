import { useState } from "react";
import { motion } from "framer-motion";
import CommonWrapper from "../components/shared/CommonWrapper";
import CommonSpace from "../components/shared/space/CommonSpace";
import { useGetGalleryQuery } from "../store/gallery/galleryApi";

const categories = ["All", "Residential", "Commercial", "Packing", "Storage"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: rawImages = [], isLoading } = useGetGalleryQuery(
    selectedCategory === "All" ? undefined : selectedCategory
  );

  const images = Array.isArray(rawImages) ? rawImages : [];

  return (
    <div className="bg-[#071425] min-h-screen pt-20">
      <CommonSpace>
      <CommonWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-barlow text-white uppercase tracking-wider mb-4">
            Our Work
          </h1>
          <p className="text-offYellow max-w-2xl mx-auto">
            Take a look at our recent moving and packing projects across Phoenix.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === category
                  ? "border-[#f0c03e] bg-[#f0c03e] text-[#071425] font-semibold"
                  : "border-border text-offYellow hover:border-[#f0c03e] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-offYellow">
            Loading...
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {images.map((image) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={image.id || image._id}
                className="relative group overflow-hidden rounded-lg aspect-square bg-[#0d1e33]"
              >
                <img
                  src={image.imageUrl || image.url}
                  alt={image.caption || "Gallery image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    {image.category && (
                      <span className="text-[#f0c03e] text-sm uppercase font-semibold tracking-wider mb-2 block">
                        {image.category}
                      </span>
                    )}
                    {image.caption && (
                      <p className="text-white text-lg">{image.caption}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CommonWrapper>
      </CommonSpace>
    </div>
  );
};

export default Gallery;
