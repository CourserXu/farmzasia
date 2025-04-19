"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/ContactForm';
import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAssetPath } from '@/utils/assetPath';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // State for back to top button
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    const loadVideo = async () => {
      if (videoRef.current) {
        const video = videoRef.current;
        
        try {
          // Set video attributes
          video.src = getAssetPath('/videos/hero-background.mp4');
          video.preload = 'auto';
          
          // Wait for video to be loaded
          await video.load();
          
          // Try to play the video
          await video.play();
          
          // If successful, update state
          setIsVideoLoaded(true);
          
          // Ensure video properties are set
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
        } catch (error) {
          console.error('Video loading or playback failed:', error);
        }
      }
    };
    
    loadVideo();
    
    // Scroll animation observer
    const animatedSections = document.querySelectorAll('.animate-fade-in-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('motion-safe:animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedSections.forEach(section => observer.observe(section));
    
    // Counter animation
    const counters = document.querySelectorAll('.count-up');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-target') || '0');
          const duration = 2000; // 2 seconds
          const step = targetValue / (duration / 16); // 60fps
          let currentValue = 0;
          
          const updateCounter = () => {
            currentValue += step;
            if (currentValue < targetValue) {
              target.textContent = Math.floor(currentValue).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = targetValue.toLocaleString();
            }
          };
          
          updateCounter();
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Back to top button visibility handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
      observer.disconnect();
      counterObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll back to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center text-white overflow-hidden bg-[#26D07C]">
        {/* Video Background with 16:9 aspect ratio */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                isVideoLoaded ? "opacity-100" : "opacity-0"
              )}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          {/* Overlay to improve text readability */}
          <div className="absolute inset-0 bg-[#26D07C]/65"></div>
        </div>
        
        <div className="container-custom z-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated text entrance */}
            <div className="space-y-6 animate-fade-in">
              {/* Main heading with gradient text */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Transforming Health Through
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                  Community, Food Safety, Research & Innovation
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-white/90">
                We are a research-driven, community-centered parent company powering Asia's trusted wellness brands.
              </p>
              
              {/* Tagline */}
              <p className="text-base sm:text-lg text-white/80 mt-4 font-medium">
                Empowering lives through clean, science-backed solutions—built for the modern Asian lifestyle.
              </p>
              
              {/* Mission Highlight */}
              <div className="mt-8 md:mt-12 p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
                  Our Mission: Feed 1 Million Underprivileged Children by 2027
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                      <span className="count-up" data-target="250000">0</span>+
                    </div>
                    <div className="text-sm uppercase tracking-wider text-white/80">
                      Children Fed
                    </div>
                  </div>
                  <div className="hidden sm:block h-16 w-1 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                      <span className="count-up" data-target="25">0</span>%
                    </div>
                    <div className="text-sm uppercase tracking-wider text-white/80">
                      Progress
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full progress-bar" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                <Link href="#brands">
                  <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                    Explore Our Brands
                  </Button>
                </Link>
                <Link href="#research">
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary rounded-full px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold transition-all transform hover:scale-105">
                    Learn About Our Research
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block z-20">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-20 bg-gray-50 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-50/90 pointer-events-none"></div>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
                Who We Are
              </h2>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Body Copy */}
              <div className="text-center space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Farmz Asia is a research and education powerhouse committed to advancing food safety, wellness innovation, and nutrition science. At our core, we are a community-first organization driving Asia's clean health transformation.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We invest in R&D, scientific education, and ethical product development to empower individuals, practitioners, and franchise partners. Under our parent umbrella, we power four purpose-driven brands, each solving critical health challenges of our time.
                </p>
              </div>

              {/* Core Values */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-center mb-8 text-dark-color">
                  Core Values
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Evidence-based innovation */}
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-dark-color">Evidence-based innovation</h4>
                      <p className="text-gray-600">Driving progress through scientific research and validated solutions</p>
                    </div>
                  </div>

                  {/* Community transformation */}
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-dark-color">Community transformation</h4>
                      <p className="text-gray-600">Building healthier communities through education and empowerment</p>
                    </div>
                  </div>

                  {/* Food-first health empowerment */}
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-dark-color">Food-first health empowerment</h4>
                      <p className="text-gray-600">Prioritizing nutrition as the foundation of holistic wellness</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      <section id="brands" className="relative py-20 bg-gray-50/90 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-100/80 pointer-events-none"></div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
              Our Family of Wellness Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each brand under Farmz Asia serves a unique mission, built on science, ethics, and life-changing outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Farmz Academy */}
            <Link href="/brands/farmz-academy" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-48 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image 
                    src={getAssetPath("/images/brands/farmz-academy.png")} 
                    alt="Farmz Academy" 
                    width={150} 
                    height={150} 
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-dark-color group-hover:text-primary transition-colors">
                    Farmz Academy
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Therapeutic nutrition programs for chronic conditions
                  </p>
                  <div className="mt-4 text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Dr. Mark Leong */}
            <Link href="/brands/dr-mark-leong" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-48 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image 
                    src={getAssetPath("/images/brands/dr-mark-leong.png")} 
                    alt="Dr. Mark Leong" 
                    width={150} 
                    height={150} 
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-dark-color group-hover:text-primary transition-colors">
                    Dr. Mark Leong
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Weight loss and cellular renewal through detox science
                  </p>
                  <div className="mt-4 text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Brot and Tee */}
            <Link href="/brands/brot-and-tee" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-48 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image 
                    src={getAssetPath("/images/brands/brot-and-tee.png")} 
                    alt="Brot and Tee" 
                    width={150} 
                    height={150} 
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-dark-color group-hover:text-primary transition-colors">
                    Brot and Tee
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Gut-friendly breads for digestive health and inflammation
                  </p>
                  <div className="mt-4 text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Blooma */}
            <Link href="/brands/blooma" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-48 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image 
                    src={getAssetPath("/images/brands/blooma.png")} 
                    alt="Blooma" 
                    width={150} 
                    height={150} 
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-dark-color group-hover:text-primary transition-colors">
                    Blooma
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Clean skincare solutions tailored for women above 40
                  </p>
                  <div className="mt-4 text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section id="awards" className="relative py-20 bg-gray-100/80 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
              Global Recognition & Industry Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've been honoured to receive international media attention and industry awards for our impact in food safety, transformation programs, and wellness education.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Media Features */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-dark-color flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Featured In Global Media
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['CNN', 'CHANNEL NEWS ASIA', 'Forbes', 'BLOOMBERG', 'THE EDGE', 'FOX NEWS', 'AUGUSTMAN', 'NEW YORK TIMES'].map((media, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center font-semibold text-gray-700">
                    {media}
                  </div>
                ))}
              </div>
            </div>

            {/* Records & Awards */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-dark-color flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Singapore Book of Records
              </h3>
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-6">
                  <div className="font-semibold text-lg mb-2 text-primary">2-Time Record Holder</div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>BIGGEST WEIGHT LOSS IN 7 DAYS</li>
                    <li>LONGEST LO HEI BY THE COMMUNITY</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Industry Recognition */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-dark-color flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Awards & Certifications
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-lg p-6">
                    <div className="font-semibold text-lg mb-2 text-primary">Awards</div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>SINGAPORE QUALITY SERVICE AWARD</li>
                      <li>Best in Food Safety Solutions by Prestige Awards</li>
                    </ul>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6">
                    <div className="font-semibold text-lg mb-2 text-primary">Certifications</div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>HACCP Certified</li>
                      <li>GMP Certified</li>
                      <li>Clean Label Partnerships</li>
                      <li>Certified Provider of Singapore's SkillsFuture Courses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Education Section */}
      <section id="research" className="relative py-20 bg-gray-100 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-100/90 pointer-events-none"></div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
              Where Science Meets Public Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every decision we make is rooted in data, education, and prevention. From our labs to your kitchen table, we translate evidence-based research into real-world health solutions.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Toxicology and Food Safety */}
              <div className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-dark-color group-hover:text-primary transition-colors">
                    Toxicology and Food Safety Testing
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive analysis and testing protocols ensuring the highest standards of food safety and quality control.
                  </p>
                </div>
              </div>

              {/* Detoxification and Gut Health */}
              <div className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-dark-color group-hover:text-primary transition-colors">
                    Detoxification and Gut Health Protocols
                  </h3>
                  <p className="text-gray-600">
                    Research-backed protocols designed to optimize digestive health and support natural detoxification processes.
                  </p>
                </div>
              </div>

              {/* Nutrition Workshops */}
              <div className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-dark-color group-hover:text-primary transition-colors">
                    Nutrition Workshops
                  </h3>
                  <p className="text-gray-600">
                    Educational programs tailored for both public audiences and healthcare professionals, bridging scientific knowledge with practical application.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/research">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-7 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Explore Our Research
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Experts Section */}
      <section id="experts" className="relative py-20 bg-gray-100/90 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-200/80 pointer-events-none"></div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
              Experts Behind Our Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our ecosystem is backed by a panel of medical professionals, nutritionists, toxicologists, researchers, and wellness educators. They guide the science behind every product, program, and protocol.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Expert 1 */}
              <div className="group">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={getAssetPath("/images/experts/expert-1.jpg")}
                      alt="Dr. Sarah Chen"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-dark-color group-hover:text-primary transition-colors">
                      Dr. Sarah Chen
                    </h3>
                    <p className="text-gray-600 font-medium">Nutritional Biochemistry</p>
                    <p className="text-sm text-gray-500 mt-2 flex-grow">
                      Leading our research in cellular nutrition and metabolic health
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert 2 */}
              <div className="group">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={getAssetPath("/images/experts/expert-2.jpg")}
                      alt="Prof. James Wong"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-dark-color group-hover:text-primary transition-colors">
                      Prof. James Wong
                    </h3>
                    <p className="text-gray-600 font-medium">Food Science & Safety</p>
                    <p className="text-sm text-gray-500 mt-2 flex-grow">
                      Expert in food toxicology and safety protocols
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert 3 */}
              <div className="group">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={getAssetPath("/images/experts/expert-3.jpg")}
                      alt="Dr. Lisa Tan"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-dark-color group-hover:text-primary transition-colors">
                      Dr. Lisa Tan
                    </h3>
                    <p className="text-gray-600 font-medium">Chronic Disease Nutrition</p>
                    <p className="text-sm text-gray-500 mt-2 flex-grow">
                      Specializing in therapeutic nutrition protocols
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert 4 */}
              <div className="group">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={getAssetPath("/images/experts/Mark_Leong.png")}
                      alt="Dr. Mark Leong"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-dark-color group-hover:text-primary transition-colors">
                      Dr. Mark Leong
                    </h3>
                    <p className="text-gray-600 font-medium">Cellular Health & Nutrition</p>
                    <p className="text-sm text-gray-500 mt-2 flex-grow">
                      Pioneer in detoxification and cellular renewal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/team">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-7 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Meet the Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="relative py-20 bg-gray-200/80 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-200/90 pointer-events-none"></div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
              Real People. Real Results.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From reversing chronic conditions to achieving life-changing weight loss, our brands have helped over 100,000 individuals live healthier, toxin-free lives.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Video Testimonials */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-dark-color">
                Video Testimonials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Video 1 */}
                <div className="group h-full">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={getAssetPath("/images/testimonials/video-thumb-1.jpg")}
                        alt="Sarah's Transformation Story"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <svg className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-bold text-lg mb-2 text-dark-color">Sarah's Journey</h4>
                      <p className="text-gray-600 text-sm flex-grow">Overcame chronic inflammation through nutrition</p>
                    </div>
                  </div>
                </div>

                {/* Video 2 */}
                <div className="group h-full">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={getAssetPath("/images/testimonials/video-thumb-2.jpg")}
                        alt="John's Transformation Story"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <svg className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-bold text-lg mb-2 text-dark-color">John's Success</h4>
                      <p className="text-gray-600 text-sm flex-grow">Lost 30kg through our weight management program</p>
                    </div>
                  </div>
                </div>

                {/* Video 3 */}
                <div className="group h-full">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={getAssetPath("/images/testimonials/video-thumb-3.jpg")}
                        alt="Mary's Transformation Story"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <svg className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-bold text-lg mb-2 text-dark-color">Mary's Story</h4>
                      <p className="text-gray-600 text-sm flex-grow">Reversed digestive issues with gut health protocol</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Before & After Transformations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-dark-color">
                Before & After Transformations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Transformation 1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-[300px]">
                    <Image
                      src={getAssetPath("/images/transformations/before-after-1.jpg")}
                      alt="Weight Loss Transformation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white font-semibold">8 Months Transformation</p>
                      <p className="text-white/80 text-sm">30kg weight loss journey</p>
                    </div>
                  </div>
                </div>

                {/* Transformation 2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-[300px]">
                    <Image
                      src={getAssetPath("/images/transformations/before-after-2.jpg")}
                      alt="Health Transformation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white font-semibold">12 Weeks Program</p>
                      <p className="text-white/80 text-sm">Gut health restoration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-dark-color">
                Community Transformations
              </h3>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">100,000+</div>
                    <p className="text-gray-600">Lives Transformed</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">85%</div>
                    <p className="text-gray-600">Success Rate</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">12+</div>
                    <p className="text-gray-600">Countries Reached</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <Link href="/success-stories">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-7 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  See the Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="relative py-20 bg-gray-200/90 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-200 pointer-events-none"></div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
              Join Our Movement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of Asia's clean health revolution. Whether you're a health enthusiast, practitioner, or aspiring entrepreneur—we invite you to partner, franchise, or volunteer with us.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Franchise Partner */}
              <div className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-dark-color group-hover:text-primary transition-colors">
                    Become a Franchise Partner
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    Join our network of wellness entrepreneurs and bring our proven health solutions to your community.
                  </p>
                </div>
              </div>

              {/* Health Challenge */}
              <div className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-dark-color group-hover:text-primary transition-colors">
                    Join a Health Challenge
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    Participate in our community-driven health challenges and transform your wellness journey.
                  </p>
                </div>
              </div>

              {/* Volunteer */}
              <div className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-dark-color group-hover:text-primary transition-colors">
                    Volunteer at Our Events
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    Make a difference by supporting our community events and wellness initiatives.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/get-involved">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-7 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Join the Movement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gray-200 opacity-0 animate-fade-in-up">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-color">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question, partnership idea, or media request? Our team is ready to help.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* General Inquiry Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-dark-color">General Inquiry Form</h3>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Brand-specific contacts */}
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-dark-color">Brand-specific Contacts</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">Farmz Academy</h4>
                      <p className="text-gray-600">academy@farmzasia.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Dr. Mark Leong</h4>
                      <p className="text-gray-600">info@drmarkleong.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Brot and Tee</h4>
                      <p className="text-gray-600">hello@brotandtee.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Kumuya</h4>
                      <p className="text-gray-600">support@kumuya.com</p>
                    </div>
                  </div>
                </div>

                {/* Media & corporate inquiries */}
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-dark-color">Media & Corporate Inquiries</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">Media Relations</h4>
                      <p className="text-gray-600">media@farmzasia.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Partnerships</h4>
                      <p className="text-gray-600">partnerships@farmzasia.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Corporate</h4>
                      <p className="text-gray-600">corporate@farmzasia.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/contact">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-7 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Contact Farmz Asia
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button Section - Fixed position in bottom right corner */}
      <section 
        className="fixed z-50" 
        style={{ 
          bottom: '2rem', 
          right: '2rem', 
          left: 'auto', 
          top: 'auto' 
        }}>
          <button
          onClick={scrollToTop}
          className={cn(
            "bg-primary text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:bg-dark-color hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
          )}
          aria-label="Back to top"
        >
          <ArrowUp size={28} />
        </button>
      </section>
    </div>
  );
}
