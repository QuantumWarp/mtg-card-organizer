import { animate, style } from '@angular/animations';

export function fadeInAnimation(transitionMs: number = 300) {
  return [
    style({opacity: 0}),
    animate(transitionMs, style({ opacity: 1 }))
  ];
}
