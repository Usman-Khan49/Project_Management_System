import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const logoRef = useRef(null);
  const [userInfo, setUserInfo] = useState({
    name: 'User',
    email: 'user@example.com',
    birthday: '1990-01-01',
    age: 33,
    profilePic: null,
  });
  const [isCursorOnWhite, setIsCursorOnWhite] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    experience: '',
    expertise: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, newMember]);
    setNewMember({ name: '', role: '', experience: '', expertise: '' });
  };

  const searchTeamMembers = () => {
    return teamMembers.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.expertise.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
          <h1>Dashboard</h1>
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
          <div className="team-management">
            <h2>Team Member Profiles and Skill Matrix</h2>
            <div className="add-member">
              <h3>Add Team Member</h3>
              <input 
                type="text" 
                name="name" 
                value={newMember.name} 
                onChange={handleMemberChange} 
                placeholder="Name" 
              />
              <input 
                type="text" 
                name="role" 
                value={newMember.role} 
                onChange={handleMemberChange} 
                placeholder="Role" 
              />
              <input 
                type="text" 
                name="experience" 
                value={newMember.experience} 
                onChange={handleMemberChange} 
                placeholder="Experience" 
              />
              <input 
                type="text" 
                name="expertise" 
                value={newMember.expertise} 
                onChange={handleMemberChange} 
                placeholder="Expertise" 
              />
              <button onClick={addTeamMember}>Add Member</button>
            </div>
            <div className="search-member">
              <h3>Search Team Members</h3>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search by name, role, or expertise" 
              />
            </div>
            <div className="skill-matrix">
              <h3>Skill Matrix</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Experience</th>
                    <th>Expertise</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTeamMembers().map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.role}</td>
                      <td>{member.experience}</td>
                      <td>{member.expertise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;