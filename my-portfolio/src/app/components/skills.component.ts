import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';

interface Skill {
  name: string;
  percentage: number;
  colorFrom: string;
  colorTo: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-20 space-responsive-y bg-white/5 backdrop-blur-strong">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-center text-responsive-lg font-bold mb-12 section-heading">
          Technical Skills
        </h2>

        <div class="card-grid">
          <div *ngFor="let skill of skills; let i = index" 
               class="skill-card glassmorphism-intense hover-tilt loading"
               [class]="'loading-delay-' + ((i % 5) + 1)"
               [attr.data-skill-index]="i">
            
            <!-- Skill Header -->
            <div class="flex items-center justify-between mb-6 relative">
              <!-- Skill Icon & Name -->
              <div class="flex items-center gap-4">
                <div class="skill-icon text-4xl animate-float-delayed">{{skill.icon}}</div>
                <div class="text-xl font-bold text-gradient">{{skill.name}}</div>
              </div>
              
              <!-- Animated Percentage -->
              <div class="text-2xl font-bold text-gradient-cyber skill-percentage-display" 
                   [attr.data-target]="skill.percentage">0%</div>
            </div>
            
            <!-- Enhanced Progress Bar -->
            <div class="skill-progress-wrapper mb-6 relative">
              <div class="skill-progress" 
                   [attr.data-width]="skill.percentage"
                   [attr.data-color-from]="skill.colorFrom"
                   [attr.data-color-to]="skill.colorTo"
                   [style.background]="'linear-gradient(90deg, ' + skill.colorFrom + ' 0%, ' + skill.colorTo + ' 100%)'">
                
                <!-- Inner glow effect -->
                <div class="progress-glow absolute inset-0 rounded-full opacity-60"
                     [style.background]="'linear-gradient(90deg, ' + skill.colorFrom + '40, ' + skill.colorTo + '40)'"></div>
              </div>
              
              <!-- Progress track background -->
              <div class="progress-track absolute inset-0 bg-white/10 rounded-full -z-10"></div>
              
              <!-- Progress percentage overlay -->
              <div class="skill-percentage absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white opacity-0 transition-opacity duration-300 drop-shadow-lg">
                {{skill.percentage}}%
              </div>
            </div>
            
            <!-- Skill Description -->
            <div class="text-sm opacity-90 leading-relaxed text-shadow-glow">
              {{skill.description}}
            </div>
            
            <!-- Floating particles for each card -->
            <div class="floating-particle" style="top: 10%; right: 15%; animation-delay: 0s;"></div>
            <div class="floating-particle" style="bottom: 20%; left: 10%; animation-delay: -3s;"></div>
          </div>
        </div>

        <!-- Skills Summary Stats -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="glassmorphism hover-lift text-center p-6 loading loading-delay-4"
               *ngFor="let stat of skillStats">
            <div class="text-3xl font-bold text-gradient-accent mb-2">{{stat.value}}</div>
            <div class="text-sm opacity-80">{{stat.label}}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Component-specific enhanced styles */
    .skill-card {
      position: relative;
      padding: 2rem;
      min-height: 280px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .skill-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        rgba(168, 85, 247, 0.05) 0%, 
        rgba(59, 130, 246, 0.05) 50%, 
        rgba(192, 132, 252, 0.05) 100%);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: -1;
    }

    .skill-card:hover::before {
      opacity: 1;
    }

    .skill-icon {
      filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
      transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .skill-card:hover .skill-icon {
      transform: scale(1.2) rotate(10deg);
      filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
    }

    .skill-percentage-display {
      transition: all 0.3s ease;
      text-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
    }

    /* Enhanced progress bar with smooth animations */
    .skill-progress-wrapper {
      height: 12px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      position: relative;
    }

    .skill-progress {
      width: 0%;
      height: 100%;
      border-radius: 50px;
      position: relative;
      overflow: hidden;
      transition: width 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 
        0 0 15px rgba(255, 255, 255, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    }

    .skill-progress::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.6) 50%, 
        transparent 100%);
      animation: progressShine 3s ease-in-out infinite;
      animation-delay: 2s;
    }

    .skill-progress::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to bottom, 
        rgba(255, 255, 255, 0.4), 
        transparent);
      border-radius: 50px 50px 0 0;
    }

    .progress-glow {
      animation: progressGlow 2s ease-in-out infinite alternate;
    }

    .progress-track {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
    }

    /* Animated progress bars when loaded */
    .skill-progress.animated {
      animation: progressPulse 0.5s ease-out;
    }

    .skill-progress.animated + .skill-percentage {
      opacity: 1;
      animation: fadeInScale 0.5s ease-out 2s both;
    }

    @keyframes progressShine {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    @keyframes progressGlow {
      0% { opacity: 0.4; }
      100% { opacity: 0.8; }
    }

    @keyframes progressPulse {
      0% { transform: scaleY(1); }
      50% { transform: scaleY(1.1); }
      100% { transform: scaleY(1); }
    }

    @keyframes fadeInScale {
      0% { 
        opacity: 0; 
        transform: translateY(-50%) scale(0.8);
      }
      100% { 
        opacity: 1; 
        transform: translateY(-50%) scale(1);
      }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .skill-card {
        min-height: 240px;
        padding: 1.5rem;
      }
      
      .skill-icon {
        font-size: 2.5rem;
      }
    }
  `]
})
export class SkillsComponent implements OnInit, AfterViewInit {
skills: Skill[] = [
    {
        name: 'Angular',
        percentage: 85,
        colorFrom: '#ff4e50', // Red-Orange
        colorTo: '#f9d423',   // Yellow
        description: 'Advanced framework expertise with TypeScript, RxJS, and component architecture',
        icon: '🅰️'
    },
    {
        name: 'React',
        percentage: 90,
        colorFrom: '#24c6dc', // Cyan
        colorTo: '#5433ff',   // Indigo
        description: 'Expert in hooks, context API, Redux, and modern React patterns',
        icon: '⚛️'
    },
    {
        name: 'Node.js',
        percentage: 75,
        colorFrom: '#11998e', // Teal
        colorTo: '#38ef7d',   // Green
        description: 'Backend development with Express.js, APIs, and microservices architecture',
        icon: '🟩'
    },
    {
        name: 'TypeScript',
        percentage: 90,
        colorFrom: '#fc5c7d', // Pink
        colorTo: '#6a82fb',   // Blue
        description: 'Strong typing, interfaces, generics, and advanced TypeScript patterns',
        icon: '📘'
    },
    {
        name: 'JavaScript',
        percentage: 85,
        colorFrom: '#f7971e', // Orange
        colorTo: '#ffd200',   // Gold
        description: 'Proficient in ES6+, DOM manipulation, and asynchronous programming',
        icon: '🟨'
    },
    {
        name: 'JSON',
        percentage: 95,
        colorFrom: '#ee0979', // Magenta
        colorTo: '#ff6a00',   // Orange
        description: 'Data interchange format, API responses, and configuration files',
        icon: '📄'
    },
    {
        name: 'HTML',
        percentage: 95,
        colorFrom: '#f953c6', // Pink
        colorTo: '#b91d73',   // Purple
        description: 'Semantic markup, accessibility standards, and responsive design',
        icon: '🌐'
    },
    {
        name: 'CSS',
        percentage: 90,
        colorFrom: '#43cea2', // Green
        colorTo: '#185a9d',   // Blue
        description: 'Flexbox, Grid, animations, and responsive design techniques',
        icon: '🎨'
    },
    {
        name: 'Tailwind CSS',
        percentage: 80,
        colorFrom: '#f7971e', // Orange
        colorTo: '#ffd200',   // Yellow
        description: 'Utility-first CSS framework for rapid UI development and customization',
        icon: '🌊'
    },
    {
        name: 'Python',
        percentage: 85,
        colorFrom: '#00c6ff', // Light Blue
        colorTo: '#0072ff',   // Blue
        description: 'Django, Flask, data analysis, machine learning, and automation scripts',
        icon: '🐍'
    },
    {
        name: 'C++',
        percentage: 70,
        colorFrom: '#8e2de2', // Purple
        colorTo: '#4a00e0',   // Dark Purple
        description: 'Object-oriented programming, memory management, and performance optimization',
        icon: '💻'
    },
    {
        name: 'SQL',
        percentage: 80,
        colorFrom: '#f7971e', // Orange
        colorTo: '#ffd200',   // Yellow
        description: 'Database design, optimization, complex queries, and performance tuning',
        icon: '🗄️'
    },
    {
        name: 'REST API Development',
        percentage: 85,
        colorFrom: '#36d1c4', // Teal
        colorTo: '#1e5799',   // Blue
        description: 'Designing and building RESTful APIs, authentication, and best practices',
        icon: '🔗'
    },
    {
        name: 'Bootstrap',
        percentage: 80,
        colorFrom: '#563d7c', // Bootstrap Purple
        colorTo: '#6f42c1',   // Lighter Purple
        description: 'Responsive layouts, components, and rapid prototyping with Bootstrap',
        icon: '🅱️'
    },
    {
        name: 'Unreal Engine',
        percentage: 60,
        colorFrom: '#232526', // Dark Gray
        colorTo: '#414345',   // Lighter Gray
        description: 'Game development, Blueprints, and C++ scripting in Unreal Engine',
        icon: '🎮'
    },
    {
        name: 'Embedded Systems',
        percentage: 65,
        colorFrom: '#0f2027', // Dark Blue
        colorTo: '#2c5364',   // Blue
        description: 'Microcontrollers, C/C++, hardware interfacing, and real-time systems',
        icon: '🔌'
    },
    {
        name: 'MongoDB',
        percentage: 75,
        colorFrom: '#56ab2f', // Green
        colorTo: '#a8e063',   // Light Green
        description: 'NoSQL database design, aggregation, and performance optimization',
        icon: '🍃'
    },
    {
        name: 'AWS',
        percentage: 50,
        colorFrom: '#f857a6', // Pink
        colorTo: '#ff5858',   // Red
        description: 'Some exposure to cloud services, EC2, S3, Lambda, and serverless architecture',
        icon: '☁️'
    },
];

  skillStats = [
    { value: '15+', label: 'Technologies' },
    { value: '80%', label: 'Avg. Proficiency' },
    { value: '500+', label: 'Hours Learning' },
    { value: '24/7', label: 'Passion Level' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize loading animations
    setTimeout(() => {
      this.triggerLoadingAnimations();
    }, 500);
  }

  ngAfterViewInit(): void {
    // Initialize intersection observer for scroll-triggered animations
    this.initializeScrollAnimations();
    
    // Initialize progress bar animations after a delay
    setTimeout(() => {
      this.animateProgressBars();
      this.animatePercentageCounters();
    }, 1000);
  }

  private triggerLoadingAnimations(): void {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
      element.classList.add('loaded');
    });
  }

  private initializeScrollAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          
          // Trigger progress bar animation when skill cards come into view
          const skillCard = entry.target;
          const progressBar = skillCard.querySelector('.skill-progress') as HTMLElement;
          if (progressBar && !progressBar.classList.contains('animated')) {
            const targetWidth = progressBar.getAttribute('data-width');
            const colorFrom = progressBar.getAttribute('data-color-from');
            const colorTo = progressBar.getAttribute('data-color-to');
            
            setTimeout(() => {
              // Set the gradient background
              progressBar.style.background = `linear-gradient(90deg, ${colorFrom} 0%, ${colorTo} 100%)`;
              
              // Animate the width
              progressBar.style.width = targetWidth + '%';
              progressBar.classList.add('animated');
              
              // Update the glow effect
              const glowElement = progressBar.querySelector('.progress-glow') as HTMLElement;
              if (glowElement) {
                glowElement.style.background = `linear-gradient(90deg, ${colorFrom}60, ${colorTo}60)`;
              }
              
              // Animate the percentage counter
              this.animatePercentageCounter(skillCard, parseInt(targetWidth || '0'));
            }, 300);
          }
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => {
      observer.observe(card);
    });
  }

  private animateProgressBars(): void {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach((bar, index) => {
      const targetWidth = bar.getAttribute('data-width');
      const colorFrom = bar.getAttribute('data-color-from');
      const colorTo = bar.getAttribute('data-color-to');
      
      setTimeout(() => {
        const barElement = bar as HTMLElement;
        
        // Set gradient background
        barElement.style.background = `linear-gradient(90deg, ${colorFrom} 0%, ${colorTo} 100%)`;
        
        // Animate width
        barElement.style.width = targetWidth + '%';
        barElement.classList.add('animated');
        
        // Update glow effect
        const glowElement = barElement.querySelector('.progress-glow') as HTMLElement;
        if (glowElement) {
          glowElement.style.background = `linear-gradient(90deg, ${colorFrom}60, ${colorTo}60)`;
        }
      }, index * 200);
    });
  }

  private animatePercentageCounters(): void {
    const counters = document.querySelectorAll('.skill-percentage-display');
    
    counters.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      let current = 0;
      const increment = target / 60;
      
      setTimeout(() => {
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current) + '%';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '%';
          }
        };
        updateCounter();
      }, index * 150);
    });
  }

  private animatePercentageCounter(skillCard: Element, target: number): void {
    const counter = skillCard.querySelector('.skill-percentage-display') as HTMLElement;
    if (!counter) return;

    let current = 0;
    const increment = target / 60;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + '%';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '%';
      }
    };
    
    setTimeout(updateCounter, 800);
  }
}