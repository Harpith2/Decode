import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import gsap from 'gsap';
import backgroundImage from './images/background.jpg';
import { FcGoogle } from 'react-icons/fc';


const SignPage = () => {
  const buttonRef = useRef(null);
  const glowRef = useRef(null);
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
      width: 18px;
      height: 22px;
      clip-path: polygon(0% 0%, 0% 65%, 50% 50%);
      background: rgb(155, 237, 255);
      position: fixed;
      top: 0;
      left: 0;
      transform: translate(-50%, -80%) rotate(-5deg);
      pointer-events: none;
      z-index: 9999999;
      box-shadow: 
        0 0 10px rgba(155, 237, 255, 0.5),
        0 0 20px rgba(155, 237, 255, 0.3);
      filter: brightness(1.2);
    `;
    document.body.appendChild(cursor);
  
    const updateCursorPosition = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
  
    // Hide default cursor on all elements
    document.body.style.cursor = 'none';
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.cursor = 'none';
    });
  
    window.addEventListener('mousemove', updateCursorPosition);
  
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.body.removeChild(cursor);
      // Reset cursor styles
      document.body.style.cursor = 'default';
      allElements.forEach(el => {
        el.style.cursor = '';
      });
    };
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;

    gsap.set(button, {
      background: 'radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%, #5be1ff 84.9%, #00bae2 94.79%)',
      boxShadow: '0 0 15px rgba(0, 186, 226, 0.3)',
    });

    const hoverTimeline = gsap.timeline({ paused: true });
    
    hoverTimeline
      .to(button, {
        duration: 0.3,
        background: 'rgba(6, 182, 212, 0.3)',
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
        ease: "power2.out"
      })
      .to(glow, {
        duration: 0.3,
        opacity: 1,
        scale: 1.1,
        ease: "power2.out"
      }, 0);

    button.addEventListener('mouseenter', () => hoverTimeline.play());
    button.addEventListener('mouseleave', () => hoverTimeline.reverse());

    return () => {
      button.removeEventListener('mouseenter', () => hoverTimeline.play());
      button.removeEventListener('mouseleave', () => hoverTimeline.reverse());
      hoverTimeline.kill();
    };
  }, []);

  useEffect(() => {
    const text = "Introducing Decode";
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    };
  
    const interval = setInterval(typeText, 100);
  
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Add a small delay before attempting login
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later or reset your password.');
      } else {
        setError('Invalid email or password');
      }
      setPassword('');
    }
  };
  
  // Update the Google sign-in function
  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google sign in');
      const result = await googleSignIn();
      console.log('Google sign in successful, redirecting...');
      
      // Force immediate navigation
      window.location.href = '/dashboard';
      // Or try this alternative:
      // navigate('/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Google sign in failed:', error);
      setError('Failed to sign in with Google: ' + error.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100vw',
      background: 'rgb(242,240,233)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Clash Display", sans-serif',
      position: 'relative',
      overflow: 'hidden',
      flexDirection: 'column',
    }}>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '2rem',
        fontFamily: '"Clash Display", sans-serif',
        color: '#000000',
        textAlign: 'center',
        minHeight: '60px',
      }}>
        {displayText}
        <span style={{ opacity: 0 }}>|</span>
      </div>
      
      <div style={{
        background: 'rgb(0, 0, 0)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderRadius: '12px',
        width: '320px',
        zIndex: 1,
        border: '1px solid rgba(8, 112, 135, 0.2)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.1),
          0 0 20px rgba(32, 138, 165, 0.68),
          0 0 40px rgba(91, 225, 255, 0.1),
          inset 0 0 20px rgba(47, 211, 252, 0.05)
        `,
        position: 'relative',
      }}>
        <div style={{
          content: '""',
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          right: '-10px',
          bottom: '-10px',
          background: 'radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%,rgb(92, 225, 255) 84.9%,rgb(2, 209, 255) 94.79%)',
          borderRadius: '14px',
          opacity: '0.1',
          filter: 'blur(8px)',
          zIndex: -1,
        }} />
        
        <h1 style={{ 
          color: 'rgba(255, 255, 255, 0.95)',
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          fontWeight: '500',
          fontFamily: '"Clash Display", sans-serif',
        }}>
          Sign in
        </h1>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              color: '#ff6b6b',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.875rem',
              fontFamily: '"Clash Display", sans-serif',
              marginBottom: '0.5rem',
            }}>
              Email or Phone
            </label>
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or phone"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: '"Clash Display", sans-serif',
                borderRadius: '6px',
                color: 'white',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
            }}>
              Password
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: 'white',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <div style={{ position: 'relative', width: '100%', marginTop: '1.5rem' }}>
            <div
              ref={glowRef}
              style={{
                position: 'absolute',
                inset: '-2px',
                background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.2), transparent 70%)',
                borderRadius: '25px',
                opacity: 0,
                pointerEvents: 'none',
              }}
            />
            
            <button
              ref={buttonRef}
              type="submit"
              style={{
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'radial-gradient(78.77% 78.77% at 71.71% 30.77%, #f0fcff 0%, #9bedff 67.21%, #98ecff 76.04%, #5be1ff 84.9%, #00bae2 94.79%)',
                border: 'none',
                borderRadius: '25px',
                color: '#006c85',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              Sign In
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '1.5rem 0',
            color: 'rgba(255, 255, 255, 0.5)',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <span style={{ padding: '0 1rem', fontSize: '0.875rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          </div>

          <button 
            type="button"
            onClick={handleGoogleSignIn}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
             <FcGoogle size={20} /> {/* Google icon */}
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignPage;