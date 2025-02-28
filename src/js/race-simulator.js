/**
 * Monster Chicken Races - Race Simulator
 * Handles chicken race simulation and events
 */

class RaceSimulator {
    constructor() {
        // Race constants
        this.MIN_STAT = 1;
        this.MAX_STAT = 10;
        this.RACE_SPEED = 600; // ms between race steps (increased for slower updates)
        
        // Race types and their event frequencies
        this.RACE_TYPES = {
            standard: { chaosFactor: 0.40, positiveEvents: 0.5 },
            chaos: { chaosFactor: 0.65, positiveEvents: 0.4 },
            endurance: { chaosFactor: 0.45, positiveEvents: 0.6 }
        };
        
        // Track lengths in segments
        this.TRACK_LENGTHS = {
            short: 5,
            medium: 10,
            long: 15
        };
        
        // Race properties
        this.participants = [];
        this.raceType = 'standard';
        this.trackLength = 'medium';
        this.raceInProgress = false;
        this.raceSegments = null;
        this.currentTick = 0;
        this.finishedRacers = [];
        this.raceStartTime = null;
        this.eventListeners = {};
        
        // Race events
        this.events = [
            {
                name: 'Speed Boost',
                description: '{chicken} finds a burst of energy!',
                positive: true,
                animation: 'dash',
                duration: 3, // lasts for 3 ticks
                effect: (chicken) => {
                    // Apply instant progress boost
                    chicken.progress += this.getRandomNumber(0.2, 0.5);
                    
                    // Apply speed multiplier for duration
                    chicken.activeEffects.push({
                        name: 'Speed Boost',
                        type: 'speedMultiplier',
                        value: 1.5,
                        duration: 3,
                        ticksLeft: 3
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Trip',
                description: '{chicken} trips over their own feet!',
                positive: false,
                animation: 'shake',
                duration: 2,
                effect: (chicken) => {
                    // Apply instant progress penalty
                    chicken.progress -= this.getRandomNumber(0.1, 0.3);
                    if (chicken.progress < 0) chicken.progress = 0;
                    
                    // Apply speed penalty for duration
                    chicken.activeEffects.push({
                        name: 'Tripped',
                        type: 'speedMultiplier',
                        value: 0.3,
                        duration: 2,
                        ticksLeft: 2
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Shortcut',
                description: '{chicken} finds a secret shortcut!',
                positive: true,
                animation: 'flash',
                duration: 1,
                effect: (chicken) => {
                    // Big instant progress boost
                    chicken.progress += this.getRandomNumber(1, 2);
                    return chicken;
                }
            },
            {
                name: 'Distraction',
                description: '{chicken} got distracted by something shiny!',
                positive: false,
                animation: 'spin',
                duration: 2,
                effect: (chicken) => {
                    // Apply speed penalty for duration
                    chicken.activeEffects.push({
                        name: 'Distracted',
                        type: 'speedMultiplier',
                        value: 0.5,
                        duration: 2,
                        ticksLeft: 2
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Wind Gust',
                description: 'A gust of wind pushes {chicken} forward!',
                positive: true,
                animation: 'flash',
                duration: 1,
                effect: (chicken) => {
                    // Apply instant progress boost
                    chicken.progress += this.getRandomNumber(0.7, 1.3);
                    return chicken;
                }
            },
            {
                name: 'Wrong Turn',
                description: '{chicken} takes a wrong turn!',
                positive: false,
                animation: 'shake',
                duration: 3,
                effect: (chicken) => {
                    // Apply instant progress penalty
                    chicken.progress -= this.getRandomNumber(0.4, 0.8);
                    if (chicken.progress < 0) chicken.progress = 0;
                    
                    // Apply movement confusion effect
                    chicken.activeEffects.push({
                        name: 'Wrong Direction',
                        type: 'movement',
                        value: 'confused',
                        duration: 3,
                        ticksLeft: 3
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Super Dash',
                description: '{chicken} performs a super dash!',
                positive: true,
                animation: 'dash',
                duration: 4,
                effect: (chicken) => {
                    // Apply instant progress boost
                    chicken.progress += this.getRandomNumber(0.5, 1.0);
                    
                    // Apply super speed multiplier for duration
                    chicken.activeEffects.push({
                        name: 'Super Dash',
                        type: 'speedMultiplier',
                        value: 2.0,
                        duration: 4,
                        ticksLeft: 4
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Chicken Fight',
                description: '{chicken} stops to fight with another chicken!',
                positive: false,
                animation: 'shake',
                duration: 2,
                effect: (chicken) => {
                    // Apply movement stop effect
                    chicken.activeEffects.push({
                        name: 'Fighting',
                        type: 'speedMultiplier',
                        value: 0,
                        duration: 2,
                        ticksLeft: 2
                    });
                    
                    return chicken;
                }
            }
        ];
        
        // Chaos events (rarer but more impactful)
        this.chaosEvents = [
            {
                name: 'Meteor Strike',
                description: 'A tiny meteor strikes near {chicken}!',
                positive: false,
                animation: 'shake',
                duration: 4,
                effect: (chicken) => {
                    // Apply instant progress penalty
                    chicken.progress -= this.getRandomNumber(1.5, 2.5);
                    if (chicken.progress < 0) chicken.progress = 0;
                    
                    // Apply movement dazed effect
                    chicken.activeEffects.push({
                        name: 'Meteor Dazed',
                        type: 'movement',
                        value: 'dazed',
                        duration: 4,
                        ticksLeft: 4
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Teleportation',
                description: '{chicken} mysteriously teleports ahead!',
                positive: true,
                animation: 'flash',
                duration: 1,
                effect: (chicken) => {
                    // Big instant progress boost
                    chicken.progress += this.getRandomNumber(2, 4);
                    
                    // Apply a brief disorientation effect afterward
                    chicken.activeEffects.push({
                        name: 'Teleport Disorientation',
                        type: 'speedMultiplier',
                        value: 0.8,
                        duration: 1,
                        ticksLeft: 1
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Black Hole',
                description: 'A mini black hole appears, slowing {chicken} down!',
                positive: false,
                animation: 'spin',
                duration: 5,
                effect: (chicken) => {
                    // Apply heavy speed penalty for duration
                    chicken.activeEffects.push({
                        name: 'Black Hole Gravity',
                        type: 'speedMultiplier',
                        value: 0.3,
                        duration: 5,
                        ticksLeft: 5
                    });
                    
                    // Apply movement warped effect
                    chicken.activeEffects.push({
                        name: 'Gravitational Pull',
                        type: 'movement',
                        value: 'warped',
                        duration: 5,
                        ticksLeft: 5
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Golden Egg',
                description: '{chicken} finds a golden egg, gaining super speed!',
                positive: true,
                animation: 'flash',
                duration: 6,
                effect: (chicken) => {
                    // Apply strong speed multiplier for long duration
                    chicken.activeEffects.push({
                        name: 'Golden Speed',
                        type: 'speedMultiplier',
                        value: 2.5,
                        duration: 6,
                        ticksLeft: 6
                    });
                    
                    return chicken;
                }
            },
            {
                name: 'Time Freeze',
                description: 'Time freezes around {chicken}, allowing them to move ahead!',
                positive: true,
                animation: 'flash',
                duration: 1,
                effect: (chicken) => {
                    // Huge instant progress boost
                    chicken.progress += this.getRandomNumber(3, 5);
                    return chicken;
                }
            },
            {
                name: 'Alien Abduction',
                description: '{chicken} is briefly abducted by aliens!',
                positive: false,
                animation: 'flash',
                duration: 3,
                effect: (chicken) => {
                    // Reset progress to zero
                    chicken.progress = 0;
                    
                    // But apply speed boost afterward as compensation
                    chicken.activeEffects.push({
                        name: 'Alien Tech',
                        type: 'speedMultiplier',
                        value: 3.0,
                        duration: 3,
                        ticksLeft: 3
                    });
                    
                    return chicken;
                }
            }
        ];
        
        // Define movement patterns
        this.movementPatterns = {
            normal: (racer) => {
                // Default smooth movement
                return { animation: null, position: racer.position, transform: null };
            },
            confused: (racer) => {
                // Zigzag movement - horizontal rather than vertical to be more visible
                const zigzagOffset = Math.sin(this.currentTick * 0.8) * 8;
                return { 
                    animation: 'shake', 
                    position: racer.position,
                    transform: `translateX(${zigzagOffset}px)`
                };
            },
            dazed: (racer) => {
                // Wobbly movement - more pronounced
                const wobbleOffset = Math.sin(this.currentTick * 1.5) * 8;
                return { 
                    animation: 'shake', 
                    position: racer.position,
                    transform: `rotate(${wobbleOffset}deg)`
                };
            },
            warped: (racer) => {
                // Pulsating movement - more pronounced
                const pulseScale = 1 + Math.sin(this.currentTick * 0.5) * 0.3;
                return { 
                    animation: 'spin', 
                    position: racer.position,
                    transform: `scale(${pulseScale})`
                };
            }
        };
        
        // Define custom animations
        this.animations = {
            dash: 'flash',  // Reuse flash animation for dash
            shake: 'shake',
            spin: 'spin',
            flash: 'flash'
        };
    }
    
    /**
     * Initializes a new race
     * @param {Array} chickens - Array of chicken objects
     * @param {string} raceType - Type of race (standard, chaos, endurance)
     * @param {string} trackLength - Length of track (short, medium, long)
     */
    initRace(chickens, raceType = 'standard', trackLength = 'medium') {
        console.log('Initializing race with chickens:', chickens.map(c => ({id: c.id, name: c.name})));
        
        // Reset race state
        this.participants = [];
        this.finishedRacers = [];
        this.currentTick = 0;
        this.raceInProgress = false;
        
        // Set race properties
        this.raceType = raceType;
        this.trackLength = trackLength;
        this.raceSegments = this.TRACK_LENGTHS[trackLength];
        
        // Initialize participants
        chickens.forEach(chicken => {
            // Ensure chicken has valid properties
            if (!chicken.name || chicken.name.includes('undefined')) {
                console.error('Chicken has invalid name:', chicken);
                // Provide a better fallback name
                chicken.name = `Chicken #${chicken.id || Math.floor(Math.random() * 1000)}`;
            }
            
            // Create participant with all required properties
            const participant = {
                id: chicken.id,
                name: chicken.name,
                sprite: chicken.sprite,
                image: chicken.image,
                stats: chicken.stats || { speed: 5, stamina: 5, recklessness: 5 },
                progress: 0,
                position: 0, 
                speed: 0, // Will be calculated below
                baseSpeed: 0, // Will be calculated below
                finished: false,
                finishTime: null,
                effect: null,
                activeEffects: [],
                movementPattern: 'normal',
                transform: null
            };
            
            // Calculate speeds
            participant.speed = this.calculateRaceSpeed(participant.stats);
            participant.baseSpeed = participant.speed;
            
            // Add to participants array
            this.participants.push(participant);
            console.log(`Added participant: ${participant.name} (id: ${participant.id}), speed: ${participant.speed.toFixed(2)}`);
        });
        
        // Trigger initialized event
        this.triggerEvent('initialized', { 
            participants: this.participants, 
            raceType: this.raceType,
            trackLength: this.trackLength,
            segments: this.raceSegments
        });
    }
    
    /**
     * Starts the race
     */
    startRace() {
        if (this.participants.length < 2) {
            throw new Error('Not enough participants to start race');
        }
        
        this.raceInProgress = true;
        this.raceStartTime = Date.now();
        
        // Trigger race start event
        this.triggerEvent('raceStart', { 
            participants: this.participants,
            startTime: this.raceStartTime
        });
        
        // Log race start
        this.logEvent('Race started!', true);
        
        // Start race loop
        this.raceInterval = setInterval(() => this.raceLoop(), this.RACE_SPEED);
    }
    
    /**
     * Main race loop
     */
    raceLoop() {
        this.currentTick++;
        
        // Update all participants
        this.updateRacers();
        
        // Check if race is finished
        if (this.isRaceFinished()) {
            clearInterval(this.raceInterval);
            this.raceInProgress = false;
            
            // Calculate final standings
            this.calculateStandings();
            
            // Trigger race end event
            this.triggerEvent('raceEnd', { 
                finishedRacers: this.finishedRacers,
                duration: Date.now() - this.raceStartTime
            });
            
            // Log race end
            this.logEvent('Race finished!', true);
        }
    }
    
    /**
     * Updates all racers for the current tick
     */
    updateRacers() {
        // Process each racer
        this.participants.forEach(racer => {
            if (racer.finished) return;
            
            // Process active effects (speed multipliers, etc.)
            this.processActiveEffects(racer);
            
            // Update position based on current speed (after effects are applied)
            // Ensure visible progress in each step - slowed down for a better viewing experience
            const minProgressPerTick = 0.15; // DECREASED for slower, more engaging racing
            const progressThisTick = Math.max(minProgressPerTick, racer.speed);
            racer.progress += progressThisTick;
            
            console.log(`Updating ${racer.name}: adding progress ${progressThisTick.toFixed(2)} (base: ${racer.baseSpeed.toFixed(2)}, speed: ${racer.speed.toFixed(2)})`);
            
            // Check for random events MORE FREQUENTLY (every 2 ticks instead of 3)
            if (this.currentTick % 2 === 0) {
                this.checkForEvents(racer);
            }
            
            // Check if racer finished
            if (racer.progress >= this.raceSegments) {
                racer.finished = true;
                racer.finishTime = Date.now() - this.raceStartTime;
                racer.progress = this.raceSegments; // Cap at finish line
                
                // Add to finished racers
                this.finishedRacers.push(racer);
                
                // Log finish
                this.logEvent(`${racer.name} has crossed the finish line!`, true);
                
                // Trigger racer finish event
                this.triggerEvent('racerFinish', { racer });
            }
            
            // Calculate visual position (0-100)
            const oldPosition = racer.position;
            racer.position = (racer.progress / this.raceSegments) * 100;
            console.log(`${racer.name} position: ${oldPosition.toFixed(1)}% → ${racer.position.toFixed(1)}% (progress: ${racer.progress.toFixed(1)}/${this.raceSegments})`);
            
            // Apply movement pattern
            if (racer.movementPattern && this.movementPatterns[racer.movementPattern]) {
                const movementResult = this.movementPatterns[racer.movementPattern](racer);
                racer.effect = movementResult.animation || racer.effect;
                racer.transform = movementResult.transform;
            }
        });
        
        // Trigger tick update event
        this.triggerEvent('tickUpdate', { 
            participants: this.participants, 
            tick: this.currentTick 
        });
    }
    
    /**
     * Process active effects on a racer
     * @param {Object} racer - The racer to process effects for
     */
    processActiveEffects(racer) {
        // Reset speed to base speed before applying effects
        racer.speed = racer.baseSpeed;
        
        // Set default movement pattern
        racer.movementPattern = 'normal';
        
        // No active effects? Return early
        if (!racer.activeEffects || racer.activeEffects.length === 0) {
            return;
        }
        
        // Process each active effect
        for (let i = racer.activeEffects.length - 1; i >= 0; i--) {
            const effect = racer.activeEffects[i];
            
            // Apply effect based on type
            switch (effect.type) {
                case 'speedMultiplier':
                    racer.speed *= effect.value;
                    break;
                case 'movement':
                    racer.movementPattern = effect.value;
                    break;
                // Could add more effect types here
            }
            
            // Decrease ticks left
            effect.ticksLeft--;
            
            // If effect has expired, set visual effect and remove
            if (effect.ticksLeft <= 0) {
                // Log effect end
                this.logEvent(`${effect.name} effect on ${racer.name} has worn off.`);
                
                // Remove the effect
                racer.activeEffects.splice(i, 1);
            }
        }
        
        // Ensure speed doesn't go below minimum threshold
        if (racer.speed < 0.05) {
            racer.speed = 0.05;
        }
    }
    
    /**
     * Checks for random events for a racer
     * @param {Object} racer - The racer to check events for
     */
    checkForEvents(racer) {
        // Get race type settings
        const raceSettings = this.RACE_TYPES[this.raceType];
        
        // Determine if an event should happen (based on race type)
        if (Math.random() < raceSettings.chaosFactor) {
            // Determine if it's a chaos event (rarer)
            const isChaosEvent = Math.random() < 0.3;
            
            // Determine if it's a positive event
            const isPositive = Math.random() < raceSettings.positiveEvents;
            
            // Get appropriate events pool
            const eventsPool = isChaosEvent ? this.chaosEvents : this.events;
            
            // Filter events by positive/negative
            const filteredEvents = eventsPool.filter(event => event.positive === isPositive);
            
            // Select a random event
            const event = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
            
            // Apply event effect
            const prevProgress = racer.progress;
            event.effect(racer);
            
            // Set visual effect - ensure animation works
            racer.effect = this.animations[event.animation];
            
            // Log the event
            const description = event.description.replace('{chicken}', racer.name);
            this.logEvent(description);
            
            // Trigger event happened
            this.triggerEvent('eventHappened', { 
                racer, 
                event, 
                description,
                progressChange: racer.progress - prevProgress
            });

            // Log for debugging
            console.log(`Event triggered: ${description} (Animation: ${racer.effect})`);
        }
    }
    
    /**
     * Checks if all racers have finished or race is aborted
     * @returns {boolean} Whether the race is finished
     */
    isRaceFinished() {
        return (
            this.participants.every(racer => racer.finished) ||
            this.currentTick > this.raceSegments * 10 // Safety to prevent endless races
        );
    }
    
    /**
     * Calculates final standings for the race
     */
    calculateStandings() {
        // Sort by finish time
        this.finishedRacers.sort((a, b) => a.finishTime - b.finishTime);
        
        // Add any non-finished racers at the end
        const nonFinished = this.participants.filter(racer => !racer.finished);
        nonFinished.sort((a, b) => b.progress - a.progress); // Sort by progress
        
        this.finishedRacers = [...this.finishedRacers, ...nonFinished];
    }
    
    /**
     * Logs an event to the race log
     * @param {string} message - The event message
     * @param {boolean} highlight - Whether to highlight the event
     */
    logEvent(message, highlight = false) {
        this.triggerEvent('logEvent', { 
            message, 
            highlight, 
            time: Date.now() - this.raceStartTime 
        });
    }
    
    /**
     * Calculates a racer's speed based on their stats
     * @param {Object} stats - The chicken's stats
     * @returns {number} The calculated race speed
     */
    calculateRaceSpeed(stats) {
        // Base speed is affected primarily by the speed stat, but other stats have some influence
        // Increase the base speed multiplier to make movement more noticeable
        const baseSpeed = 0.25 + (stats.speed * 0.05);
        
        // Recklessness adds variability (can be good or bad)
        const recklessBonus = (Math.random() * stats.recklessness * 0.04) - (stats.recklessness * 0.02);
        
        // Stamina affects consistency (higher stamina = more consistent speed)
        const staminaFactor = 1 + (stats.stamina * 0.03);
        
        // Add small random factor to make races less predictable
        const randomFactor = 1 + (Math.random() * 0.15 - 0.075);
        
        // Return final speed calculation
        return (baseSpeed + recklessBonus) * staminaFactor * randomFactor;
    }
    
    /**
     * Gets a random number between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    /**
     * Adds an event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }
    
    /**
     * Removes an event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function to remove
     */
    off(event, callback) {
        if (!this.eventListeners[event]) return;
        this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
    
    /**
     * Triggers an event
     * @param {string} event - Event name
     * @param {Object} data - Event data
     */
    triggerEvent(event, data) {
        if (!this.eventListeners[event]) return;
        this.eventListeners[event].forEach(callback => callback(data));
    }
}

// Export the simulator
window.RaceSimulator = RaceSimulator; 