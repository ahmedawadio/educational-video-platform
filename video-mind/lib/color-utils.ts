interface HSLAColors {
  color: string;
  background: string;
}

/**
 * Converts a string to a deterministic HSLA color
 * Returns both a color (for text/icons) and a background (same hue with higher lightness and lower opacity)
 */
export function stringToHSLA(str: string): HSLAColors {
  // Generate a stable hash from string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to HSLA values
  const h = Math.abs(hash % 360); // Hue (0-359)
  const s = 70 + Math.abs((hash % 30)); // Saturation (70-100%)
  const l = 45 + Math.abs((hash % 15)); // Lightness (45-60%)
  
  // Create the color and background with the same hue but different lightness/opacity
  const color = `hsla(${h}, ${s}%, ${l}%, 1)`;
  const background = `hsla(${h}, ${s}%, ${l + 30}%, 0.15)`;
  
  return {
    color,
    background
  };
}

/**
 * Gets predefined HSLA colors for specific categories
 * Falls back to stringToHSLA for non-predefined categories
 */
export function getCategoryColor(category: string): HSLAColors {
  const predefinedColors: Record<string, HSLAColors> = {
    'artificial-intelligence': {
      color: 'hsla(272, 80%, 55%, 1)',
      background: 'hsla(272, 80%, 85%, 0.15)'
    },
    'web-dev': {
      color: 'hsla(200, 75%, 50%, 1)',
      background: 'hsla(200, 75%, 80%, 0.15)'
    },
    'data-science': {
      color: 'hsla(145, 70%, 45%, 1)',
      background: 'hsla(145, 70%, 75%, 0.15)'
    },
    'mobile-dev': {
      color: 'hsla(340, 80%, 55%, 1)',
      background: 'hsla(340, 80%, 85%, 0.15)'
    },
    'cloud-computing': {
      color: 'hsla(210, 70%, 60%, 1)',
      background: 'hsla(210, 70%, 90%, 0.15)'
    },
    'blockchain': {
      color: 'hsla(45, 90%, 50%, 1)',
      background: 'hsla(45, 90%, 80%, 0.15)'
    }
  };
  
  // Use a standardized key for the lookup
  const lookupKey = category.toLowerCase().trim();
  
  // Return predefined color if available, otherwise generate from string
  return predefinedColors[lookupKey] || stringToHSLA(category);
} 