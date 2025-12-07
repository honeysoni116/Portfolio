import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker {
  activeTab: 'weekly' | 'monthly' = 'weekly';

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  currentMonth = new Date().getMonth();
  selectedDate = new Date().getDate();

  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  selectedWeekDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  keyboardEnabled = false;

  setTab(tab: 'weekly' | 'monthly') {
    this.activeTab = tab;
  }

  selectDate(day: number) {
    this.selectedDate = day;

    const d = new Date(2025, this.currentMonth, day);
    const wd = d.getDay();

    this.selectedWeekDay = wd === 0 ? 6 : wd - 1;

    this.keyboardEnabled = true;
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (!this.keyboardEnabled) return;

    if (event.key === 'ArrowRight' && this.selectedDate < 31) {
      this.selectDate(this.selectedDate + 1);
    }

    if (event.key === 'ArrowLeft' && this.selectedDate > 1) {
      this.selectDate(this.selectedDate - 1);
    }
  }
}
