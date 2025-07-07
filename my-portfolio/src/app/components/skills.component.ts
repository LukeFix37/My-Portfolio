import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';


interface Skill {
  name: string;
  percentage: number;
  colorFrom: string;
  colorTo: string;
  description: string;

}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .progress-bar {
      height: 0.5rem; /* same as h-2 */
      border-radius: 0.375rem; /* rounded-full */
      transition: width 2s ease-in-out;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  `],
  template: `
    <section id="skills" class="py-20 bg-white/5 backdrop-blur-lg">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-center text-4xl md:text-5xl font-bold mb-12 text-gradient">
          Technical Skills
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <div *ngFor="let skill of skills" 
               class="glassmorphism rounded-2xl p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-primary/60 relative overflow-hidden shimmer-effect opacity-0 loading">
            
            <div class="flex items-center justify-between mb-4">
              <div class="text-xl font-semibold text-white">{{skill.name}}</div>
              <div class="text-lg font-bold text-blue-light">{{skill.percentage}}%</div>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full bg-white/20 rounded-full overflow-hidden mb-4">
              <div
                class="progress-bar"
                [style.width]="skill.percentage + '%'"
                [style.background]="'linear-gradient(to right, ' + skill.colorFrom + ', ' + skill.colorTo + ')'"
                >
              </div>
            </div>
            
            <div class="text-sm opacity-80 leading-relaxed">{{skill.description}}</div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent {
  skills: (Skill & { colorFrom: string; colorTo: string })[] = [
    {
      name: 'Angular',
      percentage: 95,
      colorFrom: '#dd0031', // start red
      colorTo: '#ff7f7f',   // lighter red
      description: 'Advanced framework expertise with TypeScript, RxJS, and component architecture'
    },
    {
      name: 'React',
      percentage: 90,
      colorFrom: '#61dafb', // blue
      colorTo: '#a0e9ff',   // lighter blue
      description: 'Expert in hooks, context API, Redux, and modern React patterns'
    },
    {
      name: 'Node.js',
      percentage: 88,
      colorFrom: '#8cc84b', // green
      colorTo: '#c6f38e',   // lighter green
      description: 'Backend development with Express.js, APIs, and microservices architecture'
    },
    {
      name: 'TypeScript',
      percentage: 92,
      colorFrom: '#3178c6', // dark blue
      colorTo: '#7eb7f7',   // lighter blue
      description: 'Strong typing, interfaces, generics, and advanced TypeScript patterns'
    },
    {
      name: 'Python',
      percentage: 85,
      colorFrom: '#3776ab', // python blue
      colorTo: '#8bb9e3',   // lighter blue
      description: 'Django, Flask, data analysis, machine learning, and automation scripts'
    },
    {
      name: 'PostgreSQL',
      percentage: 80,
      colorFrom: '#336791', // postgres blue
      colorTo: '#799cc3',   // lighter blue
      description: 'Database design, optimization, complex queries, and performance tuning'
    },
    {
      name: 'AWS',
      percentage: 75,
      colorFrom: '#ff9900', // orange
      colorTo: '#ffc766',   // lighter orange
      description: 'EC2, S3, Lambda, RDS, CloudFormation, and serverless architecture'
    },
    {
      name: 'Docker',
      percentage: 82,
      colorFrom: '#2496ed', // docker blue
      colorTo: '#85c6ff',   // lighter blue
      description: 'Containerization, Docker Compose, Kubernetes, and CI/CD pipelines'
    }
  ];

  constructor() {}
}
