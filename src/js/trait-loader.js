/**
 * Trait Loader
 * Loads trait definitions from the database and SVG files
 */

import * as traitDb from './trait-db.js';
import * as svgUtils from './svg-utils.js';

// Cache for SVG content
const svgCache = {
  front: {},
  side: {}
};

/**
 * Initialize the trait loader
 * @returns {Promise<boolean>} - True if initialization was successful
 */
export async function initialize() {
  try {
    // Initialize database
    await traitDb.initDatabase();
    console.log('Trait loader initialized');
    return true;
  } catch (error) {
    console.error('Error initializing trait loader:', error);
    return false;
  }
}

/**
 * Get all trait types
 * @returns {Promise<Array>} - Array of trait objects
 */
export async function getAllTraitTypes() {
  return await traitDb.getAllTraits();
}

/**
 * Get trait info by ID
 * @param {string} traitId - The trait ID (e.g., 'eyes', 'beak')
 * @returns {Promise<Object>} - Trait object
 */
export async function getTrait(traitId) {
  return await traitDb.getTraitById(traitId);
}

/**
 * Get all variants for a trait
 * @param {string} traitId - The trait ID (e.g., 'eyes', 'beak')
 * @returns {Promise<Array>} - Array of variant objects
 */
export async function getVariantsForTrait(traitId) {
  return await traitDb.getVariantsByTraitId(traitId);
}

/**
 * Get a specific variant by ID
 * @param {string} variantId - The variant ID (e.g., 'eyes_normal', 'beak_sharp')
 * @returns {Promise<Object>} - Variant object
 */
export async function getVariant(variantId) {
  return await traitDb.getVariantById(variantId);
}

/**
 * Get SVG content for a specific variant
 * @param {string} traitType - The trait type (e.g., 'eyes', 'beak')
 * @param {string} variantKey - The variant key (e.g., 'normal', 'angry')
 * @param {string} view - The view ('front' or 'side')
 * @returns {Promise<string>} - The SVG content
 */
export async function getVariantSvg(traitType, variantKey, view) {
  // Check cache first
  if (svgCache[view] && svgCache[view][`${traitType}_${variantKey}`]) {
    return svgCache[view][`${traitType}_${variantKey}`];
  }
  
  try {
    // Load SVG from file
    const svgContent = await svgUtils.loadSvgFile(traitType, variantKey, view);
    
    if (svgContent) {
      // Extract just the inner SVG content
      const innerContent = svgUtils.extractSvgContent(svgContent);
      
      // Cache the result
      if (!svgCache[view]) svgCache[view] = {};
      svgCache[view][`${traitType}_${variantKey}`] = innerContent;
      
      return innerContent;
    }
    return null;
  } catch (error) {
    console.error(`Error loading SVG for ${traitType}/${variantKey}/${view}:`, error);
    return null;
  }
}

/**
 * Get all trait definitions with their variants and SVG content
 * (Provides backward compatibility with the original structure)
 * @returns {Promise<Object>} - Object with all trait definitions
 */
export async function getAllTraitDefinitions() {
  const traits = await traitDb.getAllTraits();
  const result = {};
  
  // Process each trait
  for (const trait of traits) {
    const traitId = trait.id;
    const variants = await traitDb.getVariantsByTraitId(traitId);
    
    // Create trait object
    result[traitId] = {
      name: trait.name,
      category: trait.category,
      variants: {}
    };
    
    // Process each variant
    for (const variant of variants) {
      const variantKey = variant.id.replace(`${traitId}_`, '');
      
      // Create variant object
      result[traitId].variants[variantKey] = {
        name: variant.name,
        description: variant.description,
        live: variant.live,
        rarityWeight: variant.rarityWeight
      };
      
      // Only load SVG content for live variants
      if (variant.live) {
        // Load front view SVG
        const frontSVG = await getVariantSvg(traitId, variantKey, 'front');
        if (frontSVG) {
          result[traitId].variants[variantKey].frontSVG = frontSVG;
        }
        
        // Load side view SVG
        const sideSVG = await getVariantSvg(traitId, variantKey, 'side');
        if (sideSVG) {
          result[traitId].variants[variantKey].sideSVG = sideSVG;
        }
      }
    }
  }
  
  return result;
}

/**
 * Clear the SVG cache
 */
export function clearCache() {
  svgCache.front = {};
  svgCache.side = {};
} 