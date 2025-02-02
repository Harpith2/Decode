import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import codelogo from "./codelogo.png";

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

const CodingQuestionCarousel = () => {
  const questions = [
    { question: "Given a singly linked list 10 > 20 > 30 > 40 > 50, write a java program that finds the middle value of the linked list. Execute your code to check that the output is 30.", answer: "To find the middle of a linked list, use two pointers: one moves one step at a time (slow), and the other moves two steps at a time (fast), and when the fast pointer reaches the end, the slow pointer will be at the middle." },
    { question: "Explain the difference between a stack and a queue.", answer: "A stack follows LIFO (Last In, First Out), whereas a queue follows FIFO (First In, First Out)." },
    { question: "How do you reverse a linked list?", answer: "You can reverse a linked list by iterating through it and changing the next pointers of each node." },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHintModal, setShowHintModal] = useState(false);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setShowHintModal(false);
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    setShowHintModal(false);
  };

  return (
    <div
      style={{
        height: '250px',
        width: '30%',
        position: 'fixed',
        bottom: '60px',
        left: '40px',
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#000",
        animation: 'fadeIn 0.5s ease-in-out',
      }}
    >
      <img src={codelogo} alt="Code Logos" style={{ width: "110px", height: "40px", borderRadius: "5px" }} />
      <h3 style={{ fontSize: "23px", fontWeight: "2000", marginBottom: "15px", color: "#fff" }}>Coding Questions</h3>
      <div style={{ fontSize: "16px", marginBottom: "20px", color: "#fff", marginTop: "50px" }}>
        <strong>{questions[currentQuestionIndex].question}</strong>
      </div>

      {/* Show Hint Button */}
      <button
        onClick={() => setShowHintModal(true)}
        style={{
          padding: "10px 50px",
          backgroundColor: "#FBF9F5",
          color: "#000",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          marginBottom: "-10px",
          marginTop: "10px",
        }}
      >
        Logic Hint
      </button>

      {/* Add Navigation Arrows */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
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

      {/* Hint Modal */}
      {showHintModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            width: "300px",
          }}
        >
          <h3>Hint:</h3>
          <p>{questions[currentQuestionIndex].answer}</p>
          <button
            onClick={() => setShowHintModal(false)}
            style={{
              padding: "8px 15px",
              backgroundColor: "#FF5722",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
};

const D3ArrayVisualization = () => {
  const svgRef = useRef();
  const [rows, setRows] = useState(2); // Default rows
  const [cols, setCols] = useState(10); // Default columns
  const cellSize = 50;
  const [width, setWidth] = useState(cols * cellSize);
  const [height, setHeight] = useState(rows * cellSize);

  const [data, setData] = useState(
    Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0))
  );

  const [rowInput, setRowInput] = useState("");
  const [colInput, setColInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const [rowsInput, setRowsInput] = useState("");
  const [colsInput, setColsInput] = useState("");

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // Clear previous drawings

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background", "#ffffff")
      .style("border", "1px solid #e0e0e0")
      .style("border-radius", "8px");

    const rowGroups = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (_, i) => `translate(0, ${i * cellSize})`);

    rowGroups
      .selectAll("rect")
      .data((d, row) => d.map((value, col) => ({ value, row, col })))
      .enter()
      .append("rect")
      .attr("x", (d) => d.col * cellSize)
      .attr("y", 0)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", "#6ed2bc")
      .attr("stroke", "#fff")
      .attr("rx", "4") // Rounded corners for cells
      .attr("ry", "4");

    rowGroups
      .selectAll("text")
      .data((d, row) => d.map((value, col) => ({ value, row, col })))
      .enter()
      .append("text")
      .attr("x", (d) => d.col * cellSize + cellSize / 2)
      .attr("y", cellSize / 2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "#000")
      .attr("font-size", "14px")
      .text((d) => d.value);
  }, [data, width, height]);

  const handleInsertValue = () => {
    const row = Number(rowInput);
    const col = Number(colInput);
    const value = Number(valueInput);

    if (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      !isNaN(value)
    ) {
      const newData = data.map((rowArr) => [...rowArr]);
      newData[row][col] = value;
      setData(newData);
      setRowInput("");
      setColInput("");
      setValueInput("");
    } else {
      alert("Invalid input. Please ensure row and column are within the array bounds and value is a number.");
    }
  };

  const handleSetArraySize = () => {
    const newRows = Number(rowsInput);
    const newCols = Number(colsInput);

    if (newRows > 0 && newCols > 0) {
      setRows(newRows);
      setCols(newCols);
      setWidth(newCols * cellSize);
      setHeight(newRows * cellSize);
      setData(
        Array(newRows)
          .fill(0)
          .map(() => Array(newCols).fill(0))
      );
      setRowsInput("");
      setColsInput("");
    } else {
      alert("Invalid input. Please ensure rows and columns are positive numbers.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "10px",
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          fontSize: "20px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        Try populating this Array based on index positions!
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="Rows"
            value={rowsInput}
            onChange={(e) => setRowsInput(e.target.value)}
            min="1"
            style={{
              flex: 1,
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
            placeholder="Columns"
            value={colsInput}
            onChange={(e) => setColsInput(e.target.value)}
            min="1"
            style={{
              flex: 1,
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
        <button
          onClick={handleSetArraySize}
          style={{
            width: "100%",
            padding: "10px",
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
          Set Array Size
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder={`Row (0-${rows - 1})`}
            value={rowInput}
            onChange={(e) => setRowInput(e.target.value)}
            min="0"
            max={rows - 1}
            style={{
              flex: 1,
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
            placeholder={`Column (0-${cols - 1})`}
            value={colInput}
            onChange={(e) => setColInput(e.target.value)}
            min="0"
            max={cols - 1}
            style={{
              flex: 1,
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
        <input
          type="number"
          placeholder="Value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          style={{
            width: "100%",
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
        <button
          onClick={handleInsertValue}
          style={{
            width: "100%",
            padding: "10px",
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
          Insert Value
        </button>
      </div>
      <svg ref={svgRef} />
    </div>
  );
};
const ArrayVisualization = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#F2EEE6" }}>
      <JDoodleIDE />
      <CodingQuestionCarousel />
      <D3ArrayVisualization />
    </div>
  );
};

export default ArrayVisualization;
