import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
})
export class DonutChart {
  totalAreas = 64;
  
  chartData: ChartData[] = [
    { label: 'Residential areas', value: 38, color: '#E67E73' },
    { label: 'Public parking lots and garages', value: 10.9, color: '#F4D9B3' },
    { label: 'Public transportation hubs', value: 7.4, color: '#E8D4F0' },
    { label: 'Commercial and retail locations', value: 4.1, color: '#C9C4E8' },
    { label: 'Workplace', value: 2.7, color: '#B8C5E0' }
  ];

  get total(): number {
    return this.chartData.reduce((sum, item) => sum + item.value, 0);
  }

  polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  private getAdjustedAngles(): number[] {
    const minAngle = 18;
    const totalAngle = 360;
    let angles = this.chartData.map(d => (d.value / this.total) * totalAngle);
    
    // Enforce minimum angle
    let largestIndex = 0;
    let deficit = 0;
    
    angles.forEach((angle, i) => {
      if (angle > angles[largestIndex]) largestIndex = i;
      if (angle < minAngle) {
        deficit += (minAngle - angle);
        angles[i] = minAngle;
      }
    });
    
    angles[largestIndex] -= deficit;
    return angles;
  }

  getArcPath(index: number): string {
    const cx = 100;
    const cy = 100;
    const outerRadius = 92;
    const innerRadius = 60;
    const gap = 2; // Reduced mathematical gap (stroke provides visual gap)
    
    const angles = this.getAdjustedAngles();
    let currentAngle = 0;
    for (let i = 0; i < index; i++) {
      currentAngle += angles[i];
    }
    
    const segmentAngle = angles[index];
    const startAngle = currentAngle + gap;
    const sweepAngle = segmentAngle - (2 * gap);
    const endAngle = startAngle + sweepAngle;
    
    const outerStart = this.polarToCartesian(cx, cy, outerRadius, startAngle);
    const outerEnd = this.polarToCartesian(cx, cy, outerRadius, endAngle);
    const innerStart = this.polarToCartesian(cx, cy, innerRadius, startAngle);
    const innerEnd = this.polarToCartesian(cx, cy, innerRadius, endAngle);
    
    const largeArcFlag = sweepAngle > 180 ? 1 : 0;
    
    const path = [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
      'Z'
    ].join(' ');
    
    return path;
  }

  getLabelPosition(index: number): { x: number, y: number } {
    const cx = 100;
    const cy = 100;
    const labelRadius = 76;
    
    const angles = this.getAdjustedAngles();
    let currentAngle = 0;
    for (let i = 0; i < index; i++) {
      currentAngle += angles[i];
    }
    
    const segmentAngle = angles[index];
    const midAngle = currentAngle + (segmentAngle / 2);
    
    return this.polarToCartesian(cx, cy, labelRadius, midAngle);
  }
}
