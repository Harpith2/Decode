import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DSA.css';
import * as mojs from 'mo-js'; // Import mo.js

import ArrayVisualization from './ArrayVisualization';
import StackVisualization from './StackVisualization';
import QueueVisualization from './QueueVisualization';
import LinkedListVisualization from './LinkedListVisualization';

import BinarySearchVisualization from './BinarySearchVisualization';
import InsertionSortVisualization from './InsertionSortVisualization';
// Import MazeAnimation component
import MazeAnimation from './MazeAnimation';

function DSA() {
  const navigate = useNavigate();
  const [visualization, setVisualization] = useState(null);

  // Function to trigger burst animation on button click
  const triggerBurstAnimation = (button) => {
    const burst = new mojs.Burst({
      parent: button, // Use button as the parent
      radius: { 0: 50 }, // Small burst radius
      count: 6,  // Number of particles
      angle: 45, // Angle of burst
      children: {
        shape: 'circle',
        radius: 5,
        fill:'orange',
        duration: 800,
        easing: 'ease.out',
        opacity: 0.7,
      },
    });
    burst.replay(); // Trigger the burst animation
  };

  // Function to handle rendering visualizations and triggering burst
  const renderVisualization = (component, event) => {
    const button = event.target;
    triggerBurstAnimation(button);  // Trigger burst animation on button click
    setVisualization(component);    // Render the selected visualization component
  };

  return (
    <div className="DSA">
      <button 
        className="back-button"
        onClick={() => navigate('/dashboard')}
      >
        ←
      </button>
      <div className="title"><h1>Data Structures & Algorithms</h1></div>
      
      <div className="buttons">
        <button className="styled-button" onClick={(e) => renderVisualization(<ArrayVisualization />, e)}>Array</button>
        <button className="styled-button" onClick={(e) => renderVisualization(<StackVisualization />, e)}>Stack</button>
        <button className="styled-button" onClick={(e) => renderVisualization(<QueueVisualization />, e)}>Queue</button>
        <button className="styled-button" onClick={(e) => renderVisualization(<LinkedListVisualization />, e)}>Linked List</button>
        
        <button className="styled-button" onClick={(e) => renderVisualization(<BinarySearchVisualization />, e)}>Binary Search</button>
        <button className="styled-button" onClick={(e) => renderVisualization(<InsertionSortVisualization />, e)}>Insertion Sort</button>
      </div>
      <div className="visualization">
        {visualization || (
          <div className="maze-container">
            <MazeAnimation />
          </div>
        )}
      </div>
    </div>
  );
};

export default DSA;