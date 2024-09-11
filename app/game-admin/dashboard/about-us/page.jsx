import axios from "axios";
import dynamic from "next/dynamic";

const AboutAd = dynamic(() => import("./AboutAd"), { ssr: false });
const AddAbout = dynamic(() => import("./AddAbout"), { ssr: false });
const AboutItem = dynamic(() => import("./AboutItem"), { ssr: false });

export const metadata = {
  title: "Admin - About Us",
  description: "Manage About-Us",
};

const Page = async () => {
  let aboutUsData = { data: [], ads: [], allAds: [] };

  try {
    // Fetching ads
    await axios.get(`${process.env.NEXT_APP_BASE_URL}/api/admin/pageads`, {
      headers: { pagetype: "about-us", "Cache-Control": "no-store" },
    });

    // Fetching About Us content
    const aboutUsResponse = await axios.get(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/aboutus`,
      {
        headers: { pagetype: "about-us", "Cache-Control": "no-store" },
      }
    );
    aboutUsData = aboutUsResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // You can handle error scenarios or provide fallback data here
  }

  return (
    <>
      <AboutAd ads={aboutUsData.ads} allAds={aboutUsData.allAds} />
      <div className="grid grid-cols-2 gap-[10px]">
        <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
          <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
            All About Us Content
          </span>
          {aboutUsData.data.length > 0 ? (
            aboutUsData.data.map((item, key) => (
              <AboutItem
                key={key}
                id={item.id}
                heading={item.heading}
                content={item.content}
              />
            ))
          ) : (
            <span className="flex justify-center text-red-500 font-bold">
              No about-us content found
            </span>
          )}
        </div>
        <div className="col-span-1 border-2 border-dashed border-[#a5a5a5] p-[10px] h-fit flex flex-col gap-[10px]">
          <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
            Add About Us Content
          </span>
          <AddAbout />
        </div>
      </div>
    </>
  );
};

export default Page;
