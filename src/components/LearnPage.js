import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './LearnPage.css';
import { gsap } from 'gsap';
import Orb from './Orb';
import { useConversation } from "@11labs/react";
import logo from './logo.png';

const LearnPage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const conversation = useConversation({
    onError: (error) => {
      setErrorMessage(typeof error === "string" ? error : error.message);
      console.error("Error:", error);
    },
  });

  const { status, isSpeaking } = conversation;

  useEffect(() => {
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
      }
    };
    requestMicPermission();
  }, []);

  const handleStartConversation = async () => {
    try {
      await conversation.startSession({
        agentId: process.env.REACT_APP_ELEVENLABS_AGENT_ID,
      });
    } catch (error) {
      setErrorMessage("Failed to start conversation");
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    
    gsap.to("body", {
      backgroundColor: isDark ? "#f5f5f5" : "#1a1a1a",
      duration: 0.5,
      ease: "power2.inOut"
    });

    gsap.to(".App-tile", {
      backgroundColor: isDark ? "rgb(242,240,233)" : "#2d2d2d",
      borderColor: isDark ? "#5c554b" : "#404040",
      duration: 0.5,
      ease: "power2.inOut"
    });

    gsap.to(".etai-logo, .greeting-text, .typing-text, .App-subtext", {
      color: isDark ? "#5c554b" : "#ffffff",
      duration: 0.5
    });

    gsap.to(".logout-button", {
      backgroundColor: isDark ? "rgb(242,240,233)" : "#2d2d2d",
      color: isDark ? "#5c554b" : "#ffffff",
      borderColor: isDark ? "#5c554b" : "#404040",
      duration: 0.5,
      ease: "power2.inOut"
    });
  };

  return (
    <div className={`App ${isDark ? 'dark' : ''}`}>
      <div className="App-tile">
       <div className="learn-logo-container">
         <img src={logo} alt="Logo" className="learn-logo-image" />
         <div className="learn-etai-logo">Decode</div>
       </div>
        <button 
          className="learn-logout-button"
          onClick={() => navigate('/dashboard')}
        >
          ← 
        </button>
        
        <button 
          className="learn-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? "☀" : "☾"}
        </button>

        <Orb />

        {/* Status Indicators */}
        <div className="status-indicators">
          {status === "connected" && (
            <p className={`status-text ${isDark ? 'dark' : ''}`}>
              {isSpeaking ? "Agent is speaking..." : "Listening..."}
            </p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {!hasPermission && (
            <p className="permission-text">
              Please allow microphone access to use voice chat
            </p>
          )}
        </div>

        {/* Voice Controls */}
        <div className="voice-controls">
          {status === "connected" ? (
            <button
              onClick={handleEndConversation}
              className="voice-button end"
            >
              End Conversation
            </button>
          ) : (
            <button
              onClick={handleStartConversation}
              disabled={!hasPermission}
              className="voice-button start"
            >
              Start Conversation
            </button>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;