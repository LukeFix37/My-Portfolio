import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, HostListener } from '@angular/core';

interface NavItem {
  label: string;
  id: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed w-full top-0 z-50 transition-all duration-500"
         [class]="getNavClasses()">
      
      <!-- Main Navigation Container -->
      <div class="flex justify-between items-center px-6 md:px-8 py-4 relative">
        
        <!-- Enhanced Logo -->
        <a (click)="scrollToSection('home')" 
           class="logo-container cursor-pointer group relative">
          <div class="flex items-center gap-3">
            <div class="logo-icon text-3xl animate-float">⚡</div>
            <span class="text-2xl md:text-3xl font-bold text-gradient-cyber group-hover:text-gradient transition-all duration-300">
              Luke Fixari
            </span>
          </div>
          <!-- Logo underline effect -->
          <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
        </a>

        <!-- Desktop Navigation Menu -->
        <ul class="hidden lg:flex list-none gap-8 items-center">
          <li *ngFor="let item of navItems; let i = index">
            <a (click)="scrollToSection(item.id)" 
               class="nav-link group cursor-pointer relative overflow-hidden"
               [class.active]="activeSection === item.id">
              
              <!-- Icon (hidden on larger screens, visible on medium) -->
              <span class="nav-icon hidden xl:inline-block mr-2 text-lg group-hover:animate-bounce">
                {{item.icon}}
              </span>
              
              <!-- Text -->
              <span class="nav-text font-medium transition-all duration-300 group-hover:text-gradient-cyber">
                {{item.label}}
              </span>
              
              <!-- Enhanced hover effect -->
              <div class="nav-bg absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden glassmorphism w-12 h-12 rounded-full flex items-center justify-center hover-lift transition-all duration-300"
                (click)="toggleMobileMenu()">
          <div class="hamburger-icon" [class.active]="isMobileMenuOpen">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <div class="mobile-menu lg:hidden absolute top-full left-0 w-full transition-all duration-500 transform"
           [class]="getMobileMenuClasses()">
        <div class="glassmorphism-intense m-4 rounded-2xl overflow-hidden">
          <ul class="list-none">
            <li *ngFor="let item of navItems; let i = index">
              <a (click)="scrollToSection(item.id)" 
                 class="mobile-nav-link flex items-center gap-4 p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 group"
                 [class.active]="activeSection === item.id">
                
                <span class="text-2xl group-hover:animate-bounce transition-transform duration-300">
                  {{item.icon}}
                </span>
                
                <span class="font-medium text-lg group-hover:text-gradient-cyber transition-all duration-300">
                  {{item.label}}
                </span>
                
                <!-- Mobile active indicator -->
                <div class="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     [class.opacity-100]="activeSection === item.id"></div>
              </a>
            </li>
          </ul>
          
          <!-- Mobile Contact Button -->
          <div class="p-4 border-t border-white/10">
            <button class="btn-gradient w-full py-3 text-center font-medium"
                    (click)="scrollToSection('contact')">
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Background Blur -->
      <div class="nav-blur absolute inset-0 -z-10 transition-all duration-500"
           [style.backdrop-filter]="isScrolled ? 'blur(20px)' : 'blur(10px)'">
      </div>
    </nav>
  `,
  styles: [`
    /* Enhanced Navigation Styles */
    .nav-link {
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      position: relative;
      display: flex;
      align-items: center;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .nav-link::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      transform: translateX(-50%);
      transition: width 0.4s cubic-bezier(0.23, 1, 0.320, 1);
      border-radius: 1px;
    }

    .nav-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(168, 85, 247, 0.2);
    }

    .nav-link:hover::before,
    .nav-link.active::before {
      width: 80%;
    }

    .nav-link.active {
      background: rgba(168, 85, 247, 0.15);
      color: #c084fc;
    }

    /* Logo Enhancements */
    .logo-container {
      transition: all 0.3s ease;
    }

    .logo-container:hover {
      transform: scale(1.05);
    }

    .logo-icon {
      filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.6));
    }

    /* Mobile Menu Hamburger */
    .hamburger-icon {
      width: 20px;
      height: 16px;
      position: relative;
      cursor: pointer;
    }

    .hamburger-icon span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      border-radius: 1px;
      transition: all 0.3s ease;
    }

    .hamburger-icon span:nth-child(1) {
      top: 0;
    }

    .hamburger-icon span:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }

    .hamburger-icon span:nth-child(3) {
      bottom: 0;
    }

    .hamburger-icon.active span:nth-child(1) {
      transform: rotate(45deg);
      top: 50%;
      margin-top: -1px;
    }

    .hamburger-icon.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger-icon.active span:nth-child(3) {
      transform: rotate(-45deg);
      bottom: 50%;
      margin-bottom: -1px;
    }

    /* Mobile Menu Styling */
    .mobile-nav-link {
      position: relative;
      border-left: 3px solid transparent;
      transition: all 0.3s ease;
    }

    .mobile-nav-link:hover,
    .mobile-nav-link.active {
      border-left-color: #a855f7;
      background: rgba(168, 85, 247, 0.1);
    }

    .mobile-nav-link.active {
      color: #c084fc;
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .nav-link {
        padding: 0.625rem 1.25rem;
      }
    }

    @media (max-width: 768px) {
      .logo-container .text-2xl {
        font-size: 1.5rem;
      }
    }

    /* Performance optimizations */
    .nav-link,
    .mobile-nav-link,
    .hamburger-icon span {
      will-change: transform;
    }
  `]
})
export class NavigationComponent implements OnInit {
  @Input() isScrolled: boolean = false;
  
  activeSection: string = 'home';
  isMobileMenuOpen: boolean = false;
  scrollY: number = 0;

  navItems: NavItem[] = [
    { label: 'Home', id: 'home', icon: '🏠' },
    { label: 'About', id: 'about', icon: '👨‍💻' },
    { label: 'Skills', id: 'skills', icon: '⚡' },
    { label: 'Projects', id: 'projects', icon: '🚀' },
    { label: 'Contact', id: 'contact', icon: '📞' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initializeScrollDetection();
    this.initializeActiveSection();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollY = window.scrollY;
    this.updateActiveSection();
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (window.innerWidth >= 1024) {
      this.isMobileMenuOpen = false;
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu if open
      this.isMobileMenuOpen = false;
      
      // Add click animation
      this.addClickAnimation();
      
      // Smooth scroll
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active section immediately for better UX
      this.activeSection = sectionId;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  getNavClasses(): string {
    const baseClasses = 'backdrop-blur-lg border-b';
    
    if (this.isScrolled) {
      return `${baseClasses} bg-black/80 border-white/20 shadow-lg`;
    } else {
      return `${baseClasses} bg-white/10 border-white/10`;
    }
  }

  getMobileMenuClasses(): string {
    if (this.isMobileMenuOpen) {
      return 'opacity-100 translate-y-0 pointer-events-auto';
    } else {
      return 'opacity-0 -translate-y-4 pointer-events-none';
    }
  }

  private initializeScrollDetection(): void {
    // Update isScrolled based on scroll position
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }

  private initializeActiveSection(): void {
    // Set initial active section based on current scroll position
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = this.navItems.map(item => item.id);
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection = sections[i];
        break;
      }
    }
  }

  private addClickAnimation(): void {
    // Add a subtle animation feedback when navigation is clicked
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.transform = 'scale(0.98)';
      setTimeout(() => {
        nav.style.transform = 'scale(1)';
      }, 150);
    }
  }
}