import { Tab, Tabs } from "@nextui-org/tabs";
import { Dispatch, Key, SetStateAction } from "react";

export default function TypeTab({
  setType,
}: {
  setType: Dispatch<SetStateAction<Key>>;
}) {
  return (
    <div className="relative my-3">
      <div className="w-[200px]">
        <Tabs
          variant="underlined"
          aria-label="Tabs variants"
          onSelectionChange={(key: React.Key) => {
            setType(key);
          }}
        >
          <Tab key="videos" title="ویدیو ها" />
          <Tab key="shorts" title="ویدیو های کوتاه" />
        </Tabs>
      </div>
      <div className="absolute top-9 w-full border-b border-[#333333]"></div>
    </div>
  );
}
