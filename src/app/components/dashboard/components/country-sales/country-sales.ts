import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CountrySalesdata {
  name: string;
  percentage: number; // 0-100%
}


@Component({
  selector: 'app-country-sales',
  imports: [CommonModule],
  templateUrl: './country-sales.html',
  styleUrl: './country-sales.css',
})
export class CountrySales {
  countries: CountrySalesdata[] = [
    { name: 'USA', percentage: 92 },
    { name: 'Poland', percentage: 68 },
    { name: 'Germany', percentage: 62 },
    { name: 'England', percentage: 78 },
    { name: 'Netherland', percentage: 58 }
  ];
}
