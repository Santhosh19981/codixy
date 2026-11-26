import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero.component';
import { TrustTickerComponent } from '../../sections/trust-ticker/trust-ticker.component';
import { AboutComponent } from '../../sections/about/about.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { StatsComponent } from '../../sections/stats/stats.component';
import { TechnologiesComponent } from '../../sections/technologies/technologies.component';
import { PortfolioComponent } from '../../sections/portfolio/portfolio.component';
import { LeadershipComponent } from '../../sections/leadership/leadership.component';
import { TestimonialsComponent } from '../../sections/testimonials/testimonials.component';
import { ContactComponent } from '../../sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
  `,
  styles: [`
    :host { display: block; }
    main { position: relative; z-index: 1; }
  `]
})
export class HomeComponent {}
