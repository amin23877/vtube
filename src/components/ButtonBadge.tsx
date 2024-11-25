"use client";

import React, { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Loading from "./Loading";

function ButtonBadge({
  title,
  icon,
  hoverIcon,
  onClick,
  disabled,
}: {
  title: string;
  icon: StaticImport;
  hoverIcon?: StaticImport;
  onClick: () => void;
  disabled: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!disabled) setIsHovered(false);
  };

  return (
    <div
      className={
        "flex justify-center items-center gap-2 px-4 py-2 bg-gray rounded-full text-white " +
        `${
          !disabled ? "cursor-pointer hover:bg-[#F1D815] hover:text-gray" : ""
        }`
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {!disabled ? (
        <Image
          src={!disabled && isHovered && hoverIcon ? hoverIcon : icon}
          alt=""
          width={24}
          height={24}
        />
      ) : (
        <div className="relative w-[30px] h-[25px]">
          <Loading />
        </div>
      )}
      {title}
    </div>
  );
}

export default ButtonBadge;
