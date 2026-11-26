import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private lenis!: Lenis;
  private tick = (time: number) => this.lenis.raf(time * 1000);

  private pendingSection: string | null = null;

  constructor(private zone: NgZone, private router: Router) {}

  init(): void {
    // Run the scroll loop outside Angular so every animation frame
    // doesn't trigger app-wide change detection (main cause of jank).
    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        lerp: 0.09,              // frame-rate independent, buttery interpolation
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: false,        // keep native momentum on touch devices (smoothest on mobile)
        infinite: false,
        // Chrome sends some wheel events (touchpad momentum, precision mice) as
        // non-cancelable, so the browser scrolls natively anyway. If Lenis also
        // animated, the two would fight and the page would jump back and forth.
        // For those, drop Lenis's own animation and let the native scroll lead.
        virtualScroll: ({ event }) => {
          if (event.cancelable || !event.type.includes('wheel')) return true;
          if (this.lenis.isScrolling === 'smooth') {
            this.lenis.scrollTo(this.lenis.actualScroll, { immediate: true, force: true });
          }
          return false;
        },
      });

      this.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(this.tick);
      gsap.ticker.lagSmoothing(0);
    });

    // Leaving the home page: drop its scroll animations (their elements are destroyed).
    this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(() => {
      if (this.isHome()) ScrollTrigger.getAll().forEach(t => t.kill());
    });

    // New page: start at the top (or at the requested home section), then re-measure triggers.
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const section = this.pendingSection;
      this.pendingSection = null;
      this.zone.runOutsideAngular(() => {
        this.lenis?.scrollTo(0, { immediate: true, force: true });
        setTimeout(() => {
          ScrollTrigger.refresh();
          if (section) this.scrollToSection(section);
        }, 350);
      });
    });
  }

  private isHome(): boolean {
    return this.router.url.split(/[?#]/)[0] === '/';
  }

  /** Scroll to a home-page section (e.g. '#contact'), navigating home first if needed. */
  goToSection(href: string): void {
    if (this.isHome()) {
      this.scrollToSection(href);
    } else {
      this.pendingSection = href;
      this.router.navigateByUrl('/');
    }
  }

  /** Scroll to the top of the home page, navigating home first if needed. */
  goHome(): void {
    if (this.isHome()) this.scrollTo(0, { duration: 1.5 });
    else this.router.navigateByUrl('/');
  }

  /** Sections below the hero load lazily, so wait (briefly) for the target to exist. */
  private scrollToSection(href: string, attempt = 0): void {
    const el = document.querySelector(href);
    if (el) {
      this.scrollTo(el as HTMLElement, { offset: -80, duration: 1.5 });
    } else if (attempt < 40) {
      setTimeout(() => this.scrollToSection(href, attempt + 1), 100);
    }
  }

  getLenis(): Lenis { return this.lenis; }

  scrollTo(target: string | number | HTMLElement, options?: any): void {
    this.zone.runOutsideAngular(() => this.lenis?.scrollTo(target as any, options));
  }

  destroy(): void {
    gsap.ticker.remove(this.tick);
    this.lenis?.destroy();
  }
}
