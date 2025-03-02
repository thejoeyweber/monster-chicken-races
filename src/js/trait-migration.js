/**
 * Trait Migration Script
 * Migrates trait data from the original format to the new database and file structure
 */

import { traitDefinitions } from './trait-definitions.js';
import * as traitDb from './trait-db.js';
import * as svgUtils from './svg-utils.js';

// Function to save SVG content to a file
async function saveSvgToFile(svgContent, traitType, variantKey, view) {
  const filePath = svgUtils.getSvgPath(traitType, variantKey, view);
  
  // Create the SVG document
  const svgDocument = svgUtils.wrapAsSvgDocument(svgContent);
  
  // Try to save using the server if available
  const serverAvailable = await checkServerAvailability();
  
  if (serverAvailable) {
    // Use server to save SVG file
    try {
      const response = await fetch('http://localhost:3000/save-svg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          svgContent: svgDocument,
          traitType,
          variantKey,
          view
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log(`Server saved SVG: ${result.message}`);
      return filePath;
    } catch (error) {
      console.error('Error saving SVG via server:', error);
      // Fall back to client-side download
    }
  }
  
  // Client-side fallback using download
  const blob = new Blob([svgDocument], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  // Create folder path for user to know where to save
  const folderPath = `${svgUtils.SVG_BASE_PATH}/${traitType}/${view}/`;
  
  // For development purposes, we'll download the file
  const link = document.createElement('a');
  link.href = url;
  link.download = `${variantKey}.svg`;
  
  // Hide the link and add to document
  link.style.display = 'none';
  document.body.appendChild(link);
  
  // Show instruction to user
  console.log(`Please save this file to: ${folderPath}${variantKey}.svg`);
  
  // Simulate a click and remove the link
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
  
  console.log(`Created SVG file for ${traitType}/${view}/${variantKey}`);
  return filePath;
}

// Check if the SVG saver server is available
async function checkServerAvailability() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    
    const response = await fetch('http://localhost:3000', { 
      method: 'OPTIONS',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok || response.status === 204;
  } catch (error) {
    console.log('SVG server not available, using client-side download instead');
    return false;
  }
}

// Main migration function
export async function migrateTraits() {
  console.log('Starting trait migration');
  
  try {
    // Initialize the database
    await traitDb.initDatabase();
    console.log('Database initialized');
    
    // Process each trait type
    for (const [traitType, traitInfo] of Object.entries(traitDefinitions)) {
      console.log(`Processing trait type: ${traitType}`);
      
      // Create the trait record
      const trait = {
        id: traitType,
        name: traitInfo.name,
        category: traitInfo.category
      };
      
      // Save trait to database
      await traitDb.saveTrait(trait);
      console.log(`Saved trait: ${traitType}`);
      
      // Process each variant
      for (const [variantKey, variantInfo] of Object.entries(traitInfo.variants)) {
        console.log(`  Processing variant: ${variantKey}`);
        
        if (variantInfo.live) {
          // Process front view SVG
          if (variantInfo.frontSVG) {
            await saveSvgToFile(variantInfo.frontSVG, traitType, variantKey, 'front');
          }
          
          // Process side view SVG
          if (variantInfo.sideSVG) {
            await saveSvgToFile(variantInfo.sideSVG, traitType, variantKey, 'side');
          }
        }
        
        // Create variant record without SVG content (now stored as files)
        const variant = {
          id: `${traitType}_${variantKey}`,
          traitId: traitType,
          name: variantInfo.name,
          description: variantInfo.description,
          live: variantInfo.live,
          rarityWeight: variantInfo.rarityWeight
        };
        
        // Save variant to database
        await traitDb.saveVariant(variant);
        console.log(`  Saved variant: ${variantKey}`);
      }
    }
    
    console.log('Trait migration completed successfully');
    return true;
  } catch (error) {
    console.error('Error during trait migration:', error);
    return false;
  }
}

// Helper function to create all required directories
export async function createDirectories() {
  const traitTypes = Object.keys(traitDefinitions);
  const views = ['front', 'side'];
  
  for (const traitType of traitTypes) {
    for (const view of views) {
      const dirPath = `${svgUtils.SVG_BASE_PATH}/${traitType}/${view}`;
      console.log(`Ensuring directory exists: ${dirPath}`);
      // Note: In a real browser environment, we cannot directly create directories
      // This would require server-side code or a more complex solution
    }
  }
}

// UI for migration process
export function createMigrationUI() {
  const container = document.createElement('div');
  container.id = 'migration-ui';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    padding: 15px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
  `;
  
  const title = document.createElement('h3');
  title.textContent = 'Trait Migration Tool';
  title.style.marginTop = '0';
  
  const description = document.createElement('p');
  description.textContent = 'Migrate trait definitions to the new database and file structure.';
  
  const status = document.createElement('div');
  status.id = 'migration-status';
  status.style.cssText = `
    margin: 10px 0;
    padding: 8px;
    background-color: #eee;
    border-radius: 3px;
  `;
  status.textContent = 'Ready to migrate';
  
  const button = document.createElement('button');
  button.textContent = 'Start Migration';
  button.style.cssText = `
    padding: 8px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  
  button.addEventListener('click', async () => {
    button.disabled = true;
    status.textContent = 'Migration in progress...';
    
    try {
      await createDirectories();
      const result = await migrateTraits();
      
      if (result) {
        status.textContent = 'Migration completed successfully!';
        status.style.backgroundColor = '#dff0d8';
      } else {
        status.textContent = 'Migration failed. Check console for errors.';
        status.style.backgroundColor = '#f2dede';
      }
    } catch (error) {
      console.error('Migration error:', error);
      status.textContent = `Error: ${error.message}`;
      status.style.backgroundColor = '#f2dede';
    } finally {
      button.disabled = false;
    }
  });
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.cssText = `
    float: right;
    padding: 3px 8px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-bottom: 10px;
  `;
  
  closeButton.addEventListener('click', () => {
    document.body.removeChild(container);
  });
  
  container.appendChild(closeButton);
  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(status);
  container.appendChild(button);
  
  document.body.appendChild(container);
}

// Auto-run migration when script is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Trait migration script loaded');
  // Comment out the line below to disable auto-creation of the UI
  createMigrationUI();
}); 