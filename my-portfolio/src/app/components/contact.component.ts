import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactLink {
  title: string;
  description: string;
  icon: string;
  url: string;
  isExternal: boolean;
  gradient: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="py-20 space-responsive-y bg-white/5 backdrop-blur-strong text-center relative overflow-hidden">
      <!-- Hero background effect -->
      <div class="hero-background absolute inset-0 opacity-30"></div>
      
      <div class="max-w-7xl mx-auto px-5 relative z-10">
        <h2 class="text-center text-responsive-lg font-bold mb-8 section-heading">
          Let's Connect
        </h2>
        
        <p class="text-responsive-md opacity-90 mb-12 max-w-2xl mx-auto loading loading-delay-1">
          Ready to bring your ideas to life? Let's collaborate and create something amazing together.
        </p>
        
        <!-- Enhanced Contact Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          <div *ngFor="let link of contactLinks; let i = index" 
               class="contact-card glassmorphism-intense hover-lift cursor-pointer relative overflow-hidden group loading"
               [class]="'loading-delay-' + (i + 2)"
               (click)="openLink(link)"
               (mouseenter)="onCardHover(i)"
               (mouseleave)="onCardLeave(i)">
            
            <!-- Background gradient overlay -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                 [style.background]="link.gradient"></div>
            
            <!-- Floating particles -->
            <div class="floating-particle" [style]="getParticleStyle(i, 0)"></div>
            <div class="floating-particle" [style]="getParticleStyle(i, 1)"></div>
            
            <!-- Contact Icon -->
            <div class="contact-icon text-6xl mb-6 animate-float relative z-10"
                 [class]="'animate-float-delayed-' + i">
              {{link.icon}}
            </div>
            
            <!-- Contact Title -->
            <div class="text-xl font-bold mb-4 text-gradient relative z-10">
              {{link.title}}
            </div>
            
            <!-- Contact Description -->
            <div class="text-sm opacity-80 leading-relaxed mb-6 relative z-10">
              {{link.description}}
            </div>
            
            <!-- Call to Action -->
            <div class="btn-outline text-sm py-2 px-6 relative z-10 transform group-hover:scale-105 transition-transform duration-300">
              {{link.isExternal ? 'Visit Profile' : 'Send Email'}}
            </div>
            
            <!-- Animated border -->
            <div class="absolute inset-0 border-gradient rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
        
        <!-- Call to Action Section -->
        <div class="mt-16 glassmorphism-intense p-8 rounded-3xl max-w-2xl mx-auto loading loading-delay-5 relative overflow-hidden">
          <!-- Background pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="shimmer-effect w-full h-full"></div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-2xl font-bold mb-4 text-gradient-accent">
              Ready to Start a Project?
            </h3>
            <p class="opacity-90 mb-6 leading-relaxed">
              I'm always excited to work on new projects and collaborate with innovative teams. 
              Let's discuss how we can bring your vision to life!
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="btn-gradient px-8 py-3 transform hover:scale-105 transition-all duration-300"
                      (click)="openLink(contactLinks[0])">
                Start Conversation
              </button>
              <button class="btn-outline px-8 py-3 transform hover:scale-105 transition-all duration-300"
                      (click)="downloadResume()">
                Download Resume
              </button>
            </div>
          </div>
        </div>
        
        <!-- Social Proof Section -->
        <div class="mt-12 flex flex-wrap justify-center gap-8 opacity-60 loading loading-delay-6">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gradient-cyber">⚡</span>
            Fast Response
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gradient-cyber">🌟</span>
            Quality Guaranteed
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gradient-cyber">🤝</span>
            Collaborative Approach
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-card {
      padding: 2.5rem 2rem;
      min-height: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .contact-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        rgba(168, 85, 247, 0.1) 0%, 
        rgba(59, 130, 246, 0.1) 50%, 
        rgba(192, 132, 252, 0.1) 100%);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 0;
    }

    .contact-card:hover::before {
      opacity: 1;
    }

    .contact-icon {
      filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6));
      transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .contact-card:hover .contact-icon {
      transform: scale(1.15) rotate(5deg);
      filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.9));
    }

    /* Staggered floating animations */
    .animate-float-delayed-0 { animation-delay: 0s; }
    .animate-float-delayed-1 { animation-delay: -2s; }
    .animate-float-delayed-2 { animation-delay: -4s; }

    /* Enhanced hover effects */
    .contact-card:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 
        0 25px 80px rgba(168, 85, 247, 0.4),
        0 0 40px rgba(168, 85, 247, 0.3);
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
      .contact-card {
        min-height: 280px;
        padding: 2rem 1.5rem;
      }
      
      .contact-icon {
        font-size: 3.5rem;
      }
      
      .contact-card:hover {
        transform: translateY(-5px) scale(1.02);
      }
    }
  `]
})
export class ContactComponent {

  contactLinks: ContactLink[] = [
    {
      title: 'Email',
      description: 'Get in touch directly via email for project inquiries and collaborations',
      icon: '📧',
      url: 'mailto:lukefixari@aol.com',
      isExternal: false,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'LinkedIn',
      description: 'Connect with me professionally and explore my career journey',
      icon: '💼',
      url: 'https://www.linkedin.com/in/luke-fixari/',
      isExternal: true,
      gradient: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)'
    },
    {
      title: 'GitHub',
      description: 'Check out my code repositories and open-source contributions',
      icon: '🐙',
      url: 'https://github.com/LukeFix37',
      isExternal: true,
      gradient: 'linear-gradient(135deg, #333 0%, #666 100%)'
    }
  ];

  constructor() { }

  openLink(link: ContactLink): void {
    // Add click animation
    const clickedCard = event?.target as HTMLElement;
    if (clickedCard) {
      clickedCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
        clickedCard.style.transform = '';
      }, 150);
    }

    if (link.isExternal) {
      window.open(link.url, '_blank');
    } else {
      window.location.href = link.url;
    }
  }

  downloadResume(): void {
    const resumeUrl = '/documents/Resume (1).pdf'; // Make sure this path is correct and the file exists
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume (1).pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onCardHover(index: number): void {
    // Add additional hover effects if needed
    const card = document.querySelector(`[data-card-index="${index}"]`) as HTMLElement;
    if (card) {
      // Custom hover logic can be added here
    }
  }

  onCardLeave(index: number): void {
    // Remove hover effects if needed
  }

  getParticleStyle(cardIndex: number, particleIndex: number): string {
    const positions = [
      ['top: 15%; left: 15%;', 'bottom: 20%; right: 20%;'],
      ['top: 25%; right: 15%;', 'bottom: 15%; left: 25%;'],
      ['top: 20%; left: 20%;', 'bottom: 25%; right: 15%;']
    ];
    
    const delays = [
      ['animation-delay: 0s;', 'animation-delay: -3s;'],
      ['animation-delay: -1s;', 'animation-delay: -4s;'],
      ['animation-delay: -2s;', 'animation-delay: -5s;']
    ];
    
    return `${positions[cardIndex][particleIndex]} ${delays[cardIndex][particleIndex]}`;
  }
}