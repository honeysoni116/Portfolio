import { Component } from '@angular/core';
import { DatePicker } from '../date-picker/date-picker';
import { LineGraph } from '../line-graph/line-graph';


@Component({
  selector: 'app-comp',
  standalone: true,
  imports: [DatePicker, LineGraph],
  templateUrl: './comp.html',
  styleUrl: './comp.css',
})
export class Comp {

}
