"use client";
export default function ShadowBox({ children }: { children: React.ReactNode }) {
  return <div className='m-40 shadowBox rounded-3xl'>{children}</div>;
}
