"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/ContactForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAssetPath } from '@/utils/assetPath';

export default function Home() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlay = useCallback((playedIndex: number) => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef && index !== playedIndex && !videoRef.paused) {
        videoRef.pause();
      }
    });
  }, []);
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
      threshold: 0.5,
      rootMargin: '0px 0px -20px 0px'
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

          const suffix = target.getAttribute('data-suffix') || '';

          const updateCounter = () => {
            currentValue += step;
            if (currentValue < targetValue) {
              target.textContent = Math.floor(currentValue).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = targetValue.toLocaleString() + suffix;
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

  const awards = [
    {
      src: getAssetPath("/images/awards/singapore_quality_service_award.png"),
      alt: 'Singapore Quality Service Award',
    },
    {
      src: getAssetPath("/images/awards/Best_in_Food_Safety_Solutions_by_Prestige_Awards.jpg"),
      alt: 'Best in Food Safety Solutions',
    },
    {
      src: getAssetPath("/images/awards/HACCP_certified.jpg"),
      alt: 'HACCP Certified',
    },
    {
      src: getAssetPath("/images/awards/GMP_certified.jpg"),
      alt: 'GMP Certified',
    },
    {
      src: getAssetPath("/images/awards/clean_label_partnerships.png"),
      alt: 'Clean Label Partnerships',
    },
    {
      src: getAssetPath("/images/awards/Certified_Provider_of_Singapore\'s_SkillsFuture_Courses.png"),
      alt: "SkillsFuture Certified Provider",
    },
  ];
  
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
              poster={getAssetPath("/images/hero-poster.jpg")}
            />
          </div>
          {/* Overlay to improve text readability */}
          <div className="absolute inset-0 bg-[#26D07C]/50"></div>
        </div>

        <div className="container-custom z-10 relative">
          <div className="max-w-4xl mx-auto text-center pt-32 sm:pt-28 md:pt-24 lg:pt-0">
            {/* Animated text entrance */}
            <div className="space-y-6 animate-fade-in">
              {/* Main heading with gradient text */}
              <h1 className="text-lg sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-6 leading-tight">
                Transforming Health Through
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                  Community, Food Safety, Research & Innovation
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-white/90">
                We are a research-driven, community-centered parent company powering Asia's trusted wellness brands.
              </p>

              {/* Tagline */}
              <p className="text-xs sm:text-base md:text-lg text-white/80 mt-2 sm:mt-4 font-medium">
                Empowering lives through clean, science-backed solutions—built for the modern Asian lifestyle.
              </p>

              {/* Mission Highlight */}
              <div className="mt-4 sm:mt-8 md:mt-12 p-2 sm:p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4">
                  Our Mission: Feed 1 Million Underprivileged Children by 2027
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                      <span className="count-up" data-target="250000">0</span>+
                    </div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-white/80">
                      Children Fed
                    </div>
                  </div>
                  <div className="hidden sm:block h-16 w-1 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                      <span className="count-up" data-target="25">0</span>%
                    </div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-white/80">
                      Progress
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:mt-4">
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full progress-bar" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mt-4 sm:mt-10 md:mt-12">
                <Link href="#brands">
                  <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-full px-6 sm:px-12 py-3 sm:py-6 text-base sm:text-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                    Explore Our Brands
                  </Button>
                </Link>
                <Link href="#research">
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary rounded-full px-6 sm:px-12 py-3 sm:py-6 text-base sm:text-xl font-semibold transition-all transform hover:scale-105">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Who We Are
              </h2>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Body Copy */}
              <div className="text-center space-y-6">
                <p className="text-lg text-custom-brown leading-relaxed">
                  Farmz Asia is a research and education powerhouse committed to advancing food safety, wellness innovation, and nutrition science. At our core, we are a community-first organization driving Asia's clean health transformation.
                </p>
                <p className="text-lg text-custom-brown leading-relaxed">
                  We invest in R&D, scientific education, and ethical product development to empower individuals, practitioners, and franchise partners. Under our parent umbrella, we power four purpose-driven brands, each solving critical health challenges of our time.
                </p>
              </div>

              {/* Core Values */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
                  Core Values
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Evidence-based innovation */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="relative w-full h-80"> {/* Container for image, increased height */}
                      <Image
                        src={getAssetPath("/images/core_values/evidence_based_innovation.jpg")} // Assuming image name
                        alt="Evidence-based Innovation"
                        layout="fill" // Use fill layout
                        objectFit="cover" // Cover the container
                        className="rounded-t-xl"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-primary mb-2">
                        Evidence-based Innovation
                      </h4>
                      <p className="text-sm text-dark-gray">
                        Driving progress through scientific research and validated solutions.
                      </p>
                    </div>
                  </div>

                  {/* Community transformation */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="relative w-full h-80"> {/* Container for image, increased height */}
                      <Image
                        src={getAssetPath("/images/core_values/community_transformation.jpg")} // Assuming image name
                        alt="Community Transformation"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-xl"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-primary mb-2">
                        Community Transformation
                      </h4>
                      <p className="text-sm text-dark-gray">
                        Building healthier communities through education and empowerment.
                      </p>
                    </div>
                  </div>

                  {/* Food-first health empowerment */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="relative w-full h-80"> {/* Container for image, increased height */}
                      <Image
                        src={getAssetPath("/images/core_values/food-first_health_empowerment.jpg")} // Assuming image name
                        alt="Food-first Health Empowerment"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-xl"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-primary mb-2">
                        Food-first Health Empowerment
                      </h4>
                      <p className="text-sm text-dark-gray">
                        Prioritizing nutrition as the foundation of holistic wellness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      <section id="brands" className="relative py-24 bg-gray-50/90 opacity-0 animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-100/80 pointer-events-none"></div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Family of Wellness Brands
            </h2>
            <p className="text-xl text-custom-brown max-w-3xl mx-auto">
              Each brand under Farmz Asia serves a unique mission, built on science, ethics, and life-changing outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Farmz Academy */}
            <Link href="/brands/farmz-academy" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-44 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image
                    src={getAssetPath("/images/brands/farmz-academy.png")}
                    alt="Farmz Academy"
                    width={150}
                    height={150}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col h-[180px]">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Farmz Academy
                  </h3>
                  <p className="text-foreground text-sm flex-grow">
                    Therapeutic nutrition programs for chronic conditions
                  </p>
                  <div className="mt-4 text-foreground group-hover:text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Dr. Mark Leong */}
            <Link href="/brands/dr-mark-leong" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-44 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image
                    src={getAssetPath("/images/brands/dr-mark-leong.png")}
                    alt="Dr. Mark Leong"
                    width={150}
                    height={150}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col h-[180px]">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Dr. Mark Leong
                  </h3>
                  <p className="text-foreground text-sm flex-grow">
                    Weight loss and cellular renewal through detox science
                  </p>
                  <div className="mt-4 text-foreground group-hover:text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Brot and Tee */}
            <Link href="/brands/brot-and-tee" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-44 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image
                    src={getAssetPath("/images/brands/brot-and-tee.png")}
                    alt="Brot and Tee"
                    width={150}
                    height={150}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col h-[180px]">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Brot and Tee
                  </h3>
                  <p className="text-foreground text-sm flex-grow">
                    Gut-friendly breads for digestive health and inflammation
                  </p>
                  <div className="mt-4 text-foreground group-hover:text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Blooma */}
            <Link href="/brands/blooma" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="h-44 bg-primary/10 flex items-center justify-center p-6 group-hover:bg-primary/20 transition-colors">
                  <Image
                    src={getAssetPath("/images/brands/blooma.png")}
                    alt="Blooma"
                    width={150}
                    height={150}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col h-[180px]">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    Blooma
                  </h3>
                  <p className="text-foreground text-sm flex-grow">
                    Clean skincare solutions tailored for women above 40
                  </p>
                  <div className="mt-4 text-foreground group-hover:text-primary font-medium group-hover:translate-x-2 transition-transform">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Global Recognition & Industry Trust
            </h2>
            <p className="text-xl text-custom-brown max-w-3xl mx-auto">
              We've been honoured to receive international media attention and industry awards for our impact in food safety, transformation programs, and wellness education.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Media Features */}
            <div className="bg-white rounded-xl p-4 shadow-lg mb-8 max-h-[320px] overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 text-foreground text-center">
                Featured In Global Media
              </h3>
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-8 min-w-max animate-marquee">
                  {[...Array(11), ...Array(11)].map((_, idx) => (
                    <div key={idx} className="flex-shrink-0 flex items-center justify-center h-[160px] md:h-[220px] lg:h-[260px] xl:h-[300px] p-2">
                      <Image
                        src={getAssetPath(`/images/media/${((idx % 11) + 1).toString().padStart(2, '0')}.jpg`)} // Cycle through 01 to 11
                        alt={`Media ${((idx % 11) + 1)}`}
                        width={180}
                        height={80}
                        className="mx-auto rounded-lg object-contain" // Add object-contain
                      />
                    </div>
                  ))}
                </div>
              </div>
              <style jsx>{`
                .animate-marquee {
                  animation: marquee 25s linear infinite;
                  will-change: transform; /* Optimize animation */
                }
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </div>

            {/* Records & Awards */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              {/* Flex container for image and text */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="relative aspect-[5/6] rounded-xl overflow-hidden shadow-lg group transition-all duration-300">
                    <Image
                      src={getAssetPath("/images/awards/singapore_book_of_records.jpg")}
                      alt="Singapore Book of Records Award"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                {/* Text Content Section */}
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="bg-primary/5 rounded-lg p-6 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <Image
                        src={getAssetPath("/images/awards/singapore_book_of_records_logo.png")}
                        alt="Singapore Book of Records Logo"
                        width={100}
                        height={20}
                        className="h-auto"
                      />
                      <span className="font-semibold text-lg text-foreground">
                        2-Time Record Holder
                      </span>
                    </div>
                    {/* List of Records */}
                    {/* Unordered list: removed default bullets (list-none), added vertical spacing between items (space-y-2), set text color */}
                    <ul className="list-none space-y-2 text-foreground">

                      {/* List Item 1 */}
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>BIGGEST WEIGHT LOSS IN 7 DAYS</span>
                      </li>

                      {/* List Item 2 */}
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>LONGEST LO HEI BY THE COMMUNITY</span>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Recognition */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
                Industry Recognition
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 place-items-center">
                {awards.map((award, idx) => (
                  <div key={idx} className="w-full max-w-[160px] transition-transform duration-300 hover:scale-110">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={award.src}
                        alt={award.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 160px"
                      />
                    </div>
                    <p className="text-sm text-center mt-2 text-foreground/80">{award.alt}</p>
                  </div>
                ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Where Science Meets Public Wellness
            </h2>
            <p className="text-xl text-custom-brown max-w-3xl mx-auto">
              Every decision we make is rooted in data, education, and prevention. From our labs to your kitchen table, we translate evidence-based research into real-world health solutions.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Toxicology and Food Safety */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={getAssetPath('/images/Research/toxiccology_and_food_safety_testing.jpg')}
                    alt="Toxicology and Food Safety Testing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    Toxicology and Food Safety Testing
                  </h3>
                  <p className="text-foreground flex-grow">
                    Comprehensive analysis and testing protocols ensuring the highest standards of food safety and quality control.
                  </p>
                </div>
              </div>

              {/* Detoxification and Gut Health */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={getAssetPath('/images/Research/detoxification_and_gut_health_protocol.jpg')}
                    alt="Detoxification and Gut Health Protocols"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    Detoxification and Gut Health Protocols
                  </h3>
                  <p className="text-foreground flex-grow">
                    Research-backed protocols designed to optimize digestive health and support natural detoxification processes.
                  </p>
                </div>
              </div>

              {/* Nutrition Workshops */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={getAssetPath('/images/Research/nutrition_workshop.jpg')}
                    alt="Nutrition Workshops"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    Nutrition Workshops
                  </h3>
                  <p className="text-foreground flex-grow">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Experts Behind Our Innovation
            </h2>
            <p className="text-xl text-custom-brown max-w-3xl mx-auto">
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
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Dr. Sarah Chen
                    </h3>
                    <p className="text-foreground font-medium">Nutritional Biochemistry</p>
                    <p className="text-sm text-foreground mt-2 flex-grow">
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
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Prof. James Wong
                    </h3>
                    <p className="text-foreground font-medium">Food Science & Safety</p>
                    <p className="text-sm text-foreground mt-2 flex-grow">
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
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Dr. Lisa Tan
                    </h3>
                    <p className="text-foreground font-medium">Chronic Disease Nutrition</p>
                    <p className="text-sm text-foreground mt-2 flex-grow">
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
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Dr. Mark Leong
                    </h3>
                    <p className="text-foreground font-medium">Cellular Health & Nutrition</p>
                    <p className="text-sm text-foreground mt-2 flex-grow">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Real People. Real Results.
            </h2>
            <p className="text-xl text-custom-brown max-w-3xl mx-auto">
              From reversing chronic conditions to achieving life-changing weight loss, our brands have helped over 100,000 individuals live healthier, toxin-free lives.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Video Testimonials */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
                Video Testimonials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Video 1 */}
                <div className="group h-full">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100">
                      <video
                        ref={(el) => { videoRefs.current[0] = el; }}
                        onPlay={() => handlePlay(0)}
                        src={getAssetPath("/videos/testimonials/Emily_Koh_Journey.mp4")}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                        poster={getAssetPath("/images/testimonials/Emily_Koh_Journey.jpg")}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-bold text-lg mb-2 text-foreground">Emily Koh's Journey</h4>
                      <p className="text-foreground text-sm flex-grow">My weight is like a yo-yo, but now I can maintain my weight below 60kg. If it's without Mark, I won't be able to do it.</p>
                    </div>
                  </div>
                </div>

                {/* Video 2 */}
                <div className="group h-full">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100">
                      <video
                        ref={(el) => { videoRefs.current[1] = el; }}
                        onPlay={() => handlePlay(1)}
                        src={getAssetPath("/videos/testimonials/Dina_Sim_Success.mp4")}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                        poster={getAssetPath("/images/testimonials/Dina_Sim_Success.jpg")}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-bold text-lg mb-2 text-foreground">Dina Sim's Success</h4>
                      <p className="text-foreground text-sm flex-grow">When my son come and told me "Mummy, can you make green juice for me?" This make me feel proud to join Farmz.</p>
                    </div>
                  </div>
                </div>

                {/* Video 3 */}
                <div className="group h-full">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100">
                      <video
                        ref={(el) => { videoRefs.current[2] = el; }}
                        onPlay={() => handlePlay(2)}
                        src={getAssetPath("/videos/testimonials/Alvin_Elizabeth_Story.mp4")}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                        poster={getAssetPath("/images/testimonials/Alvin_Elizabeth_Story.jpg")}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-bold text-lg mb-2 text-foreground">Alvin & Elizabeth's Story</h4>
                      <p className="text-foreground text-sm flex-grow">After this detox, I feel lighter and surprisingly, my blood pressure went down, and I cut down my medicine.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Before & After Transformations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
                Before & After Transformations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Transformation 1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-[300px]">
                    <Image
                      src={getAssetPath("/images/transformations/8_month.jpg")}
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
                      src={getAssetPath("/images/transformations/12_weeks.jpg")}
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
              <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
                Community Transformations
              </h3>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      <span className="count-up" data-target="100000" data-suffix="+">0</span>
                    </div>
                    <p className="text-foreground">Lives Transformed</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      <span className="count-up" data-target="85" data-suffix="%">0</span>
                    </div>
                    <p className="text-foreground">Success Rate</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      <span className="count-up" data-target="12" data-suffix="+">0</span>
                    </div>
                    <p className="text-foreground">Countries Reached</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Join Our Movement
            </h2>
            <p className="text-xl text-custom-brown max-w-3xl mx-auto">
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
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    Become a Franchise Partner
                  </h3>
                  <p className="text-foreground flex-grow">
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
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    Join a Health Challenge
                  </h3>
                  <p className="text-foreground flex-grow">
                    Participate in our community-driven health challenges and transform your wellness journey.
                  </p>
                </div>
              </div>

              {/* Volunteer */}
              <div className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <div className="relative w-full h-64"> {/* Image container */}
                    <Image
                      src={getAssetPath("/images/our_movement/volunteer_at_our_events.jpg")}
                      alt="Volunteers working at a community event"
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      Volunteer at Our Events
                    </h3>
                    <p className="text-foreground flex-grow mb-4"> {/* Added mb-4 for spacing */}
                      Make a difference by supporting our community events and wellness initiatives.
                    </p>
                    {/* Optional: Add a button if needed, matching other cards */}
                    {/* <Button variant="outline" className="mt-auto border-primary text-primary hover:bg-primary/10 hover:text-primary w-full">
                      Learn More
                    </Button> */}
                  </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Let's Connect
            </h2>
            <p className="text-xl text-custom-brown max-w-3xl mx-auto">
              Have a question, partnership idea, or media request? Our team is ready to help.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* General Inquiry Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">General Inquiry Form</h3>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Brand-specific contacts */}
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Brand-specific Contacts</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">Farmz Academy</h4>
                      <p className="text-foreground">academy@farmzasia.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Dr. Mark Leong</h4>
                      <p className="text-foreground">info@drmarkleong.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Brot and Tee</h4>
                      <p className="text-foreground">hello@brotandtee.com</p>
                    </div>
                  </div>
                </div>

                {/* Media & corporate inquiries */}
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Media & Corporate Inquiries</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">Media Relations</h4>
                      <p className="text-foreground">media@farmzasia.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Partnerships</h4>
                      <p className="text-foreground">partnerships@farmzasia.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Corporate</h4>
                      <p className="text-foreground">corporate@farmzasia.com</p>
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
