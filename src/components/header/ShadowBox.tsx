"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function ShadowBox({
  children,
  src,
}: {
  children: React.ReactNode;
  src?: string | StaticImport;
}) {
  return (
    <div className='m-10 mt-0 rounded-b-3xl overflow-hidden bg-gray-400 bg-opacity-5'>
      {src && (
        <Image
          style={{
            position: "absolute",
            top: "40px",
            width: "calc(100% - 80px)",
            right: "40px",
            height: "auto",
            zIndex: "",
            opacity: "0.5",
          }}
          src={src}
          width={5000}
          alt=''
        />
      )}
      <div className='shadowBox'>{children}</div>
    </div>
  );
}
