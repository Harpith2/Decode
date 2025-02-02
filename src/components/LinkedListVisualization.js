import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing left and right arrow icons
import codelogo from './codelogo.png';




const JDoodleIDE = () => {
  const [isMinimized, setIsMinimized] = useState(true);  // Start minimized

  return (
    <div 
      style={{
        marginTop: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        width: '45%',
        position: 'fixed',
        bottom: '10px',
        right: '100px',
        backgroundColor: '#f9f9f9',
        transition: 'all 0.3s ease',
        height: isMinimized ? '60px' : '350px',  // Adjust height based on state
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: isMinimized ? '0' : '10px'
      }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#333',
          margin: 0 
        }}>
          Java Code Runner
        </h3>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          style={{
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#333'
          }}
        >
          {isMinimized ? 'Maximize' : 'Minimize'}
        </button>
      </div>
      
      <div style={{ 
        height: isMinimized ? '0' : '300px',
        opacity: isMinimized ? 0 : 1,
        transition: 'all 0.3s ease'
      }}>
        <iframe
          title="JDoodle IDE"
          src="https://www.jdoodle.com/embed/v1/2a0c7f92f7c1877"
          width="100%"
          height="100%"
          style={{ 
            border: 'none', 
            borderRadius: '8px', 
            backgroundColor: '#fff' 
          }}
          allowFullScreen
        />
      </div>
    </div>
  );
};



const style = document.createElement('style');
style.innerHTML = `
  @keyframes glowingDot {
    0% {
      box-shadow: 0px 0px 0px 0px rgba(110, 210, 188, 0), 10px 0px 0px rgba(110, 210, 188, 0);
    }
    25% {
      box-shadow: 0px 0px 20px 6px rgba(110, 210, 188, 0.8), 10px 0px 30px rgba(110, 210, 188, 0.6);
    }
    50% {
      box-shadow: 0px 0px 20px 6px rgba(110, 210, 188, 0.8), -10px 0px 30px rgba(110, 210, 188, 0.6);
    }
    75% {
      box-shadow: 0px 0px 20px 6px rgba(110, 210, 188, 0.8), 0px -10px 30px rgba(110, 210, 188, 0.6);
    }
    100% {
      box-shadow: 0px 0px 20px 6px rgba(110, 210, 188, 0.8), 10px 0px 30px rgba(110, 210, 188, 0.6);
    }
  }
`;
document.head.appendChild(style);



const CodingQuestionCarousel = () => {
  const questions = [
    { question: "Given a singly linked list 10 > 20 > 30 > 40 > 50, write a java program that finds the middle value of the linked list. Execute your code to check that the output is 30.", answer: "To find the middle of a linked list, use two pointers: one moves one step at a time (slow), and the other moves two steps at a time (fast), and when the fast pointer reaches the end, the slow pointer will be at the middle." },
    { question: "Explain the difference between a stack and a queue.", answer: "A stack follows LIFO (Last In, First Out), whereas a queue follows FIFO (First In, First Out)." },
    { question: "How do you reverse a linked list?", answer: "You can reverse a linked list by iterating through it and changing the next pointers of each node." },
    { question: "What is a deadlock in a system?", answer: "A deadlock occurs when two or more processes are unable to proceed because each is waiting on the other to release resources." },
    { question: "Explain the difference between a shallow copy and a deep copy.", answer: "A shallow copy copies the top-level objects, while a deep copy copies all objects recursively." }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false); // Modal visibility state

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setShowAnswer(false);
    setShowHintModal(false); // Reset modal visibility when changing question
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    setShowAnswer(false);
    setShowHintModal(false); // Reset modal visibility when changing question
  };



  return (
    <div
      style={{
        height: '250px',        // Reduced from 300px
        width: '30%',          // Reduced from 35%
        position: 'fixed',
        bottom: '60px',
        left: '40px',         // Moved more to the left from 80px
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#000',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 0.5s ease-in-out',
      }}
      
    >
       {/* Image Section */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <img src={codelogo} alt="Code Logos" style={{ width: '110px', height: '40px', borderRadius: '5px' }} />
  </div>
      <h3 style={{ fontSize: '23px', fontWeight: '2000', marginBottom: '15px', color: '#fff' }}>Coding Questions</h3>
      <div style={{ fontSize: '16px', marginBottom: '20px', color: '#fff', marginTop: '50px' }}>
        <strong>{questions[currentQuestionIndex].question}</strong>
      </div>

      {/* Show Hint Button */}
      <button
        onClick={() => setShowHintModal(true)} // Open modal
        style={{
          padding: '10px 50px',
          backgroundColor: '#FBF9F5',
          color: '#000',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          marginBottom: '-10px',
          marginTop: '10px'
        }}
      >
        Logic Hint
      </button>

      {/* Hint Modal */}
      {showHintModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <h3>Use Floyd's Cycle Finding Algorithm!</h3>
          <p>{questions[currentQuestionIndex].answer}</p>
          <button
            onClick={() => setShowHintModal(false)} // Close modal
            style={{
              padding: '8px 15px',
              backgroundColor: '#FF5722',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Got it
          </button>
        </div>
      )}

      {/* Overlay background */}
      {showHintModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={() => setShowHintModal(false)} // Close modal on overlay click
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        {/* Previous Button */}
        <button
          onClick={prevQuestion}
          style={{
            padding: '8px 15px',
            backgroundColor: '#6ed2bc',
            color: '#000',
            border: 'none',
            height: '50px',
            width: '50px',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            position: 'relative',
            top: '-55px',
          }}
        >
          <FaArrowLeft />
        </button>

        {/* Next Button */}
        <button
          onClick={nextQuestion}
          style={{
            padding: '8px 15px',
            backgroundColor: '#6ed2bc',
            color: '#000',
            border: 'none',
            height: '50px',
            width: '50px',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            position: 'relative',
            top: '-55px',
          }}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};


const LinkedListVisualization = () => {
  const d3Container = useRef(null);
  const [linkedList, setLinkedList] = useState([]); // React state to manage the linked list
  const [inputValue, setInputValue] = useState(''); // Input for insert operation
  const [deleteValue, setDeleteValue] = useState(''); // Input for delete operation

  // Insert a node at the end of the linked list
  const insertNode = () => {
    if (inputValue.trim() !== '') {
      setLinkedList([...linkedList, { value: inputValue, id: Date.now() }]);
      setInputValue('');
    }
  };

  // Delete a node by value from the linked list
  const deleteNode = () => {
    if (deleteValue.trim() !== '') {
      const newLinkedList = linkedList.filter(node => node.value !== deleteValue);
      setLinkedList(newLinkedList);
      setDeleteValue('');
    }
  };

  // Calculate rectangle width based on text length
  const calculateRectangleWidth = (text) => {
    const baseWidth = 140; // Minimum width
    const padding = 10; // Additional padding for longer text
    return baseWidth + text.length * padding;
  };

  // Draw the linked list visualization using D3.js
  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current)
        .html('') // Clear previous content
        .append('svg')
        .attr('width', 900)  // Reduced width to better center the content
        .attr('height', 200)
  // Add background color to the SVG


      // Constants for spacing
      const nodeSpacing = 200; // Space between nodes
      const arrowLength = 40; // Length of the arrow
      const rectangleHeight = 60; // Height of the rectangle

      // Draw nodes
      const nodes = svg.selectAll('.node')
        .data(linkedList)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d, i) => `translate(${i * (nodeSpacing + arrowLength) + 50}, 100)`);

      // Draw split rectangles for nodes (data and address parts)
      nodes.append('rect')
        .attr('width', d => calculateRectangleWidth(d.value)) // Dynamic width based on text length
        .attr('height', rectangleHeight)
        .attr('x', d => -calculateRectangleWidth(d.value) / 2) // Center the rectangle horizontally
        .attr('y', -rectangleHeight / 2) // Center the rectangle vertically
        .attr('rx', 10) // Rounded corners for the top
        .attr('ry', 10) // Rounded corners for the bottom
        .attr('fill', '#4CAF50')
        .attr('stroke', '#000')
        .attr('stroke-width', 2);

      // Draw a vertical line to split the rectangle into data and address parts
      nodes.append('line')
        .attr('x1', d => -calculateRectangleWidth(d.value) / 2 + calculateRectangleWidth(d.value) / 2)
        .attr('y1', -rectangleHeight / 2)
        .attr('x2', d => -calculateRectangleWidth(d.value) / 2 + calculateRectangleWidth(d.value) / 2)
        .attr('y2', rectangleHeight / 2)
        .attr('stroke', '#000')
        .attr('stroke-width', 2);

      // Add labels for data part
      nodes.append('text')
        .attr('x', d => -calculateRectangleWidth(d.value) / 2 + 20) // Position in the left half
        .attr('y', 0) // Vertically center text
        .attr('dy', '.35em') // Adjust vertical positioning to center text
        .attr('text-anchor', 'left')
        .attr('font-size', '14px')
        .attr('fill', '#000')
        .text(d => `Data: ${d.value}`);

      // Add labels for address part
      nodes.append('text')
        .attr('x', 10) // Position in the right half
        .attr('y', 0) // Vertically center text
        .attr('dy', '.35em') // Adjust vertical positioning to center text
        .attr('text-anchor', 'right')
        .attr('font-size', '14px')
        .attr('fill', '#000')
        .text((d, i) => i < linkedList.length - 1 ? `Next: ${linkedList[i + 1].value}` : 'Next: null');

      // Draw arrows between nodes
      svg.selectAll('.arrow')
        .data(linkedList.slice(0, -1)) // Draw arrows for all but the last node
        .enter()
        .append('line')
        .attr('class', 'arrow')
        .attr('x1', (d, i) => i * (nodeSpacing + arrowLength) + 50 + calculateRectangleWidth(d.value) / 2)
        .attr('y1', 100)
        .attr('x2', (d, i) => (i + 1) * (nodeSpacing + arrowLength) + 50 - calculateRectangleWidth(linkedList[i + 1].value) / 2)
        .attr('y2', 100)
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

      // Add arrowhead marker
      svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 9)
        .attr('refY', 5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', '#000');

      // Add labels for linked list operations
      svg.append('text')
        .attr('x', 700)  // Adjusted x position
        .attr('y', 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '24px')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .text('Singly Linked List Visualization');

      svg.append('text')
        .attr('x', 700)  // Adjusted x position
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .attr('font-size', '18px')
        .attr('fill', '#555')
        .text(`Total Nodes: ${linkedList.length}`);
    }
  }, [linkedList]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F2EEE6' }}>
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Insert Node"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ padding: '8px', fontSize: '14px', width: '7%', borderRadius: '5px', border: '1px solid #000' }}
          />
          <button onClick={insertNode} style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Insert  </button>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Delete Node"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            style={{ padding: '8px', fontSize: '14px', width: '7%', borderRadius: '5px', border: '1px solid #000' }}          />
          <button onClick={deleteNode} style={{ padding: '10px 18px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Delete</button>
        </div>
      </div>

      <div style={{ width: '100%', marginBottom: '30px' }} ref={d3Container}></div>

      <JDoodleIDE />
      <CodingQuestionCarousel />
    </div>
  );
};

export default LinkedListVisualization;