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
      
      {/* Only render iframe when not minimized */}
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
const D3QueueVisualization = () => {
  const svgRef = useRef();
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [queueSize, setQueueSize] = useState(10); // Default queue size
  const [queueOverflow, setQueueOverflow] = useState(false);
  const [queueUnderflow, setQueueUnderflow] = useState(false);

  const cellSize = 50;
  const width = queueSize * cellSize;
  const height = 100;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // Clear previous drawings

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background", "#ffffff")
      .style("border", "1px solid #e0e0e0")
      .style("border-radius", "8px");

    // Draw queue cells
    svg
      .selectAll("rect")
      .data(queue)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * cellSize)
      .attr("y", 0)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", "#6ed2bc")
      .attr("stroke", "#fff")
      .attr("rx", "4") // Rounded corners
      .attr("ry", "4");

    // Draw queue values
    svg
      .selectAll("text")
      .data(queue)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * cellSize + cellSize / 2)
      .attr("y", cellSize / 2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "#000")
      .attr("font-size", "14px")
      .text((d) => d);

    // Draw FIFO label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("FIFO (First In, First Out)");

    // Draw queue overflow/underflow message
    if (queueOverflow) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .attr("fill", "red")
        .attr("font-size", "14px")
        .text("Queue Overflow!");
    } else if (queueUnderflow) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .attr("fill", "red")
        .attr("font-size", "14px")
        .text("Queue Underflow!");
    }
  }, [queue, queueOverflow, queueUnderflow, width, height]);

  const handleEnqueue = () => {
    if (queue.length >= queueSize) {
      setQueueOverflow(true);
      setTimeout(() => setQueueOverflow(false), 2000); // Clear message after 2 seconds
      return;
    }
    if (inputValue === "") return;

    setQueue([...queue, inputValue]);
    setInputValue("");
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setQueueUnderflow(true);
      setTimeout(() => setQueueUnderflow(false), 2000); // Clear message after 2 seconds
      return;
    }

    const newQueue = [...queue];
    newQueue.shift(); // Remove the first element
    setQueue(newQueue);
  };

  const handleSetQueueSize = (e) => {
    const size = Number(e.target.value);
    if (size > 0) {
      setQueueSize(size);
      setQueue([]); // Reset queue when size changes
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#F2EEE6",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Queue Data Structure Visualization
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="Queue Size"
            value={queueSize}
            onChange={handleSetQueueSize}
            min="1"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6ed2bc")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
          <input
            type="number"
            placeholder="Enter value to enqueue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6ed2bc")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleEnqueue}
            style={{
              padding: "10px 20px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
          >
            Enqueue
          </button>
          <button
            onClick={handleDequeue}
            style={{
              padding: "10px 20px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
          >
            Dequeue
          </button>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Head (Front):</strong> {queue.length > 0 ? queue[0] : "None"}
        </p>
        <p>
          <strong>Tail (Rear):</strong>{" "}
          {queue.length > 0 ? queue[queue.length - 1] : "None"}
        </p>
      </div>
      {/* Queue Overflow Alert */}
      {queueOverflow && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            border: "1px solid #ffcdd2",
            borderRadius: "4px",
            color: "#c62828",
            marginBottom: "20px",
          }}
        >
          Queue Overflow! Cannot enqueue more values.
        </div>
      )}
      {/* Queue Underflow Alert */}
      {queueUnderflow && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            border: "1px solid #ffcdd2",
            borderRadius: "4px",
            color: "#c62828",
            marginBottom: "20px",
          }}
        >
          Queue Underflow! Cannot dequeue from an empty queue.
        </div>
      )}
      <svg ref={svgRef} />
    </div>
  );
};

const QueueVisualization = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#F2EEE6" }}>
      <JDoodleIDE />
      <CodingQuestionCarousel />
      <D3QueueVisualization />
    </div>
  );
};

export default QueueVisualization;
