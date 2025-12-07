import { Component } from '@angular/core';
import { Marquee } from '../marquee/marquee';

@Component({
  selector: 'app-home',
  imports: [Marquee],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
