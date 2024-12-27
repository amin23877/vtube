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
  const [noHeader, setNoHeader] = useState<boolean>();
  const router = useRouter();
  const [md, setMd] = useState<boolean>(false);
  const [sm, setSm] = useState<boolean>(false);

  const noHeaderPages: string[] = ["/signIn", "/signUp", "/forgetPassword"];

  useEffect(() => {
    const handleResize = () => {
      setMd(window.matchMedia("(max-width: 1120px)").matches);
      setSm(window.matchMedia("(max-width: 650px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setMode(true);
        setTimeout(() => setDisplay(true), 200);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, mode]);

  useEffect(() => {
    if (pathname === "/") {
      setMode(false);
      setDisplay(false);
      setNoHeader(false);
    } else if (noHeaderPages.find((x) => x === pathname)) {
      setNoHeader(true);
    } else {
      setNoHeader(false);
      setMode(true);
      setDisplay(true);
    }
  }, [pathname]);

  if (noHeader)
    return (
      <div
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <div
          className="shadowBox bg-gray-400 bg-opacity-[0.10] rounded-3xl flex justify-center items-center"
          style={{
            width: "calc(100vw - 80px)",
            height: "calc(100vh - 80px)",
          }}
        >
          <div className="bg-[#2F3136] w-[450px] flex flex-col items-center rounded-[12px] px-6">
            <Image
              className="w-[156px] my-8"
              src={logo}
              width={156}
              alt="vtube-logo"
            />
            <div
              className="bg-[#849CA8] w-full mb-[36px] bg-opacity-[0.10] p-8 rounded-[12px]"
              style={{
                backdropFilter: "blur(40px)",
                boxShadow: "24px 4px 91px 0px #00000040",
              }}
            >
              {children}
            </div>
          </div>
        </div>{" "}
      </div>
    );

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
        className={`pt-10 max-h-screen sticky -top-10 z-[1] transition-all duration-200`}
      >
        <div
          className={`${
            sm ? "mx-4" : "mx-10"
          } bg-gray-400 bg-opacity-[0.10] shadowBox ${
            mode ? "" : "rounded-t-3xl"
          }`}
        >
          <div
            className={`flex items-center ${
              mode
                ? sm
                  ? "justify-between bg-[#191A1B]"
                  : "justify-evenly bg-[#191A1B]"
                : "justify-end"
            }`}
          >
            <div
              onClick={() => router.push("/")}
              className={`cursor-pointer ${mode ? "" : "hidden"} ${
                display
                  ? "opacity-100 translate-x-0 mt-4"
                  : "opacity-0 translate-x-[-20px] mt-8"
              } mb-4 ${
                md ? "mx-[16px]" : "mx-[52px]"
              } min-w-[116px] transition-all duration-200`}
            >
              <Image
                className="w-[116px]"
                src={logo}
                width={116}
                alt="vtube-logo"
              />
            </div>
            {!sm && (
              <div
                className={`${mode ? "" : "hidden"} ${
                  display
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-[-20px] mt-2"
                }mt-[15px] w-full transition-all duration-200`}
              >
                <SearchInput md={md} />
              </div>
            )}
            <PremiumLoginBox display={display} md={md} />
          </div>
          {pathname !== "/" && sm && (
            <div className="px-4 pb-4 bg-[#191A1B]">
              <SearchInput md={md} />
            </div>
          )}
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
      </div>
      <div
        className={`${
          sm ? "m-4" : "m-10"
        } mt-0 rounded-b-3xl bg-gray-400 bg-opacity-10`}
      >
        <div className="shadowBox">{children}</div>
      </div>
    </div>
  );
}
