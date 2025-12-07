import { Component } from '@angular/core';
import { DatePicker } from '../date-picker/date-picker';


@Component({
  selector: 'app-comp',
  standalone: true,
  imports: [DatePicker],
  templateUrl: './comp.html',
  styleUrl: './comp.css',
})
export class Comp {

}
