"use client";

import { useEffect, useRef, useState } from "react";
import searchIcon from "@/assets/search.svg";
import Image from "next/image";
import useSWR from "swr";
import { search } from "@/api/list";
import { useParams, usePathname, useRouter } from "next/navigation";

const SearchInput = ({ md }: { md: boolean }) => {
  const pathname = usePathname();

  const { query } = useParams();
  const [queryValue, setQueryValue] = useState<string>((query as string) || "");
  const [delayedValue, setDelayedValue] = useState(query || "");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { data, mutate } = useSWR(delayedValue, search);
  const results = data?.top_related_searchs || [];
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/") {
      setQueryValue("");
      setDelayedValue("");
    }
  }, [pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results?.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = (prev + 1) % results.length;
          scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = (prev - 1 + results.length) % results.length;
          scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0) {
          const select = results[selectedIndex];
          router.push(`/search/${select}`);
          setQueryValue(select);
          inputRef.current?.blur();
        } else {
          router.push(`/search/${queryValue}`);
          inputRef.current?.blur();
        }
      }
    } else {
      if (e.key === "Enter" && queryValue.trim() !== "") {
        e.preventDefault();
        router.push(`/search/${queryValue}`);
        inputRef.current?.blur();
      }
    }
  };

  const scrollToItem = (index: number) => {
    if (!listRef.current) return;
    const item = listRef.current.children[index] as HTMLElement;
    const container = listRef.current;

    if (item) {
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      const itemTop = item.offsetTop - container.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;

      if (itemTop < containerTop) {
        container.scrollTop = itemTop - 8;
      } else if (itemBottom > containerBottom) {
        container.scrollTop = itemBottom - container.clientHeight + 8;
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false); // Add a small delay to allow item clicks
    }, 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQueryValue(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedValue(queryValue);
    }, 300); // Debounce delay of 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [queryValue, mutate]);

  return (
    <div className="relative w-full max-w-screen-sm min-h-[50px]">
      {/* Search Input */}
      <div className="absolute z-[2] w-full bg-[#2F3136] rounded-md border border-[#808184]">
        <div className={`py-3 flex items-center gap-4 ${md ? "px-4" : "px-8"}`}>
          <Image src={searchIcon} alt="search-icon" />
          <input
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            placeholder="جستجو..."
            className="flex-grow bg-transparent outline-none"
            value={decodeURI(queryValue)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            dir={queryValue ? "auto" : "rtl"}
          />
        </div>

        {isFocused && results?.length > 0 && (
          <div ref={listRef} className="my-2 w-full max-h-80 overflow-auto">
            {results?.map((item: string, index: number) => (
              <div
                dir="auto"
                key={index}
                className={`flex gap-4 py-2 px-8 cursor-pointer ${
                  selectedIndex === index ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  router.push(`/search/${item}`);
                  setQueryValue(item);
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image
                    src={searchIcon}
                    alt="search-icon-small"
                    width={16}
                    height={16}
                  />
                </div>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
