"use client";

import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    const id = getCookie("adminId");

    if (!token || !id) {
      return;
    }

    const auth = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth`,
        {
          headers: { id, token, "Cache-Control": "no-store" },
        }
      );
      if (res.data.status !== true) {
        return toast.error(res.data.message);
      }

      router.push("/game-admin/dashboard");
      router.refresh();
      toast.success("Logged in");
    };

    auth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth`,
      { username, password },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    if (res.data.status !== true) {
      return toast.error(res.data.message);
    }

    const { token, adminId } = res.data;

    setCookie("token", token, { maxAge: 24 * 60 * 60 });
    setCookie("adminId", adminId, { maxAge: 24 * 60 * 60 });

    router.push("/game-admin/dashboard");

    toast.success(res.data.message);

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <input
        type="text"
        className="rounded-md px-5 py-3 outline-none bg-black text-green-500 border-[2px] border-black active:border-[2px] focus:border-green-500 placeholder:text-gray-500"
        placeholder="username ..."
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="relative">
        <input
          type={`${isShow ? "text" : "password"}`}
          className="rounded-md px-5 py-3 outline-none bg-black text-green-500 border-[2px] border-black active:border-[2px] focus:border-green-500 placeholder:text-gray-500"
          placeholder="password ..."
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />

        {isShow ? (
          <i
            onClick={() => {
              setIsShow(!isShow);
            }}
            className="bi bi-eye-fill text-green-500 cursor-pointer text-[17px] absolute top-[15px] right-[13px]"
          ></i>
        ) : (
          <i
            onClick={() => {
              setIsShow(!isShow);
            }}
            className="bi bi-eye-slash-fill text-red-500 cursor-pointer text-[17px] absolute top-[15px] right-[13px]"
          ></i>
        )}
      </div>

      {username && password ? (
        <button
          type="submit"
          className="bg-black text-[#f5f5f5] px-3 py-3 outline-none rounded-md border-[2px] border-black  hover:text-green-500 hover:border-green-500"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginForm;
