/**
 * SVG Utilities (Updated for new directory structure)
 * Handles loading and saving of SVG files
 */

// SVG Base Path
const SVG_BASE_PATH = 'src/assets/svgs/traits';

// Trait category mapping
const TRAIT_CATEGORIES = {
  eyes: 'head',
  beak: 'head',
  top: 'head',
  wattle: 'head',
  bodyShape: 'body',
  tail: 'body',
  wings: 'body',
  legs: 'legs',
  feet: 'legs',
  headwear: 'accessories',
  neckwear: 'accessories',
  backwear: 'accessories'
};

/**
 * Get the category for a trait type
 * @param {string} traitType - The type of trait (e.g., 'eyes', 'beak')
 * @returns {string} - The category (e.g., 'head', 'body')
 */
export function getCategoryForTrait(traitType) {
  return TRAIT_CATEGORIES[traitType] || 'misc';
}

/**
 * Load an SVG file from the file system
 * @param {string} traitType - The type of trait (e.g., 'eyes', 'beak')
 * @param {string} variantKey - The variant key (e.g., 'normal', 'angry')
 * @param {string} view - The view ('front' or 'side')
 * @returns {Promise<string>} - The SVG content as a string or default fallback
 */
export async function loadSvgFile(traitType, variantKey, view) {
  // Get fallback paths - try in this order:
  // 1. Requested file: category/traitType/variantKey/view.svg
  // 2. Normal variant: category/traitType/normal/view.svg
  // 3. Default fallback based on trait type
  const category = getCategoryForTrait(traitType);
  const filePath = `${SVG_BASE_PATH}/${category}/${traitType}/${variantKey}/${view}.svg`;
  const fallbackPath = `${SVG_BASE_PATH}/${category}/${traitType}/normal/${view}.svg`;
  
  // Generate console-friendly paths for logging
  const shortPath = `${category}/${traitType}/${variantKey}/${view}.svg`;
  const shortFallbackPath = `${category}/${traitType}/normal/${view}.svg`;
  
  try {
    // Try to fetch the requested file
    const response = await fetch(filePath);
    
    if (response.ok) {
      // If successful, return the SVG content
      return await response.text();
    }
    
    console.warn(`SVG not found: ${shortPath}, trying fallback...`);
    
    // Try fallback to normal variant
    try {
      const fallbackResponse = await fetch(fallbackPath);
      if (fallbackResponse.ok) {
        console.info(`Using fallback SVG: ${shortFallbackPath}`);
        return await fallbackResponse.text();
      }
    } catch (fallbackError) {
      // Silent catch - we'll handle with default fallbacks
    }
    
    // Fallback to default SVGs based on trait type
    console.warn(`Fallback SVG not found: ${shortFallbackPath}, using default fallback`);
    return getDefaultSvg(traitType, view);
    
  } catch (error) {
    console.error(`Error loading SVG file: ${shortPath}`, error);
    return getDefaultSvg(traitType, view);
  }
}

/**
 * Get a default SVG content for a trait type and view
 * @param {string} traitType - The type of trait 
 * @param {string} view - The view ('front' or 'side')
 * @returns {string} - Default SVG content
 */
function getDefaultSvg(traitType, view) {
  // Provide simple fallback SVGs for each trait type
  switch (traitType) {
    case 'eyes':
      return view === 'front' 
        ? '<circle cx="-8" cy="-2" r="5" fill="white"/><circle cx="8" cy="-2" r="5" fill="white"/>'
        : '<circle cx="8" cy="-2" r="5" fill="white"/>';
    
    case 'beak':
      return view === 'front'
        ? '<path d="M0,5 L-6,12 L6,12 Z" fill="orange"/>'
        : '<path d="M10,0 L25,0 L17,8 Z" fill="orange"/>';
    
    case 'top':
      return view === 'front'
        ? '<path d="M0,-15 L-4,-25 L0,-20 L4,-25 L0,-15 Z" fill="red"/>'
        : '<path d="M0,-15 L-4,-25 L0,-20 L4,-25 L0,-15 Z" fill="red"/>';
    
    case 'wattle':
      return view === 'front'
        ? '<path d="M0,12 L-5,25 L5,25 Z" fill="#cc0000"/>'
        : '<path d="M0,12 L-5,25 L0,25 Z" fill="#cc0000"/>';
    
    default:
      // Generic placeholder
      return view === 'front' 
        ? '<rect x="-10" y="-10" width="20" height="20" fill="#cccccc" stroke="#888888"/>'
        : '<rect x="-10" y="-10" width="20" height="20" fill="#cccccc" stroke="#888888"/>';
  }
}

/**
 * Get the path for an SVG file
 * @param {string} traitType - The type of trait (e.g., 'eyes', 'beak')
 * @param {string} variantKey - The variant key (e.g., 'normal', 'angry')
 * @param {string} view - The view ('front' or 'side')
 * @returns {string} - The path of the SVG file
 */
export function getSvgPath(traitType, variantKey, view) {
  const category = getCategoryForTrait(traitType);
  return `${SVG_BASE_PATH}/${category}/${traitType}/${variantKey}/${view}.svg`;
}

/**
 * Get the full path to access an SVG file via HTTP
 * @param {string} traitType - The type of trait (e.g., 'eyes', 'beak')
 * @param {string} variantKey - The variant key (e.g., 'normal', 'angry')
 * @param {string} view - The view ('front' or 'side')
 * @returns {string} - The URL to access the SVG file
 */
export function getSvgUrl(traitType, variantKey, view) {
  return `/${getSvgPath(traitType, variantKey, view)}`;
}

/**
 * Check if an SVG file exists for a trait variant
 * @param {string} traitType - The type of trait (e.g., 'eyes', 'beak')
 * @param {string} variantKey - The variant key (e.g., 'normal', 'angry')
 * @param {string} view - The view ('front' or 'side')
 * @returns {Promise<boolean>} - True if the SVG file exists, false otherwise
 */
export async function doesSvgExist(traitType, variantKey, view) {
  try {
    const response = await fetch(getSvgPath(traitType, variantKey, view), { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Convert inline SVG content to a data URL for use in an <img> tag
 * @param {string} svgContent - The SVG content as a string
 * @returns {string} - A data URL containing the SVG
 */
export function svgToDataUrl(svgContent) {
  // Ensure we have valid SVG content
  if (!svgContent || !svgContent.trim().startsWith('<')) {
    console.error('Invalid SVG content provided to svgToDataUrl');
    return '';
  }
  
  // Encode SVG for use in a data URL
  const encodedSvg = encodeURIComponent(svgContent);
  return `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
}

/**
 * Converts an SVG string to a valid standalone SVG file
 * @param {string} svgContent - SVG content which may be just elements
 * @returns {string} - Complete SVG document with proper XML headers
 */
export function wrapAsSvgDocument(svgContent) {
  // If content already has svg root element, return as is
  if (svgContent.trim().startsWith('<svg')) {
    return svgContent;
  }
  
  // Otherwise, wrap in proper SVG document structure
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100" viewBox="-50 -50 100 100">
  ${svgContent}
</svg>`;
}

/**
 * Extract content from an SVG document
 * @param {string} svgDocument - Full SVG document
 * @returns {string} - Just the inner SVG content without the root svg element
 */
export function extractSvgContent(svgDocument) {
  if (!svgDocument) return '';
  
  // Use regex to extract content between svg tags
  const regex = /<svg[^>]*>([\s\S]*)<\/svg>/;
  const match = svgDocument.match(regex);
  
  if (match && match[1]) {
    return match[1].trim();
  }
  
  // If no match, return original (might be just the content already)
  return svgDocument;
} 