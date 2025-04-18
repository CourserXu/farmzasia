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
  // State for back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    // Video lazy loading with Intersection Observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.src = getAssetPath('/videos/hero-background.mp4');
          videoRef.current.load();
          videoRef.current.play();
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    // Back to top button visibility handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
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
      <section id="home" className="relative h-screen flex items-center text-white overflow-hidden">
        {/* Video Background with 16:9 aspect ratio */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={getAssetPath('/images/hero-poster.jpg')}
          >
            {/* Video source will be dynamically added via JavaScript */}
          </video>
          {/* Overlay to improve text readability */}
          <div className="absolute inset-0 bg-[#26D07C] bg-opacity-70"></div>
        </div>
        
        <div className="container-custom z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Transforming Lives<br />
              Through Food Safety,<br />
              Research, and Innovation
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light">
              Empowering Better Health Through Science and Nutrition
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#brands">
                <Button className="bg-[#b8e0d2] text-[#26D07C] hover:bg-[#26D07C] hover:text-white rounded-full px-8 py-3 font-semibold transition-all">
                  Explore Our Brands
                </Button>
              </Link>
              <Link href="#research">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#26D07C] rounded-full px-8 py-3 font-semibold transition-all">
                  Learn More About Our Research
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section id="awards" className="py-20 bg-light-color">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-color">
              Our Global Recognition & Achievements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrating excellence in food safety and innovation recognized worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">
                  <Image src={getAssetPath("/images/awards/industry-awards.jpg")} alt="Industry Awards" width={120} height={80} className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-color">Industry Awards</h3>
                <p className="text-gray-600">
                  Recognized for our contributions to food safety and nutritional innovation
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">
                  <Image src={getAssetPath("/images/awards/certifications.jpg")} alt="Certifications & Partnerships" width={120} height={80} className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-color">Certifications & Partnerships</h3>
                <p className="text-gray-600">
                  Endorsed by leading health organizations worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">
                  <Image src={getAssetPath("images/awards/media-mentions.jpg")} alt="Media Mentions" width={120} height={80} className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-color">Media Mentions</h3>
                <p className="text-gray-600">
                  Featured in prestigious publications for our groundbreaking research
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      <section id="brands" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-color">
              Our Brands
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Innovating for better health through scientific research and nutritional excellence
            </p>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xl text-gray-600">
              At Farmz Asia, we focus on pioneering food safety and scientific research to create products that transform lives through nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Image src={getAssetPath("/images/brands/brand-1.jpg")} alt="Farmz Academy" width={150} height={150} className="object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark-color">Farmz Academy</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Specialized nutrition for managing chronic conditions through science-backed food solutions.
                </p>
                <Link href="/brands/farmz-academy" className="text-primary font-medium hover:text-dark-color">
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Image src={getAssetPath("/images/brands/brand-2.jpg")} alt="Dr. Mark Leong" width={150} height={150} className="object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark-color">Dr. Mark Leong</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Revolutionary approaches to weight loss and cellular renewal based on cutting-edge research.
                </p>
                <Link href="/brands/dr-mark-leong" className="text-primary font-medium hover:text-dark-color">
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Image src={getAssetPath("/images/brands/brand-3.jpg")} alt="Brot and Tee" width={150} height={150} className="object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark-color">Brot and Tee</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Artisanal breads designed to support digestive health through traditional methods and modern science.
                </p>
                <Link href="/brands/brot-and-tee" className="text-primary font-medium hover:text-dark-color">
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Image src={getAssetPath("/images/brands/brand-4.jpg")} alt="Kumuya" width={150} height={150} className="object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark-color">Kumuya</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Clean skincare solutions specifically formulated for women over 40, backed by nutritional science.
                </p>
                <Link href="/brands/kumuya" className="text-primary font-medium hover:text-dark-color">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary text-dark-color hover:bg-dark-color hover:text-white rounded-full px-8 py-3 font-semibold transition-all">
              Discover Our Innovations
            </Button>
          </div>
        </div>
      </section>

      {/* Innovating Food Safety & Health Through Research Section */}
      <section id="research" className="py-20 bg-light-color">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-color">
              Innovating Food Safety & Health Through Research
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leading the way in nutritional science and food safety research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="w-36 h-36 bg-secondary rounded-full mx-auto mb-6 overflow-hidden">
                <Image src={getAssetPath("/images/experts/expert-1.jpg")} alt="Dr. Sarah Chen" width={150} height={150} className="object-cover" />
              </div>
              <h3 className="text-lg font-bold text-dark-color mb-1">Dr. Sarah Chen</h3>
              <p className="text-gray-600 text-sm">Nutritional Biochemistry</p>
            </div>

            <div className="text-center">
              <div className="w-36 h-36 bg-secondary rounded-full mx-auto mb-6 overflow-hidden">
                <Image src={getAssetPath("/images/experts/expert-2.jpg")} alt="Prof. James Wong" width={150} height={150} className="object-cover" />
              </div>
              <h3 className="text-lg font-bold text-dark-color mb-1">Prof. James Wong</h3>
              <p className="text-gray-600 text-sm">Food Science & Safety</p>
            </div>

            <div className="text-center">
              <div className="w-36 h-36 bg-secondary rounded-full mx-auto mb-6 overflow-hidden">
                <Image src={getAssetPath("/images/experts/expert-3.jpg")} alt="Dr. Lisa Tan" width={150} height={150} className="object-cover" />
              </div>
              <h3 className="text-lg font-bold text-dark-color mb-1">Dr. Lisa Tan</h3>
              <p className="text-gray-600 text-sm">Chronic Disease Nutrition</p>
            </div>

            <div className="text-center">
              <div className="w-36 h-36 bg-secondary rounded-full mx-auto mb-6 overflow-hidden">
                <Image src={getAssetPath("/images/experts/Mark_Leong.png")} alt="Dr. Mark Leong" width={150} height={150} className="object-cover" />
              </div>
              <h3 className="text-lg font-bold text-dark-color mb-1">Dr. Mark Leong</h3>
              <p className="text-gray-600 text-sm">Cellular Health & Nutrition</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary text-dark-color hover:bg-dark-color hover:text-white rounded-full px-8 py-3 font-semibold transition-all">
              Read More Insights
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-color">
              Success Stories & Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real results from our research-backed nutritional innovations
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10 text-center mb-16">
            <p className="text-xl italic text-gray-700 mb-6">
              "Farmz Asia's nutritional approach completely transformed my health journey. After struggling with chronic inflammation for years, their science-backed solutions have given me a new lease on life."
            </p>
            <p className="font-bold text-dark-color">- Jane L., Singapore</p>
          </div>

          <div className="flex flex-col md:flex-row justify-around max-w-4xl mx-auto text-center gap-8">
            <div>
              <p className="text-4xl font-bold text-accent mb-2">10,000+</p>
              <p className="text-gray-600">Lives Transformed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent mb-2">15+</p>
              <p className="text-gray-600">Countries Reached</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent mb-2">30+</p>
              <p className="text-gray-600">Research Publications</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary text-dark-color hover:bg-dark-color hover:text-white rounded-full px-8 py-3 font-semibold transition-all">
              Read More Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* News & Insights Section */}
      <section id="news" className="py-20 bg-light-color">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-color">
              News & Insights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The latest developments from our research and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 bg-secondary">
                <Image src={getAssetPath("/images/news/news-1.jpg")} alt="News 1" width={400} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">March 15, 2025</p>
                <h3 className="text-xl font-bold mb-3 text-dark-color">New Research Links Gut Health to Immune Function</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our latest study reveals the powerful connection between digestive health and immune system strength.
                </p>
                <Link href="/news/gut-health-research" className="text-primary font-medium hover:text-dark-color">
                  Read More →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 bg-secondary">
                <Image src={getAssetPath("/images/news/news-2.jpg")} alt="News 2" width={400} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">February 28, 2025</p>
                <h3 className="text-xl font-bold mb-3 text-dark-color">Farmz Academy Launches New Nutrition Program</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our educational branch introduces comprehensive training for healthcare professionals.
                </p>
                <Link href="/news/nutrition-program" className="text-primary font-medium hover:text-dark-color">
                  Read More →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 bg-secondary">
                <Image src={getAssetPath("/images/news/news-3.jpg")} alt="News 3" width={400} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">January 10, 2025</p>
                <h3 className="text-xl font-bold mb-3 text-dark-color">Upcoming Webinar: Food Safety in Modern Agriculture</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join our panel of experts as they discuss the challenges and innovations in agricultural safety.
                </p>
                <Link href="/news/food-safety-webinar" className="text-primary font-medium hover:text-dark-color">
                  Read More →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary text-dark-color hover:bg-dark-color hover:text-white rounded-full px-8 py-3 font-semibold transition-all">
              Subscribe for Updates
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-color">
              Contact Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reach out to our team for inquiries, partnerships, or support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-dark-color">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Have questions about our research, brands, or want to collaborate? Our team is here to help.
              </p>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 text-dark-color">Brand-Specific Support</h4>
                <ul className="space-y-2">
                  <li><span className="font-bold">Farmz Academy:</span> academy@farmzasia.com</li>
                  <li><span className="font-bold">Dr. Mark Leong:</span> info@drmarkleong.com</li>
                  <li><span className="font-bold">Brot and Tee:</span> hello@brotandtee.com</li>
                  <li><span className="font-bold">Kumuya:</span> support@kumuya.com</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-dark-color">Corporate & Media Requests</h4>
                <p className="text-gray-600 mb-2">
                  For media inquiries, partnerships, and business opportunities:
                </p>
                <p className="text-gray-600">
                  media@farmzasia.com
                </p>
              </div>
            </div>
            
            <div>
              <ContactForm />
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
