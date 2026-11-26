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
            <img [src]="'assets/brands/' + brand.file" [alt]="brand.name + ' logo'" [width]="brand.w" [height]="brand.h"
              loading="lazy" decoding="async"
              class="h-12 w-auto object-contain transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class TrustTickerComponent {
  brands = [
    { file: 'Mobile-1.webp', name: 'Client', w: 320, h: 96 },
    { file: 'Ourschoolerp-Logo.webp', name: 'Our School ERP', w: 330, h: 89 },
    { file: 'cashflo-logo.webp', name: 'Cashflo', w: 364, h: 96 },
    { file: 'inframart-logo.webp', name: 'Inframart', w: 286, h: 96 },
    { file: 'aquapure-logo-96.webp', name: 'Aquapure', w: 429, h: 96 },
    { file: 'bhagona-logo.webp', name: 'Bhagona', w: 330, h: 96 },
  ];
  get allBrands() { return [...this.brands, ...this.brands]; }
}
