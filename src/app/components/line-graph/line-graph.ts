import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface DataPoint {
  date: Date;
  amount: number;
}

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-graph.html',
  styleUrl: './line-graph.css',
})
export class LineGraph implements AfterViewInit, OnChanges, OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() thisMonth: DataPoint[] = [];
  @Input() lastMonth: DataPoint[] = [];

  totalAmount: number = 0;
  totalAmountThis: number = 0;
  totalAmountLast: number = 0;
  selectedView: 'this' | 'last' | 'all' = 'all';
  hoverIndex: number = -1;

  // DEFAULT DATA — when @Input is not passed
  private demoThis: DataPoint[] = [];
  private demoLast: DataPoint[] = [];

  ngOnInit(): void {
    this.randomizeData();
  }

  onMouseMove(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    // Calculate index based on X position
    // Formula: x = paddingLeft + (index / (total - 1)) * chartWidth
    // Inverse: index = ((x - paddingLeft) / chartWidth) * (total - 1)
    const totalPoints = this.demoThis.length; // Assuming both datasets have same length
    const index = Math.round(((x - this.paddingLeft) / this.chartWidth) * (totalPoints - 1));

    if (index >= 0 && index < totalPoints) {
      if (this.hoverIndex !== index) {
        this.hoverIndex = index;
        this.draw();
      }
    } else {
      if (this.hoverIndex !== -1) {
        this.hoverIndex = -1;
        this.draw();
      }
    }
  }

  onMouseLeave(): void {
    if (this.hoverIndex !== -1) {
      this.hoverIndex = -1;
      this.draw();
    }
  }

  selectView(view: 'this' | 'last'): void {
    if (this.selectedView === view) {
      this.selectedView = 'all';
    } else {
      this.selectedView = view;
    }

    // Update total amount based on view
    if (this.selectedView === 'last') {
      this.totalAmount = this.totalAmountLast;
    } else {
      // For 'this' and 'all', show current month's total
      this.totalAmount = this.totalAmountThis;
    }
    
    this.draw();
  }

  private randomizeData(): void {
    // Random total amounts between 5k and 35k
    this.totalAmountThis = Math.floor(Math.random() * 30000) + 5000;
    this.totalAmountLast = Math.floor(Math.random() * 30000) + 5000;

    // Set initial total amount (default is 'all', so use 'this')
    this.totalAmount = this.totalAmountThis;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const generateData = (baseAmount: number, year: number, month: number) => {
      return [1, 5, 10, 15, 20, 25, 30].map(day => ({
        date: new Date(year, month, day),
        amount: baseAmount * (0.7 + Math.random() * 0.6), // +/- 30% variation
      }));
    };

    // Generate random data based on respective totals
    // This Month
    this.demoThis = generateData(this.totalAmountThis, currentYear, currentMonth);

    // Last Month
    const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
    this.demoLast = generateData(this.totalAmountLast, lastMonthDate.getFullYear(), lastMonthDate.getMonth());
  }

  private ctx!: CanvasRenderingContext2D;
  private paddingLeft = 70;
  private paddingRight = 10;
  private paddingTop = 70;
  private paddingBottom = 70;
  private gap = 15;
  private chartWidth = 0;
  private chartHeight = 0;

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.draw();
  }

  ngOnChanges(): void {
    if (this.ctx) this.draw();
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = 450 * dpr;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(dpr, dpr);

    this.chartWidth = rect.width - this.paddingLeft - this.paddingRight;
    this.chartHeight = 450 - this.paddingTop - this.paddingBottom;
  }

  private draw(): void {
    const thisData = this.thisMonth.length ? this.thisMonth : this.demoThis;
    const lastData = this.lastMonth.length ? this.lastMonth : this.demoLast;

    let dataForGrid = thisData;
    let maxAmount = 0;

    if (this.selectedView === 'all') {
      const combined = [...thisData, ...lastData];
      maxAmount = Math.max(...combined.map(d => d.amount));
      dataForGrid = thisData; // Use 'this' for X-axis in 'all' view
    } else if (this.selectedView === 'this') {
      maxAmount = Math.max(...thisData.map(d => d.amount));
      dataForGrid = thisData;
    } else {
      maxAmount = Math.max(...lastData.map(d => d.amount));
      dataForGrid = lastData;
    }

    const yMax = this.niceCeil(maxAmount * 1.1);
    const yMin = 0;

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.drawGrid(yMax, dataForGrid);
    this.drawYAxis(yMax);
    this.drawXAxis(dataForGrid);

    // Draw lines based on selection
    if (this.selectedView === 'all' || this.selectedView === 'last') {
      this.drawLine(lastData, yMax, yMin, '#93c5fd20', '#93c5fd');
      this.drawPoints(lastData, yMax, yMin, '#93c5fd');
    }

    if (this.selectedView === 'all' || this.selectedView === 'this') {
      this.drawLine(thisData, yMax, yMin, '#3b82f620', '#3b82f6');
      this.drawPoints(thisData, yMax, yMin, '#3b82f6');
    }
  }

  private niceCeil(value: number): number {
    const power = Math.pow(10, Math.floor(Math.log10(value)));
    const scaled = value / power;

    if (scaled <= 1) return 1 * power;
    if (scaled <= 2) return 2 * power;
    if (scaled <= 5) return 5 * power;
    return 10 * power;
  }

  private formatAmount(value: number): string {
    if (value >= 1000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
    return value.toString();
  }

  private formatDate(date: Date): string {
    const d = date.getDate();
    const m = date.toLocaleString('en-US', { month: 'short' });
    return `${d} ${m}`;
  }

  private drawGrid(yMax: number, data: DataPoint[]): void {
    const width = this.canvasRef.nativeElement.getBoundingClientRect().width;
    const height = 450;

    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]); // Tighter dotted lines

    const xStart = this.getX(0, data.length);
    const xEnd = this.getX(data.length - 1, data.length);

    // Horizontal Grid Lines (Lighter)
    this.ctx.strokeStyle = '#d9dbe0ff';
    for (let i = 0; i <= 6; i++) {
      const y = this.paddingTop + (i / 6) * this.chartHeight;

      this.ctx.beginPath();
      this.ctx.moveTo(xStart, height - y);
      this.ctx.lineTo(xEnd, height - y);
      this.ctx.stroke();
    }

    // Vertical Grid Lines (Lighter)
    this.ctx.strokeStyle = '#d9dbe0ff';
    data.forEach((_, i) => {
      const x = this.getX(i, data.length);
      
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.paddingTop);
      this.ctx.lineTo(x, height - this.paddingBottom);
      this.ctx.stroke();
    });

    // Highlighted Vertical Line (Darker)
    if (this.hoverIndex !== -1 && this.hoverIndex < data.length) {
      const x = this.getX(this.hoverIndex, data.length);
      this.ctx.strokeStyle = '#374151';
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.paddingTop);
      this.ctx.lineTo(x, height - this.paddingBottom);
      this.ctx.stroke();
    }

    this.ctx.setLineDash([]); // Reset to solid lines
  }

  private drawYAxis(yMax: number): void {
    this.ctx.fillStyle = '#6b7280';
    this.ctx.font = '14px system-ui';
    this.ctx.textAlign = 'right';

    for (let i = 0; i <= 6; i++) {
      const value = (i / 6) * yMax;
      const y = 450 - this.paddingBottom - (i / 6) * this.chartHeight;
      this.ctx.fillText(this.formatAmount(value), this.paddingLeft - 15, y);
    }
  }

  private getX(i: number, total: number): number {
    return this.paddingLeft + this.gap + (i / (total - 1)) * (this.chartWidth - 2 * this.gap);
  }

  private drawXAxis(data: DataPoint[]): void {
    this.ctx.fillStyle = '#6b7280';
    this.ctx.font = '14px system-ui';
    this.ctx.textAlign = 'center';

    data.forEach((p, i) => {
      const x = this.getX(i, data.length);
      this.ctx.fillText(this.formatDate(p.date), x, 450 - this.paddingBottom + 15);
    });
  }

  private drawLine(data: DataPoint[], yMax: number, yMin: number, fillColor: string, lineColor: string): void {
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = lineColor;

    const points = data.map((p, i) => {
      const x = this.getX(i, data.length);

      const y =
        450 - this.paddingBottom - ((p.amount - yMin) / (yMax - yMin)) * this.chartHeight;
      return { x, y };
    });

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const tension = 0.25;

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;

      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    this.ctx.stroke();

    // Fill
    this.ctx.lineTo(points[points.length - 1].x, 450 - this.paddingBottom);
    this.ctx.lineTo(points[0].x, 450 - this.paddingBottom);
    this.ctx.closePath();

    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
  }

  private drawPoints(data: DataPoint[], yMax: number, yMin: number, color: string): void {
    data.forEach((p, i) => {
      const x = this.getX(i, data.length);

      const y =
        450 - this.paddingBottom - ((p.amount - yMin) / (yMax - yMin)) * this.chartHeight;

      // Outer circle
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();

      // Inner white dot
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#fff';
      this.ctx.fill();
    });
  }
}
