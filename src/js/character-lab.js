/**
 * Character Lab - Chicken Builder & Animator
 * A development tool for creating and testing chicken designs and animations
 */

import * as characterLabAdapter from './character-lab-adapter.js';
import * as svgUtils from './svg-utils.js';

class ChickenLab {
    constructor() {
        // Store SVG namespace
        this.ns = "http://www.w3.org/2000/svg";
        
        // Initialize current view state
        this.currentView = 'front';
        this.currentPart = 'all';
        this.currentColor = '#FF9800';  // Default color
        this.currentTraits = {
            eyes: 'normal',
            beak: 'normal',
            top: 'normal',
            wattle: 'normal',
            bodyShape: 'normal',
            wings: 'normal',
            tail: 'normal',
            legs: 'normal',
            feet: 'normal'
        };
        
        // Initialize variant collections
        this.eyeVariants = {};
        this.beakVariants = {};
        this.topVariants = {};
        this.wattleVariants = {};
        this.bodyShapeVariants = {};
        this.wingsVariants = {};
        this.tailVariants = {};
        this.legsVariants = {};
        this.feetVariants = {};
        
        // Initialize the adapter and get trait definitions
        this.traitDefinitions = {};
        
        // Initialize animation state
        this.currentAnimation = null;
        
        // Initialize components first
        this.initializeComponents();
        
        // Initialize the adapter
        this.initializeAdapter().then(() => {
            // Define trait categories from trait definitions
            this.traitCategories = {};
            Object.entries(this.traitDefinitions).forEach(([traitType, trait]) => {
                const category = trait.category;
                if (!this.traitCategories[category]) {
                    this.traitCategories[category] = [];
                }
                this.traitCategories[category].push(traitType);
            });
            
            // Initialize default variants
            this.initializeDefaultVariants();
            
            // Then define base components and create chicken
            this.defineBaseComponents();
            this.createChicken();
            
            // Finally set up event listeners
            this.setupEventListeners();
        });
    }

    initializeComponents() {
        // SVG namespace
        this.ns = 'http://www.w3.org/2000/svg';
        
        // Get main elements
        this.canvas = document.getElementById('chicken-canvas');
        
        // Set proper viewBox and size
        this.canvas.setAttribute('viewBox', '-50 -50 200 200');
        this.canvas.setAttribute('width', '100%');
        this.canvas.setAttribute('height', '100%');
        
        // Ensure defs exists
        if (!this.canvas.querySelector('defs')) {
            this.defs = document.createElementNS(this.ns, 'defs');
            this.canvas.appendChild(this.defs);
        } else {
            this.defs = this.canvas.querySelector('defs');
        }
        
        // Initialize color palettes
        this.colors = {
            body: [
                '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
                '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
                '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800'
            ]
        };
        
        // Set initial color
        this.currentColor = this.colors.body[0];
        
        // Create color pickers
        this.createColorPicker('body-colors', this.colors.body);
        
        // Define base components
        this.defineBaseComponents();
        
        // Create initial chicken
        this.createChicken();
    }

    defineBaseComponents() {
        console.log("Defining base components with traits:", this.currentTraits);
        
        // Define base SVG components
        const body = `
            <g id="chicken-body-front">
                <!-- Body shape -->
                ${this.bodyShapeVariants[this.currentTraits.bodyShape]?.front || '<ellipse cx="0" cy="0" rx="25" ry="30" fill="inherit"/>'}
                
                <!-- Wings -->
                ${this.wingsVariants[this.currentTraits.wings]?.front || ''}
            </g>
        `;

        const sideBody = `
            <g id="chicken-body-side">
                <!-- Body shape -->
                ${this.bodyShapeVariants[this.currentTraits.bodyShape]?.side || '<ellipse cx="0" cy="0" rx="20" ry="25" fill="inherit"/>'}
                
                <!-- Wings -->
                ${this.wingsVariants[this.currentTraits.wings]?.side || ''}
                
                <!-- Tail -->
                ${this.tailVariants[this.currentTraits.tail]?.side || ''}
            </g>
        `;

        const frontHead = `
            <g id="chicken-head-front">
                <!-- Head shape -->
                <circle cx="0" cy="0" r="20" fill="inherit"/>
                
                <!-- Eyes -->
                <g class="eyes">
                    ${this.eyeVariants[this.currentTraits.eyes]?.front || '<circle cx="-8" cy="-2" r="5" fill="white"/><circle cx="8" cy="-2" r="5" fill="white"/>'}
                </g>

                <!-- Beak -->
                ${this.beakVariants[this.currentTraits.beak]?.front || '<path d="M0,6 L-5,12 L5,12 Z" fill="#FF9800"/>'}

                <!-- Comb -->
                ${this.topVariants[this.currentTraits.top]?.front || ''}

                <!-- Wattle -->
                ${this.wattleVariants[this.currentTraits.wattle]?.front || '<path d="M0,12 L-5,25 L5,25 Z" fill="#cc0000"/>'}
            </g>
        `;

        const sideHead = `
            <g id="chicken-head-side">
                <!-- Head shape -->
                <circle cx="0" cy="0" r="20" fill="inherit"/>
                
                <!-- Eye -->
                <g class="eyes">
                    ${this.eyeVariants[this.currentTraits.eyes]?.side || '<circle cx="8" cy="-2" r="5" fill="white"/>'}
                </g>

                <!-- Beak -->
                ${this.beakVariants[this.currentTraits.beak]?.side || '<path d="M10,5 L25,5 L15,12 Z" fill="#FF9800"/>'}

                <!-- Comb -->
                ${this.topVariants[this.currentTraits.top]?.side || ''}

                <!-- Wattle -->
                ${this.wattleVariants[this.currentTraits.wattle]?.side || '<path d="M0,12 L-5,25 L0,25 Z" fill="#cc0000"/>'}
            </g>
        `;

        const frontLeg = `
            <g id="chicken-leg-front">
                ${this.legsVariants[this.currentTraits.legs]?.front || ''}
                ${this.feetVariants[this.currentTraits.feet]?.front || ''}
            </g>
        `;

        const sideLeg = `
            <g id="chicken-leg-side">
                ${this.legsVariants[this.currentTraits.legs]?.side || ''}
                ${this.feetVariants[this.currentTraits.feet]?.side || ''}
            </g>
        `;

        // Define outline masks
        const frontOutline = `
            <mask id="chicken-front-mask">
                <rect x="0" y="0" width="100" height="100" fill="white"/>
                <g transform="translate(50,50)">
                    <use href="#chicken-body-front" fill="black"/>
                    <use href="#chicken-head-front" transform="translate(0,-25)" fill="black"/>
                    <use href="#chicken-leg-front" transform="translate(10,25)" fill="black"/>
                    <use href="#chicken-leg-front" transform="translate(-10,25)" fill="black"/>
                </g>
            </mask>
        `;

        const sideOutline = `
            <mask id="chicken-side-mask">
                <rect x="0" y="0" width="100" height="100" fill="white"/>
                <g transform="translate(50,50)">
                    <use href="#chicken-body-side" fill="black"/>
                    <use href="#chicken-head-side" transform="translate(25,-25)" fill="black"/>
                    <use href="#chicken-leg-side" transform="translate(10,25)" fill="black"/>
                    <use href="#chicken-leg-side" transform="translate(-10,25)" fill="black"/>
                </g>
            </mask>
        `;

        // Add all components to defs
        this.defs.innerHTML = `
            ${body}
            ${sideBody}
            ${frontHead}
            ${sideHead}
            ${frontLeg}
            ${sideLeg}
            ${frontOutline}
            ${sideOutline}
        `;
    }

    updateBonePositions(headBone, legFrontBone, legBackBone) {
        if (!headBone || !legFrontBone || !legBackBone) {
            console.warn('Missing bones for position update');
            return;
        }

        if (this.currentView === 'front') {
            headBone.setAttribute('transform', 'translate(0,-25)');
            legFrontBone.setAttribute('transform', 'translate(10,25)');
            legBackBone.setAttribute('transform', 'translate(-10,25)');
        } else {
            headBone.setAttribute('transform', 'translate(25,-25)');
            legFrontBone.setAttribute('transform', 'translate(5,25)');
            legBackBone.setAttribute('transform', 'translate(-5,25)');
        }
    }

    createChicken() {
        console.log('Creating chicken with traits:', this.currentTraits);
        console.log('Current view:', this.currentView);
        console.log('Current part:', this.currentPart);

        // Clear existing chicken
        const existingChicken = this.canvas.querySelector('.chicken-group');
        if (existingChicken) {
            console.log('Removing existing chicken');
            existingChicken.remove();
        }

        // Create main group for the chicken
        const chickenGroup = document.createElementNS(this.ns, 'g');
        chickenGroup.classList.add('chicken-group');
        chickenGroup.style.visibility = 'visible';

        // Create bone structure
        const bodyBone = document.createElementNS(this.ns, 'g');
        bodyBone.classList.add('body-bone');
        bodyBone.setAttribute('transform', 'translate(50,50)');

        const headBone = document.createElementNS(this.ns, 'g');
        headBone.classList.add('head-bone');

        const legFrontBone = document.createElementNS(this.ns, 'g');
        legFrontBone.classList.add('leg-front-bone');

        const legBackBone = document.createElementNS(this.ns, 'g');
        legBackBone.classList.add('leg-back-bone');

        // Position bones before adding components
        this.updateBonePositions(headBone, legFrontBone, legBackBone);

        // Add components based on current view and part
        const view = this.currentView;
        
        if (this.currentPart === 'all' || this.currentPart === 'body') {
            const useBody = document.createElementNS(this.ns, 'use');
            useBody.setAttributeNS(null, 'href', `#chicken-body-${view}`);
            useBody.setAttribute('fill', this.currentColor);
            bodyBone.appendChild(useBody);
        }

        if (this.currentPart === 'all' || this.currentPart === 'head') {
            const useHead = document.createElementNS(this.ns, 'use');
            useHead.setAttributeNS(null, 'href', `#chicken-head-${view}`);
            useHead.setAttribute('fill', this.currentColor);
            headBone.appendChild(useHead);
        }

        if (this.currentPart === 'all' || this.currentPart === 'legs') {
            const useLegFront = document.createElementNS(this.ns, 'use');
            useLegFront.setAttributeNS(null, 'href', `#chicken-leg-${view}`);
            legFrontBone.appendChild(useLegFront);

            const useLegBack = document.createElementNS(this.ns, 'use');
            useLegBack.setAttributeNS(null, 'href', `#chicken-leg-${view}`);
            legBackBone.appendChild(useLegBack);
        }

        // Assemble the chicken
        if (this.currentPart === 'all' || this.currentPart === 'head') {
            bodyBone.appendChild(headBone);
        }
        if (this.currentPart === 'all' || this.currentPart === 'legs') {
            bodyBone.appendChild(legFrontBone);
            bodyBone.appendChild(legBackBone);
        }

        chickenGroup.appendChild(bodyBone);
        this.canvas.appendChild(chickenGroup);

        console.log('Chicken created:', {
            group: chickenGroup,
            body: bodyBone,
            head: headBone,
            legFront: legFrontBone,
            legBack: legBackBone,
            currentView: this.currentView,
            currentPart: this.currentPart,
            currentColor: this.currentColor
        });
    }

    createColorPicker(elementId, colors) {
        const picker = document.getElementById(elementId);
        if (picker) {
            colors.forEach((color, index) => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch' + (index === 0 ? ' active' : '');
                swatch.style.backgroundColor = color;
                swatch.dataset.color = color;
                picker.appendChild(swatch);
            });
        }
    }

    setupEventListeners() {
        // View toggles
        document.getElementById('all-front').addEventListener('click', () => {
            this.currentView = 'front';
            this.currentPart = 'all';
            this.createChicken();
            this.highlightButton('all-front');
        });

        document.getElementById('all-side').addEventListener('click', () => {
            this.currentView = 'side';
            this.currentPart = 'all';
            this.createChicken();
            this.highlightButton('all-side');
        });

        // Part toggles
        const parts = ['body', 'head', 'legs'];
        parts.forEach(part => {
            const frontBtn = document.getElementById(`${part}-front`);
            const sideBtn = document.getElementById(`${part}-side`);
            
            if (frontBtn) {
                frontBtn.addEventListener('click', () => {
                    this.currentView = 'front';
                    this.currentPart = part;
                    this.createChicken();
                    this.highlightButton(`${part}-front`);
                });
            }
            
            if (sideBtn) {
                sideBtn.addEventListener('click', () => {
                    this.currentView = 'side';
                    this.currentPart = part;
                    this.createChicken();
                    this.highlightButton(`${part}-side`);
                });
            }
        });

        // Color picker
        const colorPicker = document.getElementById('body-colors');
        if (colorPicker) {
            colorPicker.addEventListener('click', (e) => {
                if (e.target.classList.contains('color-swatch')) {
                    this.currentColor = e.target.dataset.color;
                    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                    e.target.classList.add('active');
                    this.createChicken();
                }
            });
        }

        // Bone controls
        const bodyRotation = document.getElementById('body-rotation');
        if (bodyRotation) {
            bodyRotation.addEventListener('input', (e) => {
                const bodyBone = this.canvas.querySelector('.body-bone');
                if (bodyBone) {
                    bodyBone.setAttribute('transform', `translate(50,50) rotate(${e.target.value})`);
                }
            });
        }

        const headRotation = document.getElementById('head-rotation');
        if (headRotation) {
            headRotation.addEventListener('input', (e) => {
                const headBone = this.canvas.querySelector('.head-bone');
                if (headBone) {
                    const baseTransform = this.currentView === 'front' ? 'translate(0,-25)' : 'translate(25,-25)';
                    headBone.setAttribute('transform', `${baseTransform} rotate(${e.target.value})`);
                }
            });
        }

        // Animation controls
        document.querySelectorAll('.anim-button').forEach(button => {
            console.log('Setting up animation button:', button.id);
            button.addEventListener('click', () => {
                console.log('Animation button clicked:', button.id);
                const animationType = button.id.replace('anim-', '');
                this.playAnimation(animationType);
            });
        });

        // Setup trait UI
        this.setupTraitUI();
        
        console.log('Event listeners set up');
    }
    
    async setupTraitUI() {
        console.log('Setting up trait UI');
        
        const traitAccordions = document.getElementById('trait-accordions');
        if (!traitAccordions) return;
        
        // Make sure we have the latest trait definitions
        if (Object.keys(this.traitDefinitions).length === 0) {
            try {
                await characterLabAdapter.initialize();
                this.traitDefinitions = characterLabAdapter.getTraitDefinitions();
            } catch (error) {
                console.error('Error loading trait definitions:', error);
                return; // Can't set up UI without trait definitions
            }
        }
        
        // Clear existing content
        traitAccordions.innerHTML = '';
        
        // Group traits by category
        const traitsByCategory = {};
        Object.entries(this.traitDefinitions).forEach(([traitType, traitDef]) => {
            const category = traitDef.category;
            if (!traitsByCategory[category]) {
                traitsByCategory[category] = [];
            }
            traitsByCategory[category].push({ type: traitType, ...traitDef });
        });
        
        // Create accordions for each category
        Object.entries(traitsByCategory).forEach(([category, traits]) => {
            const accordion = document.createElement('div');
            accordion.className = 'accordion';
            
            // Create header
            const header = document.createElement('div');
            header.className = 'accordion-header';
            header.innerHTML = `
                <span>${category.charAt(0).toUpperCase() + category.slice(1)} Traits</span>
                <span class="accordion-icon">▼</span>
            `;
            
            // Create content
            const content = document.createElement('div');
            content.className = 'accordion-content';
            
            // Add trait groups
            traits.forEach(trait => {
                const group = document.createElement('div');
                group.className = 'trait-group';
                
                const variants = this.traitDefinitions[trait.type].variants;
                const variantCount = Object.keys(variants).length;
                
                // Add trait header
                const traitHeader = document.createElement('div');
                traitHeader.className = 'trait-header';
                traitHeader.innerHTML = `
                    <div class="trait-title">${trait.name}</div>
                    <div class="trait-count">${variantCount} options</div>
                `;
                group.appendChild(traitHeader);
                
                // Create variant grid container
                const gridContainer = document.createElement('div');
                gridContainer.className = 'variant-grid-container';
                
                // Create variant grid
                const variantGrid = document.createElement('div');
                variantGrid.className = 'variant-grid';
                
                // Add scroll buttons
                const leftButton = document.createElement('button');
                leftButton.className = 'scroll-button left hidden';
                leftButton.innerHTML = '◀';
                
                const rightButton = document.createElement('button');
                rightButton.className = 'scroll-button right';
                rightButton.innerHTML = '▶';
                
                // Add all variants to grid
                Object.entries(variants).forEach(([key, variant]) => {
                    const variantBox = document.createElement('div');
                    variantBox.className = 'variant-box';
                    if (this.currentTraits[trait.type] === key) {
                        variantBox.classList.add('active');
                    }
                    
                    // Check if SVG files exist for this variant (using inline property for now)
                    // TODO: When all SVGs are migrated to the file system structure, replace this with:
                    // const hasSVG = await svgUtils.doesSvgExist(trait.type, key, 'front') || 
                    //                await svgUtils.doesSvgExist(trait.type, key, 'side');
                    const hasSVG = variant.frontSVG || variant.sideSVG;
                    if (!hasSVG) {
                        variantBox.classList.add('not-live');
                    }
                    
                    variantBox.innerHTML = `
                        <div class="variant-preview">🐔</div>
                        <div class="variant-name">${variant.name}</div>
                        ${hasSVG ? '' : '<div class="variant-status">No SVG Yet</div>'}
                        ${variant.live ? '<div class="trait-badge">Live</div>' : ''}
                    `;
                    
                    // Only add click handler if SVG exists
                    if (hasSVG) {
                        variantBox.addEventListener('click', () => {
                            // Update trait
                            this.currentTraits[trait.type] = key;
                            
                            // Update UI
                            variantGrid.querySelectorAll('.variant-box').forEach(box => {
                                box.classList.remove('active');
                            });
                            variantBox.classList.add('active');
                            
                            // Update components and recreate chicken
                            this.defineBaseComponents();
                            this.createChicken();
                        });
                    }
                    
                    variantGrid.appendChild(variantBox);
                });
                
                // Add scroll button handlers
                leftButton.addEventListener('click', () => {
                    variantGrid.scrollBy({ left: -variantGrid.clientWidth / 2, behavior: 'smooth' });
                });
                
                rightButton.addEventListener('click', () => {
                    variantGrid.scrollBy({ left: variantGrid.clientWidth / 2, behavior: 'smooth' });
                });
                
                // Add scroll event listener to show/hide buttons
                variantGrid.addEventListener('scroll', () => {
                    leftButton.classList.toggle('hidden', variantGrid.scrollLeft <= 0);
                    rightButton.classList.toggle('hidden', 
                        variantGrid.scrollLeft + variantGrid.clientWidth >= variantGrid.scrollWidth);
                });
                
                gridContainer.appendChild(leftButton);
                gridContainer.appendChild(variantGrid);
                gridContainer.appendChild(rightButton);
                group.appendChild(gridContainer);
                
                // Add "View All" button
                const viewAllBtn = document.createElement('button');
                viewAllBtn.className = 'view-all-button';
                viewAllBtn.textContent = `View All ${trait.name} Options`;
                viewAllBtn.addEventListener('click', () => {
                    this.openTraitCatalog(trait.type);
                });
                group.appendChild(viewAllBtn);
                
                content.appendChild(group);
            });
            
            accordion.appendChild(header);
            accordion.appendChild(content);
            traitAccordions.appendChild(accordion);
            
            // Add click handler for accordion
            header.addEventListener('click', () => {
                content.classList.toggle('active');
                header.querySelector('.accordion-icon').textContent = 
                    content.classList.contains('active') ? '▼' : '▶';
                
                // Update scroll buttons after accordion opens
                content.querySelectorAll('.variant-grid').forEach(grid => {
                    const leftBtn = grid.previousElementSibling;
                    const rightBtn = grid.nextElementSibling;
                    leftBtn.classList.toggle('hidden', grid.scrollLeft <= 0);
                    rightBtn.classList.toggle('hidden', 
                        grid.scrollLeft + grid.clientWidth >= grid.scrollWidth);
                });
            });
        });
    }
    
    openTraitCatalog(traitType) {
        console.log(`Opening catalog for ${traitType}`);
        
        // Get the trait data
        if (!this.traitDefinitions[traitType]) {
            console.error(`Trait type ${traitType} not found`);
            return;
        }
        
        const traitData = this.traitDefinitions[traitType];
        const variants = traitData.variants;
        
        // Create or get catalog container
        let catalog = document.getElementById('trait-catalog');
        if (!catalog) {
            catalog = document.createElement('div');
            catalog.id = 'trait-catalog';
            document.body.appendChild(catalog);
        }
        
        // Clear existing content
        catalog.innerHTML = '';
        
        // Create modal structure
        const modalContent = document.createElement('div');
        modalContent.className = 'catalog-content';
        catalog.appendChild(modalContent);
        
        // Add header
        const header = document.createElement('div');
        header.className = 'catalog-header';
        header.innerHTML = `
            <h2>${traitData.name} Variants</h2>
            <button class="close-catalog">×</button>
        `;
        modalContent.appendChild(header);
        
        // Add close button handler
        header.querySelector('.close-catalog').addEventListener('click', () => {
            catalog.style.display = 'none';
        });
        
        // Add backdrop click handler to close modal
        catalog.addEventListener('click', (e) => {
            if (e.target === catalog) {
                catalog.style.display = 'none';
            }
        });
        
        // Create grid container
        const grid = document.createElement('div');
        grid.className = 'trait-grid';
        modalContent.appendChild(grid);
        
        // Sort variants to put "normal" first, then sort the rest alphabetically
        const sortedVariants = Object.entries(variants).sort((a, b) => {
            // If one of the keys is 'normal', it should go first
            if (a[0] === 'normal') return -1;
            if (b[0] === 'normal') return 1;
            
            // Otherwise sort alphabetically by name
            return a[1].name.localeCompare(b[1].name);
        });

        sortedVariants.forEach(([variantKey, variant]) => {
            const traitCard = document.createElement('div');
            traitCard.className = 'trait-card';
            if (this.currentTraits[traitType] === variantKey) {
                traitCard.classList.add('active');
            }
            
            // Check if SVG files exist for this variant (using inline property for now)
            // TODO: When all SVGs are migrated to the file system structure, replace this with:
            // const hasSVG = await svgUtils.doesSvgExist(trait.type, key, 'front') || 
            //                await svgUtils.doesSvgExist(trait.type, key, 'side');
            const hasSVG = variant.frontSVG || variant.sideSVG;
            if (!hasSVG) {
                traitCard.classList.add('not-live');
            }
            
            traitCard.innerHTML = `
                <div class="trait-preview">🐔</div>
                <div class="trait-name">${variant.name}</div>
                <div class="trait-description">${variant.description}</div>
                ${hasSVG ? '' : '<div class="trait-status">No SVG Yet</div>'}
                ${variant.live ? '<div class="trait-badge">Live</div>' : ''}
            `;
            
            // Only add click handler if SVG exists
            if (hasSVG) {
                traitCard.addEventListener('click', () => {
                    // Update trait
                    this.currentTraits[traitType] = variantKey;
                    
                    // Update UI
                    grid.querySelectorAll('.trait-card').forEach(card => {
                        card.classList.remove('active');
                    });
                    traitCard.classList.add('active');
                    
                    // Update chicken
                    this.defineBaseComponents();
                    this.createChicken();
                    
                    // Close the modal after selection
                    setTimeout(() => {
                        catalog.style.display = 'none';
                    }, 300);
                });
            }
            
            grid.appendChild(traitCard);
        });
        
        // Show catalog
        catalog.style.display = 'block';
    }

    highlightButton(id) {
        // Remove highlight from all buttons
        document.querySelectorAll('.view-button').forEach(btn => btn.classList.remove('active'));
        // Add highlight to clicked button
        document.getElementById(id).classList.add('active');
    }

    playAnimation(type) {
        console.log('Animation triggered:', type);
        if (this.isAnimating) {
            console.log('Already animating, skipping');
            return;
        }
        this.isAnimating = true;

        // Reset any existing animation
        if (this.currentAnimation) {
            console.log('Cancelling existing animation');
            this.currentAnimation.cancel();
        }

        const bodyBone = this.canvas.querySelector('.body-bone');
        const headBone = this.canvas.querySelector('.head-bone');
        const legFront = this.canvas.querySelector('.leg-front-bone');
        const legBack = this.canvas.querySelector('.leg-back-bone');

        console.log('Found elements:', {
            bodyBone: !!bodyBone,
            headBone: !!headBone,
            legFront: !!legFront,
            legBack: !!legBack
        });

        // Helper to handle animation completion
        const handleAnimationComplete = () => {
            console.log('Animation completed');
            this.isAnimating = false;
        };

        switch (type) {
            case 'idle':
                console.log('Starting idle animation');
                // Body has a subtle bounce
                this.currentAnimation = bodyBone.animate([
                    { transform: 'translate(50px, 50px)' },
                    { transform: 'translate(50px, 49.5px)' },
                    { transform: 'translate(50px, 50px)' }
                ], {
                    duration: 1200,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });

                // Head has a slightly more pronounced bob
                headBone.animate([
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px)' : 'translate(25px, -25px)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25.5px)' : 'translate(25px, -25.5px)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px)' : 'translate(25px, -25px)' }
                ], {
                    duration: 1200,
                    iterations: Infinity,
                    easing: 'ease-in-out',
                    delay: 100 // Slight delay for more natural feel
                });

                // Legs stay planted while body moves
                const idleLegFrontPos = this.currentView === 'front' ? '10px, 25px' : '5px, 25px';
                const idleLegBackPos = this.currentView === 'front' ? '-10px, 25px' : '-5px, 25px';
                
                // Front leg animation - counteracts body movement to stay planted
                legFront.animate([
                    { transform: `translate(${idleLegFrontPos}) rotate(0deg)` },
                    { transform: `translate(${idleLegFrontPos}) translate(0, 1.5px) rotate(-2deg)` },
                    { transform: `translate(${idleLegFrontPos}) rotate(0deg)` }
                ], {
                    duration: 1200,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });

                // Back leg animation - counteracts body movement to stay planted
                legBack.animate([
                    { transform: `translate(${idleLegBackPos}) rotate(0deg)` },
                    { transform: `translate(${idleLegBackPos}) translate(0, 1.5px) rotate(2deg)` },
                    { transform: `translate(${idleLegBackPos}) rotate(0deg)` }
                ], {
                    duration: 1200,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });
                break;

            case 'run':
                // Body bounce
                bodyBone.animate([
                    { transform: 'translate(50px, 50px)' },
                    { transform: 'translate(50px, 46px)' },
                    { transform: 'translate(50px, 50px)' }
                ], {
                    duration: 400,
                    iterations: Infinity
                });

                // Head bob with more pronounced movement
                headBone.animate([
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px) rotate(-5deg)' : 'translate(25px, -25px) rotate(-5deg)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -22px) rotate(5deg)' : 'translate(25px, -22px) rotate(5deg)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px) rotate(-5deg)' : 'translate(25px, -25px) rotate(-5deg)' }
                ], {
                    duration: 400,
                    iterations: Infinity
                });

                // Legs maintain their anchor points while running
                const runLegFrontPos = this.currentView === 'front' ? '10px, 25px' : '5px, 25px';
                const runLegBackPos = this.currentView === 'front' ? '-10px, 25px' : '-5px, 25px';

                legFront.animate([
                    { transform: `translate(${runLegFrontPos}) rotate(-20deg)` },
                    { transform: `translate(${runLegFrontPos}) rotate(20deg)` }
                ], {
                    duration: 200,
                    iterations: Infinity,
                    direction: 'alternate'
                });

                legBack.animate([
                    { transform: `translate(${runLegBackPos}) rotate(20deg)` },
                    { transform: `translate(${runLegBackPos}) rotate(-20deg)` }
                ], {
                    duration: 200,
                    iterations: Infinity,
                    direction: 'alternate'
                });
                break;

            case 'jump':
                // Body jump
                this.currentAnimation = bodyBone.animate([
                    { transform: 'translate(50px, 50px)' },
                    { transform: 'translate(50px, 30px) rotate(-5deg)' },
                    { transform: 'translate(50px, 50px)' }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });

                // Head tilt
                headBone.animate([
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px)' : 'translate(25px, -25px)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px) rotate(15deg)' : 'translate(25px, -25px) rotate(15deg)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px)' : 'translate(25px, -25px)' }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });

                // Legs maintain anchor points while jumping
                const jumpLegFrontPos = this.currentView === 'front' ? '10px, 25px' : '5px, 25px';
                const jumpLegBackPos = this.currentView === 'front' ? '-10px, 25px' : '-5px, 25px';

                legFront.animate([
                    { transform: `translate(${jumpLegFrontPos})` },
                    { transform: `translate(${jumpLegFrontPos}) rotate(-30deg)` },
                    { transform: `translate(${jumpLegFrontPos})` }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });

                legBack.animate([
                    { transform: `translate(${jumpLegBackPos})` },
                    { transform: `translate(${jumpLegBackPos}) rotate(30deg)` },
                    { transform: `translate(${jumpLegBackPos})` }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });

                this.currentAnimation.onfinish = handleAnimationComplete;
                break;

            case 'trip':
                this.currentAnimation = bodyBone.animate([
                    { transform: 'translate(50px, 50px) rotate(0deg)' },
                    { transform: 'translate(50px, 50px) rotate(60deg)' },
                    { transform: 'translate(50px, 50px) rotate(0deg)' }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });

                // Head flail
                headBone.animate([
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px) rotate(0deg)' : 'translate(25px, -25px) rotate(0deg)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px) rotate(-45deg)' : 'translate(25px, -25px) rotate(-45deg)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px) rotate(0deg)' : 'translate(25px, -25px) rotate(0deg)' }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });

                this.currentAnimation.onfinish = handleAnimationComplete;
                break;
        }

        // For infinite animations, we don't need to handle completion
        if (type === 'idle' || type === 'run') {
            this.isAnimating = false;
        }
    }

    updatePreview() {
        // Get the SVG content based on trait type
        let variantContent;
        const variantKey = this.currentTraits[this.currentTrait];
        
        switch (this.currentTrait) {
            case 'eyes':
                variantContent = this.eyeVariants[variantKey][this.currentView];
                break;
            case 'beak':
                variantContent = this.beakVariants[variantKey][this.currentView];
                break;
            case 'top':
                variantContent = this.topVariants[variantKey][this.currentView];
                break;
            default:
                console.warn('Trait type not supported yet:', this.currentTrait);
                return;
        }

        if (!variantContent) return;

        this.svgContent.innerHTML = variantContent;
        this.updateCodeEditor();
    }

    // Initialize the character lab adapter
    async initializeAdapter() {
        try {
            await characterLabAdapter.initialize();
            // Update trait definitions
            this.traitDefinitions = characterLabAdapter.getTraitDefinitions();
            console.log('Character Lab Adapter initialized successfully');
            
            // Re-initialize trait UI if it was already set up
            if (document.getElementById('trait-accordions')) {
                await this.setupTraitUI();
            }
            return true;
        } catch (error) {
            console.error('Error initializing Character Lab Adapter:', error);
            return false;
        }
    }

    // Add a new method to initialize default variants
    initializeDefaultVariants() {
        // Default eye variants
        if (!this.eyeVariants.normal) {
            this.eyeVariants.normal = {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <circle cx="-8" cy="-2" r="4" fill="black"/>
                    <circle cx="-9" cy="-3" r="1.5" fill="white"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="4" fill="black"/>
                    <circle cx="7" cy="-3" r="1.5" fill="white"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="4" fill="black"/>
                    <circle cx="7" cy="-3" r="1.5" fill="white"/>
                `
            };
        }
        
        // Default beak variants
        if (!this.beakVariants.normal) {
            this.beakVariants.normal = {
                front: `
                    <!-- Upper beak -->
                    <path d="
                      M0,0
                      l-5,6
                      l10,0
                      z"
                      fill="#FFB74D"
                    />
                    <!-- Lower beak -->
                    <path d="
                      M-3,4
                      l3,2
                      l3,-2
                      l-3,3
                      z"
                      fill="#FFA000"
                    />
                `,
                side: `
                    <!-- Upper beak -->
                    <path d="
                      M10,0
                      l15,-2
                      l-2,4
                      z"
                      fill="#FFB74D"
                    />
                    <!-- Lower beak -->
                    <path d="
                      M10,0
                      l12,1
                      l-9,3
                      z"
                      fill="#FFA000"
                    />
                `
            };
        }
        
        // Default top variants
        if (!this.topVariants.normal) {
            this.topVariants.normal = {
                front: `
                    <!-- Main comb -->
                    <path d="
                      M0,-25
                      C-3,-30 -6,-28 -9,-25
                      C-6,-27 -3,-27 0,-25
                      C3,-27 6,-27 9,-25
                      C6,-28 3,-30 0,-25
                      Z"
                      fill="#FF5252"
                    />
                    <!-- Additional spikes -->
                    <path d="
                      M-6,-26
                      C-4,-29 -2,-28 0,-26
                      C2,-28 4,-29 6,-26
                      Z"
                      fill="#FF5252"
                    />
                `,
                side: `
                    <!-- Main comb -->
                    <path d="
                      M0,-25
                      C-3,-30 -6,-28 -9,-25
                      C-6,-27 -3,-27 0,-25
                      C3,-27 6,-27 9,-25
                      C6,-28 3,-30 0,-25
                      Z"
                      fill="#FF5252"
                    />
                    <!-- Additional spikes -->
                    <path d="
                      M-6,-26
                      C-4,-29 -2,-28 0,-26
                      C2,-28 4,-29 6,-26
                      Z"
                      fill="#FF5252"
                    />
                `
            };
        }

        // Default wattle variants
        if (!this.wattleVariants?.normal) {
            this.wattleVariants = this.wattleVariants || {};
            this.wattleVariants.normal = {
                front: `
                    <path d="
                      M-6,6
                      C-10,8 -10,14 -6,18
                      C-4,16 -4,10 -6,6
                      Z" 
                      fill="#FF5252"
                    />
                    <path d="
                      M6,6
                      C10,8 10,14 6,18
                      C4,16 4,10 6,6
                      Z" 
                      fill="#FF5252"
                    />
                `,
                side: `
                    <path d="
                      M6,6
                      C10,8 10,14 6,18
                      C4,16 4,10 6,6
                      Z" 
                      fill="#FF5252"
                    />
                `
            };
        }

        // Default body shape variants
        if (!this.bodyShapeVariants?.normal) {
            this.bodyShapeVariants = this.bodyShapeVariants || {};
            this.bodyShapeVariants.normal = {
                front: `
                    <!-- Main body shape -->
                    <path d="
                      M0,-25 
                      C-25,-25 -30,-10 -30,0
                      C-30,20 -25,35 0,35
                      C25,35 30,20 30,0
                      C30,-10 25,-25 0,-25
                      Z" 
                      fill="inherit"
                    />
                `,
                side: `
                    <!-- Main body -->
                    <path d="
                      M-30,-25
                      C-40,-20 -40,20 -30,25
                      C-20,30 -10,30 0,30
                      C15,30 25,25 35,20
                      C40,15 40,-15 35,-20
                      C25,-25 15,-30 0,-30
                      C-10,-30 -20,-30 -30,-25
                      Z" 
                      fill="inherit"
                    />
                `
            };
        }

        // Default wings variants
        if (!this.wingsVariants?.normal) {
            this.wingsVariants = this.wingsVariants || {};
            this.wingsVariants.normal = {
                front: `
                    <!-- Left wing -->
                    <g class="wing-left">
                      <path d="
                        M-28,-8
                        C-32,-4 -32,8 -28,12
                        C-24,16 -20,16 -16,12
                        C-20,8 -20,-4 -16,-8
                        C-20,-12 -24,-12 -28,-8
                        Z" 
                        fill="inherit"
                      />
                      <path d="
                        M-28,-6
                        C-30,-2 -30,8 -28,10
                        C-26,12 -24,12 -22,10
                        Z" 
                        fill="rgba(0,0,0,0.15)"
                      />
                    </g>

                    <!-- Right wing -->
                    <g class="wing-right">
                      <path d="
                        M28,-8
                        C32,-4 32,8 28,12
                        C24,16 20,16 16,12
                        C20,8 20,-4 16,-8
                        C20,-12 24,-12 28,-8
                        Z" 
                        fill="inherit"
                      />
                      <path d="
                        M28,-6
                        C30,-2 30,8 28,10
                        C26,12 24,12 22,10
                        Z" 
                        fill="rgba(0,0,0,0.15)"
                      />
                    </g>
                `,
                side: `
                    <!-- Wing -->
                    <g class="wing">
                      <path d="
                        M-25,-20
                        C-33,-15 -33,15 -25,20
                        C-20,23 -15,20 -12,15
                        C-16,10 -16,-10 -12,-15
                        C-15,-20 -20,-23 -25,-20
                        Z" 
                        fill="inherit"
                      />
                      <path d="
                        M-25,-15
                        C-28,-10 -28,10 -25,15
                        C-23,17 -20,15 -18,12
                        Z" 
                        fill="rgba(0,0,0,0.15)"
                      />
                    </g>
                `
            };
        }

        // Default tail variants
        if (!this.tailVariants?.normal) {
            this.tailVariants = this.tailVariants || {};
            this.tailVariants.normal = {
                front: `
                    <!-- No front view for tail -->
                `,
                side: `
                    <g class="tail">
                      <path d="
                        M-35,-20
                        C-42,-25 -48,-20 -50,-15
                        C-48,-10 -42,-13 -35,-10
                        C-38,-15 -38,-18 -35,-20
                        Z" 
                        fill="inherit"
                      />
                      <path d="
                        M-38,-18
                        C-44,-22 -46,-18 -48,-15
                        C-46,-12 -44,-14 -38,-12
                        Z" 
                        fill="rgba(0,0,0,0.15)"
                      />
                    </g>
                `
            };
        }

        // Default legs variants
        if (!this.legsVariants?.normal) {
            this.legsVariants = this.legsVariants || {};
            this.legsVariants.normal = {
                front: `
                    <!-- Upper leg -->
                    <path d="
                      M0,0
                      C2,6 2,12 0,18
                      C-2,12 -2,6 0,0
                      Z"
                      fill="#FFA000"
                    />
                    
                    <!-- Lower leg -->
                    <path d="
                      M0,18
                      C1,22 1,26 0,30
                      M0,30
                      L0,34
                      M0,34
                      L-3,38
                      M0,34
                      L0,38
                      M0,34
                      L3,38
                      M0,32
                      L-2,30"
                      stroke="#FFA000"
                      stroke-width="2"
                      stroke-linecap="round"
                      fill="none"
                    />
                `,
                side: `
                    <!-- Upper leg -->
                    <path d="
                      M0,0
                      C2,6 2,12 0,18
                      C-2,12 -2,6 0,0
                      Z"
                      fill="#FFA000"
                    />
                    
                    <!-- Lower leg -->
                    <path d="
                      M0,18
                      C1,22 1,26 0,30
                      M0,30
                      L0,34
                      M0,34
                      L-3,38
                      M0,34
                      L0,38
                      M0,34
                      L3,38
                      M0,32
                      L-2,30"
                      stroke="#FFA000"
                      stroke-width="2"
                      stroke-linecap="round"
                      fill="none"
                    />
                `
            };
        }

        // Default feet variants
        if (!this.feetVariants?.normal) {
            this.feetVariants = this.feetVariants || {};
            this.feetVariants.normal = {
                front: `
                    <path d="
                      M0,34
                      L-3,38
                      M0,34
                      L0,38
                      M0,34
                      L3,38"
                      stroke="#FFA000"
                      stroke-width="2"
                      stroke-linecap="round"
                      fill="none"
                    />
                `,
                side: `
                    <path d="
                      M0,34
                      L-3,38
                      M0,34
                      L0,38
                      M0,34
                      L3,38"
                      stroke="#FFA000"
                      stroke-width="2"
                      stroke-linecap="round"
                      fill="none"
                    />
                `
            };
        }
        
        console.log("Default variants initialized");
    }
}

// Initialize the lab when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    window.chickenLab = new ChickenLab();
    
    // Wait for initialization to complete before proceeding
    await new Promise(resolve => {
        const checkInit = () => {
            if (Object.keys(window.chickenLab.traitDefinitions).length > 0) {
                resolve();
            } else {
                setTimeout(checkInit, 100);
            }
        };
        checkInit();
    });
    
    // Initialize each variant to have its own copy of SVG data
    const initializeVariantData = () => {
        // Check if already initialized
        if (localStorage.getItem('variants_initialized')) {
            return;
        }
        
        // Clone the default data for each variant
        const traitTypes = ['eyes', 'beak', 'top', 'wattle', 'bodyShape', 'wings', 'tail', 'legs', 'feet'];
        const views = ['front', 'side'];
        
        for (const traitType of traitTypes) {
            const variants = window.chickenLab.traitDefinitions[traitType]?.variants || {};
            // Get the default variant's data
            const defaultVariantKey = Object.keys(variants)[0];
            const defaultVariantData = {};
            
            // Store original data for default variant
            for (const view of views) {
                switch (traitType) {
                    case 'eyes':
                        defaultVariantData[view] = window.chickenLab.eyeVariants.normal[view];
                        break;
                    case 'beak':
                        defaultVariantData[view] = window.chickenLab.beakVariants.normal[view];
                        break;
                    case 'top':
                        defaultVariantData[view] = window.chickenLab.topVariants.normal[view];
                        break;
                    case 'wattle':
                        defaultVariantData[view] = window.chickenLab.wattleVariants.normal[view];
                        break;
                    case 'bodyShape':
                        defaultVariantData[view] = window.chickenLab.bodyShapeVariants.normal[view];
                        break;
                    case 'wings':
                        defaultVariantData[view] = window.chickenLab.wingsVariants.normal[view];
                        break;
                    case 'tail':
                        defaultVariantData[view] = window.chickenLab.tailVariants.normal[view];
                        break;
                    case 'legs':
                        defaultVariantData[view] = window.chickenLab.legsVariants.normal[view];
                        break;
                    case 'feet':
                        defaultVariantData[view] = window.chickenLab.feetVariants.normal[view];
                        break;
                }
            }
            
            // Now create unique copies for each variant
            for (const variantKey of Object.keys(variants)) {
                if (variantKey === defaultVariantKey) continue; // Skip default
                
                for (const view of views) {
                    // Check if we already have saved data
                    const storageKey = `trait_${traitType}_${variantKey}_${view}`;
                    if (!localStorage.getItem(storageKey)) {
                        // No saved data, use default with a comment to mark it as a unique copy
                        const defaultData = defaultVariantData[view];
                        const variantData = defaultData + `\n<!-- ${traitType} variant: ${variantKey} -->`;
                        localStorage.setItem(storageKey, variantData);
                        
                        // Update in-memory data
                        switch (traitType) {
                            case 'eyes':
                                if (!window.chickenLab.eyeVariants[variantKey]) {
                                    window.chickenLab.eyeVariants[variantKey] = {};
                                }
                                window.chickenLab.eyeVariants[variantKey][view] = variantData;
                                break;
                            case 'beak':
                                if (!window.chickenLab.beakVariants[variantKey]) {
                                    window.chickenLab.beakVariants[variantKey] = {};
                                }
                                window.chickenLab.beakVariants[variantKey][view] = variantData;
                                break;
                            case 'top':
                                if (!window.chickenLab.topVariants[variantKey]) {
                                    window.chickenLab.topVariants[variantKey] = {};
                                }
                                window.chickenLab.topVariants[variantKey][view] = variantData;
                                break;
                            case 'wattle':
                                if (!window.chickenLab.wattleVariants[variantKey]) {
                                    window.chickenLab.wattleVariants[variantKey] = {};
                                }
                                window.chickenLab.wattleVariants[variantKey][view] = variantData;
                                break;
                            case 'bodyShape':
                                if (!window.chickenLab.bodyShapeVariants[variantKey]) {
                                    window.chickenLab.bodyShapeVariants[variantKey] = {};
                                }
                                window.chickenLab.bodyShapeVariants[variantKey][view] = variantData;
                                break;
                            case 'wings':
                                if (!window.chickenLab.wingsVariants[variantKey]) {
                                    window.chickenLab.wingsVariants[variantKey] = {};
                                }
                                window.chickenLab.wingsVariants[variantKey][view] = variantData;
                                break;
                            case 'tail':
                                if (!window.chickenLab.tailVariants[variantKey]) {
                                    window.chickenLab.tailVariants[variantKey] = {};
                                }
                                window.chickenLab.tailVariants[variantKey][view] = variantData;
                                break;
                            case 'legs':
                                if (!window.chickenLab.legsVariants[variantKey]) {
                                    window.chickenLab.legsVariants[variantKey] = {};
                                }
                                window.chickenLab.legsVariants[variantKey][view] = variantData;
                                break;
                            case 'feet':
                                if (!window.chickenLab.feetVariants[variantKey]) {
                                    window.chickenLab.feetVariants[variantKey] = {};
                                }
                                window.chickenLab.feetVariants[variantKey][view] = variantData;
                                break;
                        }
                    }
                }
            }
        }
        
        // Mark as initialized
        localStorage.setItem('variants_initialized', 'true');
        
        // Reload base components
        window.chickenLab.defineBaseComponents();
        window.chickenLab.createChicken();
    };
    
    // Initialize variant data
    initializeVariantData();
    
    // Load saved variants
    const loadSavedVariants = () => {
        const traitTypes = ['eyes', 'beak', 'top', 'wattle', 'bodyShape', 'wings', 'tail', 'legs', 'feet'];
        const views = ['front', 'side'];
        
        for (const traitType of traitTypes) {
            const variants = window.chickenLab.traitDefinitions[traitType]?.variants || {};
            
            for (const variantKey of Object.keys(variants)) {
                for (const view of views) {
                    const storageKey = `trait_${traitType}_${variantKey}_${view}`;
                    const savedData = localStorage.getItem(storageKey);
                    
                    if (savedData) {
                        // Update in-memory data
                        switch (traitType) {
                            case 'eyes':
                                if (!window.chickenLab.eyeVariants[variantKey]) {
                                    window.chickenLab.eyeVariants[variantKey] = {};
                                }
                                window.chickenLab.eyeVariants[variantKey][view] = savedData;
                                break;
                            case 'beak':
                                if (!window.chickenLab.beakVariants[variantKey]) {
                                    window.chickenLab.beakVariants[variantKey] = {};
                                }
                                window.chickenLab.beakVariants[variantKey][view] = savedData;
                                break;
                            case 'top':
                                if (!window.chickenLab.topVariants[variantKey]) {
                                    window.chickenLab.topVariants[variantKey] = {};
                                }
                                window.chickenLab.topVariants[variantKey][view] = savedData;
                                break;
                            case 'wattle':
                                if (!window.chickenLab.wattleVariants[variantKey]) {
                                    window.chickenLab.wattleVariants[variantKey] = {};
                                }
                                window.chickenLab.wattleVariants[variantKey][view] = savedData;
                                break;
                            case 'bodyShape':
                                if (!window.chickenLab.bodyShapeVariants[variantKey]) {
                                    window.chickenLab.bodyShapeVariants[variantKey] = {};
                                }
                                window.chickenLab.bodyShapeVariants[variantKey][view] = savedData;
                                break;
                            case 'wings':
                                if (!window.chickenLab.wingsVariants[variantKey]) {
                                    window.chickenLab.wingsVariants[variantKey] = {};
                                }
                                window.chickenLab.wingsVariants[variantKey][view] = savedData;
                                break;
                            case 'tail':
                                if (!window.chickenLab.tailVariants[variantKey]) {
                                    window.chickenLab.tailVariants[variantKey] = {};
                                }
                                window.chickenLab.tailVariants[variantKey][view] = savedData;
                                break;
                            case 'legs':
                                if (!window.chickenLab.legsVariants[variantKey]) {
                                    window.chickenLab.legsVariants[variantKey] = {};
                                }
                                window.chickenLab.legsVariants[variantKey][view] = savedData;
                                break;
                            case 'feet':
                                if (!window.chickenLab.feetVariants[variantKey]) {
                                    window.chickenLab.feetVariants[variantKey] = {};
                                }
                                window.chickenLab.feetVariants[variantKey][view] = savedData;
                                break;
                        }
                    }
                }
            }
        }
        
        // Reload base components
        window.chickenLab.defineBaseComponents();
        window.chickenLab.createChicken();
    };
    
    // Load saved variants
    loadSavedVariants();
}); 