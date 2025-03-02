/**
 * Trait Database Manager
 * Provides utilities for working with the trait database
 */

import * as traitDb from './trait-db.js';
import * as svgUtils from './svg-utils.js';

/**
 * Check all database entries against the file system and update the database
 * to match the SVG file existence
 * @returns {Promise<Object>} - Statistics about the update
 */
export async function updateDatabaseFromSvgFiles() {
  console.log('Starting database record update...');

  try {
    // Initialize database
    await traitDb.initDatabase();
    console.log('Database initialized');

    // Get all traits and variants
    const traits = await traitDb.getAllTraits();
    console.log(`Found ${traits.length} traits in database`);

    // Track statistics
    const stats = {
      traitsProcessed: 0,
      variantsProcessed: 0,
      svgsFound: 0,
      svgsMissing: 0,
      recordsUpdated: 0
    };

    // Process each trait
    for (const trait of traits) {
      const traitId = trait.id;
      const variants = await traitDb.getVariantsByTraitId(traitId);
      console.log(`Processing trait: ${traitId} with ${variants.length} variants`);
      stats.traitsProcessed++;

      // Process each variant
      for (const variant of variants) {
        const variantKey = variant.id.replace(`${traitId}_`, '');
        stats.variantsProcessed++;

        // Check front view SVG
        const hasFrontSVG = await svgUtils.doesSvgExist(traitId, variantKey, 'front');
        
        // Check side view SVG
        const hasSideSVG = await svgUtils.doesSvgExist(traitId, variantKey, 'side');
        
        // Determine overall SVG existence
        const hasSVG = hasFrontSVG || hasSideSVG;
        
        // Track statistics
        if (hasSVG) {
          stats.svgsFound++;
        } else {
          stats.svgsMissing++;
          console.log(`  Missing SVGs for ${traitId}_${variantKey} - Front: ${hasFrontSVG}, Side: ${hasSideSVG}`);
        }

        // Update database
        // Only update if the 'live' status needs to change
        const shouldBeLive = hasSVG;
        if (variant.live !== shouldBeLive) {
          console.log(`  Updating ${traitId}_${variantKey}: live = ${shouldBeLive}`);
          variant.live = shouldBeLive;
          await traitDb.saveVariant(variant);
          stats.recordsUpdated++;
        }
      }
    }

    // Print statistics
    console.log('\nDatabase update complete:');
    console.log(`Traits processed: ${stats.traitsProcessed}`);
    console.log(`Variants processed: ${stats.variantsProcessed}`);
    console.log(`SVGs found: ${stats.svgsFound}`);
    console.log(`SVGs missing: ${stats.svgsMissing}`);
    console.log(`Records updated: ${stats.recordsUpdated}`);
    
    return stats;
  } catch (error) {
    console.error('Error updating database records:', error);
    throw error;
  }
}

/**
 * Get statistics about the database and file system status
 * @returns {Promise<Object>} - Database statistics
 */
export async function getDatabaseStats() {
  try {
    // Initialize database
    await traitDb.initDatabase();
    
    // Get all traits and variants
    const traits = await traitDb.getAllTraits();
    const variants = await traitDb.getAllVariants();
    
    // Count variants by live status
    const liveVariants = variants.filter(v => v.live).length;
    const notLiveVariants = variants.length - liveVariants;
    
    // Return stats
    return {
      traitCount: traits.length,
      variantCount: variants.length,
      liveVariants,
      notLiveVariants
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return {
      error: error.message
    };
  }
}

/**
 * Add a simple admin panel to the UI for database management
 */
export function addDatabaseAdminPanel() {
  // Check if we need to add the admin panel
  if (document.getElementById('trait-db-admin')) {
    return; // Already exists
  }
  
  // Create the panel element
  const panel = document.createElement('div');
  panel.id = 'trait-db-admin';
  panel.style.position = 'fixed';
  panel.style.bottom = '10px';
  panel.style.right = '10px';
  panel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  panel.style.color = 'white';
  panel.style.padding = '10px';
  panel.style.borderRadius = '5px';
  panel.style.zIndex = '1000';
  panel.style.fontSize = '14px';
  panel.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  
  // Add panel content
  panel.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 10px;">Trait Database Admin</div>
    <div id="db-stats">Loading database stats...</div>
    <button id="update-db-btn" style="margin-top: 10px; padding: 5px 10px; background: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer;">Update DB from SVG Files</button>
    <div id="update-result" style="margin-top: 10px; font-size: 12px;"></div>
    <button id="toggle-admin-panel" style="position: absolute; top: 5px; right: 5px; background: none; border: none; color: white; cursor: pointer;">×</button>
  `;
  
  // Add the panel to the document
  document.body.appendChild(panel);
  
  // Load initial stats
  loadDatabaseStats();
  
  // Add event listeners
  document.getElementById('update-db-btn').addEventListener('click', async () => {
    const resultEl = document.getElementById('update-result');
    resultEl.innerHTML = 'Updating database...';
    resultEl.style.color = '#3498db';
    
    try {
      const stats = await updateDatabaseFromSvgFiles();
      resultEl.innerHTML = `
        Update completed:<br>
        - ${stats.traitsProcessed} traits processed<br>
        - ${stats.variantsProcessed} variants processed<br>
        - ${stats.svgsFound} SVGs found<br>
        - ${stats.svgsMissing} SVGs missing<br>
        - ${stats.recordsUpdated} records updated
      `;
      resultEl.style.color = '#2ecc71';
      
      // Refresh stats
      loadDatabaseStats();
    } catch (error) {
      resultEl.innerHTML = `Error: ${error.message}`;
      resultEl.style.color = '#e74c3c';
    }
  });
  
  // Toggle panel visibility
  document.getElementById('toggle-admin-panel').addEventListener('click', () => {
    panel.style.display = 'none';
  });
  
  // Add a button to show the panel again
  const showButton = document.createElement('button');
  showButton.id = 'show-admin-panel';
  showButton.textContent = 'DB Admin';
  showButton.style.position = 'fixed';
  showButton.style.bottom = '10px';
  showButton.style.right = '10px';
  showButton.style.zIndex = '999';
  showButton.style.backgroundColor = '#3498db';
  showButton.style.color = 'white';
  showButton.style.border = 'none';
  showButton.style.borderRadius = '3px';
  showButton.style.padding = '5px 10px';
  showButton.style.cursor = 'pointer';
  showButton.style.display = 'none';
  
  showButton.addEventListener('click', () => {
    panel.style.display = 'block';
    showButton.style.display = 'none';
  });
  
  document.body.appendChild(showButton);
}

// Helper function to load and display database stats
async function loadDatabaseStats() {
  const statsEl = document.getElementById('db-stats');
  if (!statsEl) return;
  
  try {
    const stats = await getDatabaseStats();
    statsEl.innerHTML = `
      <div>Traits: ${stats.traitCount}</div>
      <div>Variants: ${stats.variantCount}</div>
      <div>Live variants: ${stats.liveVariants}</div>
      <div>Disabled variants: ${stats.notLiveVariants}</div>
    `;
  } catch (error) {
    statsEl.innerHTML = `Error loading stats: ${error.message}`;
  }
}

// Auto-initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure other components are loaded first
  setTimeout(() => {
    addDatabaseAdminPanel();
  }, 1000);
}); 