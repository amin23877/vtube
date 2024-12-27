import Loading from "../Loading";

function LoadingBadge() {
  return (
    <div className="flex justify-center items-center gap-2 px-4 py-2 bg-custom-gray rounded-full">
      <Loading />

      <span dir="ltr">در حال دانلود</span>
    </div>
  );
}

export default LoadingBadge;
