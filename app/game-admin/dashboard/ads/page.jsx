import axios from "axios";
import AdItem from "./AdItem";
import AddAd from "./AddAd";

export const metadata = {
  title: "Admin - Ads",
  description: "Manage Ads",
};

const Page = async () => {
  let adsData = [];

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/ads`,
      { headers: { "Cache-Control": "no-store" } }
    );
    adsData = res.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    // Optionally, you can set adsData to a fallback value or display an error message
  }

  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          All Ads
        </span>
        <div
          id="accordion-collapse"
          data-accordion="collapse"
          className="flex flex-col gap-2"
        >
          {adsData.length > 0 ? (
            adsData.map((item, key) => (
              <AdItem
                key={key}
                id={item.id}
                ad_name={item.ad_name}
                ad_client={item.ad_client}
                ad_slot={item.ad_slot}
                ad_format={item.ad_format}
                ad_fullWidthResponsive={item.ad_fullWidthResponsive}
              />
            ))
          ) : (
            <span className="flex justify-center text-red-500 font-bold">
              No Ads found
            </span>
          )}
        </div>
      </div>

      <div className="col-span-1 border-2 border-dashed border-[#a5a5a5] p-[10px] h-fit flex flex-col gap-[10px]">
        <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
          Add Ads
        </span>
        <AddAd />
      </div>
    </div>
  );
};

export default Page;
