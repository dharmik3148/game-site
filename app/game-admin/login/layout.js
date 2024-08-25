import "../admin.css";

export const metadata = {
  title: "Admin - Login",
  description: "Login page",
};

export default function LoginLayout({ children }) {
  return (
    <div className="relative z-20">
      <div>{children}</div>
    </div>
  );
}
