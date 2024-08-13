import axios from "axios";
import AllData from "./dash-components/AllData";

export const metadata = {
  title: "Admin - Dashboard",
  description: "Manage Dashboard",
};

const Dashboard = async () => {
  const res = await axios.get(
    `${process.env.NEXT_APP_BASE_URL}/api/admin/dashboard`,
    {
      headers: { "Cache-Control": "no-store" },
    }
  );

  return (
    <div className="flex flex-col">
      <AllData data={res.data} />
    </div>
  );
};

export default Dashboard;
