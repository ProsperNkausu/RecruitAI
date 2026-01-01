import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">RecruitAI</p>
              <p className="text-xs text-gray-500">Smart Recruitment Platform</p>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
