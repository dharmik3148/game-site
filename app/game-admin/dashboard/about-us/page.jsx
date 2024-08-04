import axios from "axios";
import AboutAd from "./AboutAd";
import AddAbout from "./AddAbout";
import AboutItem from "./AboutItem";

export const metadata = {
  title: "Admin - About Us",
  description: "Manage About-Us",
};

const AboutUs = async () => {
  const pagetype = "about-us";

  await axios.get(`${process.env.NEXT_APP_BASE_URL}/api/admin/pageads`, {
    headers: { pagetype, "Cache-Control": "no-store" },
  });

  const res = await axios.get(
    `${process.env.NEXT_APP_BASE_URL}/api/admin/aboutus`,
    { headers: { pagetype, "Cache-Control": "no-store" } }
  );

  console.log(res.data);

  return (
    <>
      <AboutAd ads={res.data.ads} />
      <div className="grid grid-cols-2 gap-[10px]">
        <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
          <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
            All About Us Content
          </span>
          {res.data?.data?.length > 0 ? (
            res?.data?.data.map((item, key) => {
              return (
                <AboutItem
                  key={key}
                  id={item.id}
                  heading={item.heading}
                  content={item.content}
                />
              );
            })
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

export default AboutUs;
