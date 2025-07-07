import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section id="home" class="min-h-screen flex items-center justify-center text-center pt-20 relative overflow-hidden">
            <!-- Enhanced Animated Background Pattern -->
            <div class="hero-background absolute inset-0">
                <div class="absolute inset-0 opacity-30">
                    <!-- Multiple rotating gradients -->
                    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-float blur-3xl"></div>
                    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full animate-float-delayed blur-3xl"></div>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full animate-pulse blur-3xl"></div>
                </div>
                
                <!-- Floating particles -->
                <div class="floating-particle" style="top: 20%; left: 10%; animation-delay: 0s;"></div>
                <div class="floating-particle" style="top: 60%; right: 15%; animation-delay: -2s;"></div>
                <div class="floating-particle" style="bottom: 30%; left: 20%; animation-delay: -4s;"></div>
                <div class="floating-particle" style="top: 40%; right: 30%; animation-delay: -6s;"></div>
                <div class="floating-particle" style="bottom: 60%; right: 40%; animation-delay: -8s;"></div>
            </div>
            
            <!-- Main Hero Content -->
            <div class="relative z-10 max-w-5xl mx-auto px-5">
                
                <!-- Enhanced Hero Logo with Rotating Ring -->
                <div class="hero-logo mb-8 loading loading-delay-1 relative flex items-center justify-center">
                    <!-- Rotating ring around logo -->
                    <div class="rotating-ring absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gradient animate-rotate-ring"></div>
                    </div>
                    <!-- Insert your logo image below. Replace 'assets/logo.svg' with your logo path -->
                    <img src="./images/Logo.jpg" alt="My Logo" class="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg border-4 border-gradient mb-4 relative z-10" />
                </div>
                
                <!-- Animated Title with Typewriter Effect -->
                <div class="title-container mb-6 loading loading-delay-2">
                    <h1 class="text-responsive-xl font-bold mb-2 text-glow">
                        <span class="typing-text">Welcome to my Portfolio</span>
                        <span class="typing-cursor">|</span>
                    </h1>
                    <div class="text-responsive-md text-gradient-accent font-semibold">
                        Crafting Digital Excellence
                    </div>
                </div>
                
                <!-- Enhanced Description -->
                <div class="description-container mb-12 loading loading-delay-3">
                    <p class="text-responsive-md leading-relaxed max-w-3xl mx-auto opacity-90">
                        Transforming ideas into <span class="text-gradient font-semibold">innovative digital solutions</span> 
                        with cutting-edge technology. Passionate about creating 
                        <span class="text-gradient-accent font-semibold">scalable applications</span> 
                        and exceptional user experiences that make a real impact.
                    </p>
                </div>
                
                <!-- Enhanced CTA Buttons -->
                <div class="cta-container flex flex-col sm:flex-row gap-6 justify-center items-center loading loading-delay-4">
                    <button class="btn-gradient px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                                    (click)="scrollToSection('projects')">
                        <span class="relative z-10">See My Work</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <button class="btn-outline px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 group"
                                    (click)="scrollToSection('contact')">
                        <span class="group-hover:text-white transition-colors duration-300">Contact Me</span>
                    </button>
                </div>
                
                
                <!-- Scroll Indicator -->
                <div class="scroll-indicator-container absolute bottom-8 left-1/2 transform -translate-x-1/2 loading loading-delay-6">
                    <div class="scroll-indicator-arrow animate-bounce cursor-pointer" 
                             (click)="scrollToSection('about')">
                        <div class="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                            <div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                        </div>
                        <div class="text-xs mt-2 opacity-60 text-center">Scroll Down</div>
                    </div>
                </div>
            </div>
            
            <!-- Scroll Progress Indicator -->
            <div class="scroll-indicator fixed top-0 left-0 w-full z-50">
                <div class="scroll-progress h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" 
                         [style.width.%]="scrollProgress"></div>
            </div>
        </section>
    `,
    styles: [`
        .hero-logo {
            position: relative;
            display: inline-block;
        }

        /* Rotating ring styles */
        .rotating-ring {
            z-index: 1;
        }
        .border-gradient {
            border-image: linear-gradient(135deg, #a855f7, #38bdf8, #f472b6) 1;
        }
        .animate-rotate-ring {
            animation: rotate-ring 3s linear infinite;
        }
        @keyframes rotate-ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .title-container {
            position: relative;
        }

        .typing-text {
            display: inline-block;
        }

        .typing-cursor {
            display: inline-block;
            animation: blink 1s infinite;
            color: #a855f7;
            font-weight: 300;
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        .social-icon {
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .social-icon:hover {
            background: rgba(168, 85, 247, 0.2);
            border-color: rgba(168, 85, 247, 0.4);
            box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
        }

        .scroll-indicator-arrow {
            opacity: 0.7;
            transition: all 0.3s ease;
        }

        .scroll-indicator-arrow:hover {
            opacity: 1;
            transform: scale(1.1);
        }

        /* Enhanced background animations */
        .hero-background::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, 
                rgba(168, 85, 247, 0.1) 0deg,
                rgba(59, 130, 246, 0.1) 120deg,
                rgba(192, 132, 252, 0.1) 240deg,
                rgba(168, 85, 247, 0.1) 360deg);
            animation: heroRotate 30s linear infinite;
        }

        @keyframes heroRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .hero-logo .text-8xl {
                font-size: 4rem;
            }
            .rotating-ring > div {
                width: 8rem !important;
                height: 8rem !important;
            }
            .social-icon {
                width: 3rem;
                height: 3rem;
                font-size: 1.25rem;
            }
            .cta-container {
                flex-direction: column;
                gap: 1rem;
            }
            .btn-gradient,
            .btn-outline {
                width: 100%;
                max-width: 280px;
            }
        }

        /* Performance optimizations */
        .hero-background,
        .floating-particle,
        .social-icon {
            will-change: transform;
        }
    `]
})
export class HeroComponent implements OnInit, AfterViewInit {
    scrollProgress = 0;
    

    private typingTexts = [
        'Welcome to my Portfolio',
        'I am a Software Engineer', 
        'Fullstack Developer',
        '& Problem Solver'
    ];
    private currentTextIndex = 0;

    constructor() { }

    ngOnInit(): void {
        this.initializeScrollListener();
        setTimeout(() => {
            this.triggerLoadingAnimations();
        }, 300);
    }

    ngAfterViewInit(): void {
        this.initializeTypingEffect();
    }

    scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    private triggerLoadingAnimations(): void {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(element => {
            element.classList.add('loaded');
        });
    }

    private initializeScrollListener(): void {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            this.scrollProgress = (scrolled / maxScroll) * 100;
        });
    }

    private initializeTypingEffect(): void {
        setTimeout(() => {
            this.startTypingAnimation();
        }, 1000);
    }

    private startTypingAnimation(): void {
        const typingElement = document.querySelector('.typing-text') as HTMLElement;
        if (!typingElement) return;

        const typeText = (text: string, callback?: () => void) => {
            let i = 0;
            typingElement.textContent = '';
            
            const type = () => {
                if (i < text.length) {
                    typingElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else if (callback) {
                    setTimeout(callback, 2000);
                }
            };
            type();
        };

        const eraseText = (callback: () => void) => {
            let text = typingElement.textContent || '';
            
            const erase = () => {
                if (text.length > 0) {
                    text = text.slice(0, -1);
                    typingElement.textContent = text;
                    setTimeout(erase, 50);
                } else {
                    callback();
                }
            };
            erase();
        };

        const cycle = () => {
            const currentText = this.typingTexts[this.currentTextIndex];
            typeText(currentText, () => {
                eraseText(() => {
                    this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                    setTimeout(cycle, 500);
                });
            });
        };

        cycle();
    }
}