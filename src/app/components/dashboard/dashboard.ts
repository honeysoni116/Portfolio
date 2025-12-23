import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from './components/stat-card/stat-card';
import { LineGraph } from '../line-graph/line-graph';
import { CountrySales } from './components/country-sales/country-sales';
import { RouterLink } from '@angular/router';
import { SalesTable, SalesDeal } from './components/sales-table/sales-table';
import { BarChart } from './components/bar-chart/bar-chart';
import { DonutChart } from './components/donut-chart/donut-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCard, LineGraph, CountrySales, RouterLink, SalesTable, BarChart, DonutChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  activeNav = 'Dashboard';

  navItems = [
    { icon: 'dashboard', label: 'Dashboard' },
    { icon: 'check_box', label: 'Tasks' },
    { icon: 'calendar_today', label: 'Calendar' },
    { icon: 'inventory_2', label: 'Products' },
    { icon: 'bar_chart', label: 'Analytics' },
    { icon: 'email', label: 'Email' },
    { icon: 'link', label: 'Integrations' },
  ];

  bottomNavItems = [
    { icon: 'settings', label: 'Settings' },
    { icon: 'help', label: 'Help Center' },
  ];

  // Sample data for the sales table
  salesDeals: SalesDeal[] = [
    {
      id: 'FA127829',
      initials: 'SJ',
      customerName: 'Simon Joe',
      customerEmail: 'josimon@gmail.com',
      productService: 'Software Service',
      dealValue: 1928.9,
      closeDate: '28 Mar 2025',
    },
    {
      id: 'FA128272',
      initials: 'JS',
      customerName: 'John Smith',
      customerEmail: 'smithjo@gmail.com',
      productService: 'Software Service',
      dealValue: 1228.2,
      closeDate: '28 Mar 2025',
    },
    {
      id: 'FA129104',
      initials: 'AM',
      customerName: 'Anna Miller',
      customerEmail: 'anna.m@company.com',
      productService: 'Cloud Pro Plan',
      dealValue: 5499.0,
      closeDate: '02 Apr 2025',
    },
    {
      id: 'FA126933',
      initials: 'RT',
      customerName: 'Robert Tan',
      customerEmail: 'robert.tan@enterprise.co',
      productService: 'Enterprise License',
      dealValue: 12999.99,
      closeDate: '15 Mar 2025',
    },
  ];

  setActiveNav(label: string): void {
    this.activeNav = label;
  }

  isActive(label: string): boolean {
    return this.activeNav === label;
  }

  openSearch(): void {
    alert('Global search opened!');
  }

  onThisMonth(): void {
    console.log('Filtering data for This Month');
    // You can filter salesDeals here if needed
  }

  onExport(): void {
    console.log('Exporting all dashboard data...');
    // Trigger table export or full export
    alert('Dashboard exported!');
  }

  // Sales Table Events
  onTableSearch(term: string) {
    console.log('Searching table for:', term);
    // Filter your salesDeals array here if you want live search
  }

  onTableFilter() {
    alert('Filter modal opened');
  }

  onTableExport() {
    console.log('Exporting table data...');
    const csv = this.convertToCSV(this.salesDeals);
    this.downloadCSV(csv, 'sales-data.csv');
  }

  // Helper: Convert array to CSV
  private convertToCSV(data: SalesDeal[]): string {
    const headers = [
      'ID Deal',
      'Customer Name',
      'Email',
      'Product/Service',
      'Deal Value',
      'Close Date',
    ];
    const rows = data.map((d) =>
      [d.id, d.customerName, d.customerEmail, d.productService, d.dealValue, d.closeDate].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }

  // Helper: Trigger download
  private downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
