import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationComponent } from './components/navigation.component';
import { HeroComponent } from './components/hero.component';
import { AboutComponent } from './components/about.component';
import { SkillsComponent } from './components/skills.component';
import { ProjectsComponent } from './components/projects.component';
import { ContactComponent } from './components/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
  ],
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
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  isScrolled = false;

  ngOnInit(): void {
    this.initializeScrollAnimations();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 100;
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

    setTimeout(() => {
      document.querySelectorAll('.loading').forEach(el => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
      });

      document.querySelectorAll('.skill-progress').forEach(bar => {
        (bar as HTMLElement).style.width = '0%';
      });
    }, 100);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
