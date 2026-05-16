import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trust-ticker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative py-8 mt-16 overflow-hidden border-y border-slate-200 bg-slate-50">
      <div class="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style="background: linear-gradient(90deg, #f8fafc, transparent)"></div>
      <div class="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style="background: linear-gradient(-90deg, #f8fafc, transparent)"></div>

      <div class="marquee-container">
        <div class="marquee-track items-center">
          <div *ngFor="let brand of allBrands" class="flex items-center mx-16 shrink-0">
            <img [src]="'assets/brands/' + brand" alt="Brand Logo" class="h-12 object-contain transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class TrustTickerComponent {
  brands = [
    'EKA_DP_1-01-removebg-preview.png',
    'Mobile-1.png',
    'Ourschoolerp-Logo.png',
    'PCS-logo.png',
    'Untitled-design-4.png',
    'aspd-Logo.png',
    'logo.png',
    'logo.webp',
    'ravss-logo.png'
  ];
  get allBrands() { return [...this.brands, ...this.brands]; }
}
