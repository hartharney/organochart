"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ShowError } from "../ShowError";
import clsx from "clsx";
import { LogOut } from "lucide-react";

type DecodedToken = {
  exp: number;
  iat: number;
  sub: string;
  email: string;
  role: string;
};

const menuItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/departments", label: "Departments" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsedUser, setParsedUser] = useState<Record<string, any>>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token) {
      ShowError("No token found, logging out");
      router.push("/login");
      return;
    }

    if (user) {
      setParsedUser(JSON.parse(user));
      setIsAuthenticated(true);
    } else {
      console.log("No user found in localStorage");
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        ShowError("Token expired, logging out");
        router.push("/login");
      }
    } catch (err) {
      console.error("Invalid token, logging out", err);
      ShowError(err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const linkClass = (href: string) =>
    clsx(
      "block px-3 py-2 rounded-md hover:bg-gray-200 transition-colors",
      pathname === href ? "bg-gray-300 font-semibold" : "text-gray-700"
    );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-gray-100 p-4 flex-col space-y-2">
        <h2 className="text-xl font-bold mb-4">Department Manager</h2>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={linkClass(item.href)}
          >
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger className="md:hidden p-4">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b px-6 py-4 flex items-center justify-between">
          <NavigationMenu />
          <div className="flex items-center gap-4">
            <span className="font-medium">
              Hi, {parsedUser?.firstName} {parsedUser?.lastName}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                router.push("/login");
              }}
              className="flex items-center gap-2 text-sm text-red-600 hover:underline"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
