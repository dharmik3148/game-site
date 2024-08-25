"use client";

import useLoadingStore from "@/store/loadingStore";
import "../admin.css";
import LoginForm from "./LoginForm";
import { useEffect } from "react";

const Login = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center bg-[#2a2a2a] bg-container">
        <div className="flex flex-col gap-2 bg-translucent p-[50px] rounded-md">
          <LoginForm />
        </div>

        {isLoading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 loading-bg">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
