"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { memo } from 'react';

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { title: 'Home', href: '/' },
      { title: 'About Us', href: '/#about' },
      { title: 'Our Brands', href: '/#brands' },
      { title: 'Research', href: '/#research' },
      { title: 'News & Insights', href: '/#news' },
      { title: 'Contact Us', href: '/#contact' },
    ],
    support: [
      // { title: 'Contact Us', href: '/#contact' },
      { title: 'FAQ', href: '/faq' },
      { title: 'Affiliate Program', href: '/affiliate-program' },
      { title: 'Terms and Conditions', href: '/terms-and-conditions' },
      { title: 'Return Policy', href: '/return-policy' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} className="text-white" />, href: "#", label: "Facebook" },
    { icon: <Twitter size={20} className="text-white" />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} className="text-white" />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={20} className="text-white" />, href: "#", label: "LinkedIn" },
  ];

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8 relative" role="contentinfo" aria-label="Site footer">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/images/farmzasia-logo-white.png"
                  alt="Farmz Asia Logo"
                  width={168}
                  height={100}
                  className="mb-6 hover:opacity-90 transition-opacity"
                  loading="lazy" 
                />
              </Link>
              <p className="text-sm text-white/80 mb-6">
                Transforming lives through food safety, research, and innovation.
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

          {/* Quick Links */}
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

          {/* Support */}
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

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-medium mb-4">Farmz Pte Ltd</h4>
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
            <address className="text-sm text-white/80 not-italic mt-2 flex items-start gap-2">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>
                114 Lavender Street #12-85,<br />
                CT Hub 2,<br />
                Singapore 338729
              </span>
            </address>
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
              "https://www.facebook.com/farmzasia",
              "https://www.twitter.com/farmzasia",
              "https://www.instagram.com/farmzasia",
              "https://www.linkedin.com/company/farmzasia"
            ]
          })
        }}
      />
    </footer>
  );
};

export default memo(Footer);
