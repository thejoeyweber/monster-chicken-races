# Welcome to the New Chicken Traits System!

## What's New

We've completely redesigned how chicken traits are stored and managed in Monster Chicken Races:

1. **SVG Files**: All SVG content is now stored in individual files instead of embedded in JavaScript.
2. **Local Database**: Trait metadata is stored in IndexedDB for better performance and flexibility.
3. **Visual Editor**: A new visual editor lets you edit traits and their SVGs directly in the browser.
4. **Modular System**: The new system is more modular and scalable for adding new traits.

## Key Benefits

- **Faster Loading**: SVGs are loaded on-demand, improving page load performance
- **Easier Editing**: Edit SVGs directly in the browser without editing code
- **Better Organization**: Files are organized by trait type and view
- **Simplified Development**: Clear API for accessing and modifying traits

## Getting Started

### For Users

1. Visit the [Character Lab](./character-lab.html) page
2. Look for the "Migrate Traits" panel in the top-right corner
3. Click "Start Migration" to move your existing traits to the new system
4. After migration, refresh the page to use the new system
5. Use the edit buttons (pencil icon) on trait variants to edit them

### For Developers

Check out these resources:

- [README-trait-system.md](./README-trait-system.md) - Technical documentation
- [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) - Detailed migration steps
- [src/js/trait-loader.js](./src/js/trait-loader.js) - API for loading traits
- [src/js/trait-editor.js](./src/js/trait-editor.js) - API for editing traits

## File Structure

The new system organizes SVG files in a clear directory structure:

```
src/assets/svgs/traits/
├── eyes/
│   ├── front/
│   │   ├── normal.svg
│   │   ├── angry.svg
│   │   └── ...
│   └── side/
│       ├── normal.svg
│       ├── angry.svg
│       └── ...
├── beak/
└── top/
```

## Editing Traits

To edit a trait:

1. In Character Lab, hover over any variant and click the pencil icon
2. Use the "Metadata" tab to edit trait properties
3. Use the "SVG Code" tab to edit the SVG content
4. Use the "Preview" tab to see how your changes look
5. Click "Save Changes" when you're done

## Creating New Traits

To create a new trait variant:

1. Edit an existing variant similar to what you want
2. Change the Variant Key to a new value
3. Make your changes to the SVG and metadata
4. Save the new variant

## Need Help?

If you encounter any issues with the new trait system:

- Check the console for error messages (F12 > Console)
- Try refreshing the page
- Look in the migration guide for troubleshooting tips
- If all else fails, the system can fallback to the original trait system

Enjoy the new trait system! 