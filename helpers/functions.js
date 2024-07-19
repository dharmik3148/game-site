import { suid } from "rand-token";

export const getToken = async (adminId) => {
  const token = adminId + suid(99);
  return token;
};
