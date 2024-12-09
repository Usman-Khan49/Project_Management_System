import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./clientList.css";

export function ClientList() {
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    project: "all",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    status: "active",
    projects: [],
    tags: [],
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorOnWhite, setIsCursorOnWhite] = useState(false);
  const logoRef = useRef(null);

  // Filter clients based on search and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      client.company.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" || client.status === filters.status;

    const matchesProject =
      filters.project === "all" || client.projects.includes(filters.project);

    return matchesSearch && matchesStatus && matchesProject;
  });

  const addClient = () => {
    if (!newClient.name || !newClient.email || !newClient.company) {
      alert("Please fill in all required fields");
      return;
    }

    const client = {
      ...newClient,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setClients([...clients, client]);
    setIsModalOpen(false);
    setNewClient({
      status: "active",
      projects: [],
      tags: [],
    });
  };

  // Cursor effect handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (
        element &&
        window.getComputedStyle(element).backgroundColor ===
          "rgb(255, 255, 255)"
      ) {
        setIsCursorOnWhite(true);
      } else {
        setIsCursorOnWhite(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          backgroundColor: isCursorOnWhite ? "black" : "white",
        }}
      />

      <div className="together">
        <img
          ref={logoRef}
          src="https://freesvg.org/img/1455418577.png"
          className="floating-logo"
          alt="Logo"
        />
        <div className="header">
          <h1>Client Management</h1>
        </div>
      </div>

      <div className="shortcut">
        <div className="overview">
          <Link to="/dashboard" className="dashboard">
            <i className="fa-solid fa-house"></i>
          </Link>
          <Link to="/task_management" className="task-management">
            <i className="fa-solid fa-list-check"></i>
          </Link>
          <Link to="/tracking" className="progress-reporting">
            <i className="fa-solid fa-bars-progress"></i>
          </Link>
          <Link to="/team" className="team">
            <i className="fa-solid fa-people-group"></i>
          </Link>
          <Link to="/timeline_management" className="timeline_management">
            <i class="fa-solid fa-timeline"></i>
          </Link>
          <Link to="/clients" className="client-list">
            <i className="fa-solid fa-users"></i>
          </Link>
          <Link to="/communications" className="communications">
            <i className="fa-solid fa-envelope"></i>
          </Link>
          <Link to="Deliverables" className="deliverables">
            <i className="fa-solid fa-box"></i>
          </Link>
          <Link to="/feedback" className="feedback">
            <i className="fa-solid fa-chart-bar"></i>
          </Link>

          <Link to="/settings" className="settings">
            <i className="fa-solid fa-gear"></i>
          </Link>
          <Link to="/help" className="help">
            <i className="fa-solid fa-circle-info"></i>
          </Link>
        </div>
        <div className="main">
          <div className="filters">
            <input
              type="text"
              placeholder="Search clients..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filters.project}
              onChange={(e) =>
                setFilters({ ...filters, project: e.target.value })
              }
            >
              <option value="all">All Projects</option>
            </select>
          </div>

          <table className="client-table">
            <thead>
              <tr>
                <th style={{ color: "black" }}>Name</th>
                <th style={{ color: "black" }}>Company</th>
                <th style={{ color: "black" }}>Email</th>
                <th style={{ color: "black" }}>Status</th>
                <th style={{ color: "black" }}>Projects</th>
                <th style={{ color: "black" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.company}</td>
                  <td>{client.email}</td>
                  <td>{client.status}</td>
                  <td>{client.projects.join(", ")}</td>
                  <td>
                    <button onClick={() => {}}>Edit</button>
                    <button onClick={() => {}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => setIsModalOpen(true)}>Add Client</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Client</h2>
            <input
              type="text"
              placeholder="Name"
              value={newClient.name || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Company"
              value={newClient.company || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, company: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={addClient}>Add Client</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClientList;
