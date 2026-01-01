"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardIcon,
  BriefcaseIcon,
  PlusIcon,
  FileTextIcon,
  StarIcon,
  UserIcon,
  BarChartIcon,
} from "./Icons";

interface SidebarProps {
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleSignOut = () => {
    router.push("/");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { label: "Active Jobs", href: "/jobs", icon: BriefcaseIcon },
    { label: "Create Job", href: "/jobs/new", icon: PlusIcon },
    { label: "Applications", href: "/applications/1", icon: FileTextIcon },
    { label: "Shortlisted", href: "/candidates", icon: StarIcon },
    { label: "Usage Tracking", href: "/usage", icon: BarChartIcon },
    { label: "Profile", href: "/profile", icon: UserIcon },
  ];

  return (
    <aside className={`fixed left-0 top-14 sm:top-16 w-64 bg-white border-r border-gray-200 h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-y-auto z-30 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <nav className="px-4 space-y-2 pt-6 pb-40 md:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive(item.href) ? "text-primary" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 border-t border-gray-200 bg-gray-50">
        {/* Mobile Subscription Plan and Sign Out - visible only on small screens */}
        <div className="md:hidden space-y-2 mb-4 pb-4 border-b border-gray-200">
          <Link href="/profile" className="flex items-center  px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <span className="flex-1">Subscription Plan</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-white">Pro</span>
          </Link>
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left">
            <span className="flex-1">Sign Out</span>
          </button>
        </div>

        {/* Company Info */}
        <div className="text-xs text-gray-600">
          <p className="font-medium mb-2">Company</p>
          <p className="font-semibold text-gray-900">Acme Corporation</p>
          <p className="text-xs text-gray-500 mt-2">Powered by DeepScale Technologies</p>
        </div>
      </div>
    </aside>
  );
};
