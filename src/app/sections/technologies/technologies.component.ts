import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="technologies" class="relative py-28 md:py-40 overflow-hidden" style="background:#0a0f1e;">
      <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <!-- 3D Moving Cube Animation -->
      <div class="absolute right-[10%] top-[20%] opacity-30 pointer-events-none z-0 hidden lg:block">
        <div class="cube-container">
          <div class="cube">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
          </div>
        </div>
      </div>
      
      <div class="absolute left-[5%] bottom-[20%] opacity-20 pointer-events-none z-0 hidden lg:block scale-75">
        <div class="cube-container">
          <div class="cube cube-reverse">
            <div class="face front border-purple-500/50 bg-purple-500/10"></div>
            <div class="face back border-purple-500/50 bg-purple-500/10"></div>
            <div class="face right border-purple-500/50 bg-purple-500/10"></div>
            <div class="face left border-purple-500/50 bg-purple-500/10"></div>
            <div class="face top border-purple-500/50 bg-purple-500/10"></div>
            <div class="face bottom border-purple-500/50 bg-purple-500/10"></div>
          </div>
        </div>
      </div>

      <div class="section-container relative z-10">
        <div #techHeader class="text-center mb-20">
          <div class="section-tag mx-auto mb-6">
            <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Tech Stack
          </div>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 font-grotesk leading-tight">
            Our Technology <span class="gradient-text">Ecosystem</span>
          </h2>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto font-outfit">
            Cutting-edge tools and frameworks powering next-generation digital solutions.
          </p>
        </div>
      </div>

      <!-- Marquee Row 1 -->
      <div class="marquee-container mb-4">
        <div class="marquee-track py-2">
          <div *ngFor="let t of allRow1" class="mx-4 flex items-center gap-3 glass-card px-5 py-3 shrink-0 group hover:border-cyan-400/30 transition-all duration-300 cursor-default">
            <span class="text-2xl">{{t.emoji}}</span>
            <span class="text-slate-300 text-sm font-semibold font-grotesk group-hover:text-cyan-400 transition-colors duration-300 whitespace-nowrap">{{t.name}}</span>
          </div>
        </div>
      </div>

      <!-- Marquee Row 2 (reverse) -->
      <div class="marquee-container mb-4">
        <div class="marquee-track-reverse py-2">
          <div *ngFor="let t of allRow2" class="mx-4 flex items-center gap-3 glass-card px-5 py-3 shrink-0 group hover:border-purple-400/30 transition-all duration-300 cursor-default">
            <span class="text-2xl">{{t.emoji}}</span>
            <span class="text-slate-300 text-sm font-semibold font-grotesk group-hover:text-purple-400 transition-colors duration-300 whitespace-nowrap">{{t.name}}</span>
          </div>
        </div>
      </div>

      <!-- Marquee Row 3 -->
      <div class="marquee-container">
        <div class="marquee-track py-2">
          <div *ngFor="let t of allRow3" class="mx-4 flex items-center gap-3 glass-card px-5 py-3 shrink-0 group hover:border-blue-400/30 transition-all duration-300 cursor-default">
            <span class="text-2xl">{{t.emoji}}</span>
            <span class="text-slate-300 text-sm font-semibold font-grotesk group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">{{t.name}}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host{display:block;}
    
    .cube-container {
      width: 120px;
      height: 120px;
      perspective: 1000px;
    }
    
    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      animation: rotateCube 20s infinite linear;
    }
    
    .cube-reverse {
      animation: rotateCubeReverse 25s infinite linear;
    }
    
    .face {
      position: absolute;
      width: 120px;
      height: 120px;
      border: 1px solid rgba(6, 182, 212, 0.5);
      background: rgba(6, 182, 212, 0.05);
      backdrop-filter: blur(4px);
    }
    
    .front  { transform: translateZ(60px); }
    .back   { transform: rotateY(180deg) translateZ(60px); }
    .right  { transform: rotateY(90deg) translateZ(60px); }
    .left   { transform: rotateY(-90deg) translateZ(60px); }
    .top    { transform: rotateX(90deg) translateZ(60px); }
    .bottom { transform: rotateX(-90deg) translateZ(60px); }
    
    @keyframes rotateCube {
      0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0); }
      50% { transform: rotateX(180deg) rotateY(180deg) rotateZ(90deg) translateY(-30px); }
      100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg) translateY(0); }
    }
    
    @keyframes rotateCubeReverse {
      0% { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg) translateY(0); }
      50% { transform: rotateX(180deg) rotateY(180deg) rotateZ(90deg) translateY(30px); }
      100% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0); }
    }
  `]
})
export class TechnologiesComponent implements AfterViewInit {
  @ViewChild('techHeader') headerRef!: ElementRef;

  row1 = [
    { name: 'Angular', emoji: '🔺' }, { name: 'React', emoji: '⚛️' }, { name: 'Vue.js', emoji: '💚' },
    { name: 'Next.js', emoji: '▲' }, { name: 'TypeScript', emoji: '🔷' }, { name: 'Node.js', emoji: '🟢' },
    { name: 'Python', emoji: '🐍' }, { name: 'Java', emoji: '☕' }, { name: 'Spring Boot', emoji: '🍃' },
  ];
  row2 = [
    { name: 'Flutter', emoji: '🦋' }, { name: 'Ionic', emoji: '⚡' }, { name: 'React Native', emoji: '📱' },
    { name: 'AWS', emoji: '☁️' }, { name: 'Azure', emoji: '🌐' }, { name: 'Google Cloud', emoji: '🔵' },
    { name: 'Docker', emoji: '🐳' }, { name: 'Kubernetes', emoji: '⎈' }, { name: 'Firebase', emoji: '🔥' },
  ];
  row3 = [
    { name: 'MongoDB', emoji: '🍃' }, { name: 'PostgreSQL', emoji: '🐘' }, { name: 'MySQL', emoji: '🗃️' },
    { name: 'GraphQL', emoji: '💜' }, { name: 'TensorFlow', emoji: '🤖' }, { name: 'OpenAI', emoji: '🧠' },
    { name: 'Figma', emoji: '🎨' }, { name: 'GSAP', emoji: '✨' }, { name: 'Three.js', emoji: '🌐' },
  ];

  // Duplicate for seamless loop
  get allRow1() { return [...this.row1, ...this.row1]; }
  get allRow2() { return [...this.row2, ...this.row2]; }
  get allRow3() { return [...this.row3, ...this.row3]; }

  ngAfterViewInit(): void {
    setTimeout(() => {
      gsap.fromTo(this.headerRef.nativeElement, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: this.headerRef.nativeElement, start: 'top 85%', once: true }
      });
    }, 100);
  }
}
