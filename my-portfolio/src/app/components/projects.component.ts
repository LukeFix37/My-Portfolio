import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  demoLink: string;
  githubLink: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports:[CommonModule],
  template: `
    <section id="projects" class="py-20">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-center text-4xl md:text-5xl font-bold mb-12 text-gradient">
          Featured Projects
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          <div class="glassmorphism rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl relative opacity-0 loading"
               *ngFor="let project of projects">
            
            <!-- Project Image/Icon -->
            <div class="h-48 bg-gradient-to-br from-purple-primary to-purple-secondary flex items-center justify-center text-5xl text-white/80">
              {{project.icon}}
            </div>
            
            <!-- Project Content -->
            <div class="p-8">
              <h3 class="text-xl font-semibold mb-4 text-blue-light">
                {{project.title}}
              </h3>
              
              <p class="mb-6 opacity-90 leading-relaxed">
                {{project.description}}
              </p>
              
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="bg-blue-primary/80 text-white px-3 py-1 rounded-full text-sm font-medium"
                      *ngFor="let tech of project.technologies">
                  {{tech}}
                </span>
              </div>
              
              <!-- Project Links -->
              <div class="flex gap-4">
                <a [href]="project.demoLink" 
                   class="text-blue-light font-medium transition-all duration-300 hover:text-blue-primary hover:translate-x-1">
                  Live Demo →
                </a>
                <a [href]="project.githubLink" 
                   class="text-blue-light font-medium transition-all duration-300 hover:text-blue-primary hover:translate-x-1">
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {

  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with Angular frontend, Node.js backend, and PostgreSQL database. Features include user authentication, shopping cart, payment integration, and admin dashboard.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Stripe API'],
      icon: '🏪',
      demoLink: '#',
      githubLink: '#'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization dashboard built with Angular and D3.js. Displays key metrics, charts, and interactive data filters for business intelligence.',
      technologies: ['Angular', 'D3.js', 'WebSocket', 'Chart.js'],
      icon: '📊',
      demoLink: '#',
      githubLink: '#'
    },
    {
      title: 'Music Streaming App',
      description: 'Spotify-like music streaming application with playlist management, search functionality, and social features. Built with Angular and integrated with music APIs.',
      technologies: ['Angular', 'RxJS', 'Web Audio API', 'Firebase'],
      icon: '🎵',
      demoLink: '#',
      githubLink: '#'
    }
  ];

  constructor() { }
}