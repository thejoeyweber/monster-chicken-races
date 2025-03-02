/**
 * Character Lab Adapter
 * Adapts the new trait loading system to work with existing character-lab.js
 */

import * as traitLoader from './trait-loader.js';

// Initialize the loader when the script loads
let initialized = false;
let traitDefinitions = null;

// Initialize and load all trait definitions with better error handling
export async function initialize() {
  if (initialized) return true;
  
  try {
    // Initialize the trait loader
    const loaderInitialized = await traitLoader.initialize();
    if (!loaderInitialized) {
      console.warn('Trait loader initialization failed, using fallback definitions');
      traitDefinitions = createFallbackTraitDefinitions();
    } else {
      // Get trait definitions from the loader
      try {
        traitDefinitions = await traitLoader.getAllTraitDefinitions();
        
        // Verify we have at least some basic traits
        if (!traitDefinitions || Object.keys(traitDefinitions).length === 0) {
          console.warn('No trait definitions returned, using fallback definitions');
          traitDefinitions = createFallbackTraitDefinitions();
        }
      } catch (defError) {
        console.error('Error loading trait definitions:', defError);
        traitDefinitions = createFallbackTraitDefinitions();
      }
    }
    
    initialized = true;
    
    // Replace the global traitDefinitions object if it exists
    if (window.chickenLab && window.chickenLab.traitDefinitions) {
      window.chickenLab.traitDefinitions = traitDefinitions;
    }
    
    // If chickenLab doesn't exist yet, set up a global traitDefinitions 
    // that can be used when chickenLab is instantiated
    if (!window.chickenLab) {
      window.traitDefinitions = traitDefinitions;
    }
    
    console.log('Character Lab Adapter initialized with trait definitions:', traitDefinitions);
    return true;
  } catch (error) {
    console.error('Error initializing Character Lab Adapter:', error);
    // Create minimal fallback trait definitions to prevent UI errors
    traitDefinitions = createFallbackTraitDefinitions();
    initialized = true; // Mark as initialized to prevent repeated failures
    
    // Update global references
    if (window.chickenLab && window.chickenLab.traitDefinitions) {
      window.chickenLab.traitDefinitions = traitDefinitions;
    }
    if (!window.chickenLab) {
      window.traitDefinitions = traitDefinitions;
    }
    
    return true; // Return true to allow the app to function with fallbacks
  }
}

// Helper function to create fallback trait definitions when database loading fails
function createFallbackTraitDefinitions() {
  return {
    eyes: {
      name: "Eyes",
      category: "head",
      variants: {
        normal: {
          name: "Normal",
          description: "Standard chicken eyes",
          live: true,
          frontSVG: `
            <!-- Left eye -->
            <circle cx="-8" cy="-2" r="6" fill="white"/>
            <circle cx="-8" cy="-2" r="4" fill="black"/>
            <circle cx="-9" cy="-3" r="1.5" fill="white"/>
            
            <!-- Right eye -->
            <circle cx="8" cy="-2" r="6" fill="white"/>
            <circle cx="8" cy="-2" r="4" fill="black"/>
            <circle cx="7" cy="-3" r="1.5" fill="white"/>
          `,
          sideSVG: `
            <circle cx="8" cy="-2" r="6" fill="white"/>
            <circle cx="8" cy="-2" r="4" fill="black"/>
            <circle cx="7" cy="-3" r="1.5" fill="white"/>
          `,
          rarityWeight: 1.0
        }
      }
    },
    beak: {
      name: "Beak",
      category: "head",
      variants: {
        normal: {
          name: "Normal",
          description: "Standard chicken beak",
          live: true,
          frontSVG: `
            <path d="M0,5 L-6,12 L6,12 Z" fill="orange"/>
          `,
          sideSVG: `
            <path d="M10,0 L25,0 L17,8 Z" fill="orange"/>
          `,
          rarityWeight: 1.0
        }
      }
    },
    top: {
      name: "Top",
      category: "head",
      variants: {
        normal: {
          name: "Normal",
          description: "Standard chicken comb",
          live: true,
          frontSVG: `
            <path d="M0,-15 L-4,-25 L0,-20 L4,-25 L0,-15 Z" fill="red"/>
          `,
          sideSVG: `
            <path d="M0,-15 L-4,-25 L0,-20 L4,-25 L0,-15 Z" fill="red"/>
          `,
          rarityWeight: 1.0
        }
      }
    },
    wattle: {
      name: "Wattle",
      category: "head",
      variants: {
        normal: {
          name: "Normal",
          description: "Standard chicken wattle",
          live: true,
          frontSVG: `
            <path d="M0,12 L-5,25 L5,25 Z" fill="#cc0000"/>
          `,
          sideSVG: `
            <path d="M0,12 L-5,25 L0,25 Z" fill="#cc0000"/>
          `,
          rarityWeight: 1.0
        }
      }
    }
  };
}

// Get the trait definitions in the format expected by character-lab.js
export function getTraitDefinitions() {
  if (!initialized) {
    console.warn('Character Lab Adapter not initialized. Call initialize() first.');
  }
  
  return traitDefinitions || {};
}

// Get a specific trait variant's SVG content
export async function getVariantSvg(traitType, variantKey, view) {
  if (!initialized) await initialize();
  
  return await traitLoader.getVariantSvg(traitType, variantKey, view);
}

// Patch the ChickenLab class to use our loader
export function patchChickenLab() {
  // Try again if ChickenLab isn't available yet
  if (!window.ChickenLab) {
    console.log('ChickenLab class not found. Will attempt to patch later.');
    
    // Set up a MutationObserver to detect when the ChickenLab class becomes available
    setTimeout(() => {
      if (window.ChickenLab) {
        console.log('ChickenLab class found on retry. Patching now.');
        performPatching();
      } else {
        console.warn('ChickenLab class still not found after delay. Using fallback approach.');
        // Make sure traitDefinitions is available globally for ChickenLab
        window.traitDefinitions = traitDefinitions;
      }
    }, 1000); // Give it a second for scripts to load
    
    return false;
  }
  
  return performPatching();
}

// Actual patching logic separated for reuse
function performPatching() {
  if (!window.ChickenLab) return false;
  
  const originalChickenLab = window.ChickenLab;
  
  // Create a patched version of ChickenLab
  window.ChickenLab = class extends originalChickenLab {
    constructor() {
      super();
      this._ensureTraitDefinitionsLoaded();
    }
    
    // Load trait definitions from our system instead of the original
    async _ensureTraitDefinitionsLoaded() {
      if (!initialized) {
        await initialize();
      }
      
      // Update the trait definitions property
      this.traitDefinitions = traitDefinitions;
    }
    
    // Override setupTraitUI to ensure traits are loaded
    async setupTraitUI() {
      await this._ensureTraitDefinitionsLoaded();
      
      // Call the original method
      super.setupTraitUI();
    }
  };
  
  console.log('ChickenLab class patched to use new trait system');
  return true;
}

// Auto-initialize when loaded
document.addEventListener('DOMContentLoaded', () => {
  initialize().then(success => {
    if (success) {
      patchChickenLab();
    }
  });
}); 