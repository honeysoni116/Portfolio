import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  imports: [CommonModule],
  templateUrl: './marquee.html',
  styleUrl: './marquee.css',
})
export class Marquee {

  baseLogos = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg', alt: 'HTML5' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg', alt: 'CSS3' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', alt: 'JS' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Angular_gradient_logo.png', alt: 'Angular' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', alt: 'React' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg', alt: 'NestJS' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', alt: 'NodeJS' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png', alt: 'ExpressJS' },
  ];

  logos = [...this.baseLogos, ...this.baseLogos];
}
