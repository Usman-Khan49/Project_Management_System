import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./help.css";

function help() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const logoRef = useRef(null);
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
          <h1>Help and Support</h1>
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
          <div className="help-section">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How do I create a new project?</summary>
              <p>
                To create a new project, navigate to the dashboard and click on
                the 'New Project' button.
              </p>
            </details>
            <details>
              <summary>How can I invite team members?</summary>
              <p>
                You can invite team members by going to the 'Team Management'
                section and clicking on 'Invite Member'.
              </p>
            </details>
            <details>
              <summary>What are the different task statuses?</summary>
              <p>
                The different task statuses are 'Not Started', 'In Progress',
                and 'Completed'.
              </p>
            </details>
          </div>
          <div className="help-section">
            <h2>Tutorials and Guides</h2>
            <ul>
              <li>
                <a href="#">Getting Started Guide</a>
              </li>
              <li>
                <a href="#">Advanced Task Management</a>
              </li>
              <li>
                <a href="#">Team Collaboration Tips</a>
              </li>
            </ul>
          </div>
          <div className="help-section">
            <h2>Contact Support</h2>
            <form>
              <label>
                Name:
                <input type="text" name="name" disabled />
              </label>
              <label>
                Email:
                <input type="email" name="email" disabled />
              </label>
              <label>
                Message:
                <textarea name="message" disabled />
              </label>
              <button type="submit" disabled>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default help;
