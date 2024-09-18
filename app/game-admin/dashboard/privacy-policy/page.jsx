import axios from "axios";
import dynamic from "next/dynamic";

const AddPolicy = dynamic(() => import("./AddPolicy"), { ssr: false });
const PolicyAd = dynamic(() => import("./PolicyAd"), { ssr: false });
const PolicyItem = dynamic(() => import("./PolicyItem"), { ssr: false });

export const metadata = {
  title: "Admin - Privacy Policy",
  description: "Manage Privacy-Policy",
};

const Page = async () => {
  let data = { ads: [], allAds: [], data: [] };

  try {
    await axios.get(`${process.env.NEXT_APP_BASE_URL}/api/admin/pageads`, {
      headers: { pagetype: "privacy-policy", "Cache-Control": "no-store" },
    });

    const res = await axios.get(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/privacypolicy`,
      { headers: { pagetype: "privacy-policy", "Cache-Control": "no-store" } }
    );
    data = res.data;
  } catch (error) {
    console.error("Error fetching privacy policy data:", error);
  }

  return (
    <>
      <PolicyAd ads={data.ads} allAds={data.allAds} />
      <div className="grid grid-cols-2 gap-[10px]">
        <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
          <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
            All Policy Content
          </span>
          {data.data.length > 0 ? (
            data.data.map((item, key) => (
              <PolicyItem
                key={key}
                id={item.id}
                heading={item.heading}
                content={item.content}
              />
            ))
          ) : (
            <span className="flex justify-center text-red-500 font-bold">
              No policy content found
            </span>
          )}
        </div>
        <div className="col-span-1 border-2 border-dashed border-[#a5a5a5] p-[10px] h-fit flex flex-col gap-[10px]">
          <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
            Add Policy Content
          </span>
          <AddPolicy />
        </div>
      </div>
    </>
  );
};

export default Page;
