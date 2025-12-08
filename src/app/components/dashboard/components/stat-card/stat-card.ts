import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() changePercentage: number = 0;
  @Input() chartData: number[] = [30, 40, 35, 50, 45, 60, 55, 65, 50];

  get chartPath(): string {
    if (!this.chartData || this.chartData.length === 0) {
      return '';
    }

    const width = 120;
    const height = 60;
    const max = Math.max(...this.chartData);
    const min = Math.min(...this.chartData);
    const range = max - min || 1;

    const points = this.chartData.map((value, index) => {
      const x = (index / (this.chartData.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    const path = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
    return path;
  }

  get gradientId(): string {
    return 'gradient-' + this.title.replace(/\s+/g, '-').toLowerCase();
  }
}
