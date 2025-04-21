"use client";

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    
    // Determine if we're in development environment
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '0.0.0.0' ||
                         window.location.hostname === '127.0.0.1';
    
    // Set the base path based on environment
    const basePath = isDevelopment ? '' : '/farmzasia';
    
    // Use the base path for font URLs
    style.textContent = `
      @font-face {
        font-family: 'Avenir';
        src: url('${basePath}/fonts/AvenirLight.woff2') format('woff2');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${basePath}/fonts/AvenirBook.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${basePath}/fonts/AvenirMedium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${basePath}/fonts/AvenirBlack.woff2') format('woff2');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }
    `;
    
    // Append the style to the document head
    document.head.appendChild(style);
    
    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
}
