import React, { useState, useEffect, useRef } from "react";
import "./tracking.css";

function Tracking() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const logoRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    status: "Not Started",
    assignedTo: "",
    deadline: new Date(),
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

    // Fetch projects from task management page
    fetch("/path/to/task/management/api")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const addTask = () => {
    if (
      selectedProject &&
      newTask.title &&
      newTask.assignedTo &&
      newTask.deadline
    ) {
      const updatedProject = {
        ...selectedProject,
        tasks: [
          ...selectedProject.tasks,
          { ...newTask, id: Date.now().toString() },
        ],
      };
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
      setSelectedProject(updatedProject);
      setIsModalOpen(false);
      setNewTask({
        id: "",
        title: "",
        status: "Not Started",
        assignedTo: "",
        deadline: new Date(),
      });
    } else {
      alert("Please fill in all fields before adding a task.");
    }
  };

  const deleteTask = (taskId) => {
    if (selectedProject) {
      const updatedProject = {
        ...selectedProject,
        tasks: selectedProject.tasks.filter((t) => t.id !== taskId),
      };
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
      setSelectedProject(updatedProject);
    }
  };

  const exportReport = () => {
    if (selectedProject) {
      const report = {
        projectTitle: selectedProject.title,
        tasks: selectedProject.tasks,
        completionRate:
          (selectedProject.tasks.filter((t) => t.status === "Completed")
            .length /
            selectedProject.tasks.length) *
          100,
      };
      const blob = new Blob([JSON.stringify(report, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedProject.title}_report.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
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
          <h1>Progress Tracking and Reporting</h1>
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
                onClick={() => setSelectedProject(project)}
              >
                {project.title}
              </button>
            ))}
          </div>
          {selectedProject && (
            <div className="project-timeline">
              <h2>{selectedProject.title}</h2>
              <button onClick={() => setIsModalOpen(true)}>Add Task</button>
              <button onClick={exportReport}>Export Report</button>
              <div className="task-list">
                {selectedProject.tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <h3>{task.title}</h3>
                    <p>Status: {task.status}</p>
                    <p>Assigned To: {task.assignedTo}</p>
                    <p>Deadline: {task.deadline.toDateString()}</p>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
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
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Assigned To"
              value={newTask.assignedTo}
              onChange={(e) =>
                setNewTask({ ...newTask, assignedTo: e.target.value })
              }
            />
            <input
              type="date"
              value={newTask.deadline.toISOString().split("T")[0]}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: new Date(e.target.value) })
              }
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="modal-actions">
              <button onClick={addTask}>Add Task</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Tracking;
