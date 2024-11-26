"use client";
import Image from "next/image";
import Button from "../Button";
import crownIcon from "@/assets/appBar/crown.svg";
import userEditIcon from "@/assets/appBar/user-edit.svg";

export default function PremiumLoginBox({
  display,
  md,
}: {
  display: boolean;
  md: boolean;
}) {
  return (
    <div
      className={`flex gap-4 ${md ? "px-[16px]" : "px-[52px]"} ${
        display ? "pt-4" : "pt-4"
      } pb-4`}
    >
      <Button
        width={md ? "fit-content" : undefined}
        border
        padding={md ? "11px" : undefined}
        radius={md ? "100%" : ""}
      >
        {md ? (
          <Image
            src={crownIcon}
            alt=""
            width={20}
            height={20}
            style={{ minWidth: "20px" }}
          />
        ) : (
          "خرید اشتراک"
        )}
      </Button>
      <Button
        width={md ? "fit-content" : undefined}
        bgcolor="#2F3136"
        padding={md ? "11px" : undefined}
        radius={md ? "100%" : ""}
      >
        {md ? (
          <Image
            src={userEditIcon}
            alt=""
            width={20}
            height={20}
            style={{ minWidth: "20px" }}
          />
        ) : (
          "ورود / ثبت نام"
        )}
      </Button>
    </div>
  );
}
