import Loading from "../Loading";

function LoadingBadge() {
  return (
    <div className="flex justify-center items-center gap-2 px-4 py-2 bg-custom-gray rounded-full">
      <div className="relative w-[30px] h-[25px] mx-auto my-2">
        <Loading />
      </div>

      <span dir="ltr">در حال دانلود</span>
    </div>
  );
}

export default LoadingBadge;
