"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { LOGIN_USER } from "../..//graphql/mutations";
import { loginSchema } from "../../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ShowError } from "../../components/ShowError";
import { toast } from "react-toastify";
import { z } from "zod";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await loginUser({ variables: { data: values } });

      if (data?.login?.accessToken) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.login.accessToken);
        localStorage.setItem("user", JSON.stringify(data.login.user));
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      ShowError(error);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-black px-4">
      <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-blue-500 to-purple-600 p-10 items-center justify-center">
          <Image
            src="/images/hero.png"
            alt="Hero"
            className="w-full max-w-sm h-3/4"
            width={600}
            height={600}
            priority
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
            Welcome back
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-lg">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-xl text-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-6 text-md text-gray-600 text-center md:text-left">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
