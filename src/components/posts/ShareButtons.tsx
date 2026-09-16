import React, { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "react-toastify";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=500"
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs uppercase tracking-wider font-semibold text-offYellow/80 flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5 text-[#f0c03e]" /> Share:
      </span>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071425] border border-yellow/20 hover:border-yellow text-xs font-semibold text-offYellow hover:text-white transition-all shadow-sm cursor-pointer"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Facebook */}
      <button
        onClick={handleShareFacebook}
        className="p-2 rounded-lg bg-[#071425] border border-yellow/20 hover:border-yellow text-offYellow hover:text-[#1877F2] transition-all shadow-sm cursor-pointer flex items-center justify-center"
        title="Share on Facebook"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* X (Twitter) */}
      <button
        onClick={handleShareTwitter}
        className="px-2.5 py-1.5 rounded-lg bg-[#071425] border border-yellow/20 hover:border-yellow text-offYellow hover:text-white transition-all shadow-sm text-xs font-bold font-mono cursor-pointer flex items-center"
        title="Share on X (Twitter)"
      >
        𝕏
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleShareLinkedIn}
        className="p-2 rounded-lg bg-[#071425] border border-yellow/20 hover:border-yellow text-offYellow hover:text-[#0A66C2] transition-all shadow-sm cursor-pointer flex items-center justify-center"
        title="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </button>
    </div>
  );
};
