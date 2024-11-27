"use client";

import { useState, useRef, useEffect } from "react";

function VideoDescription({ desc }: { desc: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descRef.current) {
      setShowButton(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
  }, [desc]);

  return (
    <div className="py-4">
      <div className="w-full px-6 py-4 bg-custom-gray rounded-xl">
        <div className="relative">
          <p
            ref={descRef}
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-full" : "max-h-[4.5em]"
            }`}
            dir="auto"
          >
            {desc}
          </p>
          {showButton && !isExpanded && (
            <div className="absolute bottom-0 right-0 bg-custom-gray pl-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                بیشتر...
              </button>
            </div>
          )}
        </div>
        {showButton && isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            نمایش کمتر
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoDescription;
