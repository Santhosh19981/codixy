import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from './core/services/scroll.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ChatbotComponent, FooterComponent],
  template: `
    <!-- Navigation -->
    <app-navbar></app-navbar>

    <!-- Page content (home or legal pages) -->
    <router-outlet></router-outlet>

    <!-- Footer -->
    <app-footer></app-footer>

    <!-- AI Chatbot -->
    <app-chatbot></app-chatbot>
  `,
  styles: [`:host { display: block; }`]
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
