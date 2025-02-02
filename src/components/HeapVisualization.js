import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HeapVisualization = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const data = [10, 20, 30, 40, 50, 60, 70];
      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', 500)
        .attr('height', 200);

      const treeLayout = d3.tree().size([400, 150]);
      const root = d3.hierarchy({ children: data }).sum(() => 1);
      treeLayout(root);

      svg.selectAll('circle')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 10)
        .attr('fill', 'red');

      svg.selectAll('line')
        .data(root.links())
        .enter()
        .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
    }
  }, []);

  return <div ref={d3Container}></div>;
};

export default HeapVisualization;