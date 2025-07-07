import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="fixed w-full top-0 z-50 transition-all duration-300"
         [class]="isScrolled ? 'bg-purple-primary/95 backdrop-blur-lg' : 'bg-white/10 backdrop-blur-lg border-b border-white/20'">
      <div class="flex justify-between items-center px-8 py-4">
        <a (click)="scrollToSection('home')" 
           class="text-3xl font-bold text-gradient cursor-pointer">
          SE
        </a>
        <ul class="hidden md:flex list-none gap-8">
          <li>
            <a (click)="scrollToSection('home')" 
               class="text-white font-medium transition-all duration-300 cursor-pointer relative group">
              Home
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-primary to-blue-light transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a (click)="scrollToSection('about')" 
               class="text-white font-medium transition-all duration-300 cursor-pointer relative group">
              About
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-primary to-blue-light transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a (click)="scrollToSection('skills')" 
               class="text-white font-medium transition-all duration-300 cursor-pointer relative group">
              Skills
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-primary to-blue-light transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a (click)="scrollToSection('projects')" 
               class="text-white font-medium transition-all duration-300 cursor-pointer relative group">
              Projects
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-primary to-blue-light transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a (click)="scrollToSection('contact')" 
               class="text-white font-medium transition-all duration-300 cursor-pointer relative group">
              Contact
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-primary to-blue-light transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() isScrolled: boolean = false;

  constructor() { }

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