import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const logoRef = useRef(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    birthday: '',
    age: 0,
    profilePic: null,
  });
  const [isCursorOnWhite, setIsCursorOnWhite] = useState(false);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && window.getComputedStyle(element).backgroundColor === 'rgb(255, 255, 255)') {
        setIsCursorOnWhite(true);
      } else {
        setIsCursorOnWhite(false);
      }
    };

    const handleMouseDown = () => setIsExpanded(true);
    const handleMouseUp = () => setIsExpanded(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const logoElement = logoRef.current;
    if (logoElement) {
      logoElement.style.animation = 'float 3s ease-in-out infinite';
    }

    // Simulate fetching performance data from an API
    const fetchPerformanceData = async () => {
      const response = await fetch('/api/performanceData');
      const data = await response.json();
      setPerformanceData(data);
    };

    fetchPerformanceData();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div 
        className={`custom-cursor ${isExpanded ? 'expanded' : ''}`} 
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          backgroundColor: isCursorOnWhite ? 'black' : 'white'
        }}
      ></div>

      <div className="together">
        <img ref={logoRef} src='https://freesvg.org/img/1455418577.png' className='floating-logo' alt="Logo" />
        <div className="header">
          <h1>Performance Analytics</h1>
          {userInfo.profilePic && <img src={userInfo.profilePic} alt="Profile" className="profile-pic" />}
        </div>
      </div>
      <div className='shortcut'>
        <div className='overview'>
          <Link to='/dashboard' className='dashboard'>
            <i className="fa-solid fa-house"></i>
          </Link>
          <Link to='/task_management' className='task-management'>
            <i className="fa-solid fa-list-check"></i>
          </Link>
          <Link to='/tracking' className='progress-reporting'>
            <i className="fa-solid fa-bars-progress"></i>
          </Link>
          <Link to='/team' className='team'>
            <i className="fa-solid fa-people-group"></i>
          </Link>
          <Link to='/timeline_management' className='timeline_management'>
            <i class="fa-solid fa-timeline"></i>
          </Link>
          <Link to='/settings' className='settings'>
            <i className="fa-solid fa-gear"></i>
          </Link>
          <Link to='/help' className='help'>
            <i className="fa-solid fa-circle-info"></i>
          </Link>
        </div>
        <div className='main'>
          <div className="performance-analytics">
            <h2>Performance Analytics</h2>
            <div className="performance-overview">
              <h3>Individual Performance Trends</h3>
              <div className="cards-container">
                {performanceData.map((member, index) => (
                  <div key={index} className="card">
                    <h4>{member.name}</h4>
                    <p>Task Completion Rate: {member.taskCompletionRate}%</p>
                    <p>Efficiency: {member.efficiency}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="key-contributors">
              <h3>Key Contributors</h3>
              <div className="cards-container">
                {performanceData.filter(member => member.taskCompletionRate >= 85).map((member, index) => (
                  <div key={index} className="card">
                    <h4>{member.name}</h4>
                    <p>Task Completion Rate: {member.taskCompletionRate}%</p>
                    <p>Efficiency: {member.efficiency}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="areas-for-improvement">
              <h3>Areas for Improvement</h3>
              <div className="cards-container">
                {performanceData.filter(member => member.taskCompletionRate < 85).map((member, index) => (
                  <div key={index} className="card">
                    <h4>{member.name}</h4>
                    <p>Task Completion Rate: {member.taskCompletionRate}%</p>
                    <p>Efficiency: {member.efficiency}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;