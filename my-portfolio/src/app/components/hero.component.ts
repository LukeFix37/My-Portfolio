import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="min-h-screen flex items-center justify-center text-center pt-20 relative overflow-hidden">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-20 animate-float"></div>
      
      <div class="relative z-10 max-w-4xl animate-fade-in-up opacity-0 loading">
        <!-- Hero Logo -->
        <div class="text-6xl md:text-7xl font-bold mb-4 hero-text-gradient animate-shimmer">
          ⚡
        </div>
        
        <!-- Main Title -->
        <h1 class="text-4xl md:text-6xl font-bold mb-4">
          Software Engineer
        </h1>
        
        <!-- Description -->
        <p class="text-lg md:text-xl mb-12 opacity-90 leading-relaxed max-w-2xl mx-auto">
          Crafting innovative solutions with cutting-edge technology.<br>
          Passionate about creating scalable applications and user experiences.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <a (click)="scrollToSection('projects')" 
             class="btn-gradient px-10 py-4 rounded-full text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            See My Work
          </a>
          <a (click)="scrollToSection('contact')" 
             class="bg-transparent text-white border-2 border-white/80 backdrop-blur-lg px-10 py-4 rounded-full text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:border-white">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initializeTypingEffect();
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

  private initializeTypingEffect(): void {
    setTimeout(() => {
      const heroTitle = document.querySelector('.hero h1') as HTMLElement;
      if (heroTitle) {
        const originalText = heroTitle.textContent || '';
        this.typeWriter(heroTitle, originalText, 150);
      }
    }, 500);
  }

  private typeWriter(element: HTMLElement, text: string, speed: number = 100): void {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    type();
  }
}