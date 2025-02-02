import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { gsap } from 'gsap';
import './Dashboard.css';
import { FiLogOut } from 'react-icons/fi';
import { uploadToKnowledgeBase } from '../services/elevenlabsService';
import logo from './logo.png';  // Make sure to import the logo

const Dashboard = () => {
 const { user, logout } = useContext(AuthContext);
 const navigate = useNavigate();
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedCard, setSelectedCard] = useState(null);
 const [isDark, setIsDark] = useState(false);
 const [uploadedFile, setUploadedFile] = useState(null);
 const [uploadStatus, setUploadStatus] = useState(null);
 const [isProcessing, setIsProcessing] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 const [isPremium, setIsPremium] = useState(false);

 const handleLogout = async () => {
   try {
     await logout();
     navigate('/signin');
   } catch (error) {
     console.error('Logout error:', error);
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

   

   gsap.to(".powerful-tools-banner", {
     backgroundColor: isDark ? "rgba(242,240,233,0.95)" : "rgba(45,45,45,0.95)",
     color: isDark ? "#5c554b" : "#5c554b",
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

 useEffect(() => {
   const cards = document.querySelectorAll('.App-card');
   const link = document.createElement('link');
   link.href = 'https://api.fontshare.com/v2/css?f[]=sentient@300&display=swap';
   link.rel = 'stylesheet';
   document.head.appendChild(link);
   
   cards.forEach(card => {
     const randomRotation = Math.random() > 0.5 ? 1 : -1;
     
     card.addEventListener('click', () => {
       const cardContent = card.querySelector('.card-content').textContent.trim();
       handleCardClick(cardContent);
     });
     
     card.addEventListener('mouseenter', () => {
       const isPremium = card.classList.contains('premium-card');
       
       gsap.to(card, {
         scale: 1.1,
         rotation: randomRotation * 5,
         y: -5,
         backgroundColor: "#000",
         color: "#fff",
         boxShadow: isPremium ? 
           "0 20px 40px rgba(147, 112, 219, 0.3)" : 
           "0 20px 40px rgba(0, 0, 0, 0.4)",
         duration: 0.4,
         ease: "power2.out",
       });
     });

     card.addEventListener('mouseleave', () => {
       const isPremium = card.classList.contains('premium-card');
       
       gsap.to(card, {
         scale: 1,
         rotation: 0,
         y: 0,
         backgroundColor: isPremium ? 
           "rgba(169, 215, 217, 0.9)" : 
           "rgba(242,240,233,0.95)",
         color: "#4a4a4a",
         boxShadow: isPremium ? 
           "0 8px 20px rgba(147, 112, 219, 0.15)" : 
           "0 8px 16px rgba(0, 0, 0, 0.1)",
         duration: 0.4,
         ease: "power2.inOut",
       });
     });
   });
 }, []);

 const handleCardClick = (cardContent) => {
   const premiumOnlyFeatures = ['DSA', 'Search'];
   const isPremiumFeature = premiumOnlyFeatures.includes(cardContent);
   
   if (isPremiumFeature && !isPremium) {
     return;
   }

   if (cardContent === 'DSA') {
     navigate('/dsa');
     return;
   }
   
   if (cardContent === 'Search') {
     navigate('/search');
     return;
   }
   
   setSelectedCard(cardContent);
   setIsModalOpen(true);
 };

 const modalContent = {
   "Chat": {
     description: "Learn and understand any concept deeply by teaching it to others. Break down complex ideas into simple explanations.",
     allowUpload: true,
     fullUpload: true
   },
   "DSA": {
     description: "Improve your presentation skills with real-time feedback and expert guidance.",
     allowUpload: true,
     simpleUpload: true
   },
   "Search": {
     description: "Search through text, images, and audio simultaneously for comprehensive learning.",
     allowUpload: true
   }
 };

 const Modal = ({ isOpen, onClose, title }) => {
   if (!isOpen) return null;

   const handleFileUpload = (event) => {
     if (title !== "Chat") return;
     
     const file = event.target.files[0];
     if (file && file.type === 'application/pdf') {
       setUploadedFile(file);
       setUploadStatus(null);
       setErrorMessage('');
     }
   };

   const handleStartLearning = async () => {
     if (!uploadedFile || title !== "Chat") return;

     setIsProcessing(true);
     setUploadStatus('uploading');
     setErrorMessage('');

     try {
       const result = await uploadToKnowledgeBase(uploadedFile);
       setUploadStatus('success');
       console.log('Upload successful:', result);
     } catch (error) {
       console.error('Upload failed:', error);
       setUploadStatus('error');
       setErrorMessage(error.message || 'Failed to process document');
     } finally {
       setIsProcessing(false);
     }
   };
   
   const content = modalContent[title] || {
     description: "Content coming soon...",
     allowUpload: false
   };
   
   return (
     <div className="modal-overlay" onClick={onClose}>
       <div className="modal-content" onClick={e => e.stopPropagation()}>
         <button className="close-button" onClick={onClose}>×</button>
         <h2 className="modal-title">{title}</h2>
         <div className="modal-body">
           <div className="modal-text">
             <p>{content.description}</p>
           </div>
           {content.allowUpload && (
             <div className="upload-section">
               {content.simpleUpload ? (
                 <label className="upload-button">
                   <svg 
                     xmlns="http://www.w3.org/2000/svg" 
                     width="20" 
                     height="20" 
                     viewBox="0 0 24 24" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeWidth="2" 
                     strokeLinecap="round" 
                     strokeLinejoin="round"
                   >
                     <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                   </svg>
                   <span>Upload</span>
                 </label>
               ) : (
                 <>
                   {!uploadedFile ? (
                     <label htmlFor="file-upload" className="upload-button">
                       <svg 
                         xmlns="http://www.w3.org/2000/svg" 
                         width="20" 
                         height="20" 
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke="currentColor" 
                         strokeWidth="2" 
                         strokeLinecap="round" 
                         strokeLinejoin="round"
                       >
                         <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                       </svg>
                       <span>Upload</span>
                       <input
                         type="file"
                         id="file-upload"
                         accept=".pdf"
                         onChange={handleFileUpload}
                         style={{ display: 'none' }}
                       />
                     </label>
                   ) : (
                     <div className="uploaded-file-section">
                       <div className="file-info">
                         <svg 
                           xmlns="http://www.w3.org/2000/svg" 
                           width="16" 
                           height="16" 
                           viewBox="0 0 24 24" 
                           fill="none" 
                           stroke="currentColor" 
                           strokeWidth="2"
                         >
                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                           <polyline points="14 2 14 8 20 8"></polyline>
                           <line x1="16" y1="13" x2="8" y2="13"></line>
                           <line x1="16" y1="17" x2="8" y2="17"></line>
                           <polyline points="10 9 9 9 8 9"></polyline>
                         </svg>
                         <span>{uploadedFile.name}</span>
                         <button 
                           className="change-file-button"
                           onClick={() => {
                             setUploadedFile(null);
                             setUploadStatus(null);
                             setErrorMessage('');
                           }}
                         >
                           Change File
                         </button>
                       </div>
                       
                       {uploadStatus === 'success' ? (
                         <div className="success-actions">
                           <div className="status-message success">
                             Successfully added to knowledge base!
                           </div>
                           <button 
                             className="start-learning-button success"
                             onClick={() => navigate('/learn')}
                           >
                             Start Learning
                           </button>
                         </div>
                       ) : (
                         <>
                           {uploadStatus === 'error' && (
                             <div className="status-message error">{errorMessage}</div>
                           )}
                           <button 
                             className={`start-learning-button ${isProcessing ? 'loading' : ''}`}
                             onClick={handleStartLearning}
                             disabled={isProcessing}
                           >
                             Upload
                           </button>
                         </>
                       )}
                     </div>
                   )}
                 </>
               )}
             </div>
           )}
         </div>
       </div>
     </div>
   );
 };

 return (
   <div className={`App ${isDark ? 'dark' : ''}`}>
     <button 
       onClick={handleLogout}
       className={`logout-button ${isDark ? 'dark' : ''}`}
     >
       <FiLogOut size={16} />
       Sign Out
     </button>

     <button 
       className="dashboard-theme-toggle"
       onClick={toggleTheme}
       aria-label="Toggle theme"
     >
       {isDark ? "☀" : "☾"}
     </button>

     <div className="App-tile">
       <div className="logo-container">
         <img src={logo} alt="Logo" className="logo-image" />
         <div className="etai-logo">Decode</div>
       </div>
       
       <div
         className={`plan-indicator ${isPremium ? 'premium' : 'free'}`}
         onClick={() => {
           setIsPremium(!isPremium);
           gsap.from(".plan-indicator", {
             scale: 0.95,
             duration: 0.3,
             ease: "back.out(1.7)"
           });
         }}
       >
         <span className={`plan-dot ${isPremium ? 'premium' : 'free'}`}></span>
         {isPremium ? 'premium plan' : 'free plan'}
       </div>

       <header className="App-header">
         <p className="greeting-text">Good evening, <span className="highlight">Minho</span></p>
         <p className="typing-text">
           Real learning starts here.
         </p>
         <p className="App-subtext">
           How do you want to learn today?
         </p>
         <div className="powerful-tools-banner">
           Discuss coding concepts with Coversational AI, Search smarter with Gen AI or practice coding instantly!
         </div>
       </header>

       <div className="App-cards">
         <div className="App-card premium-card no-star">
           <span className="free-banner">try</span>
           <div className="card-content" onClick={() => handleCardClick('Chat')}>
             Chat
           </div>
         </div>
         
         <div 
           className={`App-card premium-card ${!isPremium ? 'disabled' : ''}`}
           onClick={() => isPremium && handleCardClick('DSA')}
         >
           <div className="card-content">
             Practice
           </div>
           {!isPremium && (
             <div className="premium-tooltip">Upgrade to Premium to unlock this feature</div>
           )}
         </div>
         
         <div 
           className={`App-card premium-card ${!isPremium ? 'disabled' : ''}`}
           onClick={() => isPremium && handleCardClick('Search')}
         >
           <div className="card-content">
             Search
           </div>
           {!isPremium && (
             <div className="premium-tooltip">Upgrade to Premium to unlock this feature</div>
           )}
         </div>
       </div>
     </div>

     <Modal 
       isOpen={isModalOpen}
       onClose={() => {
         setIsModalOpen(false);
         setUploadedFile(null);
         setUploadStatus(null);
         setErrorMessage('');
       }}
       title={selectedCard}
     />
   </div>
 );
};

export default Dashboard;
