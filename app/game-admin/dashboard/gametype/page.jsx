import axios from "axios";
import GmTypeItem from "./GmTypeItem";
import AddGmType from "./AddGmType";

export const metadata = {
  title: "Admin - GameType",
  description: "Manage GameTypes",
};

const GameType = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/gametype`
  );

  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          All GameType
        </span>

        {res.data.length > 0 ? (
          res?.data.map((item, key) => {
            return (
              <GmTypeItem
                key={key}
                id={item.id}
                image={item.type_img}
                name={item.name}
              />
            );
          })
        ) : (
          <span className="flex justify-center text-red-500 font-bold">
            No Gametype found
          </span>
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

export default GameType;
