import React, { useState } from "react";
import { Plus, Star } from "lucide-react";
import { format } from "date-fns";
import { useApp } from "../context/AppContext";
import { Table } from "../shared/Table";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";

export function Feedback() {
  const { feedback, addFeedback, clients } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    score: 5,
  });

  const columns = [
    {
      header: "Client",
      accessor: "clientId",
      render: (value) => clients.find((c) => c.id === value)?.name || "Unknown",
    },
    {
      header: "Score",
      accessor: "score",
      render: (value) => (
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Number(value)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      ),
    },
    { header: "Category", accessor: "category" },
    {
      header: "Date",
      accessor: "date",
      render: (value) => format(new Date(value), "MMM d, yyyy"),
    },
    { header: "Comment", accessor: "comment" },
  ];

  const handleAddFeedback = () => {
    if (
      !newFeedback.clientId ||
      !newFeedback.category ||
      !newFeedback.comment
    ) {
      return;
    }

    addFeedback({
      ...newFeedback,
      id: Date.now().toString(),
      date: new Date(),
    });

    setIsAddModalOpen(false);
    setNewFeedback({ score: 5 });
  };

  const categories = [
    "Service Quality",
    "Communication",
    "Timeliness",
    "Value",
    "Overall Experience",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Add Feedback
        </Button>
      </div>

      <Card>
        <Table
          data={feedback}
          columns={columns}
          onRowClick={(feedback) => console.log("Selected feedback:", feedback)}
        />
      </Card>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add New Feedback
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <select
                  value={newFeedback.clientId}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, clientId: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={newFeedback.category}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Score
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setNewFeedback({ ...newFeedback, score: i + 1 })
                      }
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          i < (newFeedback.score || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  value={newFeedback.comment || ""}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, comment: e.target.value })
                  }
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddFeedback}>Add Feedback</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
