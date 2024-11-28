"use client";

import React, { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

function ButtonBadge({
  title,
  icon,
  hoverIcon,
  onClick,
}: {
  title: string;
  icon: StaticImport;
  hoverIcon?: StaticImport;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={
        "flex justify-center items-center gap-2 px-4 py-2 bg-custom-gray rounded-full text-white cursor-pointer hover:bg-[#F1D815] hover:text-custom-gray"
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        onClick();
      }}
    >
      <Image
        src={isHovered && hoverIcon ? hoverIcon : icon}
        alt=""
        width={24}
        height={24}
      />

      {title}
    </div>
  );
}

export default ButtonBadge;
