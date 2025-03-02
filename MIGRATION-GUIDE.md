# Trait System Migration Guide

This document provides step-by-step instructions for migrating the chicken traits from the old embedded format to the new modular system.

## Prerequisites

- Node.js (if using the server-side SVG saver)
- Modern browser with IndexedDB support (Chrome, Firefox, Edge, etc.)
- Local development server (e.g., Python's built-in HTTP server)

## Migration Steps

### 1. Prepare the Environment

Make sure your directory structure is ready:

```
src/assets/svgs/traits/eyes/front/
src/assets/svgs/traits/eyes/side/
src/assets/svgs/traits/beak/front/
src/assets/svgs/traits/beak/side/
src/assets/svgs/traits/top/front/
src/assets/svgs/traits/top/side/
```

These directories should be created automatically during the migration process, but you can create them manually if needed.

### 2. Start the SVG Saver Server (Optional but Recommended)

If you want SVGs to be automatically saved to the correct locations, start the Node.js server:

```bash
node tools/save-svg.js
```

This will start a server on http://localhost:3000 that helps save SVG files to the right location.

### 3. Run the Local Development Server

Start your development server (if not already running):

```bash
python -m http.server
```

### 4. Open the Character Lab

Open your browser and navigate to the character lab:

```
http://localhost:8000/character-lab.html
```

### 5. Run the Migration Tool

The migration UI should appear automatically in the top-right corner. If not:

1. Open the browser console (F12)
2. Enter: `window.createMigrationUI()`
3. Click the "Start Migration" button in the UI

### 6. Handle SVG Files

If you're using the SVG Saver server, files will be saved automatically.

If not, the browser will prompt you to download SVG files one by one:

1. Save each file with its suggested name
2. Move it to the correct directory as indicated in the console

For example, if the console says `Please save this file to: src/assets/svgs/traits/eyes/front/normal.svg`, save the downloaded file to that path.

### 7. Verify the Migration

Run the validation script to ensure all files were migrated correctly:

```bash
node tools/validate-migration.js
```

This will count the SVG files and compare them to the expected number of variants.

### 8. Test the New System

After migration:

1. Refresh the character lab page
2. Verify that all traits load correctly
3. Test various combinations of traits
4. Try animations and other features to ensure everything works

### 9. Backup and Cleanup (Optional)

If everything is working correctly, you can:

1. Backup the original trait-definitions.js file
2. Remove SVG content from the original file (keeping just metadata)

## Troubleshooting

### Database Issues

If you encounter database errors:

1. Open browser dev tools
2. Go to Application > IndexedDB > ChickenTraitsDB
3. Delete the database
4. Refresh and try again

### Missing SVG Files

If some SVG files are missing:

1. Check the console for download errors
2. Verify paths in the browser network tab
3. Re-run the migration for just the missing files

### Browser Compatibility

If you encounter browser issues:

1. Try a different browser (Chrome usually works best)
2. Check browser console for specific errors
3. Ensure your browser supports IndexedDB

## Manual Migration

If automated migration doesn't work, you can manually:

1. Extract SVG content from trait-definitions.js
2. Save each SVG as an individual file in the correct directory
3. Use the trait-db.js API to add metadata to the database:

```javascript
import * as traitDb from './trait-db.js';

await traitDb.initDatabase();
await traitDb.saveTrait({
  id: 'eyes',
  name: 'Eyes',
  category: 'head'
});
await traitDb.saveVariant({
  id: 'eyes_normal',
  traitId: 'eyes',
  name: 'Normal',
  description: 'Standard chicken eyes',
  live: true,
  rarityWeight: 1.0
});
``` 