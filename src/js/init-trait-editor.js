/**
 * Initialize Trait Editor
 * This script initializes the trait editor and adds edit buttons to trait variant elements
 */

import * as traitEditor from './trait-editor.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing trait editor...');
  
  // Initialize the editor
  traitEditor.initialize().then(() => {
    // Add a mutation observer to watch for new variant elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          // Check if any variant boxes were added
          const addedVariantBoxes = Array.from(mutation.addedNodes)
            .filter(node => node.nodeType === Node.ELEMENT_NODE)
            .flatMap(node => {
              if (node.classList && node.classList.contains('variant-box')) {
                return [node];
              }
              const children = node.querySelectorAll ? node.querySelectorAll('.variant-box') : [];
              return Array.from(children);
            });
          
          if (addedVariantBoxes.length) {
            // Add edit buttons to new variant boxes
            traitEditor.addEditButtonsToElements();
          }
        }
      });
    });
    
    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Add edit buttons to existing variant boxes
    traitEditor.addEditButtonsToElements();
    
    // Add global functions for debugging/development
    window.openTraitEditor = traitEditor.openEditor;
    
    console.log('Trait editor initialization complete');
  });
}); 