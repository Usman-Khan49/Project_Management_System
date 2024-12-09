import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard1.css"

function ResourceManagerDashboard() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', workload: '' });
  const [allocatedTasks, setAllocatedTasks] = useState([]);

  useEffect(() => {
    // Simulating fetching team members data from an API
    const fetchTeamMembers = async () => {
      // In a real application, this would be an API call
      const mockData = [
        { name: 'Alice', capacity: 100, workload: 50 },
        { name: 'Bob', capacity: 100,workload: 30 },
        { name: 'Charlie', capacity: 100, workload: 70 },
      ];
      setTeamMembers(mockData);
    };

    fetchTeamMembers();
  }, []);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const allocateTask = () => {
    if (!newTask.name || !newTask.workload) {
      alert('Please provide both task name and workload.');
      return;
    }

    const availableMember = teamMembers.reduce((prev, current) => {
      return (prev.capacity - prev.workload) > (current.capacity - current.workload) ? prev : current;
    });

    if (availableMember) {
      const updatedMembers = teamMembers.map(member => {
        if (member.name === availableMember.name) {
          return { ...member, workload: member.workload + parseInt(newTask.workload, 10) };
        }
        return member;
      });
      setTeamMembers(updatedMembers);
      setAllocatedTasks([...allocatedTasks, { ...newTask, assignedTo: availableMember.name }]);
      setNewTask({ name: '', workload: '' });
    }
  };

  return (
    <div className="resource-manager-dashboard">
      <h1>Resource Manager</h1>
      <Link to="/dashboard">Back to Dashboard</Link>

      <div className="task-allocation">
        <h2>Allocate New Task</h2>
        <input
          type="text"
          name="name"
          value={newTask.name}
          onChange={handleTaskChange}
          placeholder="Task Name"
        />
        <input
          type="number"
          name="workload"
          value={newTask.workload}
          onChange={handleTaskChange}
          placeholder="Workload (%)"
        />
        <button onClick={allocateTask}>Allocate Task</button>
      </div>

      <div className="team-workload">
        <h2>Team Workload</h2>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>
              {member.name}: {member.workload}% / {member.capacity}%
            </li>
          ))}
        </ul>
      </div>

      <div className="allocated-tasks">
        <h2>Allocated Tasks</h2>
        <ul>
          {allocatedTasks.map((task, index) => (
            <li key={index}>
              {task.name} ({task.workload}%) - Assigned to: {task.assignedTo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResourceManagerDashboard;

