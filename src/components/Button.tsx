"use client";
import { CSSProperties } from "react";

export default function Button({
  children,
  className,
  style,
  border,
  color,
  bgcolor,
  padding,
  width,
  height,
  radius,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  border?: boolean;
  color?: string;
  bgcolor?: string;
  padding?: string;
  width?: string;
  radius?: string;
  height?: string;
}) {
  return (
    <button
      className={className}
      style={{
        borderRadius: radius || "8px",
        border: border ? `1px solid ${color || "#fff"}` : "0",
        color: color || "#fff",
        backgroundColor: bgcolor || "#ffffff00",
        padding: padding ? padding : border ? "11px 0" : "12px 0",
        width: width || "190px",
        height: height || "fit-content",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
