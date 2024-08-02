import axios from "axios";
import ManageAdsTxt from "./ManageAdsTxt";

export const metadata = {
  title: "Admin - AdsTxt",
  description: "Manage ads text",
};

const AdsTxt = async () => {
  return (
    <div className="flex flex-col">
      <ManageAdsTxt />
    </div>
  );
};

export default AdsTxt;
