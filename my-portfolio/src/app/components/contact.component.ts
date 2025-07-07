import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactLink {
  title: string;
  description: string;
  icon: string;
  url: string;
  isExternal: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="py-20 bg-white/5 backdrop-blur-lg text-center">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-center text-4xl md:text-5xl font-bold mb-12 text-gradient">
          Let's Connect
        </h2>
        
        <div class="flex flex-col md:flex-row justify-center gap-8 mt-8">
          <div class="glassmorphism rounded-2xl p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-primary/60 text-white min-w-[200px] flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden shimmer-effect opacity-0 loading"
               *ngFor="let link of contactLinks" 
               (click)="openLink(link)">
            
            <!-- Contact Icon -->
            <div class="text-5xl text-blue-light transition-all duration-300 group-hover:text-blue-primary group-hover:scale-110">
              {{link.icon}}
            </div>
            
            <!-- Contact Title -->
            <div class="text-xl font-semibold mb-2">
              {{link.title}}
            </div>
            
            <!-- Contact Description -->
            <div class="text-sm opacity-80 leading-relaxed">
              {{link.description}}
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {

  contactLinks: ContactLink[] = [
    {
      title: 'Email',
      description: 'Get in touch directly via email',
      icon: '📧',
      url: 'mailto:your.email@example.com',
      isExternal: false
    },
    {
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      icon: '💼',
      url: 'https://linkedin.com/in/yourprofile',
      isExternal: true
    },
    {
      title: 'GitHub',
      description: 'Check out my code repositories',
      icon: '🐙',
      url: 'https://github.com/yourusername',
      isExternal: true
    }
  ];

  constructor() { }

  openLink(link: ContactLink): void {
    if (link.isExternal) {
      window.open(link.url, '_blank');
    } else {
      window.location.href = link.url;
    }
  }
}