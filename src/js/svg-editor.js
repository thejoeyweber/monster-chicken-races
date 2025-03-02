// SVG Editor functionality using local SVG-edit
class ChickenSVGEditor {
    constructor() {
        this.modal = null;
        this.iframe = null;
        this.svgedit = null;
        this.currentTrait = null;
        this.currentView = 'front';
        this.currentTraits = null;
        this.svgContent = null;
        this.isReady = false;
        this.pendingSvgContent = null;
        this.setupEditor();
    }

    setupEditor() {
        // Clone template
        const template = document.getElementById('svg-editor-template');
        this.modal = template.content.cloneNode(true).firstElementChild;
        document.body.appendChild(this.modal);
        this.modal.style.display = 'none';

        // Get elements
        this.iframe = this.modal.querySelector('#svg-editor-frame');
        
        // Load local SVG-edit
        this.iframe.src = 'src/lib/svg-edit/index.html';
        
        // Wait for SVG-edit to load
        this.iframe.addEventListener('load', () => {
            console.log('SVG-edit iframe loaded');
            
            // Wait a short time to ensure all scripts are initialized
            setTimeout(() => {
                try {
                    this.svgedit = this.iframe.contentWindow;
                    
                    // Check if the editor interface is available
                    if (this.svgedit.svgEditor) {
                        console.log('Found svgEditor interface directly');
                        this.isReady = true;
                    } else if (this.svgedit.svgedit && this.svgedit.svgedit.svgEditor) {
                        console.log('Found svgEditor interface via svgedit namespace');
                        this.isReady = true;
                    } else {
                        console.warn('SVG Editor interface not found. Available properties:', 
                            Object.keys(this.svgedit));
                        // Try again with a longer delay
                        setTimeout(() => {
                            if (this.svgedit.svgEditor || 
                                (this.svgedit.svgedit && this.svgedit.svgedit.svgEditor)) {
                                console.log('Found SVG Editor interface after delay');
                                this.isReady = true;
                                this.loadPendingContent();
                            } else {
                                console.error('SVG Editor interface not available after delay');
                            }
                        }, 1000);
                    }
                    
                    // Load pending content if ready
                    if (this.isReady) {
                        this.loadPendingContent();
                    }
                } catch (e) {
                    console.error('Error accessing iframe content:', e);
                }
            }, 200);
        });

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Action buttons
        this.modal.querySelector('[data-action="cancel"]').addEventListener('click', () => this.hide());
        this.modal.querySelector('[data-action="save"]').addEventListener('click', () => this.save());
        
        // Create view toggle buttons
        const header = this.modal.querySelector('.svg-editor-header');
        if (header) {
            const viewToggle = document.createElement('div');
            viewToggle.className = 'view-toggle';
            viewToggle.style.margin = '0 20px';
            viewToggle.style.display = 'inline-flex';
            viewToggle.style.minWidth = '150px';
            
            const frontBtn = document.createElement('button');
            frontBtn.className = 'view-toggle-button active';
            frontBtn.textContent = 'Front View';
            frontBtn.dataset.view = 'front';
            
            const sideBtn = document.createElement('button');
            sideBtn.className = 'view-toggle-button';
            sideBtn.textContent = 'Side View';
            sideBtn.dataset.view = 'side';
            
            viewToggle.appendChild(frontBtn);
            viewToggle.appendChild(sideBtn);
            
            // Add click handlers for view toggle
            frontBtn.addEventListener('click', () => {
                this.switchView('front');
                frontBtn.classList.add('active');
                sideBtn.classList.remove('active');
            });
            
            sideBtn.addEventListener('click', () => {
                this.switchView('side');
                frontBtn.classList.remove('active');
                sideBtn.classList.add('active');
            });
            
            const titleElement = header.querySelector('.svg-editor-title');
            if (titleElement) {
                titleElement.parentNode.insertBefore(viewToggle, titleElement.nextSibling);
            } else {
                header.insertBefore(viewToggle, header.firstChild);
            }
        }
    }

    switchView(view) {
        if (this.currentView === view) return;
        
        // Save current view content before switching
        this.saveCurrentView();
        
        // Update current view
        this.currentView = view;
        
        // Load content for the new view
        this.getSvgContent();
        
        console.log(`Switched to ${view} view`);
    }
    
    saveCurrentView() {
        if (!this.isReady || !this.currentTrait || !this.currentTraits || !this.svgedit) return;
        
        try {
            // Get SVG content from editor
            if (this.svgedit && this.svgedit.svgEditor) {
                let svgContent = this.svgedit.svgEditor.getSvgString();
                
                // Process SVG content
                svgContent = this.postprocessSvgContent(svgContent);
                
                // Save SVG content to the appropriate trait variant for current view
                const variantKey = this.currentTraits[this.currentTrait];
                
                // Save to localStorage for persistence - using variant specific key
                const key = `trait_${this.currentTrait}_${variantKey}_${this.currentView}`;
                localStorage.setItem(key, svgContent);
                
                // Update variant definitions for current view
                switch (this.currentTrait) {
                    case 'eyes':
                        if (!window.chickenLab.eyeVariants[variantKey]) {
                            window.chickenLab.eyeVariants[variantKey] = {};
                        }
                        window.chickenLab.eyeVariants[variantKey][this.currentView] = svgContent;
                        break;
                    case 'beak':
                        if (!window.chickenLab.beakVariants[variantKey]) {
                            window.chickenLab.beakVariants[variantKey] = {};
                        }
                        window.chickenLab.beakVariants[variantKey][this.currentView] = svgContent;
                        break;
                    case 'top':
                        if (!window.chickenLab.topVariants[variantKey]) {
                            window.chickenLab.topVariants[variantKey] = {};
                        }
                        window.chickenLab.topVariants[variantKey][this.currentView] = svgContent;
                        break;
                }
                
                console.log(`Saved ${this.currentView} view for ${this.currentTrait} variant: ${variantKey}`);
            }
        } catch (error) {
            console.error('Error saving current view:', error);
        }
    }

    show(trait, variantKey) {
        this.currentTrait = trait;
        this.currentTraits = window.chickenLab.currentTraits;
        this.currentView = 'front'; // Default to front view
        this.modal.querySelector('.trait-name').textContent = `${trait} - ${variantKey}`;
        this.modal.style.display = 'flex';
        
        // Reset view toggle buttons
        const viewBtns = this.modal.querySelectorAll('.view-toggle-button');
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === 'front');
        });
        
        // Get the SVG content
        this.getSvgContent();
    }

    hide() {
        // Save current view before hiding
        this.saveCurrentView();
        
        this.modal.style.display = 'none';
        this.currentTrait = null;
        
        // Trigger character update
        window.chickenLab.defineBaseComponents();
        window.chickenLab.createChicken();
    }

    getSvgContent() {
        // Get the SVG content based on trait type
        let variantContent;
        const variantKey = this.currentTraits[this.currentTrait];
        
        switch (this.currentTrait) {
            case 'eyes':
                variantContent = window.chickenLab.eyeVariants[variantKey][this.currentView];
                break;
            case 'beak':
                variantContent = window.chickenLab.beakVariants[variantKey][this.currentView];
                break;
            case 'top':
                variantContent = window.chickenLab.topVariants[variantKey][this.currentView];
                break;
            default:
                console.warn('Trait type not supported yet:', this.currentTrait);
                return;
        }

        if (!variantContent) return;

        // Process the content to ensure it's proper for the editor
        // For most traits, this is a fragment with comments and paths
        const processedContent = this.preprocessSvgContent(variantContent);
        
        // Load the content into SVG-edit
        this.loadSvgContent(processedContent);
    }
    
    preprocessSvgContent(svgContent) {
        // Make sure we're working with a string
        if (!svgContent || typeof svgContent !== 'string') {
            console.warn('Invalid SVG content:', svgContent);
            return '<g></g>';
        }
        
        // Look for proper SVG elements
        if (svgContent.trim().startsWith('<') && 
            (svgContent.includes('<path') || 
             svgContent.includes('<rect') || 
             svgContent.includes('<circle') || 
             svgContent.includes('<g'))) {
            
            // Check if it's already wrapped in a group
            if (svgContent.trim().startsWith('<g') && svgContent.trim().endsWith('</g>')) {
                return svgContent;
            }
            
            // Otherwise wrap it in a group
            return `<g>${svgContent}</g>`;
        }
        
        // Fallback for invalid content
        console.warn('Potentially invalid SVG content, using fallback');
        return `<g>${svgContent}</g>`;
    }

    loadSvgContent(svgContent) {
        if (!this.isReady) {
            console.log("Editor not ready, queueing content for later");
            this.pendingSvgContent = svgContent;
            return;
        }
        
        try {
            // Load SVG content into editor
            if (this.svgedit && this.svgedit.svgEditor) {
                console.log("Loading SVG content into editor");
                this.svgedit.svgEditor.setSvgString(svgContent);
                console.log("SVG content loaded into editor");
                
                // Make sure we clear any selection
                if (typeof this.svgedit.svgEditor.clearSelection === 'function') {
                    console.log("Clearing selection");
                    this.svgedit.svgEditor.clearSelection();
                } else {
                    console.warn("clearSelection not available");
                }
                
                // Give the editor time to process and then adjust the viewBox
                setTimeout(() => {
                    try {
                        if (this.svgedit.svgEditor.adjustViewBox) {
                            this.svgedit.svgEditor.adjustViewBox();
                            console.log("ViewBox adjusted");
                        }
                    } catch (e) {
                        console.warn("Error adjusting viewBox:", e);
                    }
                }, 200);
                
                // Debug helper - check if object tree is visible
                console.log("Checking object tree visibility...");
                setTimeout(() => {
                    try {
                        const treeItems = this.iframe.contentDocument.querySelectorAll('.tree-item');
                        console.log(`Found ${treeItems.length} tree items`);
                    } catch (e) {
                        console.warn("Could not query tree items:", e);
                    }
                }, 500); // Give it time to render
            } else {
                console.error("Editor interface not found. Available properties:", 
                    this.svgedit ? Object.keys(this.svgedit) : "svgedit not found");
            }
        } catch (error) {
            console.error('Error loading SVG content:', error);
        }
    }

    save() {
        if (!this.isReady) {
            console.warn('SVG-edit is not ready yet');
            return;
        }
        
        // Save the current view
        this.saveCurrentView();
        
        // Hide the editor
        this.hide();
    }

    saveSvgContent(svgContent) {
        // Process SVG content to extract what we need
        svgContent = this.postprocessSvgContent(svgContent);
        
        // Save SVG content to the appropriate trait variant
        const variantKey = this.currentTraits[this.currentTrait];
        
        // Save to localStorage for persistence - using variant specific key
        const key = `trait_${this.currentTrait}_${variantKey}_${this.currentView}`;
        localStorage.setItem(key, svgContent);
        
        // Update variant definitions
        switch (this.currentTrait) {
            case 'eyes':
                if (!window.chickenLab.eyeVariants[variantKey]) {
                    window.chickenLab.eyeVariants[variantKey] = {};
                }
                window.chickenLab.eyeVariants[variantKey][this.currentView] = svgContent;
                break;
            case 'beak':
                if (!window.chickenLab.beakVariants[variantKey]) {
                    window.chickenLab.beakVariants[variantKey] = {};
                }
                window.chickenLab.beakVariants[variantKey][this.currentView] = svgContent;
                break;
            case 'top':
                if (!window.chickenLab.topVariants[variantKey]) {
                    window.chickenLab.topVariants[variantKey] = {};
                }
                window.chickenLab.topVariants[variantKey][this.currentView] = svgContent;
                break;
        }
        
        // Hide the editor
        this.hide();
        
        // Trigger character update
        window.chickenLab.defineBaseComponents();
        window.chickenLab.createChicken();
        
        console.log(`SVG content saved for ${this.currentTrait} variant: ${variantKey}`);
    }
    
    postprocessSvgContent(svgContent) {
        // If content is already extracted (just the inner part), return it
        if (!svgContent.includes('<g')) {
            return svgContent;
        }
        
        // Extract the content from the group if needed
        const groupMatch = svgContent.match(/<g[^>]*>([\s\S]*)<\/g>/i);
        if (groupMatch && groupMatch[1]) {
            return groupMatch[1].trim();
        }
        
        // If no match, return the original content
        return svgContent;
    }

    loadPendingContent() {
        if (this.pendingSvgContent) {
            console.log('Loading pending SVG content');
            this.loadSvgContent(this.pendingSvgContent);
            this.pendingSvgContent = null;
        }
    }
}

// Initialize editor and expose to window
window.svgEditor = new ChickenSVGEditor();

// Add edit buttons to trait items
function addEditButtonToTraitItem(item, traitName, variantName) {
    // Check if button already exists
    if (item.querySelector('.edit-trait-btn')) return;
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-trait-btn';
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Edit SVG';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        window.svgEditor.show(traitName, variantName);
    };
    item.appendChild(editBtn);
}

// Export function to be used by character-lab.js
window.addEditButtonToTraitItem = addEditButtonToTraitItem; 