import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { AnimationService } from '../../core/services/animation.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <section id="services" class="relative py-28 md:py-40 overflow-hidden" style="background: #0a0f1e;">
      <!-- Background -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>

      <div class="section-container relative z-10">
        <!-- Header -->
        <div #servicesHeader class="text-center mb-20">
          <div class="section-tag mx-auto mb-6">
            <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            What We Do
          </div>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 font-grotesk leading-tight">
            Our Technology<br>
            <span class="gradient-text">Solutions</span>
          </h2>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto font-outfit">
            From AI-powered automation to enterprise platforms, we craft next-generation digital
            solutions tailored to your business needs.
          </p>
        </div>

        <!-- Services Grid -->
        <div #servicesGrid class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let service of services; let i = index"
            class="glass-card service-card relative overflow-hidden group cursor-pointer p-8"
            [class.featured]="service.featured"
            (mouseenter)="onCardHover($event, true)"
            (mouseleave)="onCardHover($event, false)">

            <!-- Animated gradient border and background on hover -->
            <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              [style.background]="'linear-gradient(135deg, ' + service.glowColor + ', transparent)'"
              [style.border]="'1px solid ' + service.borderColor">
            </div>

            <!-- Glow effect -->
            <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              [style.box-shadow]="'inset 0 0 40px ' + service.glowColor">
            </div>

            <!-- Number -->
            <div class="absolute top-6 right-6 text-6xl font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-400 font-grotesk select-none"
              [style.color]="service.accentColor" style="mix-blend-mode: overlay; z-index: 2;">
              {{(i + 1).toString().padStart(2, '0')}}
            </div>



            <!-- Icon -->
            <div class="w-14 h-14 rounded-xl mb-6 flex items-center justify-center relative z-10 transition-all duration-400 group-hover:scale-110"
              [style.background]="'linear-gradient(135deg, ' + service.iconBg + ', transparent)'"
              [style.border]="'1px solid ' + service.borderColor">
              <span [innerHTML]="service.icon | safeHtml"></span>
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold text-white mb-3 font-grotesk relative z-10 group-hover:text-cyan-300 transition-colors duration-300">
              {{service.title}}
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-6 font-outfit relative z-10">
              {{service.description}}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6 relative z-10">
              <span *ngFor="let tag of service.tags"
                class="px-2 py-1 text-xs font-medium rounded-md font-outfit"
                [style.background]="'rgba(6,182,212,0.1)'"
                [style.color]="'rgba(6,182,212,0.8)'"
                [style.border]="'1px solid rgba(6,182,212,0.2)'">
                {{tag}}
              </span>
            </div>

            <!-- Arrow link -->
            <div class="flex items-center gap-2 text-cyan-400 text-sm font-medium font-grotesk group-hover:gap-4 transition-all duration-300 relative z-10">
              <span>Learn More</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .featured {
      border-color: rgba(6,182,212,0.3) !important;
      background: linear-gradient(135deg, rgba(6,182,212,0.12), rgba(124,58,237,0.12)) !important;
    }
    .service-card {
      background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
    }
  `]
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('servicesHeader') headerRef!: ElementRef;
  @ViewChild('servicesGrid') gridRef!: ElementRef;

  services = [
    {
      title: 'AI & Intelligent Automation',
      description: 'Build AI-powered systems that automate workflows, enhance decision-making, and unlock new business efficiencies.',
      tags: ['Machine Learning', 'NLP', 'Computer Vision'],
      icon: '<svg class="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>',
      illustration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>',
      iconBg: 'rgba(6,182,212,0.15)',
      borderColor: 'rgba(6,182,212,0.3)',
      accentColor: '#06b6d4',
      glowColor: 'rgba(6,182,212,0.05)',
      featured: true,
    },
    {
      title: 'Web Application Development',
      description: 'Enterprise-grade web applications built with modern frameworks, optimized for performance and scalability.',
      tags: ['Angular', 'React', 'Node.js'],
      icon: '<svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
      illustration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>',
      iconBg: 'rgba(124,58,237,0.15)',
      borderColor: 'rgba(124,58,237,0.3)',
      accentColor: '#7c3aed',
      glowColor: 'rgba(124,58,237,0.05)',
      featured: false,
    },
    {
      title: 'Mobile App Development',
      description: 'Cross-platform and native mobile apps that deliver outstanding user experiences on iOS and Android.',
      tags: ['Flutter', 'Ionic', 'React Native'],
      icon: '<svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
      illustration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
      iconBg: 'rgba(37,99,235,0.15)',
      borderColor: 'rgba(37,99,235,0.3)',
      accentColor: '#2563eb',
      glowColor: 'rgba(37,99,235,0.05)',
      featured: false,
    },
    {
      title: 'Enterprise Software Solutions',
      description: 'Robust, scalable enterprise platforms including ERP, CRM, and custom business management systems.',
      tags: ['Java', 'Spring Boot', 'Microservices'],
      icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
      illustration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>',
      iconBg: 'rgba(16,185,129,0.15)',
      borderColor: 'rgba(16,185,129,0.3)',
      accentColor: '#10b981',
      glowColor: 'rgba(16,185,129,0.05)',
      featured: false,
    },
    {
      title: 'UI/UX Design & Branding',
      description: 'Stunning, futuristic digital experiences crafted with human-centered design principles and modern aesthetics.',
      tags: ['Figma', 'Design Systems', 'Prototyping'],
      icon: '<svg class="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
      illustration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
      iconBg: 'rgba(236,72,153,0.15)',
      borderColor: 'rgba(236,72,153,0.3)',
      accentColor: '#ec4899',
      glowColor: 'rgba(236,72,153,0.05)',
      featured: false,
    },
    {
      title: 'DevOps & Cloud Infrastructure',
      description: 'Secure, scalable cloud infrastructure with CI/CD pipelines, monitoring, and automated deployment workflows.',
      tags: ['AWS', 'Docker', 'Kubernetes'],
      icon: '<svg class="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>',
      illustration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
      iconBg: 'rgba(249,115,22,0.15)',
      borderColor: 'rgba(249,115,22,0.3)',
      accentColor: '#f97316',
      glowColor: 'rgba(249,115,22,0.05)',
      featured: false,
    },
  ];

  constructor(private animService: AnimationService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animService.revealSection(this.headerRef.nativeElement, { stagger: 0 });
      this.animService.staggerReveal(this.gridRef.nativeElement, '.service-card', { stagger: 0.1 });
    }, 100);
  }

  onCardHover(e: MouseEvent, enter: boolean): void {
    const card = e.currentTarget as HTMLElement;
    gsap.to(card, {
      y: enter ? -8 : 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  }
}
