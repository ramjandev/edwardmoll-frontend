import type { FC } from "react";

const NotFound: FC = () => {
  return (
    <main className="min-h-screen bg-[#071425] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        {/* 404 Number */}
        <div className="relative inline-block">
          <h1
            className="
              text-[140px]
              sm:text-[180px]
              md:text-[220px]
              font-black
              leading-none
              tracking-tighter
              text-[#e0af3b]
            "
          >
            404
          </h1>

          {/* Yellow underline */}
          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              bottom-2
              w-20
              h-1
              rounded-full
              bg-[#f2c33f]
            "
          />
        </div>

        {/* Title */}
        <h2
          className="
            mt-8
            text-3xl
            sm:text-4xl
            font-bold
            text-white
          "
        >
          Page Not Found
        </h2>

        {/* Description */}
        <p
          className="
            mt-4
            max-w-lg
            mx-auto
            text-base
            sm:text-lg
            leading-relaxed
            text-[#bcb7a9]
          "
        >
          Sorry, the page you are looking for doesn't exist or may have been
          moved to another location.
        </p>

        {/* Actions */}
        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-4
          "
        >
          {/* Home */}
          <a
            href="/"
            className="
              w-full
              sm:w-auto
              min-w-[150px]
              px-6
              py-3
              rounded-lg
              bg-[#e0af3b]
              border
              border-[#e0af3b]
              text-[#071425]
              font-semibold
              transition-all
              duration-300
              hover:bg-[#f2c33f]
              hover:border-[#f2c33f]
              hover:-translate-y-0.5
            "
          >
            Go Home
          </a>

          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              w-full
              sm:w-auto
              min-w-[150px]
              px-6
              py-3
              rounded-lg
              bg-transparent
              border
              border-[#e0af3b]
              text-[#e0af3b]
              font-semibold
              transition-all
              duration-300
              hover:bg-[#e0af3b]
              hover:text-[#071425]
              hover:-translate-y-0.5
            "
          >
            Go Back
          </button>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#e0af3b]/40" />

          <span
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#bcb7a9]
            "
          >
            Error 404
          </span>

          <span className="h-px w-12 bg-[#e0af3b]/40" />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
