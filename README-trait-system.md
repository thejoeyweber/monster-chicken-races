# Chicken Traits System

This document explains the new modular trait system implemented for the Monster Chicken Races game.

## Overview

The trait system has been redesigned to:

1. Store SVG files in individual files rather than embedding them in JavaScript
2. Use a local database (IndexedDB) to store trait metadata
3. Provide a more flexible and scalable architecture
4. Improve performance by loading traits on-demand

## Directory Structure

```
src/
  ├── assets/
  │   └── svgs/
  │       └── traits/
  │           ├── eyes/
  │           │   ├── front/
  │           │   │   ├── normal.svg
  │           │   │   ├── angry.svg
  │           │   │   └── ...
  │           │   └── side/
  │           │       ├── normal.svg
  │           │       ├── angry.svg
  │           │       └── ...
  │           ├── beak/
  │           │   ├── front/
  │           │   └── side/
  │           └── top/
  │               ├── front/
  │               └── side/
  └── js/
      ├── trait-definitions.js (legacy, still used by adapter)
      ├── trait-db.js (database operations)
      ├── svg-utils.js (SVG file operations)
      ├── trait-loader.js (loads traits from DB and files)
      ├── character-lab-adapter.js (connects new system to old code)
      └── trait-migration.js (migrates from old to new format)
```

## Key Components

### Database (trait-db.js)

The database module handles storing and retrieving trait metadata using IndexedDB. It provides these key functions:

- `initDatabase()` - Creates and initializes the database
- `saveTrait()` - Saves trait metadata
- `saveVariant()` - Saves variant metadata 
- `getTraitById()` - Retrieves a trait by ID
- `getVariantsByTraitId()` - Gets all variants for a trait

### SVG Utilities (svg-utils.js)

Handles loading and saving SVG files:

- `loadSvgFile()` - Loads an SVG file from the filesystem
- `getSvgPath()` - Gets the path for an SVG file
- `svgToDataUrl()` - Converts SVG to a data URL
- `wrapAsSvgDocument()` - Wraps SVG content in proper XML

### Trait Loader (trait-loader.js)

Provides the API for loading traits:

- `initialize()` - Sets up the loader
- `getTrait()` - Gets trait metadata
- `getVariantsForTrait()` - Gets variants for a trait
- `getVariantSvg()` - Gets SVG content for a variant
- `getAllTraitDefinitions()` - Gets all traits in the legacy format

### Migration Tool (trait-migration.js)

Handles migration from the old system:

- `migrateTraits()` - Moves traits to the database and SVG files
- `createMigrationUI()` - Provides a UI for the migration

## Using the New System

### Loading Traits

Instead of directly accessing embedded SVGs, use the trait loader:

```javascript
import * as traitLoader from './trait-loader.js';

// Initialize
await traitLoader.initialize();

// Get all trait types
const traits = await traitLoader.getAllTraitTypes();

// Get variants for a trait
const eyeVariants = await traitLoader.getVariantsForTrait('eyes');

// Get SVG content for a specific variant
const eyesSvg = await traitLoader.getVariantSvg('eyes', 'normal', 'front');
```

### Backward Compatibility

The character-lab-adapter.js module provides backward compatibility with the old system. It's automatically loaded in character-lab.html.

## Migration Process

To migrate existing traits:

1. Ensure all directories are created (happens automatically)
2. Run the migration tool by loading the character-lab.html page
3. Click "Start Migration" in the migration UI that appears
4. Follow the prompts to complete the migration

If using the Node.js helper:

1. Run `node tools/save-svg.js` to start the SVG saver server
2. Then run the migration in the browser
3. Validate with `node tools/validate-migration.js`

## Adding New Traits

To add a new trait:

1. Create the SVG files in the appropriate directories
2. Use the trait-db.js functions to add metadata to the database:

```javascript
import * as traitDb from './trait-db.js';

// Add a new trait
await traitDb.saveTrait({
  id: 'newTrait',
  name: 'New Trait',
  category: 'head'
});

// Add a variant
await traitDb.saveVariant({
  id: 'newTrait_variant1',
  traitId: 'newTrait',
  name: 'Variant 1',
  description: 'A new variant',
  live: true,
  rarityWeight: 1.0
});
``` 