import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCheckStatus]',
})
export class CheckStatusDirective {
  countClicked = 0;

  constructor(private el: ElementRef) {
    this.el.nativeElement.addEventListener('click', () => {
      this.countClicked++;
      this.changeStatus();
    });
  }

  changeStatus(): void {
    switch (this.countClicked) {
      case 1:
        this.el.nativeElement.style.backgroundColor = 'yellow';
        break;
      case 2:
        this.el.nativeElement.style.backgroundColor = 'green';
        break;
    }
  }
}
