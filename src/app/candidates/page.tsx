"use client";

import { useState } from "react";
import { DashboardLayout, Button, Badge, Card, CardBody, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Input } from "@/components";
import { EyeIcon } from "@/components/Icons";
import Link from "next/link";

interface Candidate {
  id: string;
  name: string;
  email: string;
  jobRole: string;
  decision: "qualified" | "not_qualified";
  addedDate: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    jobRole: "Senior Frontend Developer",
    decision: "qualified",
    addedDate: "2024-12-20",
  },
  {
    id: "2",
    name: "Michael Johnson",
    email: "michael@example.com",
    jobRole: "Senior Frontend Developer",
    decision: "qualified",
    addedDate: "2024-12-19",
  },
  {
    id: "3",
    name: "Alex Kumar",
    email: "alex@example.com",
    jobRole: "Product Manager",
    decision: "qualified",
    addedDate: "2024-12-18",
  },
  {
    id: "4",
    name: "Jessica Lee",
    email: "jessica@example.com",
    jobRole: "Product Manager",
    decision: "qualified",
    addedDate: "2024-12-17",
  },
];

export default function CandidatesPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = mockCandidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoogleSheetsSync = () => {
    setIsSyncing(true);
    // Simulate API call
    setTimeout(() => {
      setIsSyncing(false);
      setIsConnected(true);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            
            <h1 className="text-3xl font-bold text-gray-900">Shortlisted Candidates</h1>
            <p className="text-gray-600 mt-1">Interview-ready candidates from all jobs</p>
          </div>
        </div>

        {/* Search */}
        <div>
          <Input
            type="text"
            placeholder="Search by name, email, or job role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sync Button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleGoogleSheetsSync}
            isLoading={isSyncing}
          >
            {isConnected ? "Sync to Google Sheets" : "Sync to Google Sheets"}
          </Button>
        </div>

        {/* Google Sheets Status */}
        <Card className={isConnected ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}>
          <CardBody>
            <div className="flex gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                isConnected ? "bg-green-200" : "bg-amber-200"
              }`}>
                <span className={`text-xs font-bold ${isConnected ? "text-green-700" : "text-amber-700"}`}>
                  {isConnected ? "✓" : "!"}
                </span>
              </div>
              <div>
                <h3 className={`font-semibold ${isConnected ? "text-green-900" : "text-amber-900"}`}>
                  {isConnected ? "Google Sheets Connected" : "Not Connected to Google Sheets"}
                </h3>
                <p className={`text-sm mt-1 ${isConnected ? "text-green-800" : "text-amber-800"}`}>
                  {isConnected
                    ? "Your shortlisted candidates are being synced to Google Sheets."
                    : "Connect your Google Sheets account to automatically sync candidates."}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Candidates Table */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Candidates ({filteredCandidates.length})</h2>
          </CardHeader>
          <CardBody className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHeader>Name</TableCell>
                  <TableCell isHeader>Email</TableCell>
                  <TableCell isHeader>Job Role</TableCell>
                  <TableCell isHeader>AI Decision</TableCell>
                  <TableCell isHeader>Added Date</TableCell>
                  <TableCell isHeader>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <span className="font-medium text-gray-900">{candidate.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{candidate.email}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{candidate.jobRole}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">Qualified</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{candidate.addedDate}</span>
                    </TableCell>
                    <TableCell>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <EyeIcon className="w-5 h-5" />
                      </button>
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
