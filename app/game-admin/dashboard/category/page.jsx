import CatItem from "./CatItem";
import Addcat from "./Addcat";
import CloseLoading from "@/components/clientComp/CloseLoading";

export const metadata = {
  title: "Admin - Category",
  description: "Manage categories",
};

const Page = async () => {
  let data = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/category`,
      { cache: "no-store" }
    );

    data = await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          All Categories
        </span>
        {data.length > 0 ? (
          data.map((item, key) => (
            <CatItem
              key={key}
              id={item.id}
              image={item.category_img}
              name={item.category_name}
            />
          ))
        ) : (
          <div>
            <CloseLoading />
            <span className="flex justify-center text-red-500 font-bold">
              No category found
            </span>
          </div>
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

export default Page;
