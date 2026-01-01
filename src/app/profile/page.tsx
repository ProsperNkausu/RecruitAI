"use client";

import { useState } from "react";
import { DashboardLayout, Button, Input, Card, CardBody, CardHeader, Badge, Select } from "@/components";
import { GoogleSheetsIcon } from "@/components/Icons";
import Link from "next/link";

interface SheetOption {
  value: string;
  label: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  isCurrentPlan: boolean;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSheetConnected, setIsSheetConnected] = useState(true);
  const [selectedSheet, setSelectedSheet] = useState("recruitment_candidates");
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const [sheetOptions] = useState<SheetOption[]>([
    { value: "recruitment_candidates", label: "Recruitment Candidates" },
    { value: "candidates_pipeline", label: "Candidates Pipeline" },
    { value: "approved_candidates", label: "Approved Candidates" },
    { value: "new_sheet", label: "+ Create New Sheet" },
  ]);

  const [subscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: "free",
      name: "Free",
      price: 0,
      yearlyPrice: 0,
      description: "Perfect for getting started",
      features: [
        "Up to 5 job postings",
        "Basic AI screening",
        "Email support",
        "Up to 100 applications/month",
        "Basic analytics",
      ],
      isCurrentPlan: false,
    },
    {
      id: "standard",
      name: "Standard",
      price: 49,
      yearlyPrice: 490,
      description: "Great for growing teams",
      features: [
        "Unlimited job postings",
        "Advanced AI screening",
        "Priority email support",
        "Unlimited applications",
        "Custom screening questions",
        "Team members (up to 5)",
      ],
      isCurrentPlan: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 99,
      yearlyPrice: 990,
      description: "Most popular choice",
      features: [
        "Everything in Standard",
        "Google Sheets integration",
        "Priority support",
        "Advanced analytics",
        "Team members (up to 15)",
        "Custom branding",
        "API access",
      ],
      isCurrentPlan: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: 199,
      yearlyPrice: 1990,
      description: "Enterprise-grade solution",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "24/7 phone support",
        "Unlimited team members",
        "Custom integrations",
        "Advanced security features",
        "SLA guarantee",
        "White-label options",
      ],
      isCurrentPlan: false,
    },
  ]);

  const [accountData, setAccountData] = useState({
    companyName: "Acme Corporation",
    companyEmail: "careers@acmecorp.com",
    industry: "Technology",
    website: "https://www.acmecorp.com",
  });

  const [editData, setEditData] = useState(accountData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(accountData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(accountData);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setAccountData(editData);
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConnectGoogleSheets = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsSheetConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsSheetConnected(false);
    setSelectedSheet("");
  };

  const handleSheetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "new_sheet") {
      // In a real app, this would open a dialog to create a new sheet
      alert("Creating a new sheet - this would redirect to Google Sheets");
    } else {
      setSelectedSheet(value);
    }
  };

  const handleUpgradePlan = (planId: string) => {
    setSelectedPlan(planId);
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setShowPlansModal(false);
      alert(`Successfully upgraded to ${subscriptionPlans.find(p => p.id === planId)?.name} plan!`);
    }, 1500);
  };

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    const savingsPercent = monthlyPrice > 0 ? Math.round((savings / monthlyTotal) * 100) : 0;
    return { savings, savingsPercent };
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your company profile and preferences</p>
        </div>

        {/* Account Information Section */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
            {!isEditing && (
              <Button variant="secondary" size="sm" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </CardHeader>
          <CardBody className="space-y-6">
            {isEditing ? (
              <>
                <Input
                  label="Company Name"
                  name="companyName"
                  type="text"
                  value={editData.companyName}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Company Email"
                  name="companyEmail"
                  type="email"
                  value={editData.companyEmail}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Website"
                  name="website"
                  type="url"
                  value={editData.website}
                  onChange={handleInputChange}
                />

             

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    isLoading={isSaving}
                  >
                    Save Changes
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Company Name</p>
                    <p className="font-medium text-gray-900">{accountData.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{accountData.companyEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <p className="text-sm text-gray-600 mb-1">Website</p>
                  <p className="font-medium text-gray-900">
                    <a href={accountData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-blue-900">
                      {accountData.website}
                    </a>
                  </p>
                </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Industry</p>
                    <p className="font-medium text-gray-900">{accountData.industry}</p>
                  </div>
                </div>

                
              </>
            )}
          </CardBody>
        </Card>

        {/* Subscription Plan Section */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <h2 className="text-lg font-semibold text-blue-900">Subscription Plan</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-blue-700 mb-1">Current Plan</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-blue-900">Pro</p>
                  <Badge variant="info">Active</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-blue-700 mb-1">Billing Cycle</p>
                <p className="text-xl font-semibold text-blue-900">Monthly</p>
                <p className="text-sm text-blue-700 mt-1">Renews on Jan 20, 2025</p>
              </div>

              <div>
                <p className="text-sm text-blue-700 mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-blue-900">$99</p>
                <p className="text-sm text-blue-700 mt-1">Billed to your account</p>
              </div>
            </div>

            {/* Plan Features */}
            <div className="pt-6 border-t border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-3">Included Features</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-blue-900">Unlimited job postings</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-blue-900">AI screening for all applications</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-blue-900">Google Sheets integration</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-blue-900">Priority support</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-blue-900">Custom screening questions</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm text-blue-900">Analytics dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-blue-200">
              <Button variant="secondary" onClick={() => setShowPlansModal(true)}>Upgrade Plan</Button>
              <Button variant="secondary">Change Billing</Button>
              <Button variant="secondary">Cancel Subscription</Button>
            </div>
          </CardBody>
        </Card>

        {/* Google Sheets Integration Section */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Google Sheets Integration</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            {isSheetConnected ? (
              <>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">Connected to Google Sheets</p>
                    <p className="text-sm text-green-700 mt-1">Shortlisted candidates will automatically sync to your selected sheet</p>
                  </div>
                </div>

                <div>
                  <label className="label">Select Sheet to Sync</label>
                  <p className="text-sm text-gray-600 mb-2">Choose which Google Sheet will receive your shortlisted candidates</p>
                  <Select
                    name="sheet"
                    value={selectedSheet}
                    onChange={handleSheetChange}
                    options={sheetOptions}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">How it works:</span> When you mark candidates as shortlisted, their information will be automatically added to your selected Google Sheet with columns for name, email, position, and rating.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                  <Button variant="secondary">
                    View Connected Sheet
                  </Button>
                  <Button variant="secondary">
                    Test Sync
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <GoogleSheetsIcon className="w-8 h-8 text-green-600" width={32} height={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Google Sheets</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Sync your shortlisted candidates automatically to a Google Sheet for easier management and collaboration with your team.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-600 font-semibold">Benefits:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 text-lg">→</span>
                      <p className="text-sm text-gray-700">Automatic sync of shortlisted candidates</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 text-lg">→</span>
                      <p className="text-sm text-gray-700">Share candidate lists with team members</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 text-lg">→</span>
                      <p className="text-sm text-gray-700">Real-time updates and notifications</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={handleConnectGoogleSheets}
                  isLoading={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? "Connecting..." : "Connect to Google Sheets"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You&apos;ll be redirected to Google to authorize RecruitAI access to your Google Drive
                </p>
              </>
            )}
          </CardBody>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-sm text-red-800">
              These actions are irreversible. Please proceed with caution.
            </p>
            <Button variant="secondary" className="border-red-300 text-red-600 hover:bg-red-50">
              Delete Account
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Subscription Plans Modal */}
      {showPlansModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between sticky top-0 bg-white border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
              <Button variant="secondary" onClick={() => setShowPlansModal(false)}>
                ✕ Close
              </Button>
            </CardHeader>
            <CardBody className="p-8 space-y-8">
              {/* Billing Cycle Toggle */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    billingCycle === "yearly"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Yearly
                </button>
                {billingCycle === "yearly" && (
                  <Badge variant="success" className="ml-2">
                    Save up to 17%
                  </Badge>
                )}
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-lg border-2 p-6 flex flex-col transition-all ${
                      plan.isCurrentPlan
                        ? "border-primary bg-blue-50 shadow-lg"
                        : "border-gray-200 hover:border-primary hover:shadow-md"
                    }`}
                  >
                    {/* Plan Header */}
                    <div className="mb-4">
                      {plan.isCurrentPlan && (
                        <Badge variant="info" className="mb-3">
                          Current Plan
                        </Badge>
                      )}
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">
                          ${billingCycle === "monthly" ? plan.price : Math.round(plan.yearlyPrice / 12)}/
                        </span>
                        <span className="text-gray-600 ml-2">{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      
                      {billingCycle === "yearly" && plan.price > 0 && (
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-600 font-semibold">
                              Save ${calculateSavings(plan.price, plan.yearlyPrice).savings}/year
                            </span>
                            <Badge variant="success" className="text-xs">
                              {calculateSavings(plan.price, plan.yearlyPrice).savingsPercent}% off
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            Billed ${plan.yearlyPrice} yearly
                          </p>
                        </div>
                      )}
                      {plan.price === 0 && (
                        <p className="text-sm text-gray-600 mt-2">Forever free</p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex-1 mb-6">
                      <p className="text-sm font-semibold text-gray-900 mb-3">Includes:</p>
                      <div className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <p className="text-sm text-gray-700">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    {plan.isCurrentPlan ? (
                      <Button variant="secondary" disabled className="w-full">
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        variant={plan.price > 99 ? "primary" : "outline"}
                        onClick={() => handleUpgradePlan(plan.id)}
                        isLoading={isUpgrading && selectedPlan === plan.id}
                        className="w-full"
                      >
                        {plan.price < 99 ? "Downgrade" : "Upgrade"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">
                  All plans include a 14-day free trial. Cancel anytime. Need a custom plan?{" "}
                  <a href="#" className="text-primary hover:text-blue-900 font-semibold">
                    Contact sales
                  </a>
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
