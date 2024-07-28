import db from "@/config/dbConfig";
import bcrypt from "bcrypt";
import { getToken } from "@/helpers/functions";
import { Op } from "sequelize";

const User = db.user;
const UserSession = db.userSessions;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id, token } = req.headers;

    if (!id || !token) {
      return res
        .status(200)
        .send({ status: false, message: "Authorization failed" });
    }

    const data = await UserSession.findOne({
      where: { [Op.and]: [{ token }, { userId: id }] },
    });

    if (!data) {
      return res
        .status(200)
        .send({ status: false, message: "Authorization failed" });
    }

    return res
      .status(200)
      .send({ status: true, message: "Authorization approved" });
  } else if (req.method === "POST") {
    const { username, password } = req.body;

    const isExist = await User.findOne({ where: { username: username } });

    if (!isExist) {
      return res
        .status(200)
        .send({ status: false, message: "Credentials are wrong" });
    }

    if (!bcrypt.compareSync(password, isExist.password)) {
      return res
        .status(200)
        .send({ status: false, message: "Credentials are wrong" });
    }

    const token = `${isExist.username}-${await getToken(isExist.id)}`;

    const data = {
      userId: isExist.id,
      token,
    };

    await UserSession.create(data);

    res.status(200).send({
      status: true,
      message: "Logged in successfully",
      token: data.token,
      adminId: data.userId,
    });
  } else if (req.method === "DELETE") {
    const { token, userId } = req.body;
    const admin = await UserSession.findOne({
      where: { [Op.and]: [{ token }, { userId }] },
    });

    if (!admin) {
      return res
        .status(200)
        .send({ status: false, message: "Authorization failed" });
    }

    await UserSession.destroy({ where: { userId } });

    return res
      .status(200)
      .send({ status: true, message: "Logged out successfully" });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
