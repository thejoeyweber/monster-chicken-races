/**
 * Monster Chicken Races - Coop Manager
 * Handles the chicken coop display and management
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const chickenGrid = document.getElementById('chicken-grid');
    const emptyCoopMessage = document.getElementById('empty-coop-message');
    const totalChickensEl = document.getElementById('total-chickens');
    const winnerChickensEl = document.getElementById('winner-chickens');
    const raceButton = document.getElementById('race-button');
    const sortSelect = document.getElementById('sort-chickens');
    
    // Modal elements
    const chickenModal = document.getElementById('chicken-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalChickenName = document.getElementById('modal-chicken-name');
    const modalChickenImage = document.getElementById('modal-chicken-image');
    const modalChickenSprite = document.getElementById('modal-chicken-sprite');
    const modalRaceCount = document.getElementById('modal-race-count');
    const modalWinCount = document.getElementById('modal-win-count');
    const modalRaceButton = document.getElementById('modal-race-button');
    const modalSellButton = document.getElementById('modal-sell-button');
    
    // Modal stat elements
    const modalStatBars = {
        speed: document.getElementById('modal-speed-bar'),
        strength: document.getElementById('modal-strength-bar'),
        wisdom: document.getElementById('modal-wisdom-bar'),
        recklessness: document.getElementById('modal-recklessness-bar'),
        stamina: document.getElementById('modal-stamina-bar')
    };
    
    const modalStatValues = {
        speed: document.getElementById('modal-speed-value'),
        strength: document.getElementById('modal-strength-value'),
        wisdom: document.getElementById('modal-wisdom-value'),
        recklessness: document.getElementById('modal-recklessness-value'),
        stamina: document.getElementById('modal-stamina-value')
    };
    
    // Store current chicken data
    let chickens = [];
    let selectedChickenId = null;
    const MAX_STAT = 10; // Same as in ChickenGenerator
    
    // Load chickens from local storage
    loadChickens();
    
    // Add event listeners
    sortSelect.addEventListener('change', () => {
        sortChickens(sortSelect.value);
        renderChickenGrid();
    });
    
    closeModal.addEventListener('click', () => {
        chickenModal.classList.add('hidden');
    });
    
    raceButton.addEventListener('click', () => {
        window.location.href = 'race.html';
    });
    
    modalRaceButton.addEventListener('click', () => {
        window.location.href = 'race.html';
    });
    
    modalSellButton.addEventListener('click', () => {
        if (selectedChickenId) {
            sellChicken(selectedChickenId);
            chickenModal.classList.add('hidden');
        }
    });
    
    // Window click to close modal when clicking outside content
    window.addEventListener('click', (event) => {
        if (event.target === chickenModal) {
            chickenModal.classList.add('hidden');
        }
    });
    
    /**
     * Loads chickens from local storage
     */
    function loadChickens() {
        // Load chicken data
        chickens = JSON.parse(localStorage.getItem('chickenCoop') || '[]');
        
        // Fix any chickens with undefined in their names
        let needsUpdate = false;
        chickens.forEach(chicken => {
            if (!chicken.name || chicken.name.includes('undefined')) {
                console.log('Fixing invalid chicken name:', chicken.name);
                chicken.name = `Chicken #${chicken.id || Date.now()}`;
                needsUpdate = true;
            }
        });
        
        // Save fixed chickens back to storage if needed
        if (needsUpdate) {
            console.log('Saving fixed chicken names to storage');
            localStorage.setItem('chickenCoop', JSON.stringify(chickens));
        }
        
        // Sort by newest first (default)
        sortChickens('newest');
        
        // Update stats and render
        updateCoopStats();
        renderChickenGrid();
    }
    
    /**
     * Updates coop statistics
     */
    function updateCoopStats() {
        const totalChickens = chickens.length;
        const winnerChickens = chickens.filter(chicken => chicken.wins > 0).length;
        
        totalChickensEl.textContent = totalChickens;
        winnerChickensEl.textContent = winnerChickens;
        
        // Enable/disable race button
        raceButton.disabled = totalChickens < 2;
    }
    
    /**
     * Renders the chicken grid
     */
    function renderChickenGrid() {
        // Clear grid (except empty message)
        const items = chickenGrid.querySelectorAll('.chicken-item');
        items.forEach(item => item.remove());
        
        // Show/hide empty message
        if (chickens.length === 0) {
            emptyCoopMessage.classList.remove('hidden');
            return;
        } else {
            emptyCoopMessage.classList.add('hidden');
        }
        
        // Add chicken items
        chickens.forEach(chicken => {
            const chickenItem = createChickenItem(chicken);
            chickenGrid.appendChild(chickenItem);
        });
    }
    
    /**
     * Creates a chicken grid item
     * @param {Object} chicken - The chicken data
     * @returns {HTMLElement} The chicken item element
     */
    function createChickenItem(chicken) {
        const item = document.createElement('div');
        item.className = 'chicken-item';
        item.dataset.id = chicken.id;
        
        // Find primary stat (highest stat)
        const stats = chicken.stats;
        const primaryStat = Object.entries(stats).reduce((highest, [stat, value]) => {
            return value > highest.value ? { stat, value } : highest;
        }, { stat: '', value: 0 });
        
        // Create chicken display
        item.innerHTML = `
            <h3>${chicken.name}</h3>
            <div class="chicken-thumb">
                <img src="${chicken.image}" alt="${chicken.name}">
                <div class="sprite-container">${chicken.sprite}</div>
            </div>
            <div class="primary-stat">Best Stat: ${formatStatName(primaryStat.stat)} (${primaryStat.value})</div>
            <div class="chicken-badges">
                ${chicken.wins > 0 ? `<div class="badge winner">${chicken.wins}</div>` : ''}
                ${chicken.raceCount > 0 ? `<div class="badge races">${chicken.raceCount}</div>` : ''}
            </div>
        `;
        
        // Add click event to open modal
        item.addEventListener('click', () => {
            openChickenDetail(chicken);
        });
        
        return item;
    }
    
    /**
     * Opens the chicken detail modal
     * @param {Object} chicken - The chicken data
     */
    function openChickenDetail(chicken) {
        // Store selected chicken ID
        selectedChickenId = chicken.id;
        
        // Set chicken details
        modalChickenName.textContent = chicken.name;
        modalChickenImage.src = chicken.image;
        modalChickenSprite.innerHTML = chicken.sprite;
        modalRaceCount.textContent = chicken.raceCount;
        modalWinCount.textContent = chicken.wins;
        
        // Update stat bars
        Object.keys(chicken.stats).forEach((stat, index) => {
            // Set the stat value text
            modalStatValues[stat].textContent = chicken.stats[stat];
            
            // Animate the stat bar after a delay
            setTimeout(() => {
                const percentage = (chicken.stats[stat] / MAX_STAT) * 100;
                modalStatBars[stat].style.width = `${percentage}%`;
                
                // Add color based on stat value
                if (chicken.stats[stat] >= 8) {
                    modalStatBars[stat].style.backgroundColor = '#4CAF50'; // Green for high stats
                } else if (chicken.stats[stat] >= 5) {
                    modalStatBars[stat].style.backgroundColor = '#FFC107'; // Yellow for medium stats
                } else {
                    modalStatBars[stat].style.backgroundColor = '#F44336'; // Red for low stats
                }
            }, 100 * index);
        });
        
        // Show modal
        chickenModal.classList.remove('hidden');
    }
    
    /**
     * Sells a chicken (removes from coop)
     * @param {number} chickenId - The ID of the chicken to sell
     */
    function sellChicken(chickenId) {
        const chickenIndex = chickens.findIndex(chicken => chicken.id === chickenId);
        
        if (chickenIndex !== -1) {
            const chicken = chickens[chickenIndex];
            
            // Remove from array
            chickens.splice(chickenIndex, 1);
            
            // Update local storage
            localStorage.setItem('chickenCoop', JSON.stringify(chickens));
            
            // Update UI
            updateCoopStats();
            renderChickenGrid();
            
            // Show confirmation
            alert(`${chicken.name} has been sold. KFC thanks you for your contribution!`);
        }
    }
    
    /**
     * Sorts chickens by the given criteria
     * @param {string} criteria - The sorting criteria
     */
    function sortChickens(criteria) {
        switch(criteria) {
            case 'newest':
                chickens.sort((a, b) => b.id - a.id);
                break;
            case 'oldest':
                chickens.sort((a, b) => a.id - b.id);
                break;
            case 'fastest':
                chickens.sort((a, b) => b.stats.speed - a.stats.speed);
                break;
            case 'strongest':
                chickens.sort((a, b) => b.stats.strength - a.stats.strength);
                break;
            case 'wisest':
                chickens.sort((a, b) => b.stats.wisdom - a.stats.wisdom);
                break;
            case 'reckless':
                chickens.sort((a, b) => b.stats.recklessness - a.stats.recklessness);
                break;
            case 'stamina':
                chickens.sort((a, b) => b.stats.stamina - a.stats.stamina);
                break;
            case 'wins':
                chickens.sort((a, b) => b.wins - a.wins);
                break;
            default:
                chickens.sort((a, b) => b.id - a.id);
        }
    }
    
    /**
     * Formats a stat name for display
     * @param {string} stat - The stat name
     * @returns {string} The formatted stat name
     */
    function formatStatName(stat) {
        return stat.charAt(0).toUpperCase() + stat.slice(1);
    }
}); 