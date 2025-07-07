import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section id="about" class="py-20 bg-white/5 backdrop-blur-lg">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-center text-4xl md:text-5xl font-bold mb-12 text-gradient">
          About Me
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center max-w-5xl mx-auto">
          <!-- Profile Image -->
          <div class="glassmorphism rounded-2xl p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-primary/60 relative overflow-hidden shimmer-effect max-w-sm mx-auto lg:mx-0 h-96 flex flex-col items-center justify-center text-center opacity-0 loading">
            <div class="text-6xl text-white/60 mb-4">👤</div>
            <div class="text-sm text-white/60 absolute bottom-4">
              Your Photo Here
            </div>
          </div>
          
          <!-- About Text -->
          <div class="lg:col-span-2 text-left">
            <div class="text-lg md:text-xl leading-relaxed mb-12 opacity-90 space-y-6 opacity-0 loading">
              <p>I'm a passionate Software Engineer with a love for creating innovative digital solutions that make a real impact. With expertise spanning full-stack development, I thrive on transforming complex problems into elegant, user-friendly applications.</p>
              
              <p>My journey in software development began with curiosity and has evolved into a career dedicated to continuous learning and pushing the boundaries of what's possible with code. I believe in writing clean, maintainable code and collaborating with teams to deliver exceptional user experiences.</p>
              
              <p>When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm always excited to take on new challenges and contribute to projects that drive innovation forward.</p>
            </div>
          </div>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div class="glassmorphism rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden shimmer-effect text-center opacity-0 loading"
               *ngFor="let stat of stats">
            <span class="text-3xl md:text-4xl font-bold text-blue-light block">
              {{stat.number}}
            </span>
            <div class="text-sm md:text-base opacity-80 mt-2">
              {{stat.label}}
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '15+', label: 'Technologies Mastered' },
    { number: '100%', label: 'Client Satisfaction' }
  ];

  constructor() { }
}