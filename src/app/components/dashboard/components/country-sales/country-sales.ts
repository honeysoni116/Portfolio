import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CountrySalesData {
  name: string;
  percentage: number;
  flagUrl: string;
}


@Component({
  selector: 'app-country-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-sales.html',
  styleUrl: './country-sales.css',
})
export class CountrySales {
  countries: CountrySalesData[] = [
    { name: 'USA', percentage: 92, flagUrl: 'https://flagcdn.com/w20/us.png' },
    { name: 'Poland', percentage: 68, flagUrl: 'https://flagcdn.com/w20/pl.png' },
    { name: 'Germany', percentage: 62, flagUrl: 'https://flagcdn.com/w20/de.png' },
    { name: 'England', percentage: 78, flagUrl: 'https://flagcdn.com/w20/gb.png' },
    { name: 'Netherland', percentage: 58, flagUrl: 'https://flagcdn.com/w20/nl.png' }
  ];
}
