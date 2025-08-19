import Image from "next/image";
import LoginForm from "@/app/components/login/LoginForm";

function Login() {
  return (
    <section className="w-screen h-screen absolute inset-0 bg-white text-black z-[500] flex flex-col items-center justify-center">
      {/* logo */}
      <Image
        src="/primetablelogo.jpg"
        alt="Login Image"
        width={500}
        height={500}
        className="w-[150px] h-[150px] rounded-full mb-8"
      />

      {/* form */}
      <LoginForm />
    </section>
  );
}

export default Login;
