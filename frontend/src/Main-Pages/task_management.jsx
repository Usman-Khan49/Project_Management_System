import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Add this import
import "./task-management.css";

function TaskManagement({ addProject }) {
  // Change function name to start with uppercase
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const logoRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "medium",
    assignee: "",
    status: "pending",
  });
  const [filter, setFilter] = useState({
    priority: "",
    status: "",
    search: "",
  });
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
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

    const handleMouseDown = () => {
      setIsExpanded(true);
    };

    const handleMouseUp = () => {
      setIsExpanded(false);
    };

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

  const addTask = () => {
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.deadline ||
      !newTask.assignee
    ) {
      alert("Please fill in all fields before adding a task.");
      return;
    }
    const newProject = { id: Date.now(), title: newTask.title, tasks: [] };
    addProject(newProject);
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      assignee: "",
      status: "pending",
    });
    setIsAddTaskOpen(false);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (!filter.priority || task.priority === filter.priority) &&
      (!filter.status || task.status === filter.status) &&
      (!filter.search ||
        task.title.toLowerCase().includes(filter.search.toLowerCase()))
  );

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
        ></img>
        <div className="header">
          <h1>Task Management</h1>
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
          <div className="task-controls">
            <div className="task-filters">
              <select
                value={filter.priority}
                onChange={(e) =>
                  setFilter({ ...filter, priority: e.target.value })
                }
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                value={filter.status}
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <input
                type="text"
                placeholder="Search tasks"
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
              />
            </div>
            <button onClick={() => setIsAddTaskOpen(true)}>Add New Task</button>
          </div>
          <div className="task-list">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="task-item"
                onClick={() => setSelectedTask(task)}
              >
                <h3>{task.title}</h3>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isAddTaskOpen && (
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
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            ></textarea>
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
            />
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="text"
              placeholder="Assignee"
              value={newTask.assignee}
              onChange={(e) =>
                setNewTask({ ...newTask, assignee: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={addTask}>Add Task</button>
              <button onClick={() => setIsAddTaskOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedTask.title}</h2>
            <p>
              <strong>Description:</strong> {selectedTask.description}
            </p>
            <p>
              <strong>Deadline:</strong> {selectedTask.deadline}
            </p>
            <p>
              <strong>Priority:</strong> {selectedTask.priority}
            </p>
            <p>
              <strong>Assignee:</strong> {selectedTask.assignee}
            </p>
            <p>
              <strong>Status:</strong> {selectedTask.status}
            </p>
            <select
              value={selectedTask.status}
              onChange={(e) =>
                updateTask(selectedTask.id, { status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="modal-actions">
              <button onClick={() => deleteTask(selectedTask.id)}>
                Delete Task
              </button>
              <button onClick={() => setSelectedTask(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskManagement; // Change export to match the new function name
