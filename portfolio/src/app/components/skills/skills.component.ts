import { Component } from '@angular/core';

interface Skill {
  name: string;
  percentage: number;
  description: string;
}

@Component({
  selector: 'app-skills',
  template: `
    <section id="skills" class="py-20 bg-white/5 backdrop-blur-lg">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-center text-4xl md:text-5xl font-bold mb-12 text-gradient">
          Technical Skills
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <div class="glassmorphism rounded-2xl p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-primary/60 relative overflow-hidden shimmer-effect opacity-0 loading"
               *ngFor="let skill of skills">
            
            <!-- Skill Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="text-xl font-semibold text-white">
                {{skill.name}}
              </div>
              <div class="text-lg font-bold text-blue-light">
                {{skill.percentage}}%
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
              <div class="h-full bg-gradient-to-r from-blue-primary to-blue-light rounded-full transition-all duration-[2s] ease-in-out shadow-lg skill-progress"
                   [attr.data-width]="skill.percentage + '%'"
                   [style.box-shadow]="'0 0 10px rgba(96, 165, 250, 0.5)'">
              </div>
            </div>
            
            <!-- Skill Description -->
            <div class="text-sm opacity-80 leading-relaxed">
              {{skill.description}}
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  skills: Skill[] = [
    {
      name: 'Angular',
      percentage: 95,
      description: 'Advanced framework expertise with TypeScript, RxJS, and component architecture'
    },
    {
      name: 'React',
      percentage: 90,
      description: 'Expert in hooks, context API, Redux, and modern React patterns'
    },
    {
      name: 'Node.js',
      percentage: 88,
      description: 'Backend development with Express.js, APIs, and microservices architecture'
    },
    {
      name: 'TypeScript',
      percentage: 92,
      description: 'Strong typing, interfaces, generics, and advanced TypeScript patterns'
    },
    {
      name: 'Python',
      percentage: 85,
      description: 'Django, Flask, data analysis, machine learning, and automation scripts'
    },
    {
      name: 'PostgreSQL',
      percentage: 80,
      description: 'Database design, optimization, complex queries, and performance tuning'
    },
    {
      name: 'AWS',
      percentage: 75,
      description: 'EC2, S3, Lambda, RDS, CloudFormation, and serverless architecture'
    },
    {
      name: 'Docker',
      percentage: 82,
      description: 'Containerization, Docker Compose, Kubernetes, and CI/CD pipelines'
    }
  ];

  constructor() { }
}