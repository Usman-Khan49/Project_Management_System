import React, { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { format } from "date-fns";
import { useApp } from "../context/AppContext";
import { Table } from "../shared/Table";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";

export function Deliverables() {
  const { deliverables, addDeliverable, updateDeliverable, clients } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDeliverable, setNewDeliverable] = useState({
    status: "pending",
    progress: 0,
  });

  const columns = [
    { header: "Title", accessor: "title" },
    {
      header: "Client",
      accessor: "clientId",
      render: (value) => clients.find((c) => c.id === value)?.name || "Unknown",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            {
              pending: "bg-yellow-100 text-yellow-800",
              "in-progress": "bg-blue-100 text-blue-800",
              review: "bg-purple-100 text-purple-800",
              completed: "bg-green-100 text-green-800",
            }[value]
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      render: (value) => format(new Date(value), "MMM d, yyyy"),
    },
    {
      header: "Progress",
      accessor: "progress",
      render: (value) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 rounded-full h-2"
            style={{ width: `${value}%` }}
          />
        </div>
      ),
    },
  ];

  const handleAddDeliverable = () => {
    if (
      !newDeliverable.clientId ||
      !newDeliverable.title ||
      !newDeliverable.dueDate
    ) {
      return;
    }

    addDeliverable({
      ...newDeliverable,
      id: Date.now().toString(),
    });

    setIsAddModalOpen(false);
    setNewDeliverable({
      status: "pending",
      progress: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Deliverables</h1>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Add Deliverable
        </Button>
      </div>

      <Card>
        <Table
          data={deliverables}
          columns={columns}
          onRowClick={(deliverable) => {
            const newProgress = Math.min(100, deliverable.progress + 10);
            updateDeliverable(deliverable.id, {
              ...deliverable,
              progress: newProgress,
            });
          }}
        />
      </Card>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add New Deliverable
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <select
                  value={newDeliverable.clientId || ""}
                  onChange={(e) =>
                    setNewDeliverable({
                      ...newDeliverable,
                      clientId: e.target.value,
                    })
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
                  Title
                </label>
                <input
                  type="text"
                  value={newDeliverable.title || ""}
                  onChange={(e) =>
                    setNewDeliverable({
                      ...newDeliverable,
                      title: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newDeliverable.description || ""}
                  onChange={(e) =>
                    setNewDeliverable({
                      ...newDeliverable,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={
                    newDeliverable.dueDate
                      ? new Date(newDeliverable.dueDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setNewDeliverable({
                      ...newDeliverable,
                      dueDate: new Date(e.target.value),
                    })
                  }
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
                <Button onClick={handleAddDeliverable}>Add Deliverable</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
