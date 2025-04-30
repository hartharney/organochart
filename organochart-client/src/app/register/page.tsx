"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { REGISTER_USER } from "../../graphql/mutations";
import { registerSchema } from "../../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ShowError } from "../../components/ShowError";
import { toast } from "react-toastify";
import { z } from "zod";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({ variables: { data: values } });
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      ShowError(error);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-black px-4">
      <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-yellow-400 to-blue-600 p-10 items-center justify-center">
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
            Create your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-lg">
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}

            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}

            {/* <select
              {...register("department")}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm">
                {errors.department.message as string}
              </p>
            )} */}

            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message as string}
              </p>
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
              <p className="text-red-500 text-sm">
                {errors.password.message as string}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-xl text-lg font-semibold"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-6 text-md text-gray-600 text-center md:text-left">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
