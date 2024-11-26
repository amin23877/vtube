"use client";
import { ReactNode, useEffect, useState } from "react";

import Image from "next/image";
import logo from "@/assets/Vtube.svg";
import SearchInput from "@/components/header/SearchInput";
import PremiumLoginBox from "@/components/header/PremiumLoginBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AppBar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState(pathname === "/" ? false : true);
  const [display, setDisplay] = useState(pathname === "/" ? false : true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setMode(true);
        setTimeout(() => setDisplay(true), 200);
      }
    };

    handleScroll();

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setMode(true);
      setTimeout(() => setDisplay(true), 200);
    }
  }, [pathname, mode]);

  useEffect(() => {
    if (pathname === "/") {
      setMode(false);
      setDisplay(false);
    } else {
      setMode(true);
      setDisplay(true);
    }
  }, [pathname]);

  return (
    <div
      style={{
        backgroundImage: pathname === "/" ? "url('/background.png')" : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        className={`transition-all duration-200 sticky top-0 z-[1] m-10 mb-0 bg-gray-400 bg-opacity-[0.10] shadowBox ${
          mode ? "" : "rounded-t-3xl"
        }`}
      >
        <div
          className={`flex items-center ${
            mode ? "justify-evenly bg-[#191A1B]" : "justify-end"
          }`}
        >
          <div
            onClick={() => router.push("/")}
            className={`cursor-pointer ${mode ? "" : "hidden"} ${
              display
                ? "opacity-100 translate-x-0 mt-4"
                : "opacity-0 translate-x-[-20px] mt-8"
            } mb-4 mx-[52px] min-w-[116px] transition-all duration-200`}
          >
            <Image
              className="w-[116px]"
              src={logo}
              width={116}
              alt="vtube-logo"
            />
          </div>
          <div
            className={`${mode ? "" : "hidden"} ${
              display
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-20px] mt-2"
            }mt-[15px] w-full transition-all duration-200`}
          >
            <SearchInput />
          </div>
          <PremiumLoginBox display={display} />
        </div>
        {/* <div
          className={`transition-all duration-200 flex items-center gap-6 flex-col  ${
            display ? "hidden" : ""
          } ${
            mode
              ? "opacity-0 translate-y-[-20px] h-0"
              : "h-[calc(100vh_-_80px_-_5rem)]"
          }`}
        >
          <div
            className="cursor-pointer mt-10 ml-2"
            onClick={() => router.push("/")}
          >
            <Image src={logo} alt="vtube-logo" />
          </div>
          <div className={`text-2xl font-medium ${display ? "hidden" : ""}`}>
            مرجع تمامی ویدیو‌های یوتویوب
          </div>
          <SearchInput />
        </div> */}
      </div>
      <div className="m-10 mt-0 rounded-b-3xl overflow-hidden bg-gray-400 bg-opacity-10">
        <div className="shadowBox">{children}</div>
      </div>
    </div>
  );
}
