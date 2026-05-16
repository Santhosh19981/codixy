import { Injectable } from '@angular/core';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private lenis!: Lenis;

  init(): void {
    this.lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      wheelMultiplier: 1.3,
      infinite: false,
    } as any);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    this.lenis.on('scroll', ScrollTrigger.update);
  }

  getLenis(): Lenis { return this.lenis; }

  scrollTo(target: string | number | HTMLElement, options?: any): void {
    this.lenis?.scrollTo(target as any, options);
  }

  destroy(): void {
    this.lenis?.destroy();
  }
}
