import db from "@/config/dbConfig";
import bcrypt from "bcrypt";
import { getToken } from "@/helpers/functions";

const User = db.user;
const UserSession = db.userSessions;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const isExist = await User.findOne({ where: { username: username } });

    if (!isExist) {
      return res.send({ status: "This email doest not exist" });
    }

    if (!bcrypt.compareSync(password, isExist.password)) {
      return res.send({ status: "Credentials are wrong" });
    }

    const data = {
      userId: isExist.id,
      token: await getToken(isExist.id),
    };

    await UserSession.create(data);

    res.status(200).send({ token: data.token });
  } else if (req.method === "GET") {
    const { username, password } = req.body;
    const data = await User.findOne({
      where: { username },
      attributes: ["username", "password"],
      include: [{ model: UserSession, attributes: ["token"] }],
    });

    res.status(200).send({ data });
  } else {
    res.status(200).send({ status: false });
  }
}
