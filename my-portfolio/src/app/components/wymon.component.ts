import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface GameFeature {
  title: string;
  description: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  caption: string;
}

interface Sprint {
  number: number;
  title: string;
  duration: string;
  goals: string[];
  achievements: string[];
  icon: string;
}

@Component({
  selector: 'app-wymon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wymon-portfolio min-h-screen relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 opacity-10">
        <div class="hero-background"></div>
      </div>

      <!-- Hero Section -->
      <section class="py-20 space-responsive-y relative z-10">
        <div class="max-w-7xl mx-auto px-5">
          <div class="text-center mb-12 fade-in">
            <div class="text-6xl mb-6 animate-float">🎮</div>
            <h1 class="text-responsive-xl font-bold mb-6 text-gradient-accent">
              Wymon
            </h1>
            <p class="text-responsive-lg opacity-90 mb-8">
              A 2.5D Metroidvania Platformer
            </p>
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <span class="tech-tag bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                Unreal Engine
              </span>
              <span class="tech-tag bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                C++
              </span>
              <span class="tech-tag bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                Jira
              </span>
            </div>
            <a
              href="https://github.com/DaEmeraldGuy/WymonUE"
              target="_blank"
              class="btn-gradient px-8 py-3 font-medium transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
              <span>🐙</span>
              View on GitHub
            </a>
          </div>

          <!-- Featured Image/Video -->
          <div class="glassmorphism-intense rounded-3xl overflow-hidden mb-16 max-w-5xl mx-auto fade-in-delay-1">
            <img
              [src]="featuredImage"
              alt="Wymon gameplay screenshot"
              class="w-full h-auto object-cover"
              (error)="onFeaturedImageError($event)">
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-16 relative z-10">
        <div class="max-w-7xl mx-auto px-5">
          <div class="glassmorphism-intense rounded-3xl p-8 md:p-12 mb-16 fade-in-delay-2">
            <h2 class="text-responsive-lg font-bold mb-6 text-gradient">
              About the Game
            </h2>
            <p class="text-responsive-md opacity-90 leading-relaxed mb-6">
              Wymon is an ambitious 2.5D Metroidvania platformer that combines classic exploration gameplay with modern design principles. Players embark on an epic journey through interconnected worlds, discovering new abilities and uncovering secrets along the way.
            </p>
            <p class="text-responsive-md opacity-90 leading-relaxed">
              Built using Unreal Engine and C++, the game features smooth gameplay mechanics, stunning visual effects, and a carefully crafted world that encourages exploration and rewards player curiosity. Currently in Sprint 3 of development, we're utilizing Agile methodologies with Jira for comprehensive project management and iterative progress.
            </p>
          </div>
        </div>
      </section>

      <!-- Key Features -->
      <section class="py-16 relative z-10">
        <div class="max-w-7xl mx-auto px-5">
          <h2 class="text-center text-responsive-lg font-bold mb-12 text-gradient fade-in-delay-3">
            Key Features
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              *ngFor="let feature of features; let i = index"
              class="glassmorphism-intense p-8 rounded-2xl hover-tilt cursor-default group fade-in-delay-{{i + 4}}">
              <div class="text-4xl mb-4 animate-float">{{feature.icon}}</div>
              <h3 class="text-xl font-bold mb-3 text-gradient-accent">
                {{feature.title}}
              </h3>
              <p class="opacity-90 leading-relaxed">
                {{feature.description}}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Sprint Timeline Section -->
      <section class="py-16 relative z-10">
        <div class="max-w-7xl mx-auto px-5">
          <h2 class="text-center text-responsive-lg font-bold mb-6 text-gradient">
            Development Sprints
          </h2>
          <p class="text-center text-responsive-md opacity-90 mb-4 max-w-3xl mx-auto">
            Our Agile development journey broken down by bi-weekly sprints
          </p>
          <div class="text-center mb-12">
            <span class="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 text-yellow-300 font-semibold">
              🚧 Currently in Sprint 3 - Game in Active Development
            </span>
          </div>

          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 opacity-30 hidden lg:block"></div>

            <div class="space-y-12">
              <div
                *ngFor="let sprint of sprints; let i = index"
                [class.lg:flex-row-reverse]="i % 2 === 1"
                class="relative flex flex-col lg:flex-row items-center gap-8">
                <!-- Sprint Number Badge (center on timeline) -->
                <div class="absolute left-1/2 transform -translate-x-1/2 z-10 hidden lg:flex">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {{sprint.icon}}
                  </div>
                </div>

                <!-- Sprint Content -->
                <div class="w-full lg:w-5/12" [class.lg:text-right]="i % 2 === 0">
                  <div class="glassmorphism-intense rounded-2xl p-6 hover-tilt">
                    <div class="flex items-center gap-3 mb-4" [class.lg:justify-end]="i % 2 === 0">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl lg:hidden">
                        {{sprint.icon}}
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-gradient-accent">
                          Sprint {{sprint.number}}
                        </h3>
                        <p class="text-sm opacity-70">{{sprint.duration}}</p>
                      </div>
                    </div>

                    <h4 class="text-lg font-semibold mb-3">{{sprint.title}}</h4>

                    <div class="mb-4">
                      <p class="text-sm font-semibold text-purple-400 mb-2">Sprint Goals:</p>
                      <ul class="space-y-1">
                        <li
                          *ngFor="let goal of sprint.goals"
                          class="text-sm opacity-90 flex items-start gap-2"
                          [class.justify-end]="i % 2 === 0">
                          <span [class.order-2]="i % 2 === 0">{{goal}}</span>
                          <span class="text-purple-400" [class.order-1]="i % 2 === 0">→</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p class="text-sm font-semibold text-green-400 mb-2">Key Achievements:</p>
                      <ul class="space-y-1">
                        <li
                          *ngFor="let achievement of sprint.achievements"
                          class="text-sm opacity-90 flex items-start gap-2"
                          [class.justify-end]="i % 2 === 0">
                          <span [class.order-2]="i % 2 === 0">{{achievement}}</span>
                          <span class="text-green-400" [class.order-1]="i % 2 === 0">✓</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Spacer for alternating layout -->
                <div class="hidden lg:block lg:w-5/12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Agile Process Section -->
      <section class="py-16 relative z-10">
        <div class="max-w-7xl mx-auto px-5">
          <div class="glassmorphism-intense rounded-3xl p-8 md:p-12">
            <h2 class="text-responsive-lg font-bold mb-6 text-gradient">
              Agile Development Process
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-bold mb-4 text-gradient-accent flex items-center gap-2">
                  <span>📋</span>
                  Sprint Planning
                </h3>
                <p class="opacity-90 leading-relaxed mb-4">
                  Each two-week sprint began with a planning session where the team reviewed the product backlog, estimated story points, and committed to a sprint goal. We used Jira for backlog management and task tracking throughout each iteration.
                </p>
                <ul class="space-y-2 opacity-90">
                  <li class="flex items-start gap-2">
                    <span class="text-purple-400">•</span>
                    <span>Sprint duration: 2 weeks (10 working days)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-purple-400">•</span>
                    <span>Story point estimation using Planning Poker</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-purple-400">•</span>
                    <span>Clear definition of done for all user stories</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="text-xl font-bold mb-4 text-gradient-accent flex items-center gap-2">
                  <span>🎯</span>
                  Sprint Reviews
                </h3>
                <p class="opacity-90 leading-relaxed mb-4">
                  At the end of each sprint, we conducted demo sessions to showcase completed features and gather feedback. This collaborative review helped validate our progress and refine the product backlog for upcoming sprints.
                </p>
                <ul class="space-y-2 opacity-90">
                  <li class="flex items-start gap-2">
                    <span class="text-cyan-400">•</span>
                    <span>Live gameplay demonstrations</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-cyan-400">•</span>
                    <span>Stakeholder feedback sessions</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-cyan-400">•</span>
                    <span>Product backlog refinement</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="text-xl font-bold mb-4 text-gradient-accent flex items-center gap-2">
                  <span>🔍</span>
                  Sprint Retrospectives
                </h3>
                <p class="opacity-90 leading-relaxed mb-4">
                  After each sprint review, the team held retrospectives to reflect on process improvements. We identified what went well, what could be improved, and created actionable items for continuous improvement.
                </p>
                <ul class="space-y-2 opacity-90">
                  <li class="flex items-start gap-2">
                    <span class="text-green-400">•</span>
                    <span>Team velocity tracking and optimization</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-green-400">•</span>
                    <span>Process refinement and experimentation</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-green-400">•</span>
                    <span>Action items for next sprint</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-8 pt-8 border-t border-white/10">
              <h3 class="text-xl font-bold mb-4 text-gradient-accent flex items-center gap-2">
                <span>🛠️</span>
                Tools & Technologies
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="text-center">
                  <div class="text-4xl mb-2">🔷</div>
                  <h4 class="font-semibold mb-2">Unreal Engine</h4>
                  <p class="text-sm opacity-80">Level Designing, Programming, and Asset Implementation</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl mb-2">🚀</div>
                  <h4 class="font-semibold mb-2">C++</h4>
                  <p class="text-sm opacity-80">Coding and Programming built into Unreal Engine</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl mb-2">🔀</div>
                  <h4 class="font-semibold mb-2">GitHub</h4>
                  <p class="text-sm opacity-80">Version control with feature branching and code review</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl mb-2">📊</div>
                  <h4 class="font-semibold mb-2">Jira</h4>
                  <p class="text-sm opacity-80">Sprint planning, backlog management, and burndown charts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section class="py-16 relative z-10" *ngIf="gallery.length > 0">
        <div class="max-w-7xl mx-auto px-5">
          <h2 class="text-center text-responsive-lg font-bold mb-12 text-gradient">
            Gallery
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              *ngFor="let item of gallery"
              class="glassmorphism-intense rounded-2xl overflow-hidden hover-tilt cursor-pointer group"
              (click)="openGalleryItem(item)">
              <div class="relative h-64 overflow-hidden">
                <img
                  [src]="item.thumbnail || item.src"
                  [alt]="item.caption"
                  class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  (error)="onGalleryImageError($event, item)">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div *ngIf="item.type === 'video'" class="absolute inset-0 flex items-center justify-center">
                  <div class="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">▶️</div>
                </div>
              </div>
              <div class="p-4">
                <p class="text-sm opacity-90">{{item.caption}}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="py-16 relative z-10">
        <div class="max-w-7xl mx-auto px-5">
          <h2 class="text-center text-responsive-lg font-bold mb-12 text-gradient">
            Development Team
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div *ngFor="let member of team" class="glassmorphism-intense p-8 rounded-2xl text-center hover-tilt">
              <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl">
                <span *ngIf="!member.avatar">👤</span>
                <img
                  *ngIf="member.avatar"
                  [src]="member.avatar"
                  [alt]="member.name"
                  class="w-full h-full rounded-full object-cover">
              </div>
              <h3 class="text-lg font-bold mb-2">{{member.name}}</h3>
              <p class="text-sm opacity-80">{{member.role}}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="py-16 relative z-10">
        <div class="max-w-4xl mx-auto px-5 mb-12">
          <div class="glassmorphism-intense rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div class="absolute inset-0 shimmer-effect rounded-3xl"></div>
            <div class="relative z-10">
              <div class="text-5xl mb-6 animate-bounce">🚀</div>
              <h2 class="text-responsive-lg font-bold mb-4 text-gradient-accent">
                Follow Our Development Journey
              </h2>
              <p class="text-responsive-md opacity-90 mb-8">
                Wymon is currently in active development (Sprint 4). Check out the source code, follow our progress, and see what we're working on next!
              </p>
              <a
                href="https://github.com/DaEmeraldGuy/WymonUE"
                target="_blank"
                class="btn-gradient px-8 py-3 font-medium transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                <span>🐙</span>
                Explore on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Back Button -->
      <div class="max-w-7xl mx-auto px-5 pb-12 relative z-10">
        <div class="text-center">
          <button
            (click)="goBack()"
            class="btn-outline px-6 py-3 font-medium transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
            <span>←</span>
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wymon-portfolio {
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      color: white;
      min-height: 100vh;
    }

    .hero-background {
      background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(88, 86, 214, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%);
      width: 100%;
      height: 100%;
      animation: pulse 10s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .text-gradient-accent {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glassmorphism-intense {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    .btn-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
    }

    .btn-gradient:hover {
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.5);
      transform: translateY(-2px) scale(1.05);
    }

    .btn-outline {
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 9999px;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-outline:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      transform: scale(1.05);
    }

    .hover-tilt {
      transition: transform 0.3s ease;
    }

    .hover-tilt:hover {
      transform: translateY(-5px);
    }

    .tech-tag {
      transition: all 0.3s ease;
    }

    .tech-tag:hover {
      border-color: rgba(102, 126, 234, 0.5) !important;
      transform: translateY(-2px);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .shimmer-effect {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      animation: shimmer 3s infinite;
    }

    .text-responsive-xl {
      font-size: clamp(2.5rem, 5vw, 4rem);
    }

    .text-responsive-lg {
      font-size: clamp(2rem, 4vw, 3rem);
    }

    .text-responsive-md {
      font-size: clamp(1rem, 2vw, 1.25rem);
    }

    .space-responsive-y {
      padding-top: clamp(3rem, 6vw, 5rem);
      padding-bottom: clamp(3rem, 6vw, 5rem);
    }

    .fade-in {
      animation: fadeIn 0.8s ease-in forwards;
      opacity: 0;
    }

    .fade-in-delay-1 {
      animation: fadeIn 0.8s ease-in 0.2s forwards;
      opacity: 0;
    }

    .fade-in-delay-2 {
      animation: fadeIn 0.8s ease-in 0.4s forwards;
      opacity: 0;
    }

    .fade-in-delay-3 {
      animation: fadeIn 0.8s ease-in 0.6s forwards;
      opacity: 0;
    }

    .fade-in-delay-4 {
      animation: fadeIn 0.8s ease-in 0.8s forwards;
      opacity: 0;
    }

    .fade-in-delay-5 {
      animation: fadeIn 0.8s ease-in 1s forwards;
      opacity: 0;
    }

    .fade-in-delay-6 {
      animation: fadeIn 0.8s ease-in 1.2s forwards;
      opacity: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class WymonComponent implements OnInit {
  featuredImage: string = '/images/Wymon.png';

  features: GameFeature[] = [
    {
      title: 'Metroidvania Exploration',
      description: 'Discover a vast interconnected world with secret areas, hidden paths, and rewards for curious players.',
      icon: '🗺️'
    },
    {
      title: 'Ability Progression',
      description: 'Unlock new abilities that open up previously inaccessible areas and enable advanced movement techniques.',
      icon: '⚡'
    },
    {
      title: 'Challenging Combat',
      description: 'Engage in skill-based combat with diverse enemy types and epic boss battles that test your reflexes.',
      icon: '⚔️'
    },
    {
      title: 'Beautiful Environments',
      description: 'Explore stunning hand-crafted environments with dynamic lighting and atmospheric effects.',
      icon: '🎨'
    },
    {
      title: 'Smooth Gameplay',
      description: 'Experience responsive controls and fluid animations powered by Unreal Engine.',
      icon: '🎮'
    },
    {
      title: 'Rich Storytelling',
      description: 'Uncover the mysteries of the world through environmental storytelling and character interactions.',
      icon: '📖'
    }
  ];

  sprints: Sprint[] = [
    {
      number: 1,
      title: 'Foundation & Core Mechanics',
      duration: 'Week 1-2',
      icon: '🏗️',
      goals: [
        'Set up Unreal Engine project structure',
        'Implement basic character movement (walk, run, jump)',
        'Create initial level design prototype',
        'Establish Git workflow and branching strategy'
      ],
      achievements: [
        'Completed character controller with smooth movement',
        'Basic platforming mechanics functional',
        'Project architecture established',
        'Team onboarded to version control'
      ]
    },
    {
      number: 2,
      title: 'Combat System Development',
      duration: 'Week 3-4',
      icon: '⚔️',
      goals: [
        'Design and implement combat mechanics',
        'Create boomerang animations and hitboxes',
        'Develop basic enemy AI behaviors',
        'Implement health and damage systems',
        'Add Hookshot for unique movement capabilities'
      ],
      achievements: [
        'Functional boomerang throw with combat system',
        'Enemies with basic AI behavior',
        'Health bar UI implementation',
        'Combat feel polished through playtesting',
        'Hookshot to grapple onto particular map points for unique movement and parkour'
      ]
    },
    {
      number: 3,
      title: 'Arena Gate and Timeline System',
      duration: 'Week 5-6',
      icon: '⚡',
      goals: [
        'Build and program battle arena with trigger volume',
        'Implement timeline based door animation for smooth open/close transitions',
        'Add ability UI indicators and tutorials'
      ],
      achievements: [
        'Door animation system',
        'Battle Arena behavior mechanics'
      ]
    },
    {
      number: 4,
      title: 'Sound Design and Audio Implementation',
      duration: 'Week 7-8',
      icon: '🔊',
      goals: [
        'Design and Implement immersive sound effects for environment',
        'Integrate door and arena SFX synced with Timeline events',
        'Balance attenuation, volume, and spatial audio settings',
        'Enhance environmental atmosphere through reverb and ambient cues'
      ],
      achievements: [
        'SFX synced cleanly with Timeline animations',
        'Environmental reverb zones implemented for stronger atmosphere',
        'Input sounds synced through spawn 2D sound',
        'Improved overall mix and audio responsiveness'
      ]
    }
  ];

  gallery: GalleryItem[] = [
    // ADD GALLERY ITEMS
  ];

  team: TeamMember[] = [
  {
    name: 'Sean Heenan',
    role: 'Lead Developer & Scrum Master'
  },
  {
    name: 'Zach Chodash',
    role: 'Level Designer & Programmer'
  },
  {
    name: 'Luke Fixari',
    role: 'Programmer & Sound Design'
  },
  {
    name: 'James Branford',
    role: 'UI/UX Developer'
  },
  {
    name: 'Amaris Jenkins',
    role: 'Narrative Design and Cutscenes'
  }
]

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  openGalleryItem(item: GalleryItem): void {
    if (item.type === 'video') {
      window.open(item.src, '_blank');
    } else {
      // Open image in modal or new tab
      window.open(item.src, '_blank');
    }
  }

  onFeaturedImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/1200x600/667eea/ffffff?text=Wymon+Game+Screenshot';
  }

  onGalleryImageError(event: Event, item: GalleryItem): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=' + encodeURIComponent(item.caption);
  }
}