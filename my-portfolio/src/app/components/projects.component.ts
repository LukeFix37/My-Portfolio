import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';

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
            <!-- Background Pattern -->
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
                             class="project-card glassmorphism-intense hover-tilt cursor-pointer relative overflow-hidden group loading"
                             [class]="'loading-delay-' + ((i % 5) + 3)"
                             (click)="handleCardClick(project, $event)"
                             [attr.data-category]="project.category">
                        
                        <!-- Enhanced Project Image Container -->
                        <div class="project-image-container relative h-48 overflow-hidden rounded-t-2xl">
                            
                            <!-- Actual Project Image -->
                            <img [src]="project.image" 
                                     [alt]="project.title + ' screenshot'"
                                     class="project-image w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                                     [class.opacity-100]="!hasImageError(project)"
                                     [class.opacity-0]="hasImageError(project)"
                                     (load)="onImageLoad(project)"
                                     (error)="onImageError(project)">
                            
                            <!-- Fallback Gradient Background (shown when image fails) -->
                            <div class="fallback-background absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                                     [class.opacity-0]="!hasImageError(project)"
                                     [class.opacity-100]="hasImageError(project)"
                                     [style.background]="project.fallbackGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
                                
                                <!-- Floating particles in fallback -->
                                <div class="floating-particle" style="top: 20%; left: 15%; animation-delay: 0s;"></div>
                                <div class="floating-particle" style="bottom: 25%; right: 20%; animation-delay: -2s;"></div>
                                
                                <!-- Fallback Icon -->
                                <div class="fallback-icon text-6xl text-white/90 relative z-10 animate-float group-hover:scale-110 transition-transform duration-500">
                                    {{project.fallbackIcon || '🌐'}}
                                </div>
                            </div>
                            
                            <!-- Loading Placeholder -->
                            <div class="loading-placeholder absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 transition-opacity duration-500"
                                     [class.opacity-0]="imageLoadStates[project.title] !== 'loading'"
                                     [class.opacity-100]="imageLoadStates[project.title] === 'loading'">
                                <div class="shimmer-effect w-full h-full rounded-t-2xl"></div>
                                <div class="absolute text-white/60 text-sm">Loading...</div>
                            </div>
                            
                            <!-- Featured Badge -->
                            <div *ngIf="project.featured" 
                                     class="featured-badge absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full z-20">
                                ⭐ Featured
                            </div>
                            
                            <!-- Image Overlay Effect -->
                            <div class="image-overlay absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        </div>
                        
                        <!-- Project Content -->
                        <div class="project-content p-8 relative">
                            <!-- Category Tag -->
                            <div class="category-tag text-xs font-semibold text-gradient-cyber mb-3 uppercase tracking-wider">
                                {{project.category}}
                            </div>
                            
                            <!-- Project Title -->
                            <h3 class="text-xl font-bold mb-4 text-gradient group-hover:text-gradient-accent transition-all duration-300">
                                {{project.title}}
                            </h3>
                            
                            <!-- Project Description -->
                            <p class="opacity-90 leading-relaxed mb-6 text-sm">
                                {{project.description}}
                            </p>
                            
                            <!-- Tech Stack -->
                            <div class="tech-stack flex flex-wrap gap-2 mb-6">
                                <span *ngFor="let tech of project.technologies" 
                                            class="tech-tag bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                                    {{tech}}
                                </span>
                            </div>
                            
                            <!-- Project Links -->
                            <div class="project-links flex gap-4" (click)="$event.stopPropagation()">
                                <button *ngIf="project.demoLink" 
                                        class="project-link btn-gradient text-sm px-6 py-2 font-medium transform hover:scale-105 transition-all duration-300"
                                        (click)="openDemoLink(project, $event)">
                                    <span class="mr-2">🚀</span>
                                    Live Demo
                                </button>
                                <button class="project-link btn-outline text-sm px-6 py-2 font-medium transform hover:scale-105 transition-all duration-300"
                                        (click)="openGithubLink(project, $event)">
                                    <span class="mr-2">🐙</span>
                                    GitHub
                                </button>
                            </div>
                            
                            <!-- Hover Glow Effect -->
                            <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                        
                        <!-- Card Background Animation -->
                        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    </div>
                </div>

                <!-- Load More Button -->
                <div class="text-center mt-12 loading loading-delay-6" *ngIf="hasMoreProjects">
                    <button class="btn-outline px-8 py-3 font-medium transform hover:scale-105 transition-all duration-300"
                                    (click)="loadMoreProjects()">
                        Load More Projects
                    </button>
                </div>

                <!-- GitHub CTA -->
                <div class="github-cta glassmorphism-intense p-8 rounded-3xl mt-16 text-center loading loading-delay-7 relative overflow-hidden">
                    <!-- Background shimmer -->
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
        /* Enhanced Project Card Styles */
        .project-card {
            min-height: 500px;
            display: flex;
            flex-direction: column;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .project-card::before {
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
            opacity: 0;
            transition: opacity 0.5s ease;
            border-radius: inherit;
            z-index: -1;
        }

        .project-card:hover::before {
            opacity: 1;
        }

        .project-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 
                0 25px 80px rgba(168, 85, 247, 0.4),
                0 0 40px rgba(168, 85, 247, 0.3);
        }

        /* Project Image Container */
        .project-image-container {
            position: relative;
            background: rgba(0, 0, 0, 0.1);
        }

        /* Actual Project Image */
        .project-image {
            transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
            object-fit: cover;
            filter: contrast(1.1) brightness(1.05);
        }

        .project-card:hover .project-image {
            filter: contrast(1.2) brightness(1.1) saturate(1.1);
        }

        /* Fallback Background */
        .fallback-background {
            backdrop-filter: blur(2px);
        }

        .fallback-icon {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
            transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .project-card:hover .fallback-icon {
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));
        }

        /* Loading Placeholder */
        .loading-placeholder {
            backdrop-filter: blur(10px);
        }

        /* Image Overlay */
        .image-overlay {
            background: linear-gradient(
                135deg,
                rgba(168, 85, 247, 0.2) 0%,
                rgba(59, 130, 246, 0.2) 50%,
                rgba(192, 132, 252, 0.2) 100%
            );
        }

        /* Tech Stack Styling */
        .tech-tag {
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .tech-tag:hover {
            transform: scale(1.05);
            background: rgba(168, 85, 247, 0.3);
        }

        /* Filter Buttons */
        .filter-btn {
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            background: rgba(168, 85, 247, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .filter-btn:hover,
        .filter-btn.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: rgba(168, 85, 247, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
        }

        /* Featured Badge */
        .featured-badge {
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 0 20px rgba(255, 165, 0, 0.5);
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* Category Tag */
        .category-tag {
            font-size: 0.7rem;
            letter-spacing: 0.1em;
        }

        /* Project Links - Prevent card click in this area */
        .project-links {
            position: relative;
            z-index: 10;
        }

        .project-link {
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            border: none;
            cursor: pointer;
            font-family: inherit;
            z-index: 15;
        }

        .project-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .project-link:hover::before {
            left: 100%;
        }

        /* GitHub CTA */
        .github-cta {
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .project-card {
                min-height: 450px;
            }
            
            .project-image-container {
                height: 180px;
            }
            
            .fallback-icon {
                font-size: 3rem;
            }
            
            .project-content {
                padding: 1.5rem;
            }
            
            .project-links {
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .project-link {
                width: 100%;
                justify-content: center;
                text-align: center;
            }
        }

        /* Performance optimizations */
        .project-card,
        .project-image,
        .fallback-icon,
        .tech-tag {
            will-change: transform;
        }
    `]
})
export class ProjectsComponent implements OnInit, AfterViewInit {
    
    activeFilter: string = 'All';
    hasMoreProjects: boolean = false;
    filteredProjects: Project[] = [];
    imageErrors: Set<string> = new Set();
    imageLoadStates: { [key: string]: 'loading' | 'loaded' | 'error' } = {};
    
    categories: string[] = ['All', 'Web App', 'Mobile', 'API', 'Tool'];

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
            description: 'Real-time phishing detection tool using machine learning and natural language processing. Features include email scanning, URL analysis, and user behavior monitoring.',
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
                description: 'Virtual reality application for exposure therapy, designed to help users overcome phobias and anxiety disorders. Features immersive environments and real-time feedback.',
                technologies: ['Unreal Engine', 'C++', 'Arduino', 'Oculus Quest'],
                githubLink: 'https://github.com/LukeFix37/Spider_Project_2024/tree/main',
                category: 'Tool',
                featured: false,
                image: '/images/VR-Sim.png',
                fallbackIcon: '🥽',
                fallbackGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ];

    constructor() { 
        // Initialize loading states
        this.projects.forEach(project => {
            this.imageLoadStates[project.title] = 'loading';
        });
    }

    ngOnInit(): void {
        this.filteredProjects = this.projects;
        setTimeout(() => {
            this.triggerLoadingAnimations();
        }, 500);
    }

    ngAfterViewInit(): void {
        this.initializeScrollAnimations();
    }

    // Card click handler - detects if button was clicked
    handleCardClick(project: Project, event: Event): void {
        const target = event.target as HTMLElement;
        
        // More robust button detection
        const isButton = target.tagName === 'BUTTON' || 
                        target.closest('button') || 
                        target.parentElement?.tagName === 'BUTTON' ||
                        target.classList.contains('project-link') ||
                        target.closest('.project-link');
        
        console.log('Card clicked:', { 
            targetTag: target.tagName, 
            isButton: isButton, 
            classList: target.classList.toString(),
            closestButton: target.closest('button')
        });
        
        // If a button was clicked, don't handle the card click
        if (isButton) {
            console.log('Button detected, preventing card action');
            return;
        }

        // Add click animation
        const card = target.closest('.project-card') as HTMLElement;
        if (card) {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        }

        // Default action: open demo link if available, otherwise GitHub
        console.log('Opening default link for card click');
        if (project.demoLink) {
            window.open(project.demoLink, '_blank');
        } else {
            window.open(project.githubLink, '_blank');
        }
    }

    // Demo button click handler
    openDemoLink(project: Project, event: Event): void {
        console.log('Demo button clicked');
        event.stopPropagation();
        event.preventDefault();
        
        if (project.demoLink) {
            window.open(project.demoLink, '_blank');
        }
    }

    // GitHub button click handler  
    openGithubLink(project: Project, event: Event): void {
        console.log('GitHub button clicked');
        event.stopPropagation();
        event.preventDefault();
        
        window.open(project.githubLink, '_blank');
    }

    // Image loading handlers
    onImageLoad(project: Project): void {
        this.imageLoadStates[project.title] = 'loaded';
        this.imageErrors.delete(project.title);
    }

    onImageError(project: Project): void {
        console.warn(`Project image failed to load: ${project.image}`);
        this.imageLoadStates[project.title] = 'error';
        this.imageErrors.add(project.title);
    }

    hasImageError(project: Project): boolean {
        return this.imageErrors.has(project.title);
    }

    setActiveFilter(category: string): void {
        this.activeFilter = category;
        
        if (category === 'All') {
            this.filteredProjects = this.projects;
        } else {
            this.filteredProjects = this.projects.filter(project => project.category === category);
        }

        // Add filter animation
        this.animateFilterChange();
    }

    loadMoreProjects(): void {
        // Simulate loading more projects
        this.hasMoreProjects = false;
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
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }

    private animateFilterChange(): void {
        const projectCards = document.querySelectorAll('.project-card');
        
        // Fade out cards
        projectCards.forEach(card => {
            (card as HTMLElement).style.opacity = '0';
            (card as HTMLElement).style.transform = 'translateY(20px)';
        });

        // Fade in filtered cards after a delay
        setTimeout(() => {
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    (card as HTMLElement).style.opacity = '1';
                    (card as HTMLElement).style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 200);
    }
}