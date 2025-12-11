import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          },
          color: '#6B7280',
        },
      },
      y: {
        min: 0,
        max: 5000,
        ticks: {
          stepSize: 1000,
          callback: (value) => {
            if (value === 0) return '0k';
            return Number(value) / 1000 + 'k';
          },
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          },
          color: '#6B7280',
          padding: 10,
        },
        grid: {
          color: '#E5E7EB',
          tickLength: 0,
          borderDash: [2, 2],
        } as any,
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1F2937',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['Sep', '', 'Oct', '', 'Nov'],
    datasets: [
      {
        data: [1700, 2200, 1700, 3000, 2200],
        backgroundColor: '#5856D6', 
        barThickness: 32,
        stack: 'a',
        borderRadius: 4,
      },
      {
        data: [500, 1800, 800, 900, 800],
        backgroundColor: '#A09FE0', 
        barThickness: 32,
        stack: 'a',
        borderRadius: 4,
      },
      {
        data: [800, 900, 1500, 1000, 1800],
        backgroundColor: '#DCDCF9', 
        barThickness: 32,
        stack: 'a',
        borderRadius: 4,
      },
    ],
  };
}
