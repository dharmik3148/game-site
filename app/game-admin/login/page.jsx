import "../admin.css";

import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login",
  description: "Admin login form",
};

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-[#2a2a2a] bg-container">
      <div className="flex flex-col gap-2 bg-translucent p-[50px] rounded-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
