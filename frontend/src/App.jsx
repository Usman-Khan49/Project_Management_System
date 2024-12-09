// App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Main-Pages/Dashboard";
import Help from "./Main-Pages/help";
import Settings from "./Main-Pages/Settings";
import TaskManagement from "./Main-Pages/task_management";
import Team from "./Main-Pages/team";
import TimelineManagement from "./Main-Pages/timeline_management";
import Tracking from "./Main-Pages/tracking";
import { Sidebar } from "./layout/Sidebar";
import { ClientList } from "./Main-Pages/ClientList.jsx";
import { Communications } from "./Main-Pages/Communications";
import { Deliverables } from "./Main-Pages/Deliverables";
import { Feedback } from "./Main-Pages/feedback";
import { AppProvider } from "./context/AppContext";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <AppProvider>
      <div className={`App ${theme}`}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Signin theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/signup"
              element={<Signup theme={theme} toggleTheme={toggleTheme} />}
            />
            {isAuthenticated ? (
              <Route
                path="/dashboard/*"
                element={
                  <div className="flex h-screen bg-gray-50">
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/clients" element={<ClientList />} />
                          <Route
                            path="/communications"
                            element={<Communications />}
                          />
                          <Route
                            path="/deliverables"
                            element={<Deliverables />}
                          />
                          <Route path="/Feedback" element={<Feedback />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                }
              />
            ) : (
              <Route
                path="/dashboard/*"
                element={<Navigate to="/" replace />}
              />
            )}
            <Route
              path="/help"
              element={
                isAuthenticated ? (
                  <Help theme={theme} toggleTheme={toggleTheme} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Keep other existing routes */}
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings theme={theme} toggleTheme={toggleTheme} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/clients"
              element={
                isAuthenticated ? (
                  <ClientList theme={theme} toggleTheme={toggleTheme} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/task_management"
              element={
                isAuthenticated ? (
                  <TaskManagement
                    theme={theme}
                    toggleTheme={toggleTheme}
                    addProject={addProject}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/team"
              element={
                isAuthenticated ? (
                  <Team theme={theme} toggleTheme={toggleTheme} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/timeline_management"
              element={
                isAuthenticated ? (
                  <TimelineManagement
                    theme={theme}
                    toggleTheme={toggleTheme}
                    projects={projects}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/tracking"
              element={
                isAuthenticated ? (
                  <Tracking
                    theme={theme}
                    toggleTheme={toggleTheme}
                    projects={projects}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
