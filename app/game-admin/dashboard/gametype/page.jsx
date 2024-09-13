import axios from "axios";
import GmTypeItem from "./GmTypeItem";
import AddGmType from "./AddGmType";
import CloseLoading from "@/components/clientComp/CloseLoading";

export const metadata = {
  title: "Admin - GameType",
  description: "Manage GameTypes",
};

const Page = async () => {
  let gameTypes = [];

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/gametype`,
      { headers: { "Cache-Control": "no-store" } }
    );
    gameTypes = res.data;
  } catch (error) {
    console.error("Error fetching game types:", error);
    // Optionally, you can set gameTypes to a fallback value or display an error message
  }

  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          All GameTypes
        </span>

        {gameTypes.length > 0 ? (
          gameTypes.map((item, key) => (
            <GmTypeItem
              key={key}
              id={item.id}
              image={item.type_img}
              name={item.name}
            />
          ))
        ) : (
          <>
            <CloseLoading />
            <span className="flex justify-center text-red-500 font-bold">
              No GameTypes found
            </span>
          </>
        )}
      </div>

      <div className="col-span-1 border-2 border-dashed border-[#a5a5a5] p-[10px] h-fit flex flex-col gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          Add GameType
        </span>
        <AddGmType />
      </div>
    </div>
  );
};

export default Page;
