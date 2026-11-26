import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationService } from '../../core/services/animation.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="portfolio" class="relative py-28 md:py-40 overflow-hidden bg-[#030712]">
      <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="section-container relative z-10 max-w-[1400px]">
        <div #portfolioHeader class="text-center mb-16">
          <div class="section-tag mx-auto mb-6">
            <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Our Work
          </div>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 font-grotesk leading-tight">
            Work <span class="gradient-text">In Action</span>
          </h2>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto font-outfit">
            Innovative digital solutions delivering real business impact.
          </p>
        </div>

        <!-- Marquee Slider -->
        <div #sliderContainer class="relative w-full overflow-hidden pb-10">
          <div class="marquee-container">
            <div class="marquee-track items-stretch gap-6 pb-4">
              
              <!-- Project Card -->
              <div *ngFor="let project of allProjects" 
                class="project-card flex-none w-[340px] md:w-[400px] group relative glass-card overflow-hidden cursor-default transition-all duration-400 hover:border-cyan-400/30 hover:-translate-y-2"
                style="border-color: rgba(252, 253, 253, 1); margin: 0 12px;">
                
                <!-- Glow on hover -->
                <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style="box-shadow: inset 0 0 30px rgba(249, 252, 253, 1);"></div>

                <div class="flex flex-col h-full">
                  <!-- Image Top -->
                  <div class="relative w-full h-56 md:h-64 overflow-hidden shrink-0 border-b border-white/5 bg-[#0a0f1e]">
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse"></div>
                    <img [src]="project.image" [alt]="project.title" width="800" height="400" decoding="async"
                      class="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy" onerror="this.style.display='none'">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80 z-20"></div>
                  </div>

                  <!-- Content Bottom -->
                  <div class="p-6 md:p-8 flex flex-col flex-grow relative z-30 bg-[#0d1424]/40" style="white-space: normal;">
                    <div class="flex justify-between items-start mb-4">
                      <div class="section-tag text-[10px] py-1 px-3">{{project.category}}</div>
                      <a [href]="project.url" target="_blank" rel="noopener noreferrer" 
                         class="text-slate-400 hover:text-cyan-400 transition-colors bg-white/5 p-2 rounded-full backdrop-blur-md border border-white/10 hover:border-cyan-400/30">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                    </div>

                    <h3 class="text-2xl font-bold text-white mb-3 font-grotesk group-hover:text-cyan-300 transition-colors">{{project.title}}</h3>
                    
                    <p class="text-slate-400 text-sm leading-relaxed mb-6 font-outfit flex-grow">
                      {{project.description}}
                    </p>

                    <!-- Tech Stack -->
                    <div class="mt-auto">
                      <div class="flex flex-wrap gap-2">
                        <span *ngFor="let tech of project.techStack"
                          class="px-2 py-1 text-[11px] font-medium rounded-md font-grotesk bg-white/5 text-slate-300 border border-white/10">
                          {{tech}}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Swipe indicator for mobile -->
        <div class="flex justify-center items-center gap-2 mt-4 md:hidden text-slate-500 font-outfit text-sm">
          <svg class="w-4 h-4 animate-bounce-horizontal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          Swipe to explore
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host{display:block;}
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes bounceH { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
    .animate-bounce-horizontal { animation: bounceH 2s infinite ease-in-out; }
  `]
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('portfolioHeader') headerRef!: ElementRef;
  @ViewChild('sliderContainer') sliderRef!: ElementRef;
  @ViewChild('scrollTrack') trackRef!: ElementRef;

  projects = [
    {
      title: 'Bhagona',
      url: '#',
      category: 'Food Tech Platform',
      description: 'A smart   ordering and catering platform connecting clients with professional chefs for customized events and personal occasions.',
      techStack: ['Angular', 'Ionic', 'Node.js', 'Firebase'],
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Our School ERP',
      url: 'https://ourschoolerp.com',
      category: 'Education Management Software',
      description: 'School Management System with Features for Teachers, Students, and Parents.',
      techStack: ['Angular', 'Node.js', 'PostgreSQL'],
      image: 'assets/icons/school-management.webp'
    },
    {
      title: 'CW Rentals',
      url: '#',
      category: 'Car Rental Platform',
      description: 'Car rental platform with vehicle listings, real-time availability, online booking, and fleet management for operators.',
      techStack: ['Angular', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'CashFlo',
      url: '#',
      category: 'Accounting & ERP',
      description: 'Accounting and ERP platform covering invoicing, expenses, inventory, and financial reports for growing businesses.',
      techStack: ['Angular', 'Node.js', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'InfraMart',
      url: '#',
      category: 'Construction & Interiors',
      description: 'Construction and interiors platform showcasing projects and services, with enquiry and quotation management.',
      techStack: ['Angular', 'Node.js', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Aqua Pure Solutions',
      url: '#',
      category: 'Water Purification',
      description: 'Water purification business platform with product catalog, service bookings, and customer support management.',
      techStack: ['Angular', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80'
    }
  ];
  get allProjects() { return [...this.projects, ...this.projects]; }

  constructor(private animService: AnimationService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animService.revealSection(this.headerRef.nativeElement, { stagger: 0 });
    }, 100);
  }
}
