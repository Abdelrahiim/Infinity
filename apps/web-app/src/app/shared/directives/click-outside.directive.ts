import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  clickOutside = output<void>();

  constructor(private elementRef: ElementRef<HTMLDivElement>) {}

  @HostListener('document:click', ['$event.target'])
  private onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
