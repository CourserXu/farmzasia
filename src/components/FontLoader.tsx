"use client";

import { useEffect } from 'react';
import { getAssetPath } from '@/utils/assetPath';

export default function FontLoader() {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    
    // Use getAssetPath utility for consistent path handling
    const fontPaths = {
      light: getAssetPath('/fonts/AvenirLight.woff2'),
      book: getAssetPath('/fonts/AvenirBook.woff2'),
      medium: getAssetPath('/fonts/AvenirMedium.woff2'),
      black: getAssetPath('/fonts/AvenirBlack.woff2')
    };

    // Preload fonts
    Object.values(fontPaths).forEach(path => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = path;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Use the paths for font URLs with fallbacks
    style.textContent = `
      @font-face {
        font-family: 'Avenir';
        src: url('${fontPaths.light}') format('woff2'),
             local('Avenir Light');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${fontPaths.book}') format('woff2'),
             local('Avenir Book');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${fontPaths.medium}') format('woff2'),
             local('Avenir Medium');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${fontPaths.black}') format('woff2'),
             local('Avenir Black');
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
      // Remove preload links
      document.querySelectorAll('link[rel="preload"][as="font"]').forEach(link => {
        document.head.removeChild(link);
      });
    };
  }, []);
  
  return null;
}
