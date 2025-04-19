'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Import cn utility for class merging
import { getAssetPath } from '@/utils/assetPath';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  // Define navigation links before they are used in useEffect
  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About Us', href: '#about' },
    { title: 'Our Brands', href: '#brands' },
    { title: 'Awards & Recognition', href: '#awards' },
    { title: 'Research & Education', href: '#research' },
    { title: 'Our Experts', href: '#experts' },
    { title: 'Success Stories', href: '#success' },
    { title: 'Get Involved', href: '#get-involved' },
    { title: 'Contact Us', href: '#contact' },
  ];

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for page load with scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Track active section based on scroll position
  useEffect(() => {
    // Function to determine which section is currently in view
    const handleSectionVisibility = () => {
      // Get all sections that correspond to navigation links
      const sections = navLinks.map(link => {
        const id = link.href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if element is in viewport (with some offset)
          return {
            id: link.href,
            visible: rect.top <= 150 && rect.bottom >= 150
          };
        }
        return null;
      }).filter(Boolean);
      
      // Find the currently visible section
      const visibleSection = sections.find(section => section?.visible);
      if (visibleSection) {
        setActiveSection(visibleSection.id);
      } else if (window.scrollY < 100) {
        // If at the top of the page, set home as active
        setActiveSection('#home');
      }
    };
    
    window.addEventListener('scroll', handleSectionVisibility, { passive: true });
    // Initial check
    handleSectionVisibility();
    
    return () => window.removeEventListener('scroll', handleSectionVisibility);
  }, [navLinks]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check if link is active - improved with useCallback for better performance
  const isActiveLink = useCallback((href: string) => {
    // First check if we have an active section from scroll detection
    if (activeSection === href) return true;
    
    // Fallback to original logic
    // Check if we're on home page
    if (href === '#home' && pathname === '/') return true;
    
    // Check if pathname includes the link path (without #)
    if (pathname?.includes(href.replace('#', ''))) return true;
    
    // Use useEffect to update this state instead of checking directly in render
    
    return false;
  }, [pathname, activeSection]);

  // Use a separate effect to handle client-side hash checking
  useEffect(() => {
    // Function to check hash-based active links
    const checkHashBasedLinks = () => {
      navLinks.forEach(link => {
        if (window.location.hash === link.href) {
          setActiveSection(link.href);
        }
      });
    };
    
    // Check on initial load
    checkHashBasedLinks();
    
    // Add hash change listener
    window.addEventListener('hashchange', checkHashBasedLinks);
    
    return () => {
      window.removeEventListener('hashchange', checkHashBasedLinks);
    };
  }, [navLinks]);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "py-5"
      )}
      role="banner"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-[180px] h-[42px] block transition-all duration-300" aria-label="Farmz Asia - Home">
          <Image
            src={isScrolled ? getAssetPath("/images/farmzasia-logo-color.png") : getAssetPath("/images/farmzasia-logo-white.png")}
            alt="Farmz Asia Logo"
            fill
            className="object-contain"
            priority={true}
            sizes="180px"
            style={{ filter: !isScrolled ? 'brightness(0) invert(1)' : 'none' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center flex-nowrap whitespace-nowrap" aria-label="Main Navigation">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group px-3">
              <Link
                href={link.href}
                className={cn(
                  "font-medium flex items-center transition-all duration-300 text-sm xl:text-base relative py-2",
                  isScrolled ? "text-dark" : "text-white",
                  "hover:text-primary"
                )}
                aria-current={isActiveLink(link.href) ? 'page' : undefined}
              >
                {link.title}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 rounded-full",
                  isActiveLink(link.href) ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                )}></span>
              </Link>
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block ml-4">
          <Link
            href="#brands"
            className={cn(
              "bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap",
              "hover:bg-primary/90 hover:shadow-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
          >
            Explore Our Innovations
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button
              className={cn(
                "p-2.5 rounded-md transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-primary",
                isScrolled ? "text-dark hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              aria-label="Open Menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-7 w-7" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
                <Image
                  src={getAssetPath("/images/farmzasia-logo-color.png")}
                  alt="Farmz Asia Logo"
                  width={120}
                  height={30}
                  className="object-contain"
                />
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100"
                  aria-label="Close Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="pt-6 pb-10 flex-1 overflow-y-auto px-4">
                <nav className="flex flex-col space-y-6" aria-label="Mobile Navigation">
                  {navLinks.map((link, i) => (
                    <div key={i} className="flex flex-col">
                      <Link
                        href={link.href}
                        className={cn(
                          "text-xl font-medium py-2 transition-colors text-dark hover:text-primary",
                          isActiveLink(link.href) && "text-primary"
                        )}
                        aria-current={isActiveLink(link.href) ? 'page' : undefined}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="py-6 border-t px-4">
                <Link
                  href="#brands"
                  className="bg-primary text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors inline-block text-center w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore Our Innovations
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
