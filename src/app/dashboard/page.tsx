"use client";

import { DashboardLayout, Button, Card, CardBody, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from "@/components";
import { EyeIcon } from "@/components/Icons";
import Link from "next/link";

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    applications: 24,
    status: "Open",
    createdAt: "2024-12-15",
  },
  {
    id: "2",
    title: "Product Manager",
    applications: 18,
    status: "Open",
    createdAt: "2024-12-10",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    applications: 12,
    status: "Closed",
    createdAt: "2024-12-01",
  },
];

const mockStats = [
  { label: "Active Jobs", value: "2", color: "text-blue-700" },
  { label: "Total Applications", value: "54", color: "text-green-700" },
  { label: "Shortlisted Candidates", value: "12", color: "text-purple-700" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Acme Corp</p>
          </div>
          <Link href="/jobs/new">
            <Button variant="primary">Create New Job</Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockStats.map((stat) => (
            <Card key={stat.label}>
              <CardBody className="text-center py-6">
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Recent Jobs Table */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
          </CardHeader>
          <CardBody className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHeader>Job Title</TableCell>
                  <TableCell isHeader>Applications</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader>Created</TableCell>
                  <TableCell isHeader>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <span className="font-medium text-gray-900">{job.title}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{job.applications}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{job.createdAt}</span>
                    </TableCell>
                    <TableCell>
                      <Link href={`/applications/${job.id}`}>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
