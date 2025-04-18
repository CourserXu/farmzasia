"use client";

import { getAssetPath } from '@/utils/assetPath';
import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    
    // Use getAssetPath to handle the font paths
    style.textContent = `
      @font-face {
        font-family: 'Avenir';
        src: url('${getAssetPath('/fonts/AvenirLight.woff2')}') format('woff2');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${getAssetPath('/fonts/AvenirBook.woff2')}') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${getAssetPath('/fonts/AvenirMedium.woff2')}') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Avenir';
        src: url('${getAssetPath('/fonts/AvenirBlack.woff2')}') format('woff2');
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
