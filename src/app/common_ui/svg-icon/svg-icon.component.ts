import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[ion]',  
  standalone: true,
  template: `
    <svg>
      <use [attr.href]="href"></use>  <!-- Правильное использование href в теге <use> -->
    </svg>
  `,
  styles: ['']
})
export class SvgIconComponent {
  @Input() ion: string = '';  

  get href() {
   
    return `assets/svg-sidebar/${this.ion}.svg#${this.ion}`;
  }
}
