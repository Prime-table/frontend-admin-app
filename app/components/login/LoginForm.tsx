"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/app/schemas/schema";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { loginAdmin } from "@/app/services/auth";
import { adminLoginResponse } from "@/app/types/types";
import { setCookie } from "cookies-next/client";

function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const response: adminLoginResponse = await loginAdmin(data);
      setCookie("adminToken", response.token, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });
      localStorage.setItem("adminEmail", response.email);
      toast.success("Login successful!");

      const callBackUrl = searchParams.get("callBackUrl") || "/dashboard";
      window.location.href = callBackUrl;
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-md py-4 px-3 w-[90%] md:max-w-1/3"
      style={{ boxShadow: "0 0px 2px 1px rgba(0, 0, 0, 0.1)" }}
    >
      <h2 className="font-semibold md:text-lg text-center">Admin Login</h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm">
          Email:
        </label>
        <input
          type="email"
          placeholder="admin@example.com"
          id="email"
          {...register("email")}
          className="focus:outline-none w-full border border-gray-300 rounded-sm p-3"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm">
          Password:
        </label>
        <input
          type="password"
          placeholder="********"
          id="password"
          {...register("password")}
          className="focus:outline-none w-full border border-gray-300 rounded-sm p-3"
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className={`w-full p-3 text-center bg-red-primary text-white cursor-pointer
        hover:bg-red-primary/90 duration-300 ease-in-out disabled:bg-red-300 
        disabled:cursor-not-allowed rounded-sm`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <div className="w-full flex items-end justify-end">
        <Link
          href="/forgot"
          className="text-sm hover:text-red-primary duration-300 ease-in-out"
        >
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
