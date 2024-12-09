import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./timeline_management.css";
import { Link } from "react-router-dom";

const localizer = momentLocalizer(moment);

function TimelineManagement({ projects, setProjects }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const logoRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    id: "",
    title: "",
    date: new Date(),
    dependencies: [],
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

  const addMilestone = () => {
    if (selectedProject && newMilestone.title && newMilestone.date) {
      const updatedProject = {
        ...selectedProject,
        milestones: [
          ...selectedProject.milestones,
          { ...newMilestone, id: Date.now().toString() },
        ],
      };
      console.log("Adding milestone:", newMilestone); // Debugging line
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
      setSelectedProject(updatedProject);
      setIsModalOpen(false);
      setNewMilestone({
        id: "",
        title: "",
        date: new Date(),
        dependencies: [],
      });
    } else {
      alert("Please fill in all fields before adding a milestone.");
    }
  };

  const deleteMilestone = (milestoneId) => {
    if (selectedProject) {
      const updatedProject = {
        ...selectedProject,
        milestones: selectedProject.milestones.filter(
          (m) => m.id !== milestoneId
        ),
      };
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
      setSelectedProject(updatedProject);
    }
  };

  const checkApproachingDeadlines = () => {
    const today = new Date();
    const approachingMilestones = projects.flatMap((project) =>
      project.milestones.filter((milestone) => {
        const daysUntilDeadline = Math.ceil(
          (milestone.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilDeadline <= 7 && daysUntilDeadline > 0;
      })
    );

    if (approachingMilestones.length > 0) {
      alert(
        `You have ${approachingMilestones.length} milestone(s) approaching in the next 7 days!`
      );
      // Here you would typically call your email notification function
      // sendEmailNotification(approachingMilestones);
    }
  };

  useEffect(() => {
    // Check for approaching deadlines every day
    const interval = setInterval(
      checkApproachingDeadlines,
      24 * 60 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, [projects]);

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
          <h1>Timeline Management</h1>
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
          <div className="project-list">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  if (!project.milestones) {
                    console.error(
                      "Selected project has no milestones:",
                      project
                    );
                  }
                }}
              >
                {project.title}
              </button>
            ))}
          </div>
          {selectedProject && (
            <div className="project-timeline">
              <h2>{selectedProject.title}</h2>
              {selectedProject.milestones.length > 0 ? (
                <Calendar
                  localizer={localizer}
                  events={selectedProject.milestones.map((m) => ({
                    ...m,
                    start: m.date,
                    end: m.date,
                  }))}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
              ) : (
                <p>No milestones available for this project.</p>
              )}
              <button onClick={() => setIsModalOpen(true)}>
                Add Milestone
              </button>
              <div className="milestone-list">
                {selectedProject.milestones.map((milestone) => (
                  <div key={milestone.id} className="milestone-item">
                    <h3>{milestone.title}</h3>
                    <p>Date: {milestone.date.toDateString()}</p>
                    <p>Dependencies: {milestone.dependencies.join(", ")}</p>
                    <button onClick={() => deleteMilestone(milestone.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Milestone</h2>
            <input
              type="text"
              placeholder="Milestone Title"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
            />
            <input
              type="date"
              value={newMilestone.date.toISOString().split("T")[0]}
              onChange={(e) =>
                setNewMilestone({
                  ...newMilestone,
                  date: new Date(e.target.value),
                })
              }
            />
            <select
              multiple
              value={newMilestone.dependencies}
              onChange={(e) =>
                setNewMilestone({
                  ...newMilestone,
                  dependencies: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
            >
              {selectedProject?.milestones.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button onClick={addMilestone}>Add Milestone</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TimelineManagement;
