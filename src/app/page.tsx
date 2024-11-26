import Image from "next/image";
import logo from "@/assets/Vtube.svg";
import SearchInput from "@/components/header/SearchInput";

export default async function Home() {
  return (
    <div
      className={`transition-all duration-200 flex items-center gap-6 flex-col h-[calc(100vh_-_80px_-_5rem)] p-5 `}
    >
      <Image src={logo} alt="vtube-logo" className="mt-5" />

      <div className={`text-2xl font-medium `}>
        مرجع تمامی ویدیو‌های یوتویوب
      </div>
      <SearchInput />
    </div>
  );
}
