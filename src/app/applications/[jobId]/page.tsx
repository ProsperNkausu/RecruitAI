"use client";

import { useState } from "react";
import { DashboardLayout, Button, Badge, Card, CardBody, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Input } from "@/components";
import { EyeIcon } from "@/components/Icons";
import Link from "next/link";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  decision: "qualified" | "not_qualified" | "pending";
  reason: string;
  appliedAt: string;
  cvFile?: string;
  cvName?: string;
  reactExperience: string;
  yearsExperience: string;
  missingRequirements?: string[];
}

const mockApplications: Application[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    decision: "qualified",
    reason: "Meets all technical requirements",
    appliedAt: "2024-12-20",
    cvFile: "sarah_chen_resume.pdf",
    cvName: "Sarah Chen Resume",
    reactExperience: "8 years of experience building complex React applications with TypeScript and modern tooling.",
    yearsExperience: "8",
    missingRequirements: [],
  },
  {
    id: "2",
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+1 (555) 234-5678",
    decision: "qualified",
    reason: "5+ years experience, matches role",
    appliedAt: "2024-12-19",
    cvFile: "michael_johnson_resume.pdf",
    cvName: "Michael Johnson Resume",
    reactExperience: "6 years working with React, Redux, and backend integration.",
    yearsExperience: "6",
    missingRequirements: [],
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+1 (555) 345-6789",
    decision: "not_qualified",
    reason: "Lacks required Python experience",
    appliedAt: "2024-12-19",
    cvFile: "emma_davis_resume.pdf",
    cvName: "Emma Davis Resume",
    reactExperience: "3 years with React, primarily frontend UI work.",
    yearsExperience: "3",
    missingRequirements: ["Insufficient React experience (3 years vs required 5+)", "Missing advanced TypeScript proficiency", "No experience with performance optimization"],
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    phone: "+1 (555) 456-7890",
    decision: "pending",
    reason: "Under review",
    appliedAt: "2024-12-18",
    cvFile: "james_wilson_resume.pdf",
    cvName: "James Wilson Resume",
    reactExperience: "5 years with React and Vue.js, good overall frontend skills.",
    yearsExperience: "5",
    missingRequirements: [],
  },
];

export default function ApplicationsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const [filter, setFilter] = useState<"all" | "qualified" | "not_qualified">("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps =
    filter === "all"
      ? mockApplications
      : mockApplications.filter((app) => app.decision === filter);

  const searchFilteredApps = filteredApps.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case "qualified":
        return <Badge variant="success">Qualified</Badge>;
      case "not_qualified":
        return <Badge variant="danger">Not Qualified</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="info">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className={`space-y-8 transition-all duration-300 ${selectedApp ? "blur-sm pointer-events-none" : ""}`}>
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Senior Frontend Developer
          </h1>
          <p className="text-gray-600 mt-1">
            {mockApplications.length} applications received
          </p>
        </div>

        {/* Search */}
        <div>
          <Input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 border-b border-gray-200">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              filter === "all"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            All ({mockApplications.length})
          </button>
          <button
            onClick={() => setFilter("qualified")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              filter === "qualified"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Qualified ({mockApplications.filter((a) => a.decision === "qualified").length})
          </button>
          <button
            onClick={() => setFilter("not_qualified")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              filter === "not_qualified"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Not Qualified ({mockApplications.filter((a) => a.decision === "not_qualified").length})
          </button>
        </div>

        {/* Applications Table */}
        <Card>
          <CardBody className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHeader>Name</TableCell>
                  <TableCell isHeader>Email</TableCell>
                  <TableCell isHeader>Decision</TableCell>
                  <TableCell isHeader>Reason</TableCell>
                  <TableCell isHeader>Applied</TableCell>
                  <TableCell isHeader>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchFilteredApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <span className="font-medium text-gray-900">{app.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{app.email}</span>
                    </TableCell>
                    <TableCell>{getDecisionBadge(app.decision)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{app.reason}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{app.appliedAt}</span>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => setSelectedApp(app)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {filteredApps.length === 0 && (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600">No applications found for this filter.</p>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Application Detail Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-full md:w-1/2 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 z-40 overflow-y-auto ${
          selectedApp ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedApp && (
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
              <Button
                variant="secondary"
                onClick={() => setSelectedApp(null)}
              >
                ✕ Close
              </Button>
            </div>

            {/* Applicant Card */}
            <Card>
              <CardBody className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedApp.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedApp.decision === "qualified" ? "✓ " : ""}Software Developer</p>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{selectedApp.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Applied</p>
                    <p className="font-medium text-gray-900">{new Date(selectedApp.appliedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Decision Status */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Screening Status</p>
                  <div className="flex items-center gap-2">
                    {selectedApp.decision === "qualified" && (
                      <>
                        <Badge variant="success">Qualified</Badge>
                        <p className="text-sm text-gray-600 ml-2">{selectedApp.reason}</p>
                      </>
                    )}
                    {selectedApp.decision === "not_qualified" && (
                      <>
                        <Badge variant="danger">Not Qualified</Badge>
                        <p className="text-sm text-gray-600 ml-2">{selectedApp.reason}</p>
                      </>
                    )}
                    {selectedApp.decision === "pending" && (
                      <>
                        <Badge variant="warning">Pending</Badge>
                        <p className="text-sm text-gray-600 ml-2">{selectedApp.reason}</p>
                      </>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Experience & Answers */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Experience & Answers</h3>
              </CardHeader>
              <CardBody className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">Years of Experience</p>
                  <p className="text-gray-900">{selectedApp.yearsExperience} years</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">React Experience</p>
                  <p className="text-gray-900 whitespace-pre-wrap text-sm">{selectedApp.reactExperience}</p>
                </div>
              </CardBody>
            </Card>

            {/* CV Section */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold text-sm">PDF</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{selectedApp.cvName || selectedApp.cvFile}</p>
                    <p className="text-sm text-gray-600">Document</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Download
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Missing Requirements (for not qualified) */}
            {selectedApp.decision === "not_qualified" && selectedApp.missingRequirements && selectedApp.missingRequirements.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-red-900">Missing Requirements</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    {selectedApp.missingRequirements.map((req, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-red-600 text-xs font-bold">!</span>
                        </div>
                        <p className="text-red-900 text-sm">{req}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pb-8">
              {selectedApp.decision === "qualified" && (
                <>
                  <Button variant="primary" className="w-full">
                    Schedule Interview
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Send Offer
                  </Button>
                </>
              )}
              {selectedApp.decision === "not_qualified" && (
                <Button variant="secondary" className="w-full">
                  Send Rejection
                </Button>
              )}
              {selectedApp.decision === "pending" && (
                <>
                  <Button variant="primary" className="w-full">
                    Mark as Qualified
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Mark as Not Qualified
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
