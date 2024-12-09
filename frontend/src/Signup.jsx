// Signup.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Signup({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const logoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsExpanded(true);
    };

    const handleMouseUp = () => {
      setIsExpanded(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Additional logo hover effect
    const logoElement = logoRef.current;
    
    const handleLogoHover = () => {
      logoElement.style.transform = 'scale(1.1) rotate(5deg)';
    };

    const handleLogoLeave = () => {
      logoElement.style.transform = 'scale(1) rotate(0deg)';
    };

    logoElement.addEventListener('mouseenter', handleLogoHover);
    logoElement.addEventListener('mouseleave', handleLogoLeave);

    // Set active  className after mount
    setIsActive(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      logoElement.removeEventListener('mouseenter', handleLogoHover);
      logoElement.removeEventListener('mouseleave', handleLogoLeave);
    };
  }, []);

  const handleSignup = async () => {
    const email = document.querySelector('.email input').value;
    const password = document.querySelector('.password input').value;
    const confirmPassword = document.querySelector('.password:last-child input').value;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful', data);
        // Store the token if your backend sends one
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        navigate('/dashboard');
      } else {
        setError(data.error || 'Sign up failed');
      }
    } catch (error) {
      console.error('Error during signup', error);
      setError('Network error occurred');
    }
  };

  return (
    <>
      <div 
         className={`custom-cursor ${isExpanded ? 'expanded' : ''}`} 
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`
        }}
      ></div>

      <div  className={`container ${isActive ? 'active' : ''} ${theme}`}>
        <img 
          ref={logoRef}
           className='logo' 
          src='https://freesvg.org/img/1455418577.png' 
          alt='Vite Logo' 
        />
        <p>Sign up to PRISM</p>

        <div  className='email'>
          <p>Email</p>
          <input type='text' placeholder='Email' />
        </div>
        <div  className='password'>
          <p>Password</p>
          <input type='password' placeholder='Password' />
        </div>
        <div  className='password'>
          <p>Confirm Password</p>
          <input type='password' placeholder='Confirm Password' />
        </div>
        <button  className='signin' onClick={handleSignup}>Sign Up</button>

        <div  className='or-container'>
          <span  className='or-text'>OR</span>
        </div>

        <button  className='google-button'>
          <img 
             className='google-logo' 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' 
            alt='Google Logo' 
          />
          <span>Continue with Google</span>
        </button>

        <div  className='signuplink'>
          <p>Already have an account?</p>
          <Link to='/'>Sign in</Link>
        </div>
      </div>
    </>
  );
}

export default Signup;

