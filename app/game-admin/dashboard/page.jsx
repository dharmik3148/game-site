// import axios from "axios";
// import AllData from "./dash-components/AllData";

// export const metadata = {
//   title: "Admin - Dashboard",
//   description: "Manage Dashboard",
// };

// const Dashboard = async () => {
//   const res = await axios.get(
//     `${process.env.NEXT_APP_BASE_URL}/api/admin/dashboard`,
//     {
//       headers: { "Cache-Control": "no-store" },
//     }
//   );

//   return (
//     <div className="flex flex-col">
//       <AllData data={res.data} />
//     </div>
//   );
// };

// export default Dashboard;

import axios from "axios";
import AllData from "./dash-components/AllData";

export const metadata = {
  title: "Admin - Dashboard",
  description: "Manage Dashboard",
};

const Dashboard = async () => {
  let data = {};

  try {
    const res = await axios.get(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/dashboard`,
      { headers: { "Cache-Control": "no-store" } }
    );
    data = res.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Optionally, you can set data to a fallback value or display an error message
  }

  return (
    <div className="flex flex-col">
      <AllData data={data} />
    </div>
  );
};

export default Dashboard;
