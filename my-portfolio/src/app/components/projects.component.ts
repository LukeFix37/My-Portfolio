import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink: string;
  category: string;
  featured: boolean;
  image: string;
  fallbackIcon?: string;
  fallbackGradient?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-20 space-responsive-y relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="hero-background"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-5 relative z-10">
        <h2 class="text-center text-responsive-lg font-bold mb-8 section-heading">
          Featured Projects
        </h2>
        
        <p class="text-center text-responsive-md opacity-90 mb-12 max-w-3xl mx-auto loading loading-delay-1">
          A showcase of my latest work, featuring innovative solutions and cutting-edge technologies.
        </p>

        <!-- Project Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-12 loading loading-delay-2">
          <button *ngFor="let category of categories"
                  class="filter-btn"
                  [class.active]="activeFilter === category"
                  (click)="setActiveFilter(category)">
            {{category}}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="card-grid">
          <div *ngFor="let project of filteredProjects; let i = index"
               class="project-card glassmorphism-intense hover-tilt relative overflow-hidden group loading"
               [class]="'loading-delay-' + ((i % 5) + 3)"
               [attr.data-category]="project.category">

            <!-- Clickable Card Area -->
            <div class="cursor-pointer" (click)="handleCardClick(project)">
              <div class="project-image-container relative h-48 overflow-hidden rounded-t-2xl">
                <img [src]="project.image"
                     [alt]="project.title + ' screenshot'"
                     class="project-image w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                     [class.opacity-100]="!hasImageError(project)"
                     [class.opacity-0]="hasImageError(project)"
                     (load)="onImageLoad(project)"
                     (error)="onImageError(project)">

                <div class="fallback-background absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                     [class.opacity-0]="!hasImageError(project)"
                     [class.opacity-100]="hasImageError(project)"
                     [style.background]="project.fallbackGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
                  <div class="floating-particle" style="top: 20%; left: 15%; animation-delay: 0s;"></div>
                  <div class="floating-particle" style="bottom: 25%; right: 20%; animation-delay: -2s;"></div>
                  <div class="fallback-icon text-6xl text-white/90 relative z-10 animate-float group-hover:scale-110 transition-transform duration-500">
                    {{project.fallbackIcon || '🌐'}}
                  </div>
                </div>

                <div class="loading-placeholder absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 transition-opacity duration-500"
                     [class.opacity-0]="imageLoadStates[project.title] !== 'loading'"
                     [class.opacity-100]="imageLoadStates[project.title] === 'loading'">
                  <div class="shimmer-effect w-full h-full rounded-t-2xl"></div>
                  <div class="absolute text-white/60 text-sm">Loading...</div>
                </div>

                <div *ngIf="project.featured"
                     class="featured-badge absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full z-20">
                  ⭐ Featured
                </div>

                <div class="image-overlay absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              </div>

              <div class="project-content p-8 relative">
                <div class="category-tag text-xs font-semibold text-gradient-cyber mb-3 uppercase tracking-wider">
                  {{project.category}}
                </div>
                <h3 class="text-xl font-bold mb-4 text-gradient group-hover:text-gradient-accent transition-all duration-300">
                  {{project.title}}
                </h3>
                <p class="opacity-90 leading-relaxed mb-6 text-sm">
                  {{project.description}}
                </p>

                <div class="tech-stack flex flex-wrap gap-2 mb-6">
                  <span *ngFor="let tech of project.technologies"
                        class="tech-tag bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                    {{tech}}
                  </span>
                </div>
              </div>
            </div>

            <!-- Button Area (separate from card click) -->
            <div class="project-links flex gap-4 px-8 pb-8">
              <button *ngIf="project.demoLink"
                      type="button"
                      class="project-link btn-gradient text-sm px-6 py-2 font-medium transform hover:scale-105 transition-all duration-300"
                      (click)="openDemoLink(project.demoLink, $event)">
                <span class="mr-2">🚀</span>
                Live Demo
              </button>
              <button type="button"
                      class="project-link btn-outline text-sm px-6 py-2 font-medium transform hover:scale-105 transition-all duration-300"
                      (click)="openGithubLink(project.githubLink, $event)">
                <span class="mr-2">🐙</span>
                GitHub
              </button>
            </div>

            <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
          </div>
        </div>

        <div class="text-center mt-12 loading loading-delay-6" *ngIf="hasMoreProjects">
          <button class="btn-outline px-8 py-3 font-medium transform hover:scale-105 transition-all duration-300"
                  (click)="loadMoreProjects()">
            Load More Projects
          </button>
        </div>

        <div class="github-cta glassmorphism-intense p-8 rounded-3xl mt-16 text-center loading loading-delay-7 relative overflow-hidden">
          <div class="absolute inset-0 shimmer-effect rounded-3xl"></div>
          <div class="relative z-10">
            <div class="text-4xl mb-4 animate-bounce">🐙</div>
            <h3 class="text-2xl font-bold mb-4 text-gradient-accent">
              Explore More on GitHub
            </h3>
            <p class="opacity-90 mb-6 max-w-2xl mx-auto">
              Check out my complete portfolio of projects, contributions, and open-source work on GitHub.
            </p>
            <a href="https://github.com/yourusername"
               target="_blank"
               class="btn-gradient px-8 py-3 font-medium transform hover:scale-105 transition-all duration-300">
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Add your existing styles here */
  `]
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  activeFilter: string = 'All';
  hasMoreProjects: boolean = false;
  filteredProjects: Project[] = [];
  imageErrors: Set<string> = new Set();
  imageLoadStates: { [key: string]: 'loading' | 'loaded' | 'error' } = {};
  categories: string[] = ['All', 'Web App', 'Mobile', 'API', 'Tool', 'Game'];

  projects: Project[] = [
    {
      title: 'Full Stack E-Commerce Platform',
      description: 'Complete e-commerce solution featuring modern UI, secure payment processing, inventory management, and admin dashboard. Built with responsive design and optimized for performance.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'SQL', 'MySQL', 'Bootstrap'],
      githubLink: 'https://github.com/LukeFix37/Game-Ecommerce-website',
      category: 'Web App',
      featured: true,
      image: '/images/fullstack_site.png',
      fallbackIcon: '🏪',
      fallbackGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Phishing Detector',
      description: 'Real-time phishing detection tool using machine learning and natural language processing.',
      technologies: ['React', 'Node.js', 'JavaScript', 'JSON', 'REST API'],
      demoLink: 'https://phishing-detector-virid.vercel.app/',
      githubLink: 'https://github.com/LukeFix37/Phishing-Detector',
      category: 'Web App',
      featured: true,
      image: '/images/Phishing-Detector.png',
      fallbackIcon: '📊',
      fallbackGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Exposure Therapy VR Simulation',
      description: 'Virtual reality application for exposure therapy.',
      technologies: ['Unreal Engine', 'C++', 'Arduino', 'Oculus Quest'],
      githubLink: 'https://github.com/LukeFix37/Spider_Project_2024/tree/main',
      category: 'Tool',
      featured: false,
      image: '/images/VR-Sim.png',
      fallbackIcon: '🥽',
      fallbackGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'WEB Wordlist Generator',
      description: 'A powerful wordlist generator for web applications.',
      technologies: ['Python', 'Docker'],
      githubLink: 'https://github.com/LukeFix37/web-wordlist-generator',
      category: 'Tool',
      featured: false,
      image: '/images/WEB-WORDLIST_Screenshot.png',
      fallbackIcon: '📝',
      fallbackGradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)'
    },
    {
      title: 'DevDash',
      description: 'A developer dashboard application that aggregates tools and repositories.',
      technologies: ['React', 'Node.js', 'TypeScript', 'TailwindCSS', 'MongoDB', 'REST API'],
      demoLink: 'https://devdash-two.vercel.app/',
      githubLink: 'https://github.com/LukeFix37/devdash/tree/main',
      category: 'Web App',
      featured: false,
      image: '/images/DevDash.png',
      fallbackIcon: '📊',
      fallbackGradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
    },
    {
      title: 'Budgeting Tool',
      description: 'A personal budgeting tool that helps users track expenses and goals.',
      technologies: ['React', 'JavaScript', 'TailwindCSS'],
      demoLink: 'https://budgeting-tool-gray.vercel.app/',
      githubLink: 'https://github.com/LukeFix37/budgeting-tool',
      category: 'Tool',
      featured: false,
      image: '/images/Budgeting-Tool.png',
      fallbackIcon: '💰',
      fallbackGradient: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)'
    },
    {
      title: 'Wymon',
      description: 'A 2.5D Metroidvania Platformer game built with Unreal Engine and C++.',
      technologies: ['Unreal Engine', 'C++', 'Jira'],
      githubLink: 'https://github.com/DaEmeraldGuy/WymonUE',
      category: 'Game',
      featured: false,
      image: '/images/Wymon.png',
      fallbackIcon: '🎮',
      fallbackGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    }
  ];

  constructor(private router: Router) {
    this.projects.forEach(project => {
      this.imageLoadStates[project.title] = 'loading';
    });
  }

  ngOnInit(): void {
    this.filteredProjects = this.projects;
    setTimeout(() => this.triggerLoadingAnimations(), 500);
  }

  ngAfterViewInit(): void {
    this.initializeScrollAnimations();
  }

  // Handle card click - navigate to Wymon page or open demo/github
  handleCardClick(project: Project): void {
    if (project.title === 'Wymon') {
      this.router.navigate(['/projects/wymon']);
    } else if (project.demoLink) {
      window.open(project.demoLink, '_blank');
    } else {
      window.open(project.githubLink, '_blank');
    }
  }

  // Handle demo button click
  openDemoLink(demoLink: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    window.open(demoLink, '_blank');
  }

  // Handle github button click
  openGithubLink(githubLink: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    window.open(githubLink, '_blank');
  }

  onImageLoad(project: Project): void {
    this.imageLoadStates[project.title] = 'loaded';
    this.imageErrors.delete(project.title);
  }

  onImageError(project: Project): void {
    this.imageLoadStates[project.title] = 'error';
    this.imageErrors.add(project.title);
  }

  hasImageError(project: Project): boolean {
    return this.imageErrors.has(project.title);
  }

  setActiveFilter(category: string): void {
    this.activeFilter = category;
    this.filteredProjects =
      category === 'All'
        ? this.projects
        : this.projects.filter(p => p.category === category);
    this.animateFilterChange();
  }

  loadMoreProjects(): void {
    this.hasMoreProjects = false;
  }

  private triggerLoadingAnimations(): void {
    document.querySelectorAll('.loading').forEach(el => el.classList.add('loaded'));
  }

  private initializeScrollAnimations(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('loaded');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => observer.observe(card));
  }

  private animateFilterChange(): void {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
      cards.forEach((card, i) => {
        setTimeout(() => {
          (card as HTMLElement).style.opacity = '1';
          (card as HTMLElement).style.transform = 'translateY(0)';
        }, i * 100);
      });
    }, 200);
  }
}