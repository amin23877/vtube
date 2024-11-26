import CircleLoading from "@/components/Loading";

export default function Loading() {
  console.log("wtf");
  return (
    <div style={{ height: "calc(100vh - 100px - 2.5rem)" }}>
      <CircleLoading />
    </div>
  );
}
