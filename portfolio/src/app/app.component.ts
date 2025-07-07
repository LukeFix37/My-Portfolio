import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen">
      <app-navigation [isScrolled]="isScrolled"></app-navigation>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-contact></app-contact>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio-website';
  isScrolled = false;

  constructor() { }

  ngOnInit(): void {
    // Initialize scroll animations
    this.initializeScrollAnimations();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 100;
  }

  private initializeScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';

          // Animate skill progress bars
          if (element.classList.contains('skill-card')) {
            const progressBar = element.querySelector('.skill-progress') as HTMLElement;
            if (progressBar) {
              const targetWidth = progressBar.getAttribute('data-width');
              setTimeout(() => {
                progressBar.style.width = targetWidth || '0%';
              }, 300);
            }
          }
        }
      });
    }, observerOptions);

    // Observe elements after view init
    setTimeout(() => {
      document.querySelectorAll('.loading').forEach(el => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
      });

      // Initialize skill progress bars
      document.querySelectorAll('.skill-progress').forEach(bar => {
        (bar as HTMLElement).style.width = '0%';
      });
    }, 100);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}