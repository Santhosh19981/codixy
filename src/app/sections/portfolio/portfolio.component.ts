import { Component, AfterViewInit, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationService } from '../../core/services/animation.service';
import { ScrollService } from '../../core/services/scroll.service';

interface Project {
  title: string;
  url: string;
  category: string;
  description: string;
  techStack: string[];
  image: string;
  overview: string;
  stack: { label: string; tools: string[] }[];
  modules: { name: string; desc: string }[];
  features: string[];
  review: { quote: string; author: string; role: string; rating: number };
}

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
            <div class="marquee-track items-stretch gap-6 pb-4" [class.paused]="!!active">
              
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
                      <button type="button" (click)="openProject(project)"
                         [attr.aria-label]="'View details of ' + project.title"
                         class="text-slate-400 hover:text-cyan-400 transition-colors bg-white/5 p-2 rounded-full backdrop-blur-md border border-white/10 hover:border-cyan-400/30">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </button>
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

    <!-- Project details popup -->
    <div #modal *ngIf="active as p" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6"
      role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div class="modal-backdrop absolute inset-0 bg-black/75 backdrop-blur-sm" (click)="closeProject()"></div>

      <div class="modal-panel relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl"
        data-lenis-prevent
        style="background: #0a0f1e; border: 1px solid rgba(6,182,212,0.25); box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(6,182,212,0.08);">

        <!-- Banner -->
        <div class="relative h-44 md:h-56 overflow-hidden">
          <img [src]="p.image" [alt]="p.title" class="w-full h-full object-cover" onerror="this.style.display='none'">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/50 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 md:px-10">
            <div class="section-tag text-[10px] py-1 px-3 mb-3 inline-flex">{{p.category}}</div>
            <h3 id="project-modal-title" class="text-3xl md:text-4xl font-bold text-white font-grotesk">{{p.title}}</h3>
          </div>
        </div>

        <!-- Close -->
        <button #closeBtn type="button" (click)="closeProject()" aria-label="Close"
          class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white hover:rotate-90 transition-all duration-300 backdrop-blur-md"
          style="background: rgba(3,7,18,0.6); border: 1px solid rgba(255,255,255,0.2);">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="p-6 md:p-10 pt-4 md:pt-6">
          <!-- Description -->
          <h4 class="modal-heading">Project Overview</h4>
          <p class="text-slate-300 leading-relaxed font-outfit mb-8">{{p.overview}}</p>

          <!-- Tech stack -->
          <h4 class="modal-heading">Tech Stack</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div *ngFor="let g of p.stack" class="rounded-xl p-4" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
              <div class="text-sm font-semibold text-cyan-400 font-grotesk mb-2">{{g.label}}</div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let t of g.tools" class="px-2 py-1 text-xs font-medium rounded-md font-outfit"
                  style="background: rgba(6,182,212,0.1); color: rgba(103,232,249,0.9); border: 1px solid rgba(6,182,212,0.2);">{{t}}</span>
              </div>
            </div>
          </div>

          <!-- Modules -->
          <h4 class="modal-heading">Modules</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div *ngFor="let m of p.modules" class="rounded-xl p-4" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
              <div class="text-white font-semibold font-grotesk text-sm mb-1">{{m.name}}</div>
              <div class="text-slate-400 text-sm font-outfit leading-relaxed">{{m.desc}}</div>
            </div>
          </div>

          <!-- Features -->
          <h4 class="modal-heading">Key Features</h4>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
            <li *ngFor="let f of p.features" class="flex items-start gap-3 text-slate-300 text-sm font-outfit">
              <svg class="w-5 h-5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{f}}</span>
            </li>
          </ul>

          <!-- Review -->
          <h4 class="modal-heading">Customer Review</h4>
          <figure class="relative rounded-2xl p-6 md:p-8 mb-8"
            style="background: linear-gradient(135deg, rgba(6,182,212,0.08), rgba(124,58,237,0.08)); border: 1px solid rgba(6,182,212,0.2);">
            <svg class="absolute top-4 right-5 w-10 h-10 text-cyan-400/20" fill="currentColor" viewBox="0 0 24 24"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
            <div class="flex gap-1 mb-4">
              <svg *ngFor="let s of stars(p.review.rating)" class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <blockquote class="text-slate-200 leading-relaxed font-outfit italic mb-4">"{{p.review.quote}}"</blockquote>
            <figcaption class="text-sm font-grotesk">
              <span class="text-white font-semibold">{{p.review.author}}</span>
              <span class="text-slate-500"> · {{p.review.role}}</span>
            </figcaption>
          </figure>

          <a *ngIf="p.url !== '#'" [href]="p.url" target="_blank" rel="noopener noreferrer" class="btn-primary inline-flex items-center gap-2">
            Visit Live Site
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host{display:block;}
    /* Stop the marquee while a card is hovered or a project popup is open */
    .marquee-track:has(.project-card:hover), .marquee-track.paused { animation-play-state: paused; }
    .modal-heading { font-size: .75rem; text-transform: uppercase; letter-spacing: .15em; color: #64748b; margin-bottom: 1rem; font-family: 'Space Grotesk', sans-serif; }
    .modal-backdrop { animation: fadeIn .25s ease-out; }
    .modal-panel { animation: popIn .3s cubic-bezier(.2,.8,.2,1); overscroll-behavior: contain; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes popIn { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: none; } }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes bounceH { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
    .animate-bounce-horizontal { animation: bounceH 2s infinite ease-in-out; }
  `]
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('portfolioHeader') headerRef!: ElementRef;
  @ViewChild('sliderContainer') sliderRef!: ElementRef;
  @ViewChild('scrollTrack') trackRef!: ElementRef;
  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLButtonElement>;

  /** Re-parent the popup to <body> so no ancestor stacking context (marquee transforms, z-index) can cover it. */
  @ViewChild('modal') set modalEl(ref: ElementRef<HTMLElement> | undefined) {
    if (ref && ref.nativeElement.parentElement !== document.body) document.body.appendChild(ref.nativeElement);
  }

  // NOTE: the `review` entries below are DRAFT PLACEHOLDERS. Replace them with real feedback
  // from each client (with their permission) before relying on them publicly.
  projects: Project[] = [
    {
      title: 'Bhagona',
      url: '#',
      category: 'Food Tech Platform',
      description: 'A smart   ordering and catering platform connecting clients with professional chefs for customized events and personal occasions.',
      techStack: ['Angular', 'Ionic', 'Node.js', 'Firebase'],
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      overview: 'Bhagona connects customers with verified professional chefs for parties, weddings, corporate events and everyday home meals. Customers browse chefs and menus, customise dishes and guest counts, and book in a few taps, while chefs manage their menus, schedules and earnings from a dedicated app.',
      stack: [
        { label: 'Frontend & Mobile', tools: ['Angular', 'Ionic', 'Capacitor', 'TypeScript'] },
        { label: 'Backend', tools: ['Node.js', 'Express', 'REST APIs'] },
        { label: 'Database & Cloud', tools: ['Firebase Firestore', 'Firebase Auth', 'Cloud Storage'] },
        { label: 'Integrations', tools: ['Razorpay', 'Google Maps', 'Firebase Cloud Messaging'] },
      ],
      modules: [
        { name: 'Customer App', desc: 'Browse chefs, build custom menus, book events and track orders.' },
        { name: 'Chef App', desc: 'Manage menus, availability, bookings and payouts.' },
        { name: 'Admin Panel', desc: 'Chef verification, order oversight, pricing and reports.' },
        { name: 'Payments', desc: 'Secure online payments, advances and refunds.' },
      ],
      features: ['Event & occasion-based booking', 'Custom menu builder', 'Chef profiles, ratings & reviews', 'Real-time order status updates', 'Push notifications', 'Location-based chef discovery'],
      review: { quote: 'CODIXY turned our idea into a polished app that our customers and chefs both love. Bookings are seamless and the team was responsive at every step.', author: 'Founder', role: 'Bhagona', rating: 5 },
    },
    {
      title: 'Our School ERP',
      url: 'https://ourschoolerp.com',
      category: 'Education Management Software',
      description: 'School Management System with Features for Teachers, Students, and Parents.',
      techStack: ['Angular', 'Node.js', 'PostgreSQL'],
      image: 'assets/icons/school-management.webp',
      overview: 'Our School ERP is a complete school management system that brings administration, teachers, students and parents onto one platform. It digitises daily operations, from admissions and attendance to fees, exams and report cards, reducing paperwork and keeping parents informed in real time.',
      stack: [
        { label: 'Frontend', tools: ['Angular', 'TypeScript', 'Angular Material', 'Chart.js'] },
        { label: 'Backend', tools: ['Node.js', 'Express', 'JWT Auth'] },
        { label: 'Database', tools: ['PostgreSQL', 'Redis'] },
        { label: 'Integrations', tools: ['SMS Gateway', 'Email', 'Payment Gateway', 'PDF Reports'] },
      ],
      modules: [
        { name: 'Student Information', desc: 'Admissions, profiles, documents and class allocation.' },
        { name: 'Attendance & Timetable', desc: 'Daily attendance, timetables and leave management.' },
        { name: 'Fees & Accounts', desc: 'Fee structures, online collection, receipts and dues.' },
        { name: 'Exams & Report Cards', desc: 'Marks entry, grading and printable report cards.' },
        { name: 'Parent & Teacher Portals', desc: 'Homework, notices, progress and communication.' },
        { name: 'Admin Dashboard', desc: 'School-wide analytics, staff and role management.' },
      ],
      features: ['Role-based access for admin, teachers, students & parents', 'Online fee payment & auto receipts', 'SMS & email notifications', 'Automated report card generation', 'Attendance analytics', 'Mobile-friendly responsive design'],
      review: { quote: 'Our administration work has become far simpler. Fees, attendance and report cards are all in one place, and parents appreciate the instant updates.', author: 'School Administrator', role: 'Our School ERP client', rating: 5 },
    },
    {
      title: 'CW Rentals',
      url: '#',
      category: 'Car Rental Platform',
      description: 'Car rental platform with vehicle listings, real-time availability, online booking, and fleet management for operators.',
      techStack: ['Angular', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
      overview: 'CW Rentals lets customers find and book rental cars online with live availability and transparent pricing, while giving operators full control of their fleet. From booking to pickup, return and invoicing, the whole rental lifecycle runs on one platform.',
      stack: [
        { label: 'Frontend', tools: ['Angular', 'TypeScript', 'Tailwind CSS'] },
        { label: 'Backend', tools: ['Node.js', 'Express', 'Socket.IO'] },
        { label: 'Database', tools: ['MongoDB', 'Mongoose'] },
        { label: 'Integrations', tools: ['Payment Gateway', 'Google Maps', 'Email / SMS'] },
      ],
      modules: [
        { name: 'Vehicle Catalogue', desc: 'Listings with photos, specs, pricing and filters.' },
        { name: 'Booking Engine', desc: 'Date-based availability, reservations and payments.' },
        { name: 'Fleet Management', desc: 'Vehicle status, maintenance and document tracking.' },
        { name: 'Operator Dashboard', desc: 'Bookings, revenue, customers and reports.' },
      ],
      features: ['Real-time availability calendar', 'Online booking & secure payments', 'Dynamic pricing by duration', 'Customer KYC & document upload', 'Maintenance reminders', 'Booking confirmations via email/SMS'],
      review: { quote: 'Managing our fleet used to mean spreadsheets and phone calls. Now bookings, availability and payments are automated and our customers book online.', author: 'Operations Head', role: 'CW Rentals', rating: 5 },
    },
    {
      title: 'CashFlo',
      url: '#',
      category: 'Accounting & ERP',
      description: 'Accounting and ERP platform covering invoicing, expenses, inventory, and financial reports for growing businesses.',
      techStack: ['Angular', 'Node.js', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
      overview: 'CashFlo is an accounting and ERP platform built for growing businesses. It brings invoicing, expenses, inventory and financial reporting together, giving owners a clear, real-time picture of their cash flow and helping teams stay compliant with less manual work.',
      stack: [
        { label: 'Frontend', tools: ['Angular', 'TypeScript', 'Chart.js'] },
        { label: 'Backend', tools: ['Node.js', 'Express', 'REST APIs'] },
        { label: 'Database', tools: ['PostgreSQL', 'Redis'] },
        { label: 'Integrations', tools: ['GST Invoicing', 'PDF / Excel Export', 'Email'] },
      ],
      modules: [
        { name: 'Invoicing & Billing', desc: 'GST-ready invoices, quotations and payment tracking.' },
        { name: 'Expenses', desc: 'Expense capture, categories, approvals and vendors.' },
        { name: 'Inventory', desc: 'Stock levels, purchase orders and low-stock alerts.' },
        { name: 'Reports & Analytics', desc: 'P&L, balance sheet, cash flow and tax summaries.' },
      ],
      features: ['GST-compliant invoices', 'Recurring invoices & reminders', 'Multi-user roles & permissions', 'Real-time cash flow dashboard', 'Export to PDF & Excel', 'Audit trail for every transaction'],
      review: { quote: 'CashFlo gives us a real-time view of our finances. Invoicing and reports that took days now take minutes.', author: 'Finance Manager', role: 'CashFlo client', rating: 5 },
    },
    {
      title: 'InfraMart',
      url: '#',
      category: 'Construction & Interiors',
      description: 'Construction and interiors platform showcasing projects and services, with enquiry and quotation management.',
      techStack: ['Angular', 'Node.js', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      overview: 'InfraMart is a digital platform for a construction and interiors business. It showcases completed projects and services to win new clients, and manages the full sales pipeline behind the scenes, from first enquiry to site visit, quotation and project tracking.',
      stack: [
        { label: 'Frontend', tools: ['Angular', 'TypeScript', 'SCSS'] },
        { label: 'Backend', tools: ['Node.js', 'Express'] },
        { label: 'Database', tools: ['MySQL', 'Sequelize'] },
        { label: 'Integrations', tools: ['Cloud Image Storage', 'WhatsApp', 'Email'] },
      ],
      modules: [
        { name: 'Project Showcase', desc: 'Portfolio galleries by category with before/after views.' },
        { name: 'Services Catalogue', desc: 'Construction, renovation and interior service listings.' },
        { name: 'Enquiry Management', desc: 'Capture, assign and follow up on leads.' },
        { name: 'Quotation Builder', desc: 'Itemised quotes with material and labour costs.' },
      ],
      features: ['Image-rich project galleries', 'Online enquiry & site-visit booking', 'Lead status tracking', 'Downloadable PDF quotations', 'WhatsApp & email follow-ups', 'SEO-optimised pages'],
      review: { quote: 'The new platform shows off our work beautifully and our enquiries have grown. Quotations are faster and nothing slips through the cracks.', author: 'Managing Director', role: 'InfraMart', rating: 5 },
    },
    {
      title: 'Aqua Pure Solutions',
      url: '#',
      category: 'Water Purification',
      description: 'Water purification business platform with product catalog, service bookings, and customer support management.',
      techStack: ['Angular', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80',
      overview: 'Aqua Pure Solutions is a business platform for a water purification company. Customers explore purifiers, book installations and service visits, and raise support requests online, while the team manages AMC contracts, technicians and service schedules from one dashboard.',
      stack: [
        { label: 'Frontend', tools: ['Angular', 'TypeScript', 'Tailwind CSS'] },
        { label: 'Backend', tools: ['Node.js', 'Express'] },
        { label: 'Database', tools: ['MongoDB', 'Mongoose'] },
        { label: 'Integrations', tools: ['SMS Alerts', 'Payment Gateway', 'Email'] },
      ],
      modules: [
        { name: 'Product Catalogue', desc: 'RO, UV and commercial purifiers with specs and pricing.' },
        { name: 'Service Booking', desc: 'Installation, repair and filter-change scheduling.' },
        { name: 'AMC Management', desc: 'Annual maintenance contracts and renewal reminders.' },
        { name: 'Support Desk', desc: 'Ticketing, technician assignment and status tracking.' },
      ],
      features: ['Online service booking', 'Automated service & AMC reminders', 'Technician assignment & tracking', 'Customer service history', 'SMS notifications', 'Enquiry & lead capture'],
      review: { quote: 'Service bookings and AMC renewals are now automated, and our customers get timely reminders. It has made our operations much smoother.', author: 'Owner', role: 'Aqua Pure Solutions', rating: 5 },
    },
  ];
  get allProjects() { return [...this.projects, ...this.projects]; }

  active: Project | null = null;
  private lastFocus: HTMLElement | null = null;

  constructor(private animService: AnimationService, private scroll: ScrollService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animService.revealSection(this.headerRef.nativeElement, { stagger: 0 });
    }, 100);
  }

  stars(n: number): number[] { return Array.from({ length: n }, (_, i) => i); }

  openProject(project: Project): void {
    this.lastFocus = document.activeElement as HTMLElement;
    this.active = project;
    this.scroll.getLenis()?.stop();
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.closeBtn?.nativeElement.focus());
  }

  @HostListener('document:keydown.escape')
  closeProject(): void {
    if (!this.active) return;
    this.active = null;
    this.scroll.getLenis()?.start();
    document.body.style.overflow = '';
    this.lastFocus?.focus();
  }

  ngOnDestroy(): void {
    if (this.active) this.closeProject();
  }
}
