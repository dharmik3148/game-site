import axios from "axios";
import AddPolicy from "./AddPolicy";
import PolicyAd from "./PolicyAd";
import PolicyItem from "./PolicyItem";

export const metadata = {
  title: "Admin - Privacy Policy",
  description: "Manage Privacy-Policy",
};

const PrivacyPolicy = async () => {
  const pagetype = "privacy-policy";

  await axios.get(`${process.env.NEXT_APP_BASE_URL}/api/admin/pageads`, {
    headers: { pagetype, "Cache-Control": "no-store" },
  });

  const res = await axios.get(
    `${process.env.NEXT_APP_BASE_URL}/api/admin/privacypolicy`,
    { headers: { pagetype, "Cache-Control": "no-store" } }
  );

  console.log(res.data);

  return (
    <>
      <PolicyAd ads={res.data.ads} />
      <div className="grid grid-cols-2 gap-[10px]">
        <div className="col-span-1 border-2 border-dashed flex flex-col border-[#a5a5a5] p-[10px] gap-[10px]">
          <span className="bg-[#2a2a2a] flex p-[10px] text-[#ededed] items-center justify-center font-bold">
            All Policy Content
          </span>
          {res.data?.data?.length > 0 ? (
            res?.data?.data.map((item, key) => {
              return (
                <PolicyItem
                  key={key}
                  id={item.id}
                  heading={item.heading}
                  content={item.content}
                />
              );
            })
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

export default PrivacyPolicy;
