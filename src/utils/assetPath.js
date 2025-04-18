export function getAssetPath(path) {
    // Ensure the path starts with a '/'
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Check for development environment using multiple methods
    const isDevelopment = 
      process.env.NODE_ENV === 'development' || 
      process.env.NEXT_PUBLIC_NODE_ENV === 'development' ||
      typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || 
         window.location.hostname === '0.0.0.0' ||
         window.location.hostname === '127.0.0.1')
    
    // In development environment, do not add basePath
    if (isDevelopment) {
      return normalizedPath;
    }
    
    // In production environment, add basePath
    return `/farmzasia${normalizedPath}`;
  }
