import axios from "axios";
import dynamic from "next/dynamic";

const AdComponent = dynamic(
  () => import("@/components/clientComp/AdComponent"),
  { ssr: false }
);

const CloseLoading = dynamic(
  () => import("@/components/clientComp/CloseLoading"),
  { ssr: false }
);

export const metadata = {
  title: "About Us",
  description: "Login page",
};

const Page = async () => {
  let data = [];
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/about-us`,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );

    data = res.data;
  } catch (error) {
    console.log(error.message);
  }

  return (
    <section className="py-[60px] font-nunito px-[13px]">
      <CloseLoading />

      <div className="mt-[10px] mb-[15px] lg:mx-[125px] md:mx-[75px] sm:mx-[20px]">
        {data?.ad_data?.ad_status === true ? (
          <div className="relative h-[100px] mx-auto">
            <AdComponent adData={data?.ad_data?.ad} />
            <span className="absolute bottom-[-18px] text-smokeBlack left-[0px] text-[11px] font-[600]">
              ADVERTISEMENT
            </span>
          </div>
        ) : (
          <div className="border-[1px] border-deviderGray border-dashed relative h-[100px] mx-auto">
            <span className="absolute bottom-[-18px] text-smokeBlack left-[0px] text-[11px] font-[600]">
              ADVERTISEMENT
            </span>
          </div>
        )}
      </div>
      <h1 className="lg:text-[40px] md:text-[40px] sm:text-[30px] text-[30px] font-[800] text-siteDarkBlue drop-shadow text-center my-[20px]">
        Wanna know about popy games ?
      </h1>
      {data?.data?.length > 0 &&
        data?.data?.map((item, key) => {
          return (
            <article
              key={key}
              className="bg-siteDarkYellow rounded-[13px] p-[10px] mb-[15px] lg:mx-[125px] md:mx-[75px] sm:mx-[20px]"
            >
              <h2 className="bg-smokeWhite rounded-[7px] py-[5px] px-[10px] font-[800] text-[20px]">
                {item.heading}
              </h2>
              <p className="rounded-[7px] text-[17px] py-[5px] px-[10px] mt-[10px] whitespace-pre-line">
                {item.content}
              </p>
            </article>
          );
        })}
      {data?.data?.length === 0 && (
        <span className="lg:text-[40px] md:text-[40px] sm:text-[30px] text-[30px] font-[800] text-red-500 drop-shadow flex justify-center my-[20px]">
          !! No Content !!
        </span>
      )}

      <div className="mt-[10px] mb-[15px] lg:mx-[125px] md:mx-[75px] sm:mx-[20px]">
        {data?.ad_data?.ad_status === true ? (
          <div className="relative h-[100px] mx-auto">
            <AdComponent adData={data?.ad_data?.ad} />
            <span className="absolute bottom-[-18px] text-smokeBlack left-[0px] text-[11px] font-[600]">
              ADVERTISEMENT
            </span>
          </div>
        ) : (
          <div className="border-[1px] border-deviderGray border-dashed relative h-[100px] mx-auto">
            <span className="absolute bottom-[-18px] text-smokeBlack left-[0px] text-[11px] font-[600]">
              ADVERTISEMENT
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
