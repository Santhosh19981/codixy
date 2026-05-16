import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="relative py-28 md:py-40 overflow-hidden bg-[#030712]">
      <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="section-container relative z-10">
        <div #header class="text-center mb-20">
          <div class="section-tag mx-auto mb-6">
            <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Client Stories
          </div>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 font-grotesk leading-tight">
            What Our <span class="gradient-text">Clients Say</span>
          </h2>
        </div>
      </div>

      <!-- Carousel -->
      <div class="relative w-full overflow-hidden pb-10">
        <div class="marquee-container">
          <div class="marquee-track items-stretch gap-6 pb-4">
            <div *ngFor="let t of allTestimonials"
              class="testimonial-card glass-card p-8 group hover:border-cyan-400/20 transition-all duration-400 cursor-default relative overflow-hidden flex flex-col justify-between shrink-0" style="width: 400px; white-space: normal; margin: 0 24px;">
              
              <div>
                <!-- Quote mark -->
                <div class="absolute top-4 right-6 text-7xl font-serif opacity-5 group-hover:opacity-10 transition-opacity duration-400 text-cyan-400 leading-none select-none">"</div>

                <!-- Stars -->
                <div class="flex gap-1 mb-5">
                  <svg *ngFor="let s of [1,2,3,4,5]" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>

                <!-- Review -->
                <p class="text-slate-300 leading-relaxed mb-6 font-outfit text-sm relative z-10">"{{t.review}}"</p>
              </div>

              <!-- Author -->
              <div class="flex items-center gap-4 relative z-10 mt-auto">
                <div class="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm font-grotesk shrink-0"
                  [style.background]="t.avatarBg" [style.color]="t.avatarColor">
                  {{t.initials}}
                </div>
                <div>
                  <div class="text-white font-semibold text-sm font-grotesk">{{t.name}}</div>
                  <div class="text-slate-500 text-xs font-outfit">{{t.role}} · {{t.company}}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host{display:block;}`]
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('header') headerRef!: ElementRef;

  testimonials = [
    {
      name: 'Arjun Mehta', role: 'CTO', company: 'NexaFinance Ltd.',
      review: 'CODIXY Technologies delivered an exceptional enterprise platform that transformed our operations. Their attention to detail, technical excellence, and futuristic design sense are truly world-class.',
      initials: 'AM', avatarBg: 'linear-gradient(135deg,#06b6d4,#2563eb)', avatarColor: '#fff',
    },
    {
      name: 'Priya Sharma', role: 'Product Manager', company: 'HealthBridge India',
      review: 'Working with CODIXY was a game-changer. They understood our vision perfectly and built a mobile platform that exceeded all expectations. The team is responsive, innovative, and highly skilled.',
      initials: 'PS', avatarBg: 'linear-gradient(135deg,#7c3aed,#ec4899)', avatarColor: '#fff',
    },
    {
      name: 'Rahul Verma', role: 'Founder', company: 'EduSpark Technologies',
      review: 'The AI-powered automation solution CODIXY built for us reduced our manual workload by 60%. Their deep expertise in modern technology stacks and commitment to quality is outstanding.',
      initials: 'RV', avatarBg: 'linear-gradient(135deg,#10b981,#06b6d4)', avatarColor: '#fff',
    },
    {
      name: 'Sunita Rao', role: 'COO', company: 'Global Logistics',
      review: 'CODIXY streamlined our supply chain management system with an intuitive web application. The ROI was evident within the first quarter.',
      initials: 'SR', avatarBg: 'linear-gradient(135deg,#f59e0b,#ef4444)', avatarColor: '#fff',
    },
    {
      name: 'Michael Chen', role: 'Director of Engineering', company: 'FinTech Solutions',
      review: 'Their expertise in scalable architecture is unmatched. CODIXY delivered a robust platform that handles our high transaction volumes effortlessly.',
      initials: 'MC', avatarBg: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', avatarColor: '#fff',
    },
    {
      name: 'Anjali Desai', role: 'CMO', company: 'Retail Hub',
      review: 'We partnered with CODIXY for our e-commerce revamp. The new platform is blazing fast, and our conversion rates have doubled.',
      initials: 'AD', avatarBg: 'linear-gradient(135deg,#ec4899,#f43f5e)', avatarColor: '#fff',
    }
  ];

  get allTestimonials() { return [...this.testimonials, ...this.testimonials]; }

  ngAfterViewInit(): void {
    setTimeout(() => {
      gsap.fromTo(this.headerRef.nativeElement, {opacity:0,y:50}, {
        opacity:1,y:0,duration:1,ease:'power3.out',
        scrollTrigger:{trigger:this.headerRef.nativeElement,start:'top 85%',once:true}
      });
    }, 100);
  }
}
