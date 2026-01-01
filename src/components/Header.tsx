"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon, CloseIcon, BellIcon } from "./Icons";

interface HeaderProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen = false, onToggleSidebar }) => {
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState(3);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Simulate new notification every 10 seconds
    const interval = setInterval(() => {
      setNotificationCount(prev => prev + 1);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    router.push("/");
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile menu button */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>

          {/* Logo - responsive alignment */}
          <div className="flex items-center gap-2 sm:gap-3 md:flex-1 md:ml-0">
            <Link href="/dashboard" className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                R
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                RecruitAI
              </span>
            </Link>
          </div>

          {/* Right section - Logo on mobile, Profile/SignOut on desktop */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile logo and badge */}
            <Link href="/dashboard" className="md:hidden flex items-center gap-1 sm:gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                R
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                RecruitAI
              </span>
            </Link>

            {/* Desktop Subscription Plan and SignOut */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  suppressHydrationWarning
                  className={`p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isShaking ? "animate-shake" : ""}`}
                >
                  <BellIcon className="w-5 h-5" />
                </button>
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[20px]">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-xs sm:text-sm">
                <span className="hidden sm:inline">Subscription Plan</span>
                <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-primary text-white flex-shrink-0">
                  Premium
                </span>
              </div>
              <button onClick={handleSignOut} className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-xs sm:text-sm">
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
