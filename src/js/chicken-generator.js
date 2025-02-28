/**
 * Monster Chicken Generator
 * Generates unique monster chickens based on image uploads
 */

class ChickenGenerator {
    constructor() {
        // Constants
        this.MIN_STAT = 1;
        this.MAX_STAT = 10;
        
        // Chicken properties
        this.uploadedImage = null;
        this.imageHash = null;
        this.chickenData = null;
        
        // Funny names components
        this.adjectives = [
            'Ferocious', 'Mighty', 'Chaotic', 'Explosive', 'Bizarre', 
            'Cosmic', 'Demonic', 'Electric', 'Flaming', 'Ghostly',
            'Glitchy', 'Haunted', 'Infernal', 'Majestic', 'Mutant',
            'Psychic', 'Radioactive', 'Slimy', 'Toxic', 'Undead',
            'Wobbly', 'Zonked', 'Quantum', 'Turbo', 'Hyper',
            'Mega', 'Ultra', 'Super', 'Extreme', 'Maximum'
        ];
        
        this.nouns = [
            'Clucker', 'Destroyer', 'Demolisher', 'Avenger', 'Menace',
            'Crusher', 'Peckerhead', 'Clawmaster', 'Winger', 'Sprinter',
            'Gobbler', 'Rooster', 'Phoenix', 'Titan', 'Behemoth',
            'Obliterator', 'Nightmare', 'Terror', 'Doom', 'Overlord',
            'Disaster', 'Calamity', 'Catastrophe', 'Abomination', 'Monster',
            'Anomaly', 'Aberration', 'Mutant', 'Freak', 'Phantom'
        ];
        
        // Chicken body parts for sprite generation
        this.bodyColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', 
                           '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
                           '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800'];
                          
        this.eyeColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
                          '#FFFF00', '#FF00FF', '#00FFFF'];
        
        this.combStyles = ['jagged', 'smooth', 'spiky', 'crown', 'mohawk'];
        
        this.legFeatures = ['normal', 'thick', 'thin', 'clawed', 'robot'];
    }
    
    /**
     * Generates a simple hash from an image
     * @param {File} imageFile - The uploaded image file
     * @returns {Promise<string>} A hash string
     */
    async generateImageHash(imageFile) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target.result;
                
                // Simple string-based hash function
                let hash = 0;
                for (let i = 0; i < result.length; i++) {
                    const char = result.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash; // Convert to 32bit integer
                }
                
                // Make hash positive and convert to string
                this.imageHash = Math.abs(hash).toString(16);
                resolve(this.imageHash);
            };
            reader.readAsBinaryString(imageFile);
        });
    }
    
    /**
     * Generates a seeded random number
     * @param {string} seed - Seed for the random number
     * @returns {number} A number between 0 and 1
     */
    seededRandom(seed) {
        const seedNum = parseInt(seed, 16);
        const x = Math.sin(seedNum) * 10000;
        return x - Math.floor(x);
    }
    
    /**
     * Generates random stats based on seed
     * @param {string} seed - Seed for randomization
     * @returns {Object} Stats object
     */
    generateStats(seed) {
        // Use different parts of the seed for each stat
        const seedParts = seed.split('').reduce((acc, char, i) => {
            const index = i % 5;
            acc[index] = (acc[index] || '') + char;
            return acc;
        }, []);
        
        return {
            speed: Math.floor(this.seededRandom(seedParts[0]) * (this.MAX_STAT - this.MIN_STAT + 1)) + this.MIN_STAT,
            strength: Math.floor(this.seededRandom(seedParts[1]) * (this.MAX_STAT - this.MIN_STAT + 1)) + this.MIN_STAT,
            wisdom: Math.floor(this.seededRandom(seedParts[2]) * (this.MAX_STAT - this.MIN_STAT + 1)) + this.MIN_STAT,
            recklessness: Math.floor(this.seededRandom(seedParts[3]) * (this.MAX_STAT - this.MIN_STAT + 1)) + this.MIN_STAT,
            stamina: Math.floor(this.seededRandom(seedParts[4]) * (this.MAX_STAT - this.MIN_STAT + 1)) + this.MIN_STAT
        };
    }
    
    /**
     * Generates a funny name for the chicken
     * @param {string} seed - Seed for name generation
     * @returns {string} Generated name
     */
    generateName(seed) {
        // Ensure we have enough characters in the seed
        if (!seed || seed.length < 16) {
            seed = seed || '';
            // Pad seed if it's too short
            while (seed.length < 16) {
                seed += Math.random().toString(16).substring(2, 10);
            }
        }
        
        const adjIndex = Math.floor(this.seededRandom(seed.slice(0, 8)) * this.adjectives.length);
        const nounIndex = Math.floor(this.seededRandom(seed.slice(8, 16)) * this.nouns.length);
        
        // Make sure indices are valid
        const adjective = this.adjectives[adjIndex] || this.adjectives[0];
        const noun = this.nouns[nounIndex] || this.nouns[0];
        
        return `${adjective} ${noun}`;
    }
    
    /**
     * Generates a chicken sprite based on the hash
     * @param {string} hash - The image hash
     * @returns {string} SVG string of the chicken sprite
     */
    generateSprite(hash) {
        // Use different parts of the hash to determine chicken features
        const hashParts = hash.match(/.{1,4}/g) || [];
        
        // Select features based on hash
        const bodyColorIndex = Math.floor(this.seededRandom(hashParts[0]) * this.bodyColors.length);
        const eyeColorIndex = Math.floor(this.seededRandom(hashParts[1]) * this.eyeColors.length);
        const combStyleIndex = Math.floor(this.seededRandom(hashParts[2]) * this.combStyles.length);
        const legFeatureIndex = Math.floor(this.seededRandom(hashParts[3]) * this.legFeatures.length);
        
        // Generate mutations based on stats
        const stats = this.chickenData.stats;
        
        // More reckless chickens have wilder eyes
        const eyeSize = 5 + Math.floor(stats.recklessness / 2);
        
        // Stronger chickens have larger bodies
        const bodySize = 40 + Math.floor(stats.strength * 2);
        
        // Faster chickens have longer legs
        const legLength = 15 + Math.floor(stats.speed * 2);
        
        // Generate SVG
        return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <!-- Body -->
            <ellipse cx="50" cy="50" rx="${bodySize/2}" ry="${bodySize/2}" fill="${this.bodyColors[bodyColorIndex]}" />
            
            <!-- Eyes -->
            <circle cx="35" cy="40" r="${eyeSize}" fill="${this.eyeColors[eyeColorIndex]}" />
            <circle cx="65" cy="40" r="${eyeSize}" fill="${this.eyeColors[eyeColorIndex]}" />
            <circle cx="35" cy="40" r="${eyeSize/2}" fill="#000" />
            <circle cx="65" cy="40" r="${eyeSize/2}" fill="#000" />
            
            <!-- Beak -->
            <polygon points="50,45 40,55 60,55" fill="#FFA000" />
            
            <!-- Comb -->
            ${this.generateComb(combStyleIndex, stats.wisdom)}
            
            <!-- Legs -->
            ${this.generateLegs(legFeatureIndex, legLength)}
        </svg>
        `;
    }
    
    /**
     * Generates a comb for the chicken based on style and wisdom
     * @param {number} styleIndex - The comb style index
     * @param {number} wisdom - The wisdom stat value
     * @returns {string} SVG string of the comb
     */
    generateComb(styleIndex, wisdom) {
        // Wiser chickens have more elaborate combs
        const combSize = 5 + Math.floor(wisdom);
        
        switch (this.combStyles[styleIndex]) {
            case 'jagged':
                return `
                <polygon points="30,30 35,15 40,25 45,10 50,20 55,15 60,25 65,10 70,30" 
                         fill="#FF0000" />
                `;
            case 'smooth':
                return `
                <path d="M30,30 Q50,${15-combSize} 70,30" fill="#FF0000" stroke="#FF0000" stroke-width="5" />
                `;
            case 'spiky':
                return `
                <polygon points="30,30 40,${20-combSize} 45,30 50,${15-combSize} 55,30 60,${20-combSize} 70,30" 
                         fill="#FF0000" />
                `;
            case 'crown':
                return `
                <path d="M30,30 L40,${20-combSize} L45,30 L50,${15-combSize} L55,30 L60,${20-combSize} L70,30" 
                      fill="none" stroke="#FFD700" stroke-width="3" />
                <circle cx="40" cy="${20-combSize}" r="2" fill="#FFD700" />
                <circle cx="50" cy="${15-combSize}" r="2" fill="#FFD700" />
                <circle cx="60" cy="${20-combSize}" r="2" fill="#FFD700" />
                `;
            case 'mohawk':
                return `
                <rect x="45" y="${20-combSize}" width="10" height="${combSize+10}" fill="#FF00FF" />
                <rect x="43" y="${18-combSize}" width="14" height="3" fill="#FF00FF" />
                `;
            default:
                return `<circle cx="50" cy="20" r="5" fill="#FF0000" />`;
        }
    }
    
    /**
     * Generates legs for the chicken based on style and length
     * @param {number} styleIndex - The leg style index
     * @param {number} length - The leg length
     * @returns {string} SVG string of the legs
     */
    generateLegs(styleIndex, length) {
        switch (this.legFeatures[styleIndex]) {
            case 'thick':
                return `
                <rect x="40" y="70" width="6" height="${length}" fill="#FFA000" />
                <rect x="54" y="70" width="6" height="${length}" fill="#FFA000" />
                <polygon points="38,${70+length} 48,${70+length} 43,${75+length}" fill="#FFA000" />
                <polygon points="52,${70+length} 62,${70+length} 57,${75+length}" fill="#FFA000" />
                `;
            case 'thin':
                return `
                <rect x="42" y="70" width="2" height="${length}" fill="#FFA000" />
                <rect x="56" y="70" width="2" height="${length}" fill="#FFA000" />
                <polygon points="40,${70+length} 46,${70+length} 43,${73+length}" fill="#FFA000" />
                <polygon points="54,${70+length} 60,${70+length} 57,${73+length}" fill="#FFA000" />
                `;
            case 'clawed':
                return `
                <rect x="42" y="70" width="3" height="${length}" fill="#FFA000" />
                <rect x="55" y="70" width="3" height="${length}" fill="#FFA000" />
                <path d="M41,${70+length} L40,${75+length} L43,${73+length} L46,${75+length} L45,${70+length}" fill="#FF0000" />
                <path d="M54,${70+length} L53,${75+length} L56,${73+length} L59,${75+length} L58,${70+length}" fill="#FF0000" />
                `;
            case 'robot':
                return `
                <rect x="40" y="70" width="5" height="${length}" fill="#888888" stroke="#444" />
                <rect x="55" y="70" width="5" height="${length}" fill="#888888" stroke="#444" />
                <rect x="38" y="${70+length}" width="9" height="3" fill="#666666" />
                <rect x="53" y="${70+length}" width="9" height="3" fill="#666666" />
                `;
            case 'normal':
            default:
                return `
                <rect x="42" y="70" width="3" height="${length}" fill="#FFA000" />
                <rect x="55" y="70" width="3" height="${length}" fill="#FFA000" />
                <polygon points="40,${70+length} 47,${70+length} 43,${75+length}" fill="#FFA000" />
                <polygon points="53,${70+length} 60,${70+length} 57,${75+length}" fill="#FFA000" />
                `;
        }
    }
    
    /**
     * Generates a chicken based on the uploaded image
     * @param {File} imageFile - The uploaded image file
     * @returns {Promise<Object>} Generated chicken data
     */
    async generateChicken(imageFile) {
        // Set the uploaded image
        this.uploadedImage = imageFile;
        
        // Generate hash from image
        const hash = await this.generateImageHash(imageFile);
        
        // Generate chicken properties
        const stats = this.generateStats(hash);
        const name = this.generateName(hash);
        
        // Create chicken data object
        this.chickenData = {
            name,
            stats,
            image: URL.createObjectURL(imageFile),
            hash
        };
        
        // Generate chicken sprite
        this.chickenData.sprite = this.generateSprite(hash);
        
        return this.chickenData;
    }
}

// Export the generator
window.ChickenGenerator = ChickenGenerator; 