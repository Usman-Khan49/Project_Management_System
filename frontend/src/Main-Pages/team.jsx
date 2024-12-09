import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Add this import
import "./team.css";

function team() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const logoRef = useRef(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    role: "viewer",
    activity: [],
  });
  const [isCursorOnWhite, setIsCursorOnWhite] = useState(false);

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

    const handleMouseDown = () => setIsExpanded(true);
    const handleMouseUp = () => setIsExpanded(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const logoElement = logoRef.current;
    if (logoElement) {
      logoElement.style.animation = "float 3s ease-in-out infinite";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const addMember = () => {
    if (newMember.name && newMember.role) {
      const updatedMembers = [
        ...teamMembers,
        { ...newMember, id: Date.now().toString() },
      ];
      setTeamMembers(updatedMembers);
      setIsModalOpen(false);
      setNewMember({ id: "", name: "", role: "viewer", activity: [] });
    } else {
      alert("Please fill in all fields before adding a member.");
    }
  };

  const deleteMember = (memberId) => {
    const updatedMembers = teamMembers.filter((m) => m.id !== memberId);
    setTeamMembers(updatedMembers);
    setSelectedMember(null);
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

      <div className="together">
        <img
          ref={logoRef}
          src="https://freesvg.org/img/1455418577.png"
          className="floating-logo"
          alt="Logo"
        />
        <div className="header">
          <h1>Team Management</h1>
          <i className="fa-solid fa-user"></i>
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
          <div className="team-list">
            {teamMembers.map((member) => (
              <button key={member.id} onClick={() => setSelectedMember(member)}>
                {member.name}
              </button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)}>Add Member</button>
          {selectedMember && (
            <div className="member-details">
              <h2>{selectedMember.name}</h2>
              <p>Role: {selectedMember.role}</p>
              <h3>Activity:</h3>
              <ul>
                {selectedMember.activity.map((act, index) => (
                  <li key={index}>
                    {act.date.toDateString()} - {act.description}
                  </li>
                ))}
              </ul>
              <button onClick={() => deleteMember(selectedMember.id)}>
                Delete Member
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Member</h2>
            <input
              type="text"
              placeholder="Member Name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />
            <select
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <div className="modal-actions">
              <button onClick={addMember}>Add Member</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default team;
