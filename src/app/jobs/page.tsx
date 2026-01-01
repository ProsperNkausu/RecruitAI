"use client";

import { useState } from "react";
import { DashboardLayout, Button, Card, CardBody, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Badge, Input } from "@/components";
import { EyeIcon, TrashIcon } from "@/components/Icons";
import Link from "next/link";

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    applications: 24,
    status: "Open",
    createdAt: "2024-12-15",
    positions: 2,
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    applications: 18,
    status: "Open",
    createdAt: "2024-12-10",
    positions: 1,
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    applications: 12,
    status: "Open",
    createdAt: "2024-12-08",
    positions: 1,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    applications: 8,
    status: "Closed",
    createdAt: "2024-12-01",
    positions: 1,
  },
];

export default function ActiveJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState(mockJobs);
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const activeJobs = jobs.filter((job) => job.status === "Open");
  const closedJobs = jobs.filter((job) => job.status === "Closed");

  const handleCloseJob = (jobId: string) => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, status: "Closed" } : job));
  };

  const handleOpenPanel = (job: typeof mockJobs[0]) => {
    setSelectedJob(job);
    setJobTitle(job.title);
    setJobDescription(`${job.department} • ${job.location}`);
  };

  const handleClosePanel = () => {
    setSelectedJob(null);
    setCopied(false);
  };

  const handleCopyLink = () => {
    const applicationLink = `${window.location.origin}/apply/${selectedJob?.id}`;
    navigator.clipboard.writeText(applicationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredActiveJobs = activeJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Jobs</h1>
            <p className="text-gray-600 mt-1">Manage your job postings</p>
          </div>
          <Link href="/jobs/new">
            <Button variant="primary">Post New Job</Button>
          </Link>
        </div>

        {/* Active Jobs Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardBody className="text-center py-6">
              <p className="text-gray-600 text-sm font-medium">Active Postings</p>
              <p className="text-3xl font-bold text-primary mt-2">{activeJobs.length}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center py-6">
              <p className="text-gray-600 text-sm font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {mockJobs.reduce((sum, job) => sum + job.applications, 0)}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center py-6">
              <p className="text-gray-600 text-sm font-medium">Open Positions</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {activeJobs.reduce((sum, job) => sum + job.positions, 0)}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Search */}
        <div>
          <Input
            type="text"
            placeholder="Search by job title, department, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Active Jobs Table */}
        {filteredActiveJobs.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Open Positions ({filteredActiveJobs.length})</h2>
            </CardHeader>
            <CardBody className="p-0">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell isHeader>Job Title</TableCell>
                    <TableCell isHeader>Department</TableCell>
                    <TableCell isHeader>Location</TableCell>
                    <TableCell isHeader>Applications</TableCell>
                    <TableCell isHeader>Positions</TableCell>
                    <TableCell isHeader>Posted</TableCell>
                    <TableCell isHeader>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredActiveJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <span className="font-medium text-gray-900">{job.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.department}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.location}</span>
                      </TableCell>
                      <TableCell>
                        <Link href={`/applications/${job.id}`} className="text-primary hover:underline font-medium">
                          {job.applications}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.positions}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.createdAt}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleOpenPanel(job)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View job details"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleCloseJob(job.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Close job listing"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        )}

        {/* Closed Jobs Table */}
        {closedJobs.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Closed Positions</h2>
            </CardHeader>
            <CardBody className="p-0">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell isHeader>Job Title</TableCell>
                    <TableCell isHeader>Department</TableCell>
                    <TableCell isHeader>Location</TableCell>
                    <TableCell isHeader>Applications</TableCell>
                    <TableCell isHeader>Status</TableCell>
                    <TableCell isHeader>Closed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {closedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <span className="font-medium text-gray-900">{job.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.department}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.location}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.applications}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="warning">Closed</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{job.createdAt}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Right Side Panel */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClosePanel}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
            {/* Panel Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Job Details</h2>
              <button
                onClick={handleClosePanel}
                className="p-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Panel Content */}
            <div className="p-6 space-y-6">
              {/* Job Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedJob.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{selectedJob.department} • {selectedJob.location}</p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Applications</p>
                    <p className="text-2xl font-bold text-primary">{selectedJob.applications}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Positions</p>
                    <p className="text-2xl font-bold text-green-600">{selectedJob.positions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Posted</p>
                    <p className="text-sm font-medium text-gray-900">{selectedJob.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* Application Link */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/apply/${selectedJob.id}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      copied
                        ? "bg-green-100 text-green-700"
                        : "bg-primary text-white hover:bg-blue-900"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <Link href={`/applications/${selectedJob.id}`}>
                  <Button variant="primary" className="w-full">
                    View Applications
                  </Button>
                </Link>
                <Link href={`/jobs/new?edit=${selectedJob.id}`}>
                  <Button variant="secondary" className="w-full">
                    Edit Job Details
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    handleCloseJob(selectedJob.id);
                    handleClosePanel();
                  }}
                  className="w-full px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-medium transition-colors"
                >
                  Close Job Posting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
