import { numberFormatter } from "@/utils/numberHelper";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

function CountsBadge({
  count,
  icon,
}: {
  count: number | string;
  icon: StaticImport;
}) {
  return (
    <div className="flex justify-center items-center gap-2 px-4 py-2 bg-custom-gray rounded-full">
      <Image src={icon} alt="" width={24} height={24} />
      <span dir="ltr">
        {typeof count === "number" ? numberFormatter(count, 2) : count}
      </span>
    </div>
  );
}

export default CountsBadge;
