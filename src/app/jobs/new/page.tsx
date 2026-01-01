"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardLayout, Button, Input, Select, Textarea, Card, CardBody, CardHeader, CardFooter } from "@/components";
import Link from "next/link";

export default function CreateJobPage() {
  const searchParams = useSearchParams();
  const editJobId = searchParams.get("edit");
  const isEditMode = !!editJobId;

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [jobLink, setJobLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    customDepartment: "",
    location: "",
    positions: "",
    requirements: "",
    applicationOpenDate: "",
    applicationOpenTime: "",
    applicationCloseDate: "",
    applicationCloseTime: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Load job data in edit mode
  useEffect(() => {
    if (isEditMode && editJobId) {
      // Simulate fetching job data from API
      const mockJobData = {
        "1": {
          title: "Senior Frontend Developer",
          department: "engineering",
          customDepartment: "",
          location: "San Francisco, CA",
          positions: "2",
          requirements: "5+ years React experience, TypeScript, strong communication skills",
          applicationOpenDate: "2024-12-15",
          applicationOpenTime: "09:00",
          applicationCloseDate: "2025-12-31",
          applicationCloseTime: "23:59",
          question1: "What's your experience with React and state management?",
          question2: "Describe your experience leading a project from design to deployment",
          question3: "How do you approach testing in your frontend projects?",
          question4: "Tell us about your experience with TypeScript",
        },
        "2": {
          title: "Product Manager",
          department: "product",
          customDepartment: "",
          location: "New York, NY",
          positions: "1",
          requirements: "3+ years PM experience, strong analytical skills",
          applicationOpenDate: "2024-12-10",
          applicationOpenTime: "09:00",
          applicationCloseDate: "2025-12-31",
          applicationCloseTime: "23:59",
          question1: "",
          question2: "",
          question3: "",
          question4: "",
        },
      };

      const jobData = mockJobData[editJobId as keyof typeof mockJobData];
      if (jobData) {
        setFormData(jobData);
      }
    }
  }, [isEditMode, editJobId]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (isEditMode) {
        // In edit mode, use existing job link
        setJobLink(`${window.location.origin}/apply/${editJobId}`);
      } else {
        // In create mode, generate new job link
        const jobId = Math.random().toString(36).substr(2, 9);
        setJobLink(`${window.location.origin}/apply/${jobId}`);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  const handleCopyLink = async () => {
    if (!jobLink) {
      return;
    }

    let copied = false;

    try {
      // Try modern Clipboard API first
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(jobLink);
        copied = true;
      }
    } catch (err) {
      console.error("Clipboard API failed:", err);
    }

    // Fallback: use textarea trick
    if (!copied) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = jobLink;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        copied = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
      }
    }

    if (copied) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <DashboardLayout>
      {/* Success Modal Popup */}
      {jobLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md animate-in fade-in zoom-in duration-300">
            <CardBody className="space-y-6 py-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-green-600">✓</span>
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? "Job Updated Successfully!" : "Job Created Successfully!"}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isEditMode ? "Your job posting has been updated" : "Share this link with applicants to apply for the position"}
                </p>
              </div>

              {/* Application Link - Only show in create mode */}
              {!isEditMode && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Application Link</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={jobLink}
                      readOnly
                      className="input flex-1 text-sm"
                    />
                    <Button
                      variant="secondary"
                      onClick={handleCopyLink}
                      className={`transition-colors duration-300 ${isCopied ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <span className={`transition-opacity duration-300 ${isCopied ? "opacity-0" : "opacity-100"}`}>
                        Copy
                      </span>
                      <span className={`absolute transition-opacity duration-300 ${isCopied ? "opacity-100" : "opacity-0"}`}>
                        Copied!
                      </span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Job Info */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-900">
                  <span className="font-semibold">{isEditMode ? "Job Updated:" : "Job Created:"}</span> {formData.title} • {formData.department === "other" ? formData.customDepartment : formData.department}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {isEditMode ? (
                  <>
                    <Link href="/jobs" className="flex-1">
                      <Button variant="secondary" className="w-full">
                        Back to Jobs
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setJobLink(null);
                        setShowPreview(false);
                      }}
                      className="flex-1"
                    >
                      Continue Editing
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" className="flex-1">
                      <Button variant="secondary" className="w-full">
                        Back to Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setJobLink(null);
                        setShowPreview(false);
                        setFormData({
                          title: "",
                          department: "",
                          customDepartment: "",
                          location: "",
                          positions: "",
                          requirements: "",
                          applicationOpenDate: "",
                          applicationOpenTime: "",
                          applicationCloseDate: "",
                          applicationCloseTime: "",
                          question1: "",
                          question2: "",
                          question3: "",
                          question4: "",
                        });
                      }}
                      className="flex-1"
                    >
                      Create Another Job
                    </Button>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {!jobLink && (
        // Main Form with Preview Split
        <div className={`transition-opacity duration-300 ${showPreview ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
          <div className="max-w-4xl space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? "Edit Job Posting" : "Create New Job"}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditMode ? "Update job details and screening criteria" : "Define the role and screening criteria"}
              </p>
            </div>

            {/* Job Details Form */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Job Details</h2>
              </CardHeader>
              <CardBody className="space-y-6">
                <Input
                  label="Job Title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior Frontend Developer"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    options={[
                      { value: "engineering", label: "Engineering" },
                      { value: "product", label: "Product" },
                      { value: "design", label: "Design" },
                      { value: "sales", label: "Sales" },
                      { value: "marketing", label: "Marketing" },
                      { value: "hr", label: "Human Resources" },
                      { value: "other", label: "Other" },
                    ]}
                    required
                  />

                  {formData.department === "other" && (
                    <Input
                      label="Specify Department"
                      name="customDepartment"
                      type="text"
                      value={formData.customDepartment}
                      onChange={handleChange}
                      placeholder="Enter your department name"
                      required
                    />
                  )}

                  {formData.department !== "other" && (
                    <Input
                      label="Location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., San Francisco, CA"
                      required
                    />
                  )}
                </div>

                {formData.department === "other" && (
                  <Input
                    label="Location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                    required
                  />
                )}

                <Input
                  label="Number of Positions"
                  name="positions"
                  type="number"
                  value={formData.positions}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  required
                />

                <Textarea
                  label="Job Requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List key requirements, skills, experience level, and education requirements..."
                  helperText="RecruitAI will evaluate candidates based on these requirements"
                  required
                />
              </CardBody>
            </Card>

            {/* Application Timeline and Custom Screening Questions - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Application Timeline */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">Application Timeline</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Application Opens"
                      name="applicationOpenDate"
                      type="date"
                      value={formData.applicationOpenDate}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Time"
                      name="applicationOpenTime"
                      type="time"
                      value={formData.applicationOpenTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Application Closes"
                      name="applicationCloseDate"
                      type="date"
                      value={formData.applicationCloseDate}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Time"
                      name="applicationCloseTime"
                      type="time"
                      value={formData.applicationCloseTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardBody>
              </Card>

              {/* Custom Screening Questions */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">Custom Screening Questions</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                  <p className="text-sm text-gray-600">Add custom questions to evaluate candidates more effectively.</p>
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      label="Question 1"
                      name="question1"
                      type="text"
                      value={formData.question1}
                      onChange={handleChange}
                      placeholder="e.g., Describe your most challenging project"
                    />
                    <Input
                      label="Question 2"
                      name="question2"
                      type="text"
                      value={formData.question2}
                      onChange={handleChange}
                      placeholder="e.g., How do you handle tight deadlines?"
                    />
                    <Input
                      label="Question 3"
                      name="question3"
                      type="text"
                      value={formData.question3}
                      onChange={handleChange}
                      placeholder="e.g., Tell us about your teamwork experience"
                    />
                    <Input
                      label="Question 4"
                      name="question4"
                      type="text"
                      value={formData.question4}
                      onChange={handleChange}
                      placeholder="e.g., What motivates you in this role?"
                    />
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* AI Screening Notice */}
            <Card className="border-blue-200 bg-blue-50">
              <CardBody>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-700 text-xs font-bold">i</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Smart Screening</h3>
                    <p className="text-sm text-blue-800 mt-1">
                      RecruitAI will automatically evaluate all candidates against the requirements you&apos;ve provided. AI screening results will help you identify qualified candidates quickly.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Form Actions */}
            <div className="flex gap-3 justify-end">
              <Link href="/dashboard">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <form onSubmit={handleContinue} className="contents">
                <Button
                  type="submit"
                  variant="primary"
                >
                  Continue to Preview
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Preview Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-full md:w-1/2 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 z-40 overflow-y-auto ${
          showPreview ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 space-y-8">
          {/* Preview Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Preview for Applicants</h2>
          </div>

          {/* Applicant Preview */}
          <Card>
            <CardBody className="space-y-6">
              {/* Job Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {"Acme Corporation".charAt(0)}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">Acme Corporation</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{formData.title || "Job Title"}</h3>
                <p className="text-gray-600 mt-1">{formData.department === "other" ? formData.customDepartment : formData.department} • {formData.location}</p>
              </div>

              {/* Application Status */}
              {formData.applicationOpenDate && formData.applicationCloseDate && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Application Period:</span> {new Date(formData.applicationOpenDate).toLocaleDateString()} to {new Date(formData.applicationCloseDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Job Details */}
              <div className="space-y-4">
                {formData.positions && (
                  <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Open Positions</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">{formData.positions}</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">Requirements</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{formData.requirements || "No requirements specified"}</p>
                </div>
              </div>

              {/* Screening Questions */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Custom Screening Questions</h4>
                <div className="space-y-3">
                  {formData.question1 && (
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700">{formData.question1}</p>
                    </div>
                  )}
                  {formData.question2 && (
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700">{formData.question2}</p>
                    </div>
                  )}
                  {formData.question3 && (
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700">{formData.question3}</p>
                    </div>
                  )}
                  {formData.question4 && (
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700">{formData.question4}</p>
                    </div>
                  )}
                  {!formData.question1 && !formData.question2 && !formData.question3 && !formData.question4 && (
                    <p className="text-sm text-gray-500 italic">No custom screening questions added yet</p>
                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Privacy Notice:</span> Your application will be evaluated using AI screening technology. Your data will be handled securely according to our privacy policy.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Preview Actions */}
          <div className="flex gap-3 justify-between pb-8">
            <Button
              variant="secondary"
              onClick={handleBack}
              className="flex-1"
            >
              Back to Edit
            </Button>
            <form onSubmit={handleCreate} className="flex-1">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
              >
                {isEditMode ? "Save Changes" : "Create Job & Generate Link"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
