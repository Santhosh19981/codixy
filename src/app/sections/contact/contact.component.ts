import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeHtmlPipe],
  template: `
    <section id="contact" class="relative py-28 md:py-40 overflow-hidden bg-[#030712]">
      <div class="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="section-container relative z-10">
        <!-- Header -->
        <div #contactHeader class="text-center mb-20">
          <div class="section-tag mx-auto mb-6">
            <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Get In Touch
          </div>
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 font-grotesk leading-tight">
            Let's Build Something <span class="gradient-text">Amazing</span>
          </h2>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto font-outfit">
            Ready to transform your business? We'd love to hear about your project.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Left: Contact Info -->
          <div #contactInfo class="space-y-8">
            <!-- Info Cards -->
            <div *ngFor="let info of contactDetails"
              class="glass-card p-6 flex items-start gap-5 hover:border-cyan-400/20 transition-all duration-400 group">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style="background:linear-gradient(135deg,rgba(6,182,212,0.15),rgba(6,182,212,0.05));border:1px solid rgba(6,182,212,0.3);">
                <span [innerHTML]="info.icon | safeHtml" class="text-cyan-400"></span>
              </div>
              <div>
                <div class="text-xs text-slate-500 uppercase tracking-widest font-grotesk mb-1">{{info.label}}</div>
                <div class="text-white font-medium font-outfit">{{info.value}}</div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="glass-card p-6">
              <div class="text-xs text-slate-500 uppercase tracking-widest font-grotesk mb-4">Follow Us</div>
              <div class="flex gap-3 flex-wrap">
                <a *ngFor="let s of socials" [href]="s.url" target="_blank"
                  class="w-10 h-10 glass-card flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300 hover:scale-110"
                  [attr.aria-label]="s.name">
                  <span [innerHTML]="s.icon | safeHtml"></span>
                </a>
              </div>
            </div>

            <!-- Map embed -->
            <div class="glass-card overflow-hidden rounded-2xl h-48">
              <iframe
                src="https://maps.google.com/maps?q=Hyderabad,India&output=embed"
                width="100%" height="100%" style="border:0;filter:invert(90%) hue-rotate(180deg) saturate(0.5);"
                loading="lazy" allowfullscreen
                title="CODIXY Technologies Location">
              </iframe>
            </div>
          </div>

          <!-- Right: Contact Form -->
          <div #contactForm class="glass-card p-8 md:p-10"
            style="background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.08);">
            <h3 class="text-2xl font-bold text-white mb-8 font-grotesk">Send a Message</h3>

            <form #contactFormRef="ngForm" (ngSubmit)="onSubmit(contactFormRef)" class="space-y-5">
              <!-- Honeypot: hidden from people, bots fill it and get dropped -->
              <input type="text" name="botcheck" [(ngModel)]="honey" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs text-slate-400 uppercase tracking-widest font-grotesk mb-2">Your Name</label>
                  <input type="text" [(ngModel)]="formData.name" name="name" placeholder="John Doe"
                    class="form-input" required>
                </div>
                <div>
                  <label class="block text-xs text-slate-400 uppercase tracking-widest font-grotesk mb-2">Email Address</label>
                  <input type="email" [(ngModel)]="formData.email" name="email" placeholder="john@company.com"
                    class="form-input" required email>
                </div>
              </div>

              <div>
                <label class="block text-xs text-slate-400 uppercase tracking-widest font-grotesk mb-2">Subject</label>
                <input type="text" [(ngModel)]="formData.subject" name="subject" placeholder="Project Inquiry"
                  class="form-input">
              </div>

              <div>
                <label class="block text-xs text-slate-400 uppercase tracking-widest font-grotesk mb-2">Message</label>
                <textarea [(ngModel)]="formData.message" name="message" rows="5"
                  placeholder="Tell us about your project..."
                  class="form-input resize-none" required></textarea>
              </div>

              <button type="submit" class="btn-primary w-full py-4 text-base justify-center"
                [disabled]="isSubmitting">
                <span>{{isSubmitting ? 'Sending...' : 'Send Message'}}</span>
                <svg class="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>

              <div *ngIf="submitted" class="text-center p-4 rounded-xl font-outfit text-sm"
                style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#10b981;">
                ✓ Message sent! We'll get back to you within 24 hours.
              </div>

              <div *ngIf="errorMessage" class="text-center p-4 rounded-xl font-outfit text-sm"
                style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#f87171;">
                {{errorMessage}}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host{display:block;}`]
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactHeader') headerRef!: ElementRef;
  @ViewChild('contactInfo') infoRef!: ElementRef;
  @ViewChild('contactForm') formRef!: ElementRef;

  // Web3Forms emails each submission to connect@codixytechnologies.com (no backend needed).
  // The access key is tied to that inbox and is safe to ship in client code.
  private readonly contactEndpoint = 'https://api.web3forms.com/submit';
  private readonly web3formsKey = 'PASTE_WEB3FORMS_ACCESS_KEY_HERE';

  formData = { name:'', email:'', subject:'', message:'' };
  honey = '';
  isSubmitting = false;
  submitted = false;
  errorMessage = '';

  contactDetails = [
    { label:'Email', value:'connect@codixytechnologies.com', icon:'<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' },
    { label:'Phone', value:'+91 6300358759', icon:'<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>' },
    { label:'Office', value:'Hyderabad, Telangana, India', icon:'<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' },
  ];

  socials = [
    { name:'LinkedIn', url:'https://linkedin.com', icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
    { name:'Twitter', url:'https://twitter.com', icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    { name:'GitHub', url:'https://github.com', icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>' },
    { name:'Instagram', url:'https://www.instagram.com/codixy_technologies/', icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
    { name:'Facebook', url:'https://www.facebook.com/profile.php?id=61597020028418', icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      gsap.fromTo(this.headerRef.nativeElement, {opacity:0,y:50}, {
        opacity:1,y:0,duration:1,ease:'power3.out',
        scrollTrigger:{trigger:this.headerRef.nativeElement,start:'top 85%',once:true}
      });
      gsap.fromTo(this.infoRef.nativeElement, {opacity:0,x:-60}, {
        opacity:1,x:0,duration:1,ease:'power3.out',
        scrollTrigger:{trigger:this.infoRef.nativeElement,start:'top 80%',once:true}
      });
      gsap.fromTo(this.formRef.nativeElement, {opacity:0,x:60}, {
        opacity:1,x:0,duration:1,ease:'power3.out',
        scrollTrigger:{trigger:this.formRef.nativeElement,start:'top 80%',once:true}
      });
    }, 100);
  }

  async onSubmit(form: NgForm): Promise<void> {
    this.submitted = false;
    this.errorMessage = '';
    if (form.invalid) {
      this.errorMessage = 'Please fill in your name, a valid email address, and a message.';
      return;
    }
    if (this.honey) return;

    this.isSubmitting = true;
    const { name, email, subject, message } = this.formData;
    try {
      const res = await fetch(this.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: this.web3formsKey,
          subject: `New website enquiry: ${subject || 'Project Inquiry'} (from ${name})`,
          from_name: 'CODIXY Website',
          name, email, message,
          topic: subject || 'Project Inquiry',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) throw new Error(data.message || res.statusText);
      this.submitted = true;
      this.formData = { name:'', email:'', subject:'', message:'' };
      form.resetForm(this.formData);
    } catch {
      this.errorMessage = 'Sorry, your message could not be sent. Please email us at connect@codixytechnologies.com.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
