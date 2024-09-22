import axios from "axios";
import AllData from "./dash-components/AllData";

export const metadata = {
  title: "Admin - Dashboard",
  description: "Manage Dashboard",
};

const Page = async () => {
  let data = {};

  try {
    const res = await fetch(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/dashboard`,
      { cache: "no-store" }
    );
    data = await res.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }

  return (
    <div className="flex flex-col">
      <AllData data={data} />
    </div>
  );
};

export default Page;
