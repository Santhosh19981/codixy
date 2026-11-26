import { Component, AfterViewInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <section id="leadership" class="relative py-28 md:py-40 overflow-hidden" style="background: linear-gradient(180deg, #0a0f1e 0%, #030712 50%, #0a0f1e 100%);">
      <!-- Cinematic BG -->
      <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
      <div class="absolute top-1/4 left-0 w-[600px] h-[600px] bg-cyan-500/6 rounded-full blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[150px] pointer-events-none"></div>
      <!-- Top divider -->
      <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,rgba(6,182,212,0.4),transparent);"></div>
      <div class="absolute bottom-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent);"></div>

      <div class="section-container relative z-10">
        <!-- Header -->
        <div #leaderHeader class="text-center mb-20">
          <div class="section-tag mx-auto mb-6">
            <span class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            The Visionaries
          </div>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 font-grotesk leading-tight">
            Meet Our <span class="gradient-text">Leadership Team</span>
          </h2>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto font-outfit">
            Visionary leaders driving innovation, excellence, and digital transformation at CODIXY Technologies.
          </p>
        </div>

        <!-- Leaders Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" #leadersGrid>
          <div *ngFor="let leader of leaders; let i = index"
            class="leader-card spotlight-card glass-card relative overflow-hidden group cursor-default"
            (mousemove)="onMouseMove($event)"
            (mouseleave)="onMouseLeave($event)"
            style="min-height: 550px; border-color: rgba(255,255,255,0.06); transition: all 0.4s cubic-bezier(0.4,0,0.2,1);">

            <!-- Top glow bar -->
            <div class="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
              [style.background]="'linear-gradient(90deg,' + leader.colorA + ',' + leader.colorB + ')'"></div>

            <!-- Full-card background image (Improved fit) -->
            <img [src]="leader.photo" [alt]="leader.name"
              class="absolute inset-0 w-full h-full object-cover object-[50%_15%] transition-transform duration-700 group-hover:scale-105 z-0">

            <!-- Dynamic gradient overlay for text readability -->
            <div class="absolute inset-0 z-10"
              style="background: linear-gradient(to top, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.6) 35%, transparent 100%);"></div>

            <!-- Glow orb -->
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-10"
              [style.background]="leader.colorA"></div>

            <!-- Content overlay at bottom -->
            <div class="absolute bottom-0 left-0 right-0 z-20 p-7">
              <!-- Designation badge -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-xs font-bold tracking-widest uppercase font-grotesk text-white"
                [style.background]="leader.bgA" [style.borderColor]="leader.colorA"
                style="border: 1px solid;">
                {{leader.designation}}
              </div>

              <!-- Name -->
              <h3 class="text-2xl font-bold text-white mb-2 font-grotesk group-hover:text-cyan-300 transition-colors duration-300">{{leader.name}}</h3>

              <!-- Bio -->
              <p class="text-slate-300 text-sm leading-relaxed mb-5 font-outfit line-clamp-3">{{leader.bio}}</p>

              <!-- Divider -->
              <div class="h-px mb-4" [style.background]="'linear-gradient(90deg,' + leader.colorA + '60, transparent)'"></div>

              <!-- Social Icons -->
              <div class="flex gap-3">
                <a *ngFor="let social of leader.socials" [href]="social.url" target="_blank"
                  class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  [style.background]="'rgba(255,255,255,0.07)'"
                  style="border: 1px solid rgba(255,255,255,0.12);"
                  [attr.aria-label]="social.name">
                  <span [innerHTML]="social.icon | safeHtml" class="text-slate-400 hover:text-cyan-400 transition-colors"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host{display:block;} .line-clamp-4{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}`]
})
export class LeadershipComponent implements AfterViewInit {
  @ViewChild('leaderHeader') headerRef!: ElementRef;
  @ViewChild('leadersGrid') leadersGridRef!: ElementRef;

  socials = [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    { name: 'GitHub', url: 'https://github.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>' }
  ];

  leaders = [
    {
      name: 'Santhosh Kumar Tangi', initials: 'SK', designation: 'Founder & CEO',
      bio: 'A visionary leader passionate about innovation and digital transformation. Drives CODIXY toward delivering high-performance digital experiences through AI-driven systems, enterprise platforms, and cutting-edge web technologies. Fosters a culture of creativity and technological excellence.',
      colorA: '#06b6d4', colorB: '#2563eb', bgA: 'rgba(6,182,212,0.08)', bgB: 'rgba(37,99,235,0.12)',
      photo: 'assets/images/16257.jpeg',
      socials: [{ name: 'LinkedIn', url: 'https://linkedin.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' }, { name: 'Twitter', url: 'https://twitter.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' }, { name: 'GitHub', url: 'https://github.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>' }],
    },
    {
      name: 'Vivek Vardhan Choutha', initials: 'VV', designation: ' CO-Founder & Architect',
      bio: 'Specializes in crafting futuristic, user-centric digital experiences with a strong focus on creativity, innovation, and modern UI/UX design. Combines visual excellence with intuitive functionality ensuring every product reflects the company\'s premium and forward-thinking identity.',
      colorA: '#ed3a3aff', colorB: '#06b6d4', bgA: 'rgba(124,58,237,0.08)', bgB: 'rgba(6,182,212,0.12)',
      photo: 'assets/images/vivek-vardhan.jpg',
      socials: [{ name: 'LinkedIn', url: 'https://linkedin.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' }, { name: 'Twitter', url: 'https://twitter.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' }, { name: 'GitHub', url: 'https://github.com', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>' }],
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      gsap.fromTo(this.headerRef.nativeElement, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: this.headerRef.nativeElement, start: 'top 85%', once: true }
      });
      const cards = this.leadersGridRef.nativeElement.querySelectorAll('.leader-card');
      gsap.fromTo(cards, { opacity: 0, y: 80, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: this.leadersGridRef.nativeElement, start: 'top 80%', once: true }
      });
    }, 100);
  }

  onMouseMove(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  onMouseLeave(e: MouseEvent): void {
    const card = e.currentTarget as HTMLElement;
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
  }
}
