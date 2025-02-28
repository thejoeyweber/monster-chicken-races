/**
 * Monster Chicken Races - Race UI
 * Handles race UI interactions and visualization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Race setup elements
    const raceTypeSelect = document.getElementById('race-type');
    const trackLengthSelect = document.getElementById('track-length');
    const startRaceButton = document.getElementById('start-race');
    const availableChickens = document.getElementById('available-chickens');
    const selectedRacers = document.getElementById('selected-racers');
    const noRacersMessage = document.getElementById('no-racers-message');
    const noChickensMessage = document.getElementById('no-chickens-message');
    
    // Race track elements
    const raceSetupSection = document.getElementById('race-setup');
    const raceTrackSection = document.getElementById('race-track');
    const trackLanes = document.querySelector('.track-lanes');
    const laneLabels = document.querySelector('.lane-labels');
    const resetRaceButton = document.getElementById('reset-race');
    
    // Race events and results elements
    const eventsLog = document.getElementById('events-log');
    const raceResults = document.getElementById('race-results');
    const resultsList = document.getElementById('results-list');
    const saveResultsButton = document.getElementById('save-results');
    
    // Initialize simulator
    const simulator = new RaceSimulator();
    
    // Store chicken data
    let chickens = [];
    let selectedChickens = [];
    let raceCompleted = false;
    
    // Load chickens from local storage
    loadChickens();
    
    // Add event listeners for simulator events
    setupSimulatorListeners();
    
    // Add UI event listeners
    setupUIListeners();
    
    /**
     * Loads chicken data from local storage
     */
    function loadChickens() {
        chickens = JSON.parse(localStorage.getItem('chickenCoop') || '[]');
        
        if (chickens.length === 0) {
            noChickensMessage.classList.remove('hidden');
        } else {
            noChickensMessage.classList.add('hidden');
            renderAvailableChickens();
        }
    }
    
    /**
     * Renders available chickens
     */
    function renderAvailableChickens() {
        // Clear existing items (except the message)
        const items = availableChickens.querySelectorAll('.chicken-select-item');
        items.forEach(item => item.remove());
        
        // Create chicken items
        chickens.forEach(chicken => {
            // Skip if already selected
            if (selectedChickens.find(c => c.id === chicken.id)) {
                return;
            }
            
            const item = createChickenItem(chicken);
            availableChickens.appendChild(item);
        });
    }
    
    /**
     * Creates a chicken selection item
     * @param {Object} chicken - Chicken data
     * @returns {HTMLElement} Chicken selection item
     */
    function createChickenItem(chicken) {
        const item = document.createElement('div');
        item.className = 'chicken-select-item';
        item.dataset.id = chicken.id;
        
        // Find best stat
        const bestStat = Object.entries(chicken.stats).reduce((best, [stat, value]) => {
            return value > best.value ? { stat, value } : best;
        }, { stat: '', value: 0 });
        
        // Create HTML content
        item.innerHTML = `
            <div class="chicken-thumb">
                <div class="sprite-container">${chicken.sprite}</div>
            </div>
            <div class="chicken-info">
                <h4>${chicken.name}</h4>
                <div class="stats">Speed: ${chicken.stats.speed}, Best: ${formatStatName(bestStat.stat)} (${bestStat.value})</div>
            </div>
            ${chicken.wins > 0 ? `<div class="chicken-badge">${chicken.wins}</div>` : ''}
        `;
        
        // Add click handler to select chicken
        item.addEventListener('click', () => {
            selectChicken(chicken);
        });
        
        return item;
    }
    
    /**
     * Selects a chicken for the race
     * @param {Object} chicken - The selected chicken
     */
    function selectChicken(chicken) {
        // Check if we've already selected max racers (4)
        if (selectedChickens.length >= 4) {
            alert('You can only select up to 4 chickens for a race!');
            return;
        }
        
        // Add to selected
        selectedChickens.push(chicken);
        
        // Hide no racers message if this is the first selection
        if (selectedChickens.length === 1) {
            noRacersMessage.classList.add('hidden');
        }
        
        // Enable start button if we have at least 2 racers
        startRaceButton.disabled = selectedChickens.length < 2;
        
        // Create selected racer element
        const racerEl = document.createElement('div');
        racerEl.className = 'selected-racer';
        racerEl.dataset.id = chicken.id;
        
        racerEl.innerHTML = `
            <div class="chicken-thumb">
                <div class="sprite-container">${chicken.sprite}</div>
            </div>
            <h4>${chicken.name}</h4>
            <button class="remove-racer">&times;</button>
        `;
        
        // Add click handler to remove button
        racerEl.querySelector('.remove-racer').addEventListener('click', (e) => {
            e.stopPropagation();
            removeSelectedChicken(chicken.id);
        });
        
        // Add to selected racers container
        selectedRacers.appendChild(racerEl);
        
        // Re-render available chickens
        renderAvailableChickens();
    }
    
    /**
     * Removes a chicken from selected racers
     * @param {number} chickenId - The ID of the chicken to remove
     */
    function removeSelectedChicken(chickenId) {
        // Remove from selected array
        selectedChickens = selectedChickens.filter(chicken => chicken.id !== chickenId);
        
        // Remove from UI
        const racerEl = selectedRacers.querySelector(`.selected-racer[data-id="${chickenId}"]`);
        if (racerEl) {
            racerEl.remove();
        }
        
        // Show no racers message if none selected
        if (selectedChickens.length === 0) {
            noRacersMessage.classList.remove('hidden');
        }
        
        // Disable start button if fewer than 2 racers
        startRaceButton.disabled = selectedChickens.length < 2;
        
        // Re-render available chickens
        renderAvailableChickens();
    }
    
    /**
     * Sets up listeners for simulator events
     */
    function setupSimulatorListeners() {
        // When race is initialized
        simulator.on('initialized', (data) => {
            // Clear previous lanes and labels
            trackLanes.innerHTML = '';
            laneLabels.innerHTML = '';
            
            console.log('Race initialized with participants:', data.participants);
            
            // Create a lane for each participant
            data.participants.forEach((racer, index) => {
                console.log(`Creating lane for ${racer.name} (id: ${racer.id})`);
                
                // Create lane
                const lane = document.createElement('div');
                lane.className = 'race-lane';
                lane.setAttribute('data-racer-id', racer.id);
                
                // Create racer element
                const racerEl = document.createElement('div');
                racerEl.className = 'chicken-racer';
                racerEl.setAttribute('data-id', racer.id);
                
                // Add sprite content
                racerEl.innerHTML = `<div class="sprite-container">${racer.sprite}</div>`;
                
                // Set initial position
                racerEl.style.left = '0%';
                
                // Add to lane
                lane.appendChild(racerEl);
                trackLanes.appendChild(lane);
                
                // Create lane label
                const label = document.createElement('div');
                label.className = 'lane-label';
                label.textContent = racer.name;
                laneLabels.appendChild(label);
                
                console.log(`Lane created for ${racer.name}, initial position set to 0%`);
            });
            
            // Create player positions overlay
            createPositionsOverlay(data.participants);
            
            // Clear events log
            eventsLog.innerHTML = '';
            
            // Hide results section
            raceResults.classList.add('hidden');
            
            // Add debug verification of DOM structure
            debugVerifyDOMStructure(data.participants);
        });
        
        // When race starts
        simulator.on('raceStart', () => {
            // Nothing special needed here, already handled
        });
        
        // On each tick update
        simulator.on('tickUpdate', (data) => {
            console.log('Tick update', data.participants.map(r => ({ name: r.name, position: r.position.toFixed(1) + '%', progress: r.progress.toFixed(1) })));
            
            // Update the positions overlay
            updatePositionsOverlay(data.participants);
            
            data.participants.forEach(racer => {
                // Try multiple selector strategies
                let racerEl = trackLanes.querySelector(`.race-lane[data-racer-id="${racer.id}"] .chicken-racer`);
                
                if (!racerEl) {
                    racerEl = trackLanes.querySelector(`.chicken-racer[data-id="${racer.id}"]`);
                }
                
                if (racerEl) {
                    // Smoothly update position - debounce rapid updates to prevent jank
                    const leftValue = `${racer.position}%`;
                    
                    // Use requestAnimationFrame for smoother updates
                    window.requestAnimationFrame(() => {
                        racerEl.style.left = leftValue;
                    });
                    
                    // Don't change other properties in the same frame to avoid repaints
                    setTimeout(() => {
                        // Handle effect animations first
                        if (racer.effect) {
                            // Clear existing effect classes
                            racerEl.classList.remove('effect-shake', 'effect-spin', 'effect-flash');
                            
                            // Add new effect class
                            racerEl.classList.add(`effect-${racer.effect}`);
                        } else {
                            // Remove effect classes if no effect
                            racerEl.classList.remove('effect-shake', 'effect-spin', 'effect-flash');
                        }
                        
                        // Apply transform effects if needed
                        if (racer.transform) {
                            racerEl.classList.add('transform-active');
                            // Don't modify the transform during an animation
                            if (!racer.effect) {
                                racerEl.style.transform = `translateY(-50%) ${racer.transform}`;
                            }
                        } else {
                            racerEl.classList.remove('transform-active');
                            // Don't modify the transform during an animation
                            if (!racer.effect) {
                                racerEl.style.transform = 'translateY(-50%)';
                            }
                        }
                        
                        // Update the sprite to reflect the racer's current state
                        updateRacerSprite(racerEl, racer);
                    }, 50); // Small delay to separate position updates from style updates
                }
            });
        });
        
        // When a racer finishes
        simulator.on('racerFinish', (data) => {
            // Try multiple selector strategies
            let racerEl = trackLanes.querySelector(`.race-lane[data-racer-id="${data.racer.id}"] .chicken-racer`);
            if (!racerEl) {
                racerEl = trackLanes.querySelector(`.chicken-racer[data-id="${data.racer.id}"]`);
            }
            
            if (racerEl) {
                racerEl.classList.add('finished');
            }
        });
        
        // When an event happens
        simulator.on('eventHappened', (data) => {
            // Try multiple selector strategies
            let racerEl = trackLanes.querySelector(`.race-lane[data-racer-id="${data.racer.id}"] .chicken-racer`);
            if (!racerEl) {
                racerEl = trackLanes.querySelector(`.chicken-racer[data-id="${data.racer.id}"]`);
            }
            
            if (racerEl) {
                // Make sure animations are very visible - add a special "event-happening" class
                racerEl.classList.add('event-happening');
                
                // Add visual indicator for the event
                const eventIndicator = document.createElement('div');
                eventIndicator.className = 'event-indicator';
                eventIndicator.textContent = data.progressChange > 0 ? '↑' : '↓';
                eventIndicator.classList.add(data.progressChange > 0 ? 'positive' : 'negative');
                
                // Append to racer element
                racerEl.appendChild(eventIndicator);
                
                // Highlight the chicken to match the event
                if (data.progressChange > 0) {
                    racerEl.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.7)';
                } else {
                    racerEl.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.7)';
                }
                
                // Remove after animation completes
                setTimeout(() => {
                    eventIndicator.remove();
                    racerEl.classList.remove('event-happening');
                    racerEl.style.boxShadow = '';
                }, 1500);
            }
        });
        
        // When a log event occurs
        simulator.on('logEvent', (data) => {
            // Format time as seconds with 1 decimal place
            const timeStr = (data.time / 1000).toFixed(1);
            
            // Create event entry with appropriate class
            const eventEntry = document.createElement('div');
            eventEntry.className = 'event-entry';
            
            // Add appropriate classes based on content
            if (data.highlight) {
                eventEntry.classList.add('highlight');
            }
            
            // Add positive/negative classes based on message content
            if (data.message.includes('boost') || data.message.includes('ahead') || data.message.includes('finds') || data.message.includes('forward')) {
                eventEntry.classList.add('positive');
            } else if (data.message.includes('trips') || data.message.includes('distract') || data.message.includes('wrong') || data.message.includes('slow')) {
                eventEntry.classList.add('negative');
            }
            
            eventEntry.innerHTML = `<span class="timestamp">${timeStr}s</span> ${data.message}`;
            
            // Add to log (at the top for column-reverse layout)
            eventsLog.prepend(eventEntry);
            
            // Remove the code that limits entries to 20
            // Instead, if we have many entries, scroll to ensure the newest is visible
            if (eventsLog.childElementCount > 30) {
                eventsLog.scrollTop = 0;
            }
        });
        
        // When race ends
        simulator.on('raceEnd', (data) => {
            // Mark race as completed
            raceCompleted = true;
            
            // Render results
            renderRaceResults(data.finishedRacers, data.duration);
            
            // Show results section
            raceResults.classList.remove('hidden');
        });
    }
    
    /**
     * Sets up UI event listeners
     */
    function setupUIListeners() {
        // Start race button
        startRaceButton.addEventListener('click', () => {
            // Initialize race with selected chickens and options
            simulator.initRace(
                selectedChickens,
                raceTypeSelect.value,
                trackLengthSelect.value
            );
            
            // Hide setup, show track
            raceSetupSection.classList.add('hidden');
            raceTrackSection.classList.remove('hidden');
            
            // Start the race
            simulator.startRace();
        });
        
        // Reset race button
        resetRaceButton.addEventListener('click', () => {
            // Show setup, hide track
            raceSetupSection.classList.remove('hidden');
            raceTrackSection.classList.add('hidden');
            
            // Reset race completed flag
            raceCompleted = false;
        });
        
        // Save results button
        saveResultsButton.addEventListener('click', () => {
            if (raceCompleted) {
                saveRaceResults();
            }
        });
    }
    
    /**
     * Renders race results
     * @param {Array} racers - Final standings of racers
     * @param {number} duration - Race duration in ms
     */
    function renderRaceResults(racers, duration) {
        // Clear previous results
        resultsList.innerHTML = '';
        
        // Add results for each racer
        racers.forEach((racer, index) => {
            const resultItem = document.createElement('li');
            
            // Format finish time or DNF (Did Not Finish)
            let timeDisplay = 'DNF';
            if (racer.finishTime) {
                timeDisplay = (racer.finishTime / 1000).toFixed(2) + 's';
            }
            
            resultItem.innerHTML = `
                ${racer.name} 
                <span class="chicken-time">${timeDisplay}</span>
            `;
            
            resultsList.appendChild(resultItem);
        });
    }
    
    /**
     * Saves race results to local storage
     */
    function saveRaceResults() {
        // Get winner and update stats for all racers
        if (simulator.finishedRacers.length > 0) {
            // Get updated coop from storage (in case it changed)
            let coop = JSON.parse(localStorage.getItem('chickenCoop') || '[]');
            
            // Update each racer's stats
            simulator.participants.forEach(racer => {
                const chickenIndex = coop.findIndex(c => c.id === racer.id);
                
                if (chickenIndex !== -1) {
                    // Increment race count
                    coop[chickenIndex].raceCount = (coop[chickenIndex].raceCount || 0) + 1;
                    
                    // If this racer was the winner, increment wins
                    if (racer === simulator.finishedRacers[0]) {
                        coop[chickenIndex].wins = (coop[chickenIndex].wins || 0) + 1;
                    }
                }
            });
            
            // Save updated coop
            localStorage.setItem('chickenCoop', JSON.stringify(coop));
            
            alert('Race results saved!');
            
            // Return to setup screen
            resetRaceButton.click();
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
    
    /**
     * Updates the racer sprite to reflect its current state
     * @param {HTMLElement} racerEl - The racer element
     * @param {Object} racer - The racer data
     */
    function updateRacerSprite(racerEl, racer) {
        // Add active effect indicators if any
        if (racer.activeEffects && racer.activeEffects.length > 0) {
            // Create or get the effects container
            let effectsContainer = racerEl.querySelector('.active-effects');
            if (!effectsContainer) {
                effectsContainer = document.createElement('div');
                effectsContainer.className = 'active-effects';
                racerEl.appendChild(effectsContainer);
            }
            
            // Clear and update effects
            effectsContainer.innerHTML = '';
            
            // Show up to 2 active effects
            const effectsToShow = racer.activeEffects.slice(0, 2);
            effectsToShow.forEach(effect => {
                const effectDot = document.createElement('div');
                effectDot.className = 'effect-dot';
                effectDot.classList.add(effect.type === 'speedMultiplier' ? 'speed' : 'movement');
                effectDot.title = `${effect.name} (${effect.ticksLeft} ticks left)`;
                effectsContainer.appendChild(effectDot);
            });
        } else {
            // Remove effects container if no active effects
            const effectsContainer = racerEl.querySelector('.active-effects');
            if (effectsContainer) {
                effectsContainer.remove();
            }
        }
    }
    
    /**
     * Creates the positions overlay for the race track
     * @param {Array} participants - Race participants
     */
    function createPositionsOverlay(participants) {
        // Remove existing overlay if any
        const existingOverlay = document.querySelector('.player-positions');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'player-positions';
        
        // Add title
        const title = document.createElement('div');
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '5px';
        title.style.textAlign = 'center';
        title.textContent = 'RACE POSITIONS';
        overlay.appendChild(title);
        
        // Create position items for each participant
        participants.forEach((participant, index) => {
            const item = document.createElement('div');
            item.className = 'position-item';
            item.setAttribute('data-racer-id', participant.id);
            
            const position = document.createElement('div');
            position.className = 'position';
            position.textContent = index + 1;
            
            const name = document.createElement('div');
            name.className = 'name';
            name.textContent = participant.name;
            
            item.appendChild(position);
            item.appendChild(name);
            overlay.appendChild(item);
        });
        
        // Add to track
        document.querySelector('.race-track').appendChild(overlay);
    }
    
    /**
     * Updates the positions overlay based on current race standings
     * @param {Array} participants - Current race participants with positions
     */
    function updatePositionsOverlay(participants) {
        // Sort participants by position (furthest first)
        const sorted = [...participants].sort((a, b) => b.position - a.position);
        
        // Get the overlay
        const overlay = document.querySelector('.player-positions');
        if (!overlay) return;
        
        // Remove all items
        const items = overlay.querySelectorAll('.position-item');
        
        // Update each item position
        sorted.forEach((participant, index) => {
            // Find the item for this participant
            for (const item of items) {
                if (item.getAttribute('data-racer-id') === participant.id.toString()) {
                    // Update position number
                    item.querySelector('.position').textContent = index + 1;
                    
                    // Move to the correct position in the list
                    overlay.appendChild(item);
                    break;
                }
            }
        });
    }
    
    /**
     * Debug function to verify DOM structure after initialization
     * @param {Array} participants - Race participants
     */
    function debugVerifyDOMStructure(participants) {
        console.log('=== DEBUG: Verifying DOM Structure ===');
        
        // Check if trackLanes element exists
        if (!trackLanes) {
            console.error('trackLanes element not found!');
            return;
        }
        
        console.log(`trackLanes found: ${trackLanes.tagName}, class: ${trackLanes.className}`);
        console.log(`Number of lane elements: ${trackLanes.children.length}`);
        
        // Check each participant
        participants.forEach(participant => {
            console.log(`Checking selectors for ${participant.name} (id: ${participant.id})`);
            
            // Try the primary selector
            const primarySelector = `.race-lane[data-racer-id="${participant.id}"] .chicken-racer`;
            const primaryResult = trackLanes.querySelector(primarySelector);
            console.log(`Primary selector "${primarySelector}": ${primaryResult ? 'FOUND' : 'NOT FOUND'}`);
            
            // Try the fallback selector
            const fallbackSelector = `.chicken-racer[data-id="${participant.id}"]`;
            const fallbackResult = trackLanes.querySelector(fallbackSelector);
            console.log(`Fallback selector "${fallbackSelector}": ${fallbackResult ? 'FOUND' : 'NOT FOUND'}`);
            
            // If both fail, check what lanes and racers actually exist
            if (!primaryResult && !fallbackResult) {
                console.log('DOM elements that DO exist:');
                const lanes = trackLanes.querySelectorAll('.race-lane');
                console.log(`- ${lanes.length} lane elements found`);
                
                lanes.forEach((lane, i) => {
                    console.log(`- Lane ${i}: data-racer-id="${lane.getAttribute('data-racer-id')}"`);
                    const racers = lane.querySelectorAll('.chicken-racer');
                    console.log(`  - Contains ${racers.length} racer elements`);
                    
                    racers.forEach((racer, j) => {
                        console.log(`  - Racer ${j}: data-id="${racer.getAttribute('data-id')}"`);
                    });
                });
            }
        });
        
        console.log('=== DEBUG: DOM Verification Complete ===');
    }
}); 