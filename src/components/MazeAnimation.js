import React, { useEffect, useRef } from 'react';

const MazeAnimation = () => {
  const canvasRef = useRef(null);
  
  // Simpler maze with clear path (12x12)
  const maze = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,1,1,1,1,1,1,0],
    [0,1,0,1,0,1,0,0,0,0,1,0],
    [0,1,0,1,1,1,1,1,1,0,1,0],
    [0,1,0,0,0,0,0,0,1,0,1,0],
    [0,1,1,1,1,1,1,0,1,0,1,0],
    [0,0,0,0,0,0,1,0,1,0,1,0],
    [0,1,1,1,1,1,1,0,1,0,1,0],
    [0,1,0,0,0,0,0,0,1,0,1,0],
    [0,1,1,1,1,1,1,1,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  // Define the solution path
  const path = [
    {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},
    {x: 3, y: 2}, {x: 3, y: 3}, {x: 4, y: 3},
    {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3},
    {x: 8, y: 3}, {x: 8, y: 4}, {x: 8, y: 5},
    {x: 8, y: 6}, {x: 8, y: 7}, {x: 8, y: 8},
    {x: 8, y: 9}, {x: 9, y: 9}, {x: 10, y: 9},
    {x: 10, y: 10}
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cellSize = 25;
    const circleRadius = 6;
    
    canvas.width = maze[0].length * cellSize;
    canvas.height = maze.length * cellSize;

    let currentPathIndex = 0;
    let progress = 0;

    function drawMaze() {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[0].length; col++) {
          if (maze[row][col] === 0) {
            ctx.fillStyle = '#2A2A2A';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        }
      }
    }

    function drawCircle(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMaze();

      const current = path[currentPathIndex];
      const next = path[(currentPathIndex + 1) % path.length];

      const x = (current.x * (1 - progress) + next.x * progress) * cellSize + cellSize/2;
      const y = (current.y * (1 - progress) + next.y * progress) * cellSize + cellSize/2;

      drawCircle(x, y);

      progress += 0.06;
      if (progress >= 1) {
        progress = 0;
        currentPathIndex = (currentPathIndex + 1) % path.length;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <canvas 
        ref={canvasRef}
        className="border border-gray-300 rounded-lg shadow-xl mb-8"
      />
      <h1 className="text-xl font-medium text-gray-700">
        Practice your algorithmic thinking!
      </h1>
    </div>
  );
};

export default MazeAnimation;