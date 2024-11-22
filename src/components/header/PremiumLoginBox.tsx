"use client";
import Button from "../Button";

export default function PremiumLoginBox({ display }: { display: boolean }) {
  return (
    <div className={`flex gap-4 px-[52px] ${display ? "pt-4" : "pt-4"} pb-4`}>
      <Button border>خرید اشتراک</Button>
      <Button bgcolor='#2F3136'>ورود / ثبت نام</Button>
    </div>
  );
}
