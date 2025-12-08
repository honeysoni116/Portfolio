import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SalesDeal {
  id: string;
  initials: string;
  customerName: string;
  customerEmail: string;
  productService: string;
  dealValue: number;
  closeDate: string; // or Date if you prefer
}

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sales-table.html',
  styleUrl: './sales-table.css',
})
export class SalesTable {
  @Input() deals: SalesDeal[] = [];
  @Input() loading = false;

  @Output() search = new EventEmitter<string>();
  @Output() filterClick = new EventEmitter<void>();
  @Output() exportClick = new EventEmitter<void>();

  searchTerm = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
