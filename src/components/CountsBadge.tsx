import { numberFormatter } from "@/utils/numberHelper";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

function CountsBadge({ count, icon }: { count: number; icon: StaticImport }) {
  return (
    <div className="flex justify-center items-center gap-1 px-8 py-2 bg-gray rounded-full">
      <Image src={icon} alt="" width={24} height={24} />
      {numberFormatter(count, 2)}
    </div>
  );
}

export default CountsBadge;
