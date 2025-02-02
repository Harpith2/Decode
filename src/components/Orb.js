import React, { useEffect, useRef } from 'react';

const Orb = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const centerX = canvas.width / (2 * dpr);
    const centerY = canvas.height / (2 * dpr);
    const orbRadius = 50;
    let time = 0;

    const aquaColor = { r: 169, g: 215, b: 217 };
    const getAquaColor = (opacity) => `rgba(${aquaColor.r}, ${aquaColor.g}, ${aquaColor.b}, ${opacity})`;
    
    const drawWaveform = (centerX, centerY, radius, params, opacity, width) => {
      const { amplitude, frequency, phase, secondaryFreq, distortion } = params;
      
      ctx.beginPath();
      ctx.strokeStyle = getAquaColor(opacity);
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const points = [];
      const numPoints = 360;
      
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i * Math.PI) / 180;
        const primaryWave = amplitude * Math.sin(frequency * angle + phase);
        const secondaryWave = (amplitude * 0.3) * Math.sin(secondaryFreq * angle + phase * 1.5);
        const distortionWave = distortion * Math.sin(3 * angle + phase * 0.7);
        
        const radiusOffset = primaryWave + secondaryWave + distortionWave;
        
        const x = centerX + (radius + radiusOffset) * Math.cos(angle);
        const y = centerY + (radius + radiusOffset) * Math.sin(angle);
        
        points.push({ x, y });
      }
      
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      
      ctx.quadraticCurveTo(
        points[points.length - 2].x,
        points[points.length - 2].y,
        points[0].x,
        points[0].y
      );
      
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.02;
      
      const baseGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, orbRadius * 3
      );
      baseGlow.addColorStop(0, 'rgba(169, 215, 217, 0.1)');
      baseGlow.addColorStop(0.5, 'rgba(169, 215, 217, 0.05)');
      baseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = baseGlow;
      ctx.arc(centerX, centerY, orbRadius * 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = 0; i < 6; i++) {
        const baseAlpha = 0.3;
        const alpha = baseAlpha + Math.sin(time + i) * 0.15;
        const phase = time * (1.1 + i * 0.2);
        const frequency = 3 + Math.sin(time * 0.6 + i) * 0.8;
        const secondaryFreq = 4 + Math.cos(time * 0.3) * 0.8;
        const distortion = 1.8 + Math.sin(time * 0.45 + i) * 0.8;
        
        for (let j = 0; j < 4; j++) {
          const radius = orbRadius * 1.5 - j * 4;
          const width = (3 - j * 0.4);
          const layerAlpha = alpha * (1 - j * 0.2);
          
          const waveParams = {
            amplitude: (8 - j * 0.5) * (1 + Math.sin(time + i * Math.PI / 3) * 0.6),
            frequency: frequency * (1 + j * 0.15),
            phase: phase + j * Math.PI / 4,
            secondaryFreq: secondaryFreq * (1 - j * 0.05),
            distortion: distortion * (1 - j * 0.1)
          };
          
          drawWaveform(
            centerX,
            centerY,
            radius,
            waveParams,
            layerAlpha * 0.4,
            width
          );
        }
      }
      
      const innerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, orbRadius * 2
      );
      innerGlow.addColorStop(0, 'rgba(169, 215, 217, 0.18)');
      innerGlow.addColorStop(0.4, 'rgba(169, 215, 217, 0.1)');
      innerGlow.addColorStop(0.7, 'rgba(169, 215, 217, 0.05)');
      innerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.fillStyle = innerGlow;
      ctx.arc(centerX, centerY, orbRadius * 2, 0, Math.PI * 2);
      ctx.fill();
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  return (
    <div className="flex items-center justify-center w-full h-96" style={{ marginTop: '-40px' }}>
      <div className="relative w-96 h-96">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            filter: 'blur(0.6px) brightness(1.05)',
            background: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default Orb;