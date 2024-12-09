// Signin.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Signin({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const logoRef = useRef(null);
  const [error, setError] = useState("");

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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Additional logo hover effect
    const logoElement = logoRef.current;

    const handleLogoHover = () => {
      logoElement.style.transform = "scale(1.1) rotate(5deg)";
    };

    const handleLogoLeave = () => {
      logoElement.style.transform = "scale(1) rotate(0deg)";
    };

    logoElement.addEventListener("mouseenter", handleLogoHover);
    logoElement.addEventListener("mouseleave", handleLogoLeave);

    // Set active  className after mount
    setIsActive(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      logoElement.removeEventListener("mouseenter", handleLogoHover);
      logoElement.removeEventListener("mouseleave", handleLogoLeave);
    };
  }, [navigate]);

  const handleSignin = async () => {
    const email = document.querySelector(".email input").value;
    const password = document.querySelector(".password input").value;

    // Hardcoded credentials check
    if (email === "1" && password === "1") {
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Ubaid Sardar",
          avatar: "https://via.placeholder.com/40",
        })
      );
      navigate("/dashboard");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signin successful", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        navigate("/dashboard");
      } else {
        setError(data.error || "Sign in failed");
      }
    } catch (error) {
      console.error("Error during signin", error);
      setError("Network error occurred");
    }
  };

  return (
    <>
      <div
        className={`custom-cursor ${isExpanded ? "expanded" : ""}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      ></div>

      <div className={`container ${isActive ? "active" : ""} ${theme}`}>
        <img
          ref={logoRef}
          className="logo"
          src="https://freesvg.org/img/1455418577.png"
          alt="Vite Logo"
        />
        <p>Sign in to PRISM</p>

        <div className="email">
          <p>Email</p>
          <input type="text" placeholder="Email" />
        </div>
        <div className="password">
          <p>Password</p>
          <input type="password" placeholder="Password" />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="signin" onClick={handleSignin}>
          Sign In
        </button>

        <div className="or-container">
          <span className="or-text">OR</span>
        </div>

        <button className="google-button">
          <img
            className="google-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            alt="Google Logo"
          />
          <span>Continue with Google</span>
        </button>

        <div className="signuplink">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default Signin;
