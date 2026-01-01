"use client";

import { useState } from "react";
import { AuthLayout, Button, Input } from "@/components";
import Link from "next/link";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthLayout>
      <div className="card">
        <div className="px-6 py-8 sm:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignUp ? "Create Company Account" : "Sign In"}
          </h1>
          <p className="text-gray-600 mb-6">
            {isSignUp
              ? "Start using RecruitAI to hire smarter"
              : "Access your recruitment dashboard"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                label="Company Name"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your company name"
                required
              />
            )}

            <Input
              label="Company Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {isSignUp && (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            )}

            {!isSignUp && (
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-blue-900"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-medium hover:text-blue-900"
            >
              {isSignUp ? "Sign In" : "Create one"}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        By continuing, you agree to our Terms of Service and Privacy Policy<br />
        Powered by DeepScale Technologies
      </p>
    </AuthLayout>
  );
}
