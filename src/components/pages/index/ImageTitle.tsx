"use client";

import Image from "next/image";
import arrowLeftIcon from "@/assets/arrow-left.svg";
import { MouseEventHandler } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ImageTitle({
  title,
  image,
  onClick,
}: {
  title: string;
  image: string | StaticImport;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className='flex gap-4 items-center mb-4 mr-[52px] cursor-pointer'
      onClick={onClick}>
      <Image
        className='rounded-full overflow-hidden'
        src={image}
        alt=''
        width={52}
        height={52}
      />
      <h2 className='ml-4 text-white text-2xl'>{title}</h2>
      <Image src={arrowLeftIcon} alt='arrow-left' />
    </div>
  );
}
