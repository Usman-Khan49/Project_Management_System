import React, { useState } from "react";
import { Plus, Calendar, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { useApp } from "../context/AppContext";
import { Table } from "../shared/Table";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";

export function Communications() {
  const { communications, addCommunication, clients } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCommunication, setNewCommunication] = useState({
    type: "email",
  });

  const columns = [
    {
      header: "Type",
      accessor: "type",
      render: (value) => {
        const icons = {
          email: <Mail className="w-4 h-4 text-blue-500" />,
          meeting: <Calendar className="w-4 h-4 text-green-500" />,
          call: <Phone className="w-4 h-4 text-purple-500" />,
        };
        return (
          <div className="flex items-center space-x-2">
            {icons[value]}
            <span className="capitalize">{value}</span>
          </div>
        );
      },
    },
    {
      header: "Client",
      accessor: "clientId",
      render: (value) => clients.find((c) => c.id === value)?.name || "Unknown",
    },
    { header: "Subject", accessor: "subject" },
    {
      header: "Date",
      accessor: "date",
      render: (value) => format(new Date(value), "MMM d, yyyy"),
    },
  ];

  const handleAddCommunication = () => {
    if (
      !newCommunication.clientId ||
      !newCommunication.subject ||
      !newCommunication.content
    ) {
      return;
    }

    addCommunication({
      ...newCommunication,
      id: Date.now().toString(),
      date: new Date(),
    });

    setIsAddModalOpen(false);
    setNewCommunication({ type: "email" });
  };

  return (
    <>
      <div
        className={`custom-cursor ${isExpanded ? "expanded" : ""}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          backgroundColor: isCursorOnWhite ? "black" : "white",
        }}
      ></div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
            Add Communication
          </Button>
        </div>

        <Card>
          <Table
            data={communications}
            columns={columns}
            onRowClick={(communication) =>
              console.log("Selected communication:", communication)
            }
          />
        </Card>

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Add New Communication
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    value={newCommunication.type}
                    onChange={(e) =>
                      setNewCommunication({
                        ...newCommunication,
                        type: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="email">Email</option>
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Client
                  </label>
                  <select
                    value={newCommunication.clientId}
                    onChange={(e) =>
                      setNewCommunication({
                        ...newCommunication,
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
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newCommunication.subject || ""}
                    onChange={(e) =>
                      setNewCommunication({
                        ...newCommunication,
                        subject: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    value={newCommunication.content || ""}
                    onChange={(e) =>
                      setNewCommunication({
                        ...newCommunication,
                        content: e.target.value,
                      })
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
                  <Button onClick={handleAddCommunication}>
                    Add Communication
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
