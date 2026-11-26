import {
  AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation, Inject,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { ScrollService } from '../../core/services/scroll.service';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

export interface LegalSection {
  id: string;
  title: string;
  html: string;
}

const SITE = 'https://codixytechnologies.com';
const HOME_DESCRIPTION =
  'CODIXY Technologies is a software development company in Hyderabad building web and mobile apps, enterprise software and AI automation for growing businesses.';

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe],
  encapsulation: ViewEncapsulation.None,
  template: `
    <main class="legal-page relative overflow-hidden">
      <!-- Ambient background -->
      <div class="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div class="legal-glow legal-glow--cyan"></div>
      <div class="legal-glow legal-glow--purple"></div>

      <!-- Header -->
      <section class="section-container relative z-10 pt-32 md:pt-40 pb-12 md:pb-16">
        <nav class="flex items-center gap-2 text-sm font-outfit text-slate-500 mb-8" aria-label="Breadcrumb">
          <a routerLink="/" class="hover:text-cyan-400 transition-colors">Home</a>
          <span aria-hidden="true">/</span>
          <span class="text-slate-300">{{ title }}</span>
        </nav>

        <span class="legal-eyebrow">{{ eyebrow }}</span>
        <h1 class="legal-title font-grotesk">
          <span class="gradient-text">{{ title }}</span>
        </h1>
        <p class="legal-intro font-outfit">{{ intro }}</p>

        <div class="flex flex-wrap gap-3 mt-8">
          <span class="legal-chip">
            <svg class="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Last updated: {{ lastUpdated }}
          </span>
          <span class="legal-chip">
            <svg class="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Governed by the laws of India
          </span>
          <span class="legal-chip">
            <svg class="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {{ readTime }} min read
          </span>
        </div>
      </section>

      <!-- Body -->
      <section class="section-container relative z-10 pb-24 md:pb-32">
        <div class="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          <!-- Table of contents -->
          <aside class="legal-toc glass-card hidden lg:block">
            <p class="legal-toc__label font-grotesk">On this page</p>
            <ol>
              <li *ngFor="let s of sections; let i = index">
                <a [href]="'#' + s.id" (click)="jump($event, s.id)" [class.is-active]="activeId === s.id">
                  <span class="legal-toc__num">{{ pad(i + 1) }}</span>{{ s.title }}
                </a>
              </li>
            </ol>
          </aside>

          <!-- Sections -->
          <div class="min-w-0">
            <article *ngFor="let s of sections; let i = index" [id]="s.id" class="legal-section glass-card">
              <h2 class="legal-section__title font-grotesk">
                <span class="legal-section__num">{{ pad(i + 1) }}</span>{{ s.title }}
              </h2>
              <div class="legal-body font-outfit" [innerHTML]="s.html | safeHtml"></div>
            </article>

            <!-- Contact card -->
            <div class="legal-contact glass-card">
              <div>
                <h2 class="font-grotesk text-white text-xl md:text-2xl font-semibold mb-2">Questions about this {{ shortName }}?</h2>
                <p class="font-outfit text-slate-400 text-sm md:text-base">Our team usually replies within one business day.</p>
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-5 font-outfit text-sm">
                  <a href="mailto:connect@codixytechnologies.com" class="legal-contact__link">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    connect&#64;codixytechnologies.com
                  </a>
                  <a href="tel:+916300358759" class="legal-contact__link">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    +91 6300358759
                  </a>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <a routerLink="/" class="btn-primary text-sm px-6 py-3 justify-center">
                  <span>Back to Home</span>
                </a>
                <a [routerLink]="otherLink" class="legal-secondary-btn">{{ otherLabel }}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .legal-page { background: #030712; min-height: 100vh; position: relative; z-index: 1; }

    .legal-glow { position: absolute; width: 520px; height: 520px; border-radius: 9999px; filter: blur(120px); pointer-events: none; opacity: .18; }
    .legal-glow--cyan { top: -160px; left: -120px; background: #06b6d4; }
    .legal-glow--purple { top: 120px; right: -180px; background: #7c3aed; opacity: .14; }

    .legal-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 9999px; margin-bottom: 20px;
      font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600;
      letter-spacing: .14em; text-transform: uppercase; color: #67e8f9;
      background: rgba(6,182,212,.08); border: 1px solid rgba(6,182,212,.3);
    }
    .legal-title { font-size: clamp(2.4rem, 6vw, 4.25rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
    .legal-intro { margin-top: 20px; max-width: 760px; color: #94a3b8; font-size: 1.075rem; line-height: 1.75; }
    .legal-chip {
      display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 10px;
      font-family: 'Outfit', sans-serif; font-size: 13px; color: #cbd5e1;
      background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
    }

    .legal-toc { position: sticky; top: 104px; padding: 22px 18px; }
    .legal-toc__label { font-size: 11px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: #64748b; margin: 0 0 12px 8px; }
    .legal-toc ol { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
    .legal-toc a {
      display: flex; gap: 10px; padding: 8px 10px; border-radius: 8px; border-left: 2px solid transparent;
      font-family: 'Outfit', sans-serif; font-size: 13.5px; line-height: 1.35; color: #94a3b8; text-decoration: none;
      transition: color .2s, background-color .2s, border-color .2s;
    }
    .legal-toc a:hover { color: #e2e8f0; background: rgba(255,255,255,.03); }
    .legal-toc a.is-active { color: #67e8f9; background: rgba(6,182,212,.08); border-left-color: #06b6d4; }
    .legal-toc__num { font-family: 'Space Grotesk', sans-serif; font-size: 11px; color: #475569; padding-top: 2px; min-width: 18px; }
    .legal-toc a.is-active .legal-toc__num { color: #22d3ee; }

    .legal-section { padding: 28px 24px; margin-bottom: 20px; scroll-margin-top: 100px; }
    @media (min-width: 768px) { .legal-section { padding: 36px 40px; } }
    .legal-section__title { display: flex; align-items: baseline; gap: 14px; font-size: 1.35rem; font-weight: 600; color: #fff; margin-bottom: 18px; }
    @media (min-width: 768px) { .legal-section__title { font-size: 1.55rem; } }
    .legal-section__num {
      font-size: .85rem; font-weight: 700; letter-spacing: .05em;
      background: linear-gradient(90deg, #06b6d4, #7c3aed); -webkit-background-clip: text; background-clip: text; color: transparent;
    }

    .legal-body { color: #a3b1c6; font-size: 15.5px; line-height: 1.8; }
    .legal-body p { margin: 0 0 14px; }
    .legal-body p:last-child, .legal-body ul:last-child { margin-bottom: 0; }
    .legal-body h3 { font-family: 'Space Grotesk', sans-serif; color: #e2e8f0; font-size: 1.05rem; font-weight: 600; margin: 22px 0 10px; }
    .legal-body ul { list-style: none; margin: 0 0 14px; padding: 0; }
    .legal-body li { position: relative; padding-left: 22px; margin-bottom: 8px; }
    .legal-body li::before {
      content: ''; position: absolute; left: 4px; top: .72em; width: 6px; height: 6px; border-radius: 9999px;
      background: linear-gradient(135deg, #06b6d4, #7c3aed);
    }
    .legal-body strong { color: #e2e8f0; font-weight: 600; }
    .legal-body a { color: #22d3ee; text-decoration: none; border-bottom: 1px solid rgba(34,211,238,.3); transition: border-color .2s; }
    .legal-body a:hover { border-bottom-color: #22d3ee; }
    .legal-body .legal-note {
      margin-top: 16px; padding: 14px 16px; border-radius: 12px; font-size: 14.5px;
      background: rgba(6,182,212,.06); border: 1px solid rgba(6,182,212,.2); color: #cbd5e1;
    }

    .legal-contact {
      display: flex; flex-direction: column; gap: 24px; padding: 32px 24px; margin-top: 32px;
      border: 1px solid rgba(6,182,212,.25);
      background: linear-gradient(135deg, rgba(6,182,212,.08), rgba(124,58,237,.08));
    }
    @media (min-width: 1024px) { .legal-contact { flex-direction: row; align-items: center; justify-content: space-between; padding: 36px 40px; } }
    .legal-contact__link { display: inline-flex; align-items: center; gap: 8px; color: #67e8f9; text-decoration: none; }
    .legal-contact__link:hover { color: #a5f3fc; }
    .legal-secondary-btn {
      display: inline-flex; align-items: center; justify-content: center; padding: 12px 24px; border-radius: 12px;
      font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; color: #e2e8f0; text-decoration: none;
      border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.03); transition: border-color .2s, color .2s;
    }
    .legal-secondary-btn:hover { border-color: rgba(6,182,212,.5); color: #67e8f9; }
  `],
})
export class LegalPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) shortName!: string;
  @Input({ required: true }) eyebrow!: string;
  @Input({ required: true }) intro!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;
  @Input({ required: true }) lastUpdated!: string;
  @Input({ required: true }) sections!: LegalSection[];
  @Input({ required: true }) otherLink!: string;
  @Input({ required: true }) otherLabel!: string;

  activeId = '';
  readTime = 1;
  private observer?: IntersectionObserver;

  constructor(
    private meta: Meta,
    private scroll: ScrollService,
    private zone: NgZone,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  ngOnInit(): void {
    const words = this.sections.map(s => s.html.replace(/<[^>]+>/g, ' ')).join(' ').split(/\s+/).length;
    this.readTime = Math.max(1, Math.round(words / 220));
    this.activeId = this.sections[0]?.id ?? '';
    this.setSeo(this.description, `${SITE}${this.path}`, `${this.title} | CODIXY Technologies`);
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) this.zone.run(() => (this.activeId = visible[0].target.id));
      }, { rootMargin: '-110px 0px -60% 0px' });
      this.sections.forEach(s => {
        const el = this.doc.getElementById(s.id);
        if (el) this.observer!.observe(el);
      });
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.setSeo(HOME_DESCRIPTION, `${SITE}/`, 'CODIXY Technologies | Software Development Company Hyderabad');
  }

  jump(e: Event, id: string): void {
    e.preventDefault();
    const el = this.doc.getElementById(id);
    if (el) this.scroll.scrollTo(el, { offset: -100, duration: 1.2 });
    this.activeId = id;
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  private setSeo(description: string, url: string, title: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    const canonical = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }
}
