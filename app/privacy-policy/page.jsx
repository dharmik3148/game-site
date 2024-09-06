import CloseLoading from "@/components/clientComp/CloseLoading";
import axios from "axios";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
};

const PrivacyPolicy = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/privacy-policy`,
    {
      headers: { "Cache-Control": "no-store" },
    }
  );

  return (
    <section className="py-[60px] font-nunito px-[12px]">
      <CloseLoading />
      <h1 className="lg:text-[40px] md:text-[40px] sm:text-[30px] text-[30px] font-[800] text-siteDarkBlue drop-shadow text-center my-[20px]">
        Privacy Policy &amp; Terms of Use for popygames.com !
      </h1>
      {res.data?.data.length > 0 &&
        res.data?.data?.map((item, key) => {
          return (
            <article
              key={key}
              className="bg-siteDarkYellow rounded-[13px] p-[10px] mb-[15px] lg:mx-[125px] md:mx-[75px] sm:mx-[20px]"
            >
              <h2 className="bg-smokeWhite rounded-[7px] py-[5px] px-[10px] font-[800] text-[20px]">
                {`${key + 1}. ${item.heading}`}
              </h2>
              <p className="rounded-[7px] text-[17px] py-[5px] px-[10px] mt-[10px] whitespace-pre-line">
                {item.content}
              </p>
            </article>
          );
        })}
      {res.data?.data.length === 0 && (
        <span className="lg:text-[40px] md:text-[40px] sm:text-[30px] text-[30px] font-[800] text-red-500 drop-shadow flex justify-center my-[20px]">
          !! No Content !!
        </span>
      )}
    </section>
  );
};

export default PrivacyPolicy;
