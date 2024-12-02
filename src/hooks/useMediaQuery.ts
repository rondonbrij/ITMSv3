import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      const listener = () => setMatches(media.matches);
      
      // Initial check
      setMatches(media.matches);
      
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    }
  }, [query]);

  return matches;
}