"use client";

import { useState } from "react";
import { DashboardLayout, Card, CardBody, CardHeader } from "@/components";

interface UsageMetric {
  label: string;
  value: number;
  limit: number;
  unit: string;
  percentage: number;
}

const mockUsageData: UsageMetric[] = [
  {
    label: "Job Postings",
    value: 5,
    limit: 10,
    unit: "postings",
    percentage: 50,
  },
  {
    label: "Application Reviews",
    value: 142,
    limit: 500,
    unit: "reviews",
    percentage: 28,
  },
  {
    label: "AI Screenings",
    value: 87,
    limit: 200,
    unit: "screenings",
    percentage: 43,
  },
  {
    label: "Team Members",
    value: 3,
    limit: 5,
    unit: "members",
    percentage: 60,
  },
 
];

export default function UsageTrackingPage() {
  const [usageData] = useState<UsageMetric[]>(mockUsageData);

  const getProgressColor = (percentage: number): string => {
    if (percentage <= 50) return "bg-green-500";
    if (percentage <= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = (percentage: number): string => {
    if (percentage <= 50) return "text-green-600";
    if (percentage <= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usage Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor your plan usage and limits</p>
        </div>

        {/* Plan Info Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-900">Current Plan: Premium</h2>
                <p className="text-sm text-blue-700 mt-1">
                  You have access to all features and increased limits
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-700">Renews on</p>
                <p className="text-lg font-semibold text-blue-900">January 31, 2025</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Usage Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usageData.map((metric, index) => (
            <Card key={index}>
              <CardBody className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-500">/ {metric.limit} {metric.unit}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getProgressColor(
                        metric.percentage
                      )}`}
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs font-medium ${getTextColor(metric.percentage)}`}>
                    {metric.percentage}% used
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Usage Details Table */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Job Posted
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Dec 30, 2024</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Senior Frontend Developer
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Free</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      AI Screening Run
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Dec 29, 2024</td>
                    <td className="px-6 py-4 text-sm text-gray-600">24 applications screened</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Included</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Team Member Added
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Dec 28, 2024</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      john.doe@company.com
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Free</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      AI Screening Run
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Dec 27, 2024</td>
                    <td className="px-6 py-4 text-sm text-gray-600">18 applications screened</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Included</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Job Posted
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Dec 26, 2024</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Product Manager</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens when I reach my limit?</h3>
              <p className="text-sm text-gray-600">
                When you reach your usage limit, you'll need to upgrade your plan or wait for your limit to reset at the start of your billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade my plan?</h3>
              <p className="text-sm text-gray-600">
                Yes, you can upgrade your plan at any time from the settings page. Your new limits will be applied immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How is storage calculated?</h3>
              <p className="text-sm text-gray-600">
                Storage is calculated based on uploaded resumes, documents, and data associated with your job postings and candidates.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
