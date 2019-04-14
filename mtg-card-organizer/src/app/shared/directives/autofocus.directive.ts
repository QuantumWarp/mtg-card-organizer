import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mcoAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
    this.cdr.detectChanges();
  }
}
