import AboutAd from "./AboutAd";
import AboutItem from "./AboutItem";
import AddAbout from "./AddAbout";

export const metadata = {
  title: "Admin - About Us",
  description: "Manage About-Us",
};

const Page = async () => {
  let aboutUsData = { data: [], ads: [], allAds: [] };

  try {
    await fetch(`${process.env.NEXT_APP_BASE_URL}/api/admin/pageads`, {
      method: "get",
      cache: "no-store",
      headers: { pagetype: "about-us" },
    });

    const aboutUsRes = await fetch(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/aboutus`,
      {
        method: "get",
        cache: "no-store",
        headers: {
          pagetype: "about-us",
        },
      }
    );

    aboutUsData = await aboutUsRes.json();
  } catch (error) {
    console.error("Error fetching data:", error);
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
