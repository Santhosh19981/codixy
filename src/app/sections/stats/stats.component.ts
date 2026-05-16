import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationService } from '../../core/services/animation.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="stats" class="relative py-24 overflow-hidden bg-[#030712]">
      <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent);"></div>
      <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent);"></div>

      <div class="section-container relative z-10">
        <div #statsGrid class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let stat of stats" class="text-center stat-item relative group">
            <div class="relative z-10">
              <div class="stat-counter mb-2" #counter>0{{stat.suffix}}</div>
              <div class="text-slate-400 text-sm font-outfit tracking-wide">{{stat.label}}</div>
              <div class="mx-auto mt-4 h-px w-12 transition-all duration-400 group-hover:w-20"
                [style.background]="'linear-gradient(90deg, transparent, ' + stat.lineColor + ', transparent)'"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class StatsComponent implements AfterViewInit {
  @ViewChild('statsGrid') gridRef!: ElementRef;

  stats = [
    { value: 125, suffix: '+', label: 'Projects Delivered', lineColor: '#06b6d4' },
    { value: 50, suffix: '+', label: 'Happy Clients', lineColor: '#7c3aed' },
    { value: 5, suffix: '+', label: 'Years of Excellence', lineColor: '#2563eb' },
    { value: 30, suffix: '+', label: 'Technologies Mastered', lineColor: '#10b981' },
  ];

  constructor(private animService: AnimationService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const items = this.gridRef.nativeElement.querySelectorAll('.stat-item');
      gsap.fromTo(items, { opacity: 0, y: 40, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: this.gridRef.nativeElement,
          start: 'top 85%',
          once: true,
          onEnter: () => this.startCounters(),
        },
      });
    }, 100);
  }

  private startCounters(): void {
    const counterEls = this.gridRef.nativeElement.querySelectorAll('.stat-counter');
    this.stats.forEach((stat, i) => {
      if (counterEls[i]) {
        this.animService.animateCounter(counterEls[i] as HTMLElement, stat.value, 2.5, stat.suffix);
      }
    });
  }
}
