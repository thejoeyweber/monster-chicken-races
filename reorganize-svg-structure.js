/**
 * SVG Directory Reorganizer
 * Reorganizes SVG files from trait/front/variant.svg to category/trait/variant/front.svg
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Promisify necessary fs functions
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const access = promisify(fs.access);
const readFile = promisify(fs.readFile);

// Get the absolute path of the current directory
const currentDir = process.cwd();

// Base directories - use absolute paths for reliability
const CURRENT_BASE_DIR = path.join(currentDir, 'src', 'assets', 'svgs', 'traits');
const NEW_BASE_DIR = path.join(currentDir, 'src', 'assets', 'svgs', 'traits-new');

// Trait category mapping from trait-definitions.js
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

// Ensure a directory exists, creating it if it doesn't
async function ensureDir(dirPath) {
  try {
    await access(dirPath);
    console.log(`Directory exists: ${dirPath}`);
  } catch (error) {
    // Directory doesn't exist, so create it
    console.log(`Creating directory: ${dirPath}`);
    try {
      await mkdir(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    } catch (mkdirErr) {
      console.error(`Error creating directory ${dirPath}:`, mkdirErr);
    }
  }
}

// Get the category for a trait
function getCategoryForTrait(traitType) {
  return TRAIT_CATEGORIES[traitType] || 'misc'; // Default to 'misc' if not found
}

// Process a single view directory (front or side)
async function processViewDirectory(traitType, viewType, viewDir) {
  try {
    console.log(`Processing view directory: ${viewDir}`);
    const files = await readdir(viewDir);
    console.log(`Found ${files.length} files in ${viewDir}`);
    
    // Process each variant file
    for (const file of files) {
      if (!file.endsWith('.svg')) continue;
      
      const variantName = path.basename(file, '.svg');
      const category = getCategoryForTrait(traitType);
      
      // Create new directory structure: category/trait/variant
      const newVariantDir = path.join(NEW_BASE_DIR, category, traitType, variantName);
      await ensureDir(newVariantDir);
      
      // Create new file paths
      const sourcePath = path.join(viewDir, file);
      const destPath = path.join(newVariantDir, `${viewType}.svg`);
      
      // Copy the file
      try {
        await copyFile(sourcePath, destPath);
        console.log(`Copied ${sourcePath} to ${destPath}`);
      } catch (copyError) {
        console.error(`Error copying file from ${sourcePath} to ${destPath}:`, copyError);
      }
    }
  } catch (error) {
    console.error(`Error processing ${viewDir}:`, error);
  }
}

// Process a single trait directory
async function processTraitDirectory(traitType, traitDir) {
  try {
    console.log(`Processing trait directory: ${traitDir}`);
    const viewDirs = await readdir(traitDir);
    
    for (const viewDir of viewDirs) {
      const fullViewDir = path.join(traitDir, viewDir);
      
      // Check if it's a directory
      try {
        const stats = fs.statSync(fullViewDir);
        if (!stats.isDirectory()) continue;
        
        // Process front/side directories
        if (viewDir === 'front' || viewDir === 'side') {
          await processViewDirectory(traitType, viewDir, fullViewDir);
        }
      } catch (statError) {
        console.error(`Error checking directory ${fullViewDir}:`, statError);
      }
    }
  } catch (error) {
    console.error(`Error processing ${traitDir}:`, error);
  }
}

// Main function to reorganize the directory structure
async function reorganizeSVGStructure() {
  try {
    console.log('Starting SVG directory reorganization...');
    console.log(`Current directory: ${currentDir}`);
    console.log(`Source directory: ${CURRENT_BASE_DIR}`);
    console.log(`Destination directory: ${NEW_BASE_DIR}`);
    
    // Ensure the new base directory exists
    await ensureDir(NEW_BASE_DIR);
    
    // Get all trait directories
    const traitDirs = await readdir(CURRENT_BASE_DIR);
    console.log(`Found ${traitDirs.length} trait directories`);
    
    // Process each trait directory
    for (const traitDir of traitDirs) {
      const fullTraitDir = path.join(CURRENT_BASE_DIR, traitDir);
      
      // Check if it's a directory
      try {
        const stats = fs.statSync(fullTraitDir);
        if (!stats.isDirectory()) continue;
        
        await processTraitDirectory(traitDir, fullTraitDir);
      } catch (statError) {
        console.error(`Error checking directory ${fullTraitDir}:`, statError);
      }
    }
    
    console.log('SVG directory reorganization complete!');
    console.log(`New structure created at: ${NEW_BASE_DIR}`);
    console.log('After verifying the new structure, you can rename traits-new to traits and update the code references.');
    
  } catch (error) {
    console.error('Error reorganizing SVG directory structure:', error);
  }
}

// Run the reorganization
reorganizeSVGStructure().then(() => {
  console.log('Script execution complete');
}).catch(err => {
  console.error('Unhandled error:', err);
}); 