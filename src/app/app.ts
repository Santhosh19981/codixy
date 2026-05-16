import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from './core/services/scroll.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { TrustTickerComponent } from './sections/trust-ticker/trust-ticker.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { StatsComponent } from './sections/stats/stats.component';
import { TechnologiesComponent } from './sections/technologies/technologies.component';
import { PortfolioComponent } from './sections/portfolio/portfolio.component';
import { LeadershipComponent } from './sections/leadership/leadership.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { ContactComponent } from './sections/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ChatbotComponent,
    FooterComponent,
    HeroComponent,
    TrustTickerComponent,
    AboutComponent,
    ServicesComponent,
    StatsComponent,
    TechnologiesComponent,
    PortfolioComponent,
    LeadershipComponent,
    TestimonialsComponent,
    ContactComponent,
  ],
  template: `
    <!-- Navigation -->
    <app-navbar></app-navbar>

    <!-- Main Content -->
    <main style="overflow: clip;">
      <app-hero></app-hero>
      <app-trust-ticker></app-trust-ticker>
      <app-about></app-about>
      <app-services></app-services>
      <app-stats></app-stats>
      <app-technologies></app-technologies>
      <app-portfolio></app-portfolio>
      <app-leadership></app-leadership>
      <app-testimonials></app-testimonials>
      <app-contact></app-contact>
    </main>

    <!-- Footer -->
    <app-footer></app-footer>

    <!-- AI Chatbot -->
    <app-chatbot></app-chatbot>
  `,
  styles: [`
    :host { display: block; }
    main { position: relative; z-index: 1; }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.init();
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }
}
