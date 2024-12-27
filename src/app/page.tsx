"use client";

import Image from "next/image";
import logo from "@/assets/Vtube.svg";
import SearchInput from "@/components/header/SearchInput";
import { useEffect, useState } from "react";

export default function Home() {
  const [sm, setSm] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setSm(window.matchMedia("(max-width: 650px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`transition-all duration-200 flex items-center gap-6 flex-col h-[calc(100vh_-_80px_-_5rem)] p-5`}
      style={{ paddingTop: "calc(50vh - 270px)" }}
    >
      <Image
        width={sm ? 150 : 200}
        src={logo}
        alt="vtube-logo"
        className="mt-5"
      />
      <div className={`text-2xl font-medium `}>
        مرجع تمامی ویدیو‌های یوتویوب
      </div>
      <SearchInput md={true} />
    </div>
  );
}
