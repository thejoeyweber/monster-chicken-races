/**
 * Trait Editor
 * Provides UI and functionality for editing traits, variants, and SVG files
 */

import * as traitDb from './trait-db.js';
import * as traitLoader from './trait-loader.js';
import * as svgUtils from './svg-utils.js';

// Current state
let currentTrait = null;
let currentVariant = null;
let currentView = 'front';
let editorInitialized = false;
let traitsLoaded = false;

// Initialize the module
export async function initialize() {
  if (editorInitialized) return true;
  
  try {
    await traitLoader.initialize();
    traitsLoaded = true;
    
    // Create editor UI if it doesn't exist
    if (!document.getElementById('trait-editor-container')) {
      createEditorUI();
    }
    
    editorInitialized = true;
    console.log('Trait editor initialized');
    return true;
  } catch (error) {
    console.error('Error initializing trait editor:', error);
    return false;
  }
}

// Open the editor UI
export async function openEditor(traitType, variantKey, view = 'front') {
  if (!editorInitialized) {
    await initialize();
  }
  
  try {
    // Load trait and variant data
    currentTrait = await traitLoader.getTrait(traitType);
    currentVariant = await traitLoader.getVariant(`${traitType}_${variantKey}`);
    currentView = view;
    
    if (!currentTrait || !currentVariant) {
      console.error(`Trait or variant not found: ${traitType}/${variantKey}`);
      return false;
    }
    
    // Load SVG content
    const svgContent = await traitLoader.getVariantSvg(traitType, variantKey, view);
    
    // Show the editor UI
    document.getElementById('trait-editor-container').classList.remove('hidden');
    
    // Update editor UI with trait/variant info
    document.getElementById('editor-trait-name').textContent = currentTrait.name;
    document.getElementById('editor-variant-name').textContent = currentVariant.name;
    document.getElementById('editor-view-name').textContent = view;
    
    // Set form fields
    document.getElementById('edit-trait-id').value = currentTrait.id;
    document.getElementById('edit-trait-name').value = currentTrait.name;
    document.getElementById('edit-trait-category').value = currentTrait.category;
    
    document.getElementById('edit-variant-id').value = variantKey;
    document.getElementById('edit-variant-name').value = currentVariant.name;
    document.getElementById('edit-variant-description').value = currentVariant.description || '';
    document.getElementById('edit-variant-rarity').value = currentVariant.rarityWeight || 1.0;
    document.getElementById('edit-variant-live').checked = currentVariant.live;
    
    // Set SVG content
    document.getElementById('svg-code-editor').value = svgContent || '';
    updateSvgPreview(svgContent);
    
    // Activate view tab
    setActiveViewTab(view);
    
    return true;
  } catch (error) {
    console.error('Error opening trait editor:', error);
    return false;
  }
}

// Create the editor UI
function createEditorUI() {
  const container = document.createElement('div');
  container.id = 'trait-editor-container';
  container.className = 'trait-editor-container hidden';
  
  container.innerHTML = `
    <div class="trait-editor-overlay"></div>
    <div class="trait-editor-panel">
      <div class="trait-editor-header">
        <h2>Edit Trait: <span id="editor-trait-name"></span> / <span id="editor-variant-name"></span> / <span id="editor-view-name"></span></h2>
        <button id="editor-close-btn" class="editor-btn">×</button>
      </div>
      
      <div class="trait-editor-tabs">
        <button id="tab-metadata" class="editor-tab-btn active">Metadata</button>
        <button id="tab-svg" class="editor-tab-btn">SVG Code</button>
        <button id="tab-preview" class="editor-tab-btn">Preview</button>
      </div>
      
      <div class="trait-editor-content">
        <div id="panel-metadata" class="editor-panel active">
          <div class="editor-section">
            <h3>Trait Properties</h3>
            <div class="form-group">
              <label for="edit-trait-id">ID:</label>
              <input type="text" id="edit-trait-id" readonly>
            </div>
            <div class="form-group">
              <label for="edit-trait-name">Name:</label>
              <input type="text" id="edit-trait-name">
            </div>
            <div class="form-group">
              <label for="edit-trait-category">Category:</label>
              <input type="text" id="edit-trait-category">
            </div>
          </div>
          
          <div class="editor-section">
            <h3>Variant Properties</h3>
            <div class="form-group">
              <label for="edit-variant-id">Variant Key:</label>
              <input type="text" id="edit-variant-id" readonly>
            </div>
            <div class="form-group">
              <label for="edit-variant-name">Name:</label>
              <input type="text" id="edit-variant-name">
            </div>
            <div class="form-group">
              <label for="edit-variant-description">Description:</label>
              <textarea id="edit-variant-description"></textarea>
            </div>
            <div class="form-group">
              <label for="edit-variant-rarity">Rarity Weight:</label>
              <input type="number" id="edit-variant-rarity" min="0" max="1" step="0.1">
            </div>
            <div class="form-group">
              <label for="edit-variant-live">Live:</label>
              <input type="checkbox" id="edit-variant-live">
            </div>
          </div>
        </div>
        
        <div id="panel-svg" class="editor-panel">
          <div class="editor-section">
            <h3>SVG Code</h3>
            <div class="svg-view-tabs">
              <button id="view-tab-front" class="view-tab-btn active">Front</button>
              <button id="view-tab-side" class="view-tab-btn">Side</button>
            </div>
            <textarea id="svg-code-editor" class="code-editor" spellcheck="false"></textarea>
          </div>
        </div>
        
        <div id="panel-preview" class="editor-panel">
          <div class="editor-section">
            <h3>SVG Preview</h3>
            <div class="svg-preview-container">
              <div id="svg-preview"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="trait-editor-footer">
        <button id="editor-cancel-btn" class="editor-btn secondary">Cancel</button>
        <button id="editor-save-btn" class="editor-btn primary">Save Changes</button>
      </div>
    </div>
  `;
  
  // Add CSS
  const style = document.createElement('style');
  style.textContent = `
    .trait-editor-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .trait-editor-container.hidden {
      display: none;
    }
    
    .trait-editor-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
    }
    
    .trait-editor-panel {
      position: relative;
      width: 80%;
      max-width: 900px;
      height: 80%;
      max-height: 800px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .trait-editor-header {
      padding: 15px;
      background: #f0f0f0;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .trait-editor-header h2 {
      margin: 0;
      font-size: 1.2em;
      color: #333;
    }
    
    .trait-editor-tabs {
      display: flex;
      background: #f8f8f8;
      border-bottom: 1px solid #ddd;
    }
    
    .editor-tab-btn {
      padding: 10px 15px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      font-size: 0.9em;
      transition: all 0.2s;
    }
    
    .editor-tab-btn:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    
    .editor-tab-btn.active {
      border-bottom-color: #E63946;
      color: #E63946;
    }
    
    .trait-editor-content {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
    }
    
    .editor-panel {
      display: none;
    }
    
    .editor-panel.active {
      display: block;
    }
    
    .editor-section {
      margin-bottom: 20px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 4px;
    }
    
    .editor-section h3 {
      margin-top: 0;
      font-size: 1em;
      color: #333;
    }
    
    .form-group {
      margin-bottom: 10px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-size: 0.9em;
      color: #555;
    }
    
    .form-group input[type="text"],
    .form-group input[type="number"],
    .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.9em;
    }
    
    .form-group textarea {
      height: 80px;
      resize: vertical;
    }
    
    .code-editor {
      width: 100%;
      height: 300px;
      font-family: monospace;
      font-size: 0.9em;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
    }
    
    .svg-view-tabs {
      display: flex;
      margin-bottom: 10px;
    }
    
    .view-tab-btn {
      padding: 5px 10px;
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px 4px 0 0;
      cursor: pointer;
      font-size: 0.8em;
      transition: all 0.2s;
    }
    
    .view-tab-btn.active {
      background: #E63946;
      color: white;
      border-color: #E63946;
    }
    
    .svg-preview-container {
      width: 100%;
      height: 300px;
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    
    #svg-preview {
      width: 200px;
      height: 200px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .trait-editor-footer {
      padding: 15px;
      background: #f0f0f0;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .editor-btn {
      padding: 8px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9em;
      transition: all 0.2s;
    }
    
    .editor-btn.primary {
      background: #E63946;
      color: white;
    }
    
    .editor-btn.secondary {
      background: #ddd;
      color: #333;
    }
    
    .editor-btn:hover {
      opacity: 0.9;
    }
  `;
  
  // Add to document
  document.head.appendChild(style);
  document.body.appendChild(container);
  
  // Set up event listeners
  setupEditorEventListeners();
}

// Set up event listeners for the editor UI
function setupEditorEventListeners() {
  // Close button
  document.getElementById('editor-close-btn').addEventListener('click', closeEditor);
  document.getElementById('editor-cancel-btn').addEventListener('click', closeEditor);
  
  // Tab switching
  document.getElementById('tab-metadata').addEventListener('click', () => switchTab('metadata'));
  document.getElementById('tab-svg').addEventListener('click', () => switchTab('svg'));
  document.getElementById('tab-preview').addEventListener('click', () => switchTab('preview'));
  
  // View switching
  document.getElementById('view-tab-front').addEventListener('click', () => switchView('front'));
  document.getElementById('view-tab-side').addEventListener('click', () => switchView('side'));
  
  // SVG code editing
  document.getElementById('svg-code-editor').addEventListener('input', function() {
    updateSvgPreview(this.value);
  });
  
  // Save button
  document.getElementById('editor-save-btn').addEventListener('click', saveChanges);
}

// Close the editor
function closeEditor() {
  document.getElementById('trait-editor-container').classList.add('hidden');
  
  // Reset state
  currentTrait = null;
  currentVariant = null;
  currentView = 'front';
}

// Switch between editor tabs
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.editor-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`tab-${tabName}`).classList.add('active');
  
  // Show the selected panel
  document.querySelectorAll('.editor-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.getElementById(`panel-${tabName}`).classList.add('active');
  
  // Special handling for preview tab
  if (tabName === 'preview') {
    const svgCode = document.getElementById('svg-code-editor').value;
    updateSvgPreview(svgCode);
  }
}

// Switch between front and side views
async function switchView(view) {
  if (!currentTrait || !currentVariant) return;
  
  setActiveViewTab(view);
  currentView = view;
  
  const traitType = currentTrait.id;
  const variantKey = currentVariant.id.replace(`${traitType}_`, '');
  
  // Load SVG content for the selected view
  const svgContent = await traitLoader.getVariantSvg(traitType, variantKey, view);
  
  // Update editor
  document.getElementById('svg-code-editor').value = svgContent || '';
  document.getElementById('editor-view-name').textContent = view;
  
  // Update preview
  updateSvgPreview(svgContent);
}

// Set the active view tab
function setActiveViewTab(view) {
  document.querySelectorAll('.view-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`view-tab-${view}`).classList.add('active');
}

// Update the SVG preview
function updateSvgPreview(svgContent) {
  if (!svgContent) {
    document.getElementById('svg-preview').innerHTML = '<div style="color:#999;">No SVG content</div>';
    return;
  }
  
  try {
    // Wrap SVG in a complete document if needed
    const svgDocument = svgUtils.wrapAsSvgDocument(svgContent);
    document.getElementById('svg-preview').innerHTML = svgDocument;
  } catch (error) {
    console.error('Error updating SVG preview:', error);
    document.getElementById('svg-preview').innerHTML = '<div style="color:red;">Invalid SVG</div>';
  }
}

// Save changes to the trait/variant
async function saveChanges() {
  if (!currentTrait || !currentVariant) {
    console.error('No trait or variant selected');
    return;
  }
  
  try {
    // Get values from form fields
    const traitName = document.getElementById('edit-trait-name').value;
    const traitCategory = document.getElementById('edit-trait-category').value;
    
    const variantName = document.getElementById('edit-variant-name').value;
    const variantDescription = document.getElementById('edit-variant-description').value;
    const variantRarity = parseFloat(document.getElementById('edit-variant-rarity').value);
    const variantLive = document.getElementById('edit-variant-live').checked;
    
    const svgContent = document.getElementById('svg-code-editor').value;
    
    // Validate
    if (!traitName || !variantName) {
      alert('Name fields cannot be empty');
      return;
    }
    
    // Update trait
    const updatedTrait = {
      ...currentTrait,
      name: traitName,
      category: traitCategory
    };
    
    // Update variant
    const updatedVariant = {
      ...currentVariant,
      name: variantName,
      description: variantDescription,
      rarityWeight: variantRarity,
      live: variantLive
    };
    
    // Save trait and variant metadata to database
    await traitDb.saveTrait(updatedTrait);
    await traitDb.saveVariant(updatedVariant);
    
    // Save SVG content to file
    const traitType = currentTrait.id;
    const variantKey = currentVariant.id.replace(`${traitType}_`, '');
    
    // Try to save via server if available
    const serverAvailable = await checkServerAvailability();
    
    if (serverAvailable) {
      // Package SVG as a complete document
      const svgDocument = svgUtils.wrapAsSvgDocument(svgContent);
      
      // Send to server
      const response = await fetch('http://localhost:3000/save-svg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          svgContent: svgDocument,
          traitType,
          variantKey,
          view: currentView
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save SVG: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Saved SVG:', result.message);
    } else {
      // Fallback to download
      const svgDocument = svgUtils.wrapAsSvgDocument(svgContent);
      const blob = new Blob([svgDocument], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${variantKey}.svg`;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Show manual instruction
      const folderPath = `${svgUtils.SVG_BASE_PATH}/${traitType}/${currentView}/`;
      console.log(`Please save this file to: ${folderPath}${variantKey}.svg`);
      
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
    
    // Clear trait loader cache to ensure fresh data
    traitLoader.clearCache();
    
    alert('Changes saved successfully!');
    closeEditor();
    
    // Refresh is needed to see changes; some applications may need to reload traits
    return true;
  } catch (error) {
    console.error('Error saving changes:', error);
    alert(`Error saving changes: ${error.message}`);
    return false;
  }
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

// Add edit buttons to trait variant elements
export function addEditButtonsToElements() {
  if (!editorInitialized) {
    initialize();
  }
  
  // Find variant boxes
  const variantBoxes = document.querySelectorAll('.variant-box');
  
  variantBoxes.forEach(box => {
    // Skip if already has an edit button
    if (box.querySelector('.edit-trait-btn')) return;
    
    // Get trait and variant info from data attributes
    const traitType = box.getAttribute('data-trait-type');
    const variantKey = box.getAttribute('data-variant-key');
    
    if (!traitType || !variantKey) return;
    
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-trait-btn';
    editBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
    editBtn.title = 'Edit this trait';
    
    // Add click event
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent parent click
      openEditor(traitType, variantKey);
    });
    
    // Add to the variant box
    box.appendChild(editBtn);
  });
}

// Auto-initialize when loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Trait editor script loaded');
}); 