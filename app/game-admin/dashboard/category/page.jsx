import axios from "axios";
import CatItem from "./CatItem";
import Addcat from "./Addcat";

export const metadata = {
  title: "Admin - Category",
  description: "Manage categories",
};

const Category = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/category`
  );

  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          All Categories
        </span>
        {res.data.length > 0 ? (
          res?.data.map((item, key) => {
            return (
              <CatItem
                key={key}
                id={item.id}
                image={item.category_img}
                name={item.category_name}
              />
            );
          })
        ) : (
          <span className="flex justify-center text-red-500 font-bold">
            No category found
          </span>
        )}
      </div>
      <div className="col-span-1 border-2 border-dashed border-[#a5a5a5] p-[10px] h-fit flex flex-col gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          Add Category
        </span>
        <Addcat />
      </div>
    </div>
  );
};

export default Category;
