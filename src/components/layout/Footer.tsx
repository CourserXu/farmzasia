"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { memo } from 'react';
import { getAssetPath } from '@/utils/assetPath';

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { title: 'About Us', href: '/#about' },
      { title: 'Our Brands', href: '/#brands' },
      { title: 'Research', href: '/#research' },
      { title: 'Join Us', href: '/#join-us' },
      { title: 'Contact Us', href: '/#contact' },
    ],
    support: [
      { title: 'FAQ', href: '/faq' },
      { title: 'Affiliate Program', href: '/affiliate-program' },
      { title: 'Terms and Conditions', href: '/terms-and-conditions' },
      { title: 'Return Policy', href: '/return-policy' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} className="text-white" />, href: "#", label: "Facebook" },
    { icon: <Instagram size={20} className="text-white" />, href: "#", label: "Instagram" },
    { icon: <FaTiktok size={20} className="text-white" />, href: "#", label: "TikTok" },
    { icon: <Youtube size={20} className="text-white" />, href: "#", label: "Youtube" },
  ];

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#26D07C] text-white pt-16 pb-8 relative" role="contentinfo" aria-label="Site footer">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info & Social */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src={getAssetPath("/images/farmzasia-logo-white.png")}
                  alt="Farmz Asia Logo"
                  width={168}
                  height={100}
                  className="mb-6 hover:opacity-90 transition-opacity"
                  loading="lazy" 
                />
              </Link>
              <p className="text-sm text-white/80 mb-6 max-w-md">
                Research-Driven Wellness Powered by Food Safety & Education
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={`social-${index}`} 
                    href={link.href} 
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors hover:scale-110 transform duration-200"
                    aria-label={`Follow us on ${link.label}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links & Support */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {footerLinks.quickLinks.map((link, i) => (
                    <li key={`quicklink-${i}`}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-white/80 hover:text-white transition-colors flex items-center group"
                      >
                        <span className="transform group-hover:translate-x-1 transition-transform duration-200">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-4">Support</h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link, i) => (
                    <li key={`support-${i}`}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-white/80 hover:text-white transition-colors flex items-center group"
                      >
                        <span className="transform group-hover:translate-x-1 transition-transform duration-200">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:sayhello@farmzasia.com" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={16} />
                  <span>sayhello@farmzasia.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+6531385111" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  <Phone size={16} />
                  <span>Singapore: +65 3138 5111</span>
                </a>
              </li>
              <li>
                <a href="tel:+601800819223" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  <Phone size={16} />
                  <span>Malaysia: +60 1800 819 223</span>
                </a>
              </li>
            </ul>
            <address className="text-sm text-white/80 not-italic mt-4 flex items-start gap-2">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>
                114 Lavender Street #12-85,<br />
                CT Hub 2,<br />
                Singapore 338729
              </span>
            </address>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 p-6 rounded-xl h-full">
              <h4 className="text-lg font-medium mb-2">Stay Updated</h4>
              <p className="text-sm text-white/80 mb-4">
                Join 50,000+ clean health subscribers. Get tips, news & first access to events.
              </p>
              <form className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-primary hover:bg-white/90 rounded-lg px-4 py-2 font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-white/70">
            &copy; Copyright 2021 - {currentYear} Farmz Asia. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Structured data - SEO friendly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Farmz Asia",
            "url": "https://farmzasia.com",
            "logo": "https://farmzasia.com/images/farmzasia-logo-white.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+6531385111",
              "contactType": "customer service",
              "availableLanguage": ["English"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "114 Lavender Street #12-85, CT Hub 2",
              "addressLocality": "Singapore",
              "postalCode": "338729",
              "addressCountry": "SG"
            },
            "sameAs": [
              "https://web.facebook.com/FarmzAsia/",
              "https://www.instagram.com/farmz_asia/",
              "https://www.tiktok.com/@dr.markleong.official/",
              "https://www.youtube.com/user/MarkyKills/"
            ]
          }, null, 0)
        }}
      />
    </footer>
  );
};

export default memo(Footer);
