"use client";

import { useState } from "react";
import { DashboardLayout, Button, Input, Card, CardBody, CardHeader, CardFooter } from "@/components";
import Link from "next/link";

interface Question {
  id: string;
  label: string;
  type: "text" | "number" | "email" | "file";
  required: boolean;
}

export default function FormBuilderPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<{
    label: string;
    type: "text" | "number" | "email" | "file";
  }>({
    label: "",
    type: "text",
  });

  const addQuestion = () => {
    if (newQuestion.label.trim()) {
      setQuestions((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          label: newQuestion.label,
          type: newQuestion.type,
          required: true,
        },
      ]);
      setNewQuestion({ label: "", type: "text" });
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-8">
        {/* Page Header */}
        <div>
          <Link href="/dashboard" className="text-primary hover:text-blue-900 text-sm font-medium mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Build Application Form</h1>
          <p className="text-gray-600 mt-1">Customize your job application form</p>
        </div>

        {/* Default Fields */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Default Fields</h2>
          </CardHeader>
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900 font-medium">Full Name</span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Required</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900 font-medium">Email Address</span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Required</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900 font-medium">Phone Number</span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Required</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900 font-medium">CV Upload</span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Required</span>
            </div>
          </CardBody>
        </Card>

        {/* Custom Questions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Custom Questions</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {questions.length > 0 && (
              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">{idx + 1}. {q.label}</p>
                      <p className="text-xs text-gray-600 mt-1">Type: {q.type}</p>
                    </div>
                    <button
                      onClick={() => removeQuestion(q.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <Input
                  type="text"
                  placeholder="e.g., What's your experience with React?"
                  value={newQuestion.label}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({ ...prev, label: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                <select
                  className="input"
                  value={newQuestion.type}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      type: e.target.value as "text" | "number" | "email" | "file",
                    }))
                  }
                >
                  <option value="text">Short Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="file">File Upload</option>
                </select>
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={addQuestion}
                className="w-full"
              >
                + Add Question
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Form Preview Notice */}
        <Card className="border-green-200 bg-green-50">
          <CardBody>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-700 text-xs font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Form Preview Available</h3>
                <p className="text-sm text-green-800 mt-1">
                  You can preview how your form looks to applicants before publishing.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link href="/dashboard">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button variant="primary">Preview Form</Button>
          <Button variant="primary">Publish Form</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
