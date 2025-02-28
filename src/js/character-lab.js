/**
 * Character Lab - Chicken Builder & Animator
 * A development tool for creating and testing chicken designs and animations
 */

class ChickenLab {
    constructor() {
        // Set initial state
        this.currentView = 'front';
        this.currentPart = 'all';
        this.isAnimating = false;
        this.currentAnimation = null;
        
        // Define all possible trait types and variants
        this.traitDefinitions = {
            // Head traits
            eyes: {
                name: "Eyes",
                category: "head",
                variants: {
                    normal: { name: "Normal", description: "Standard chicken eyes" },
                    angry: { name: "Angry", description: "Angled eyes with eyebrows" },
                    cute: { name: "Cute", description: "Big adorable eyes with sparkles" },
                    derp: { name: "Derp", description: "Crossed/silly eyes" },
                    sleepy: { name: "Sleepy", description: "Half-closed tired eyes" },
                    suspicious: { name: "Suspicious", description: "Narrowed, skeptical eyes" },
                    robot: { name: "Robot", description: "Mechanical/digital eyes" },
                    hypno: { name: "Hypno", description: "Spiral hypnotic pattern" },
                    anime: { name: "Anime", description: "Large, expressive anime-style eyes" },
                    pixel: { name: "Pixel", description: "8-bit retro pixel eyes" },
                    heart: { name: "Heart", description: "Heart-shaped loving eyes" },
                    star: { name: "Star", description: "Star-struck sparkly eyes" },
                    money: { name: "Money", description: "Dollar signs for eyes" },
                    rainbow: { name: "Rainbow", description: "Colorful rainbow iris" },
                    cyclops: { name: "Cyclops", description: "Single large central eye" },
                    alien: { name: "Alien", description: "Multiple alien eyes" },
                    ghost: { name: "Ghost", description: "Hollow, spectral eyes" },
                    dragon: { name: "Dragon", description: "Reptilian slitted pupils" },
                    demon: { name: "Demon", description: "Glowing red demonic eyes" },
                    cyborg: { name: "Cyborg", description: "One normal, one mechanical eye" },
                    dizzy: { name: "Dizzy", description: "Spinning spiral eyes" },
                    glitch: { name: "Glitch", description: "Glitchy, distorted eyes" },
                    cosmic: { name: "Cosmic", description: "Galaxy swirls in eyes" },
                    cat: { name: "Cat", description: "Feline-style eyes" },
                    zombie: { name: "Zombie", description: "Undead, cloudy eyes" },
                    fire: { name: "Fire", description: "Flames in the eyes" },
                    ice: { name: "Ice", description: "Crystalline ice eyes" },
                    void: { name: "Void", description: "Empty black holes" },
                    ancient: { name: "Ancient", description: "Hieroglyphic symbols" }
                }
            },
            top: {
                name: "Comb",
                category: "head",
                variants: {
                    normal: { name: "Normal", description: "Classic jagged comb" },
                    mohawk: { name: "Mohawk", description: "Tall spiky mohawk" },
                    fancy: { name: "Fancy", description: "Elegant curved comb" },
                    punk: { name: "Punk", description: "Aggressive spiky comb" },
                    royal: { name: "Royal", description: "Crown-like comb" },
                    flat: { name: "Flat", description: "Low-profile smooth comb" },
                    heart: { name: "Heart", description: "Heart-shaped comb" },
                    horns: { name: "Horns", description: "Devil-like horns" },
                    antlers: { name: "Antlers", description: "Majestic deer antlers" },
                    unicorn: { name: "Unicorn", description: "Magical unicorn horn" },
                    samurai: { name: "Samurai", description: "Traditional samurai helmet" },
                    viking: { name: "Viking", description: "Norse warrior horns" },
                    wizard: { name: "Wizard", description: "Mystical floating crystals" },
                    cyber: { name: "Cyber", description: "Digital antenna array" },
                    flame: { name: "Flame", description: "Living fire crest" },
                    crystal: { name: "Crystal", description: "Growing crystal formation" },
                    flower: { name: "Flower", description: "Blooming flower petals" },
                    cloud: { name: "Cloud", description: "Floating cloud formation" },
                    lightning: { name: "Lightning", description: "Electric discharge" },
                    tentacles: { name: "Tentacles", description: "Writhing tentacles" },
                    pyramid: { name: "Pyramid", description: "Ancient pyramid structure" },
                    satellite: { name: "Satellite", description: "Space satellite dish" },
                    brain: { name: "Brain", description: "Exposed brain matter" },
                    coral: { name: "Coral", description: "Growing coral formation" },
                    mushroom: { name: "Mushroom", description: "Fungal growth" },
                    bamboo: { name: "Bamboo", description: "Bamboo shoots" },
                    gears: { name: "Gears", description: "Mechanical gear assembly" },
                    feathers: { name: "Feathers", description: "Exotic feather display" }
                }
            },
            beak: {
                name: "Beak",
                category: "head",
                variants: {
                    normal: { name: "Normal", description: "Standard triangular beak" },
                    sharp: { name: "Sharp", description: "Long pointed beak" },
                    hook: { name: "Hook", description: "Curved hook-like beak" },
                    small: { name: "Small", description: "Tiny cute beak" },
                    wide: { name: "Wide", description: "Broad duck-like beak" },
                    parrot: { name: "Parrot", description: "Curved parrot beak" },
                    broken: { name: "Broken", description: "Chipped/broken beak" },
                    buck: { name: "Buck", description: "Buck-toothed beak" },
                    toucan: { name: "Toucan", description: "Large colorful beak" },
                    pelican: { name: "Pelican", description: "Expandable pouch beak" },
                    crossbill: { name: "Crossbill", description: "Crossed-over beak tips" },
                    shovel: { name: "Shovel", description: "Flat spade-like beak" },
                    needle: { name: "Needle", description: "Extra thin needle beak" },
                    scissor: { name: "Scissor", description: "Scissor-like beak" },
                    drill: { name: "Drill", description: "Spiral drill beak" },
                    hammer: { name: "Hammer", description: "Hammer-shaped beak" },
                    sword: { name: "Sword", description: "Sword-like beak" },
                    cannon: { name: "Cannon", description: "Cannon barrel beak" },
                    trumpet: { name: "Trumpet", description: "Musical instrument beak" },
                    pencil: { name: "Pencil", description: "Writing utensil beak" },
                    brush: { name: "Brush", description: "Paint brush tip" },
                    crystal: { name: "Crystal", description: "Crystalline formation" },
                    metal: { name: "Metal", description: "Chrome-plated beak" },
                    gold: { name: "Gold", description: "Solid gold beak" },
                    rainbow: { name: "Rainbow", description: "Color-changing beak" },
                    pixel: { name: "Pixel", description: "8-bit style beak" },
                    ghost: { name: "Ghost", description: "Transparent spectral beak" },
                    lava: { name: "Lava", description: "Molten rock beak" }
                }
            },
            wattle: {
                name: "Wattle",
                category: "head",
                variants: {
                    normal: { name: "Normal", description: "Standard wattle" },
                    long: { name: "Long", description: "Extra long dangly wattle" },
                    fancy: { name: "Fancy", description: "Decorative frilly wattle" },
                    tiny: { name: "Tiny", description: "Minimal wattle" },
                    heart: { name: "Heart", description: "Heart-shaped wattle" },
                    double: { name: "Double", description: "Two-tiered wattle" },
                    none: { name: "None", description: "No wattle" },
                    spiked: { name: "Spiked", description: "Spiky punk wattle" },
                    ruffled: { name: "Ruffled", description: "Multi-layered ruffles" },
                    jeweled: { name: "Jeweled", description: "Gem-encrusted wattle" },
                    chain: { name: "Chain", description: "Chain-link wattle" },
                    tentacle: { name: "Tentacle", description: "Writhing tentacle" },
                    flame: { name: "Flame", description: "Fire-like wattle" },
                    ice: { name: "Ice", description: "Frozen crystal wattle" },
                    leaf: { name: "Leaf", description: "Plant-like growth" },
                    metal: { name: "Metal", description: "Mechanical plates" },
                    bubble: { name: "Bubble", description: "Transparent bubbles" },
                    pixel: { name: "Pixel", description: "8-bit style wattle" },
                    neon: { name: "Neon", description: "Glowing neon tubes" },
                    cloud: { name: "Cloud", description: "Fluffy cloud form" },
                    crystal: { name: "Crystal", description: "Growing crystals" },
                    coral: { name: "Coral", description: "Sea coral growth" },
                    circuit: { name: "Circuit", description: "Electronic pathways" },
                    origami: { name: "Origami", description: "Paper-folded design" },
                    candy: { name: "Candy", description: "Sweet treat design" },
                    rainbow: { name: "Rainbow", description: "Color-changing wattle" }
                }
            },
            
            // Body traits
            bodyShape: {
                name: "Body Shape",
                category: "body",
                variants: {
                    normal: { name: "Normal", description: "Standard chicken body" },
                    round: { name: "Round", description: "Extra plump body" },
                    slim: { name: "Slim", description: "Slender racing body" },
                    buff: { name: "Buff", description: "Muscular body" },
                    fluffy: { name: "Fluffy", description: "Extra fluffy feathers" },
                    spiky: { name: "Spiky", description: "Spiky feather pattern" },
                    square: { name: "Square", description: "Blocky minecraft-style" },
                    tall: { name: "Tall", description: "Extended vertical body" },
                    tiny: { name: "Tiny", description: "Miniature body size" },
                    giant: { name: "Giant", description: "Oversized body" },
                    noodle: { name: "Noodle", description: "Long flexible body" },
                    balloon: { name: "Balloon", description: "Inflated round body" },
                    origami: { name: "Origami", description: "Paper-folded angles" },
                    crystal: { name: "Crystal", description: "Geometric crystal form" },
                    ghost: { name: "Ghost", description: "Transparent spectral body" },
                    robot: { name: "Robot", description: "Mechanical body parts" },
                    slime: { name: "Slime", description: "Gelatinous body form" },
                    cloud: { name: "Cloud", description: "Fluffy cloud-like body" },
                    pixel: { name: "Pixel", description: "8-bit retro style" },
                    armored: { name: "Armored", description: "Plated armor body" },
                    skeleton: { name: "Skeleton", description: "Exposed bone structure" },
                    plant: { name: "Plant", description: "Living plant body" },
                    liquid: { name: "Liquid", description: "Flowing water form" },
                    fire: { name: "Fire", description: "Living flame body" },
                    shadow: { name: "Shadow", description: "Dark ethereal form" }
                }
            },
            wings: {
                name: "Wings",
                category: "body",
                variants: {
                    normal: { name: "Normal", description: "Standard wings" },
                    large: { name: "Large", description: "Oversized wings" },
                    tiny: { name: "Tiny", description: "Undersized wings" },
                    pointed: { name: "Pointed", description: "Sharp angular wings" },
                    fancy: { name: "Fancy", description: "Decorative feathered wings" },
                    bat: { name: "Bat", description: "Bat-like wings" },
                    robot: { name: "Robot", description: "Mechanical wings" },
                    butterfly: { name: "Butterfly", description: "Colorful insect wings" },
                    dragon: { name: "Dragon", description: "Scaled dragon wings" },
                    angel: { name: "Angel", description: "Divine feathered wings" },
                    demon: { name: "Demon", description: "Dark leathery wings" },
                    crystal: { name: "Crystal", description: "Crystalline wings" },
                    energy: { name: "Energy", description: "Glowing energy wings" },
                    pixel: { name: "Pixel", description: "8-bit style wings" },
                    origami: { name: "Origami", description: "Paper-folded wings" },
                    steampunk: { name: "Steampunk", description: "Gear-driven wings" },
                    cloud: { name: "Cloud", description: "Fluffy cloud wings" },
                    fire: { name: "Fire", description: "Flaming wings" },
                    ice: { name: "Ice", description: "Frozen crystal wings" },
                    lightning: { name: "Lightning", description: "Electric wings" },
                    rainbow: { name: "Rainbow", description: "Color-changing wings" },
                    ghost: { name: "Ghost", description: "Spectral wings" },
                    cyber: { name: "Cyber", description: "Digital hologram wings" },
                    leaf: { name: "Leaf", description: "Natural leaf wings" },
                    bone: { name: "Bone", description: "Skeletal wings" }
                }
            },
            tail: {
                name: "Tail",
                category: "body",
                variants: {
                    normal: { name: "Normal", description: "Standard tail" },
                    long: { name: "Long", description: "Long flowing tail" },
                    fan: { name: "Fan", description: "Peacock-like fan tail" },
                    spiky: { name: "Spiky", description: "Spiky tail feathers" },
                    curly: { name: "Curly", description: "Curled tail feathers" },
                    stub: { name: "Stub", description: "Short stubby tail" },
                    forked: { name: "Forked", description: "Split/forked tail" },
                    phoenix: { name: "Phoenix", description: "Flaming feather tail" },
                    dragon: { name: "Dragon", description: "Long scaled tail" },
                    robot: { name: "Robot", description: "Mechanical tail" },
                    crystal: { name: "Crystal", description: "Crystal formation tail" },
                    energy: { name: "Energy", description: "Glowing energy trail" },
                    pixel: { name: "Pixel", description: "8-bit retro tail" },
                    rainbow: { name: "Rainbow", description: "Color-changing tail" },
                    ghost: { name: "Ghost", description: "Spectral tail" },
                    cloud: { name: "Cloud", description: "Fluffy cloud tail" },
                    lightning: { name: "Lightning", description: "Electric discharge" },
                    bone: { name: "Bone", description: "Skeletal tail" },
                    plant: { name: "Plant", description: "Living vine tail" },
                    ice: { name: "Ice", description: "Frozen crystal tail" },
                    metal: { name: "Metal", description: "Chrome plated tail" },
                    tentacle: { name: "Tentacle", description: "Writhing tentacle" },
                    spring: { name: "Spring", description: "Bouncy spring tail" },
                    ribbon: { name: "Ribbon", description: "Flowing ribbon tail" },
                    star: { name: "Star", description: "Star-trailing tail" }
                }
            },
            
            // Leg traits
            legs: {
                name: "Legs",
                category: "legs",
                variants: {
                    normal: { name: "Normal", description: "Standard chicken legs" },
                    long: { name: "Long", description: "Extra long legs" },
                    short: { name: "Short", description: "Stubby legs" },
                    thick: { name: "Thick", description: "Muscular legs" },
                    scaly: { name: "Scaly", description: "Extra scaly texture" },
                    robot: { name: "Robot", description: "Mechanical legs" },
                    fuzzy: { name: "Fuzzy", description: "Feathered legs" },
                    spring: { name: "Spring", description: "Bouncy spring legs" },
                    crystal: { name: "Crystal", description: "Crystal formation legs" },
                    tentacle: { name: "Tentacle", description: "Tentacle legs" },
                    noodle: { name: "Noodle", description: "Wiggly noodle legs" },
                    stilts: { name: "Stilts", description: "Extra tall stilts" },
                    peg: { name: "Peg", description: "Wooden peg legs" },
                    wheel: { name: "Wheel", description: "Rolling wheel legs" },
                    hover: { name: "Hover", description: "Floating hover pads" },
                    spider: { name: "Spider", description: "Multiple spider legs" },
                    energy: { name: "Energy", description: "Pure energy legs" },
                    ghost: { name: "Ghost", description: "Spectral legs" },
                    pixel: { name: "Pixel", description: "8-bit style legs" },
                    bone: { name: "Bone", description: "Skeletal legs" },
                    plant: { name: "Plant", description: "Growing vine legs" },
                    cloud: { name: "Cloud", description: "Cloud formation legs" },
                    fire: { name: "Fire", description: "Flame trail legs" },
                    ice: { name: "Ice", description: "Ice crystal legs" },
                    metal: { name: "Metal", description: "Chrome plated legs" }
                }
            },
            feet: {
                name: "Feet",
                category: "legs",
                variants: {
                    normal: { name: "Normal", description: "Standard chicken feet" },
                    webbed: { name: "Webbed", description: "Duck-like webbed feet" },
                    talons: { name: "Talons", description: "Sharp eagle-like talons" },
                    boots: { name: "Boots", description: "Boot-like feet" },
                    dino: { name: "Dino", description: "Dinosaur-like feet" },
                    robot: { name: "Robot", description: "Mechanical feet" },
                    sneakers: { name: "Sneakers", description: "Athletic shoes" },
                    rocket: { name: "Rocket", description: "Rocket boosters" },
                    spring: { name: "Spring", description: "Bouncy springs" },
                    hover: { name: "Hover", description: "Hover platforms" },
                    wheel: { name: "Wheel", description: "Rolling wheels" },
                    crystal: { name: "Crystal", description: "Crystal formation" },
                    energy: { name: "Energy", description: "Energy projections" },
                    ghost: { name: "Ghost", description: "Spectral feet" },
                    pixel: { name: "Pixel", description: "8-bit style feet" },
                    bone: { name: "Bone", description: "Skeletal feet" },
                    plant: { name: "Plant", description: "Root-like feet" },
                    cloud: { name: "Cloud", description: "Cloud formations" },
                    fire: { name: "Fire", description: "Flame trails" },
                    ice: { name: "Ice", description: "Ice crystal feet" },
                    metal: { name: "Metal", description: "Chrome plated feet" },
                    tentacle: { name: "Tentacle", description: "Tentacle ends" },
                    paw: { name: "Paw", description: "Animal-like paws" },
                    flipper: { name: "Flipper", description: "Swimming flippers" },
                    suction: { name: "Suction", description: "Suction cup feet" }
                }
            },
            
            // Accessories
            headwear: {
                name: "Headwear",
                category: "accessories",
                variants: {
                    none: { name: "None", description: "No headwear" },
                    cap: { name: "Cap", description: "Simple cap" },
                    tophat: { name: "Top Hat", description: "Fancy top hat" },
                    cowboy: { name: "Cowboy", description: "Western cowboy hat" },
                    beanie: { name: "Beanie", description: "Knitted beanie" },
                    crown: { name: "Crown", description: "Royal crown" },
                    helmet: { name: "Helmet", description: "Safety helmet" },
                    wizard: { name: "Wizard", description: "Magical wizard hat" },
                    party: { name: "Party", description: "Party hat" },
                    chef: { name: "Chef", description: "Chef's hat" },
                    pirate: { name: "Pirate", description: "Pirate hat" },
                    ninja: { name: "Ninja", description: "Ninja headband" },
                    flower: { name: "Flower", description: "Flower crown" },
                    bucket: { name: "Bucket", description: "Bucket hat" },
                    fedora: { name: "Fedora", description: "Classic fedora" },
                    propeller: { name: "Propeller", description: "Propeller cap" },
                    viking: { name: "Viking", description: "Viking helmet" },
                    astronaut: { name: "Astronaut", description: "Space helmet" },
                    detective: { name: "Detective", description: "Detective hat" },
                    jester: { name: "Jester", description: "Jester hat" },
                    graduate: { name: "Graduate", description: "Graduation cap" },
                    military: { name: "Military", description: "Military cap" },
                    winter: { name: "Winter", description: "Winter hat" },
                    safari: { name: "Safari", description: "Safari hat" },
                    headphones: { name: "Headphones", description: "Gaming headset" }
                }
            },
            neckwear: {
                name: "Neckwear",
                category: "accessories",
                variants: {
                    none: { name: "None", description: "No neckwear" },
                    bowtie: { name: "Bowtie", description: "Fancy bowtie" },
                    scarf: { name: "Scarf", description: "Cozy scarf" },
                    tie: { name: "Tie", description: "Business tie" },
                    necklace: { name: "Necklace", description: "Decorative necklace" },
                    collar: { name: "Collar", description: "Pet collar" },
                    bandana: { name: "Bandana", description: "Neck bandana" },
                    chain: { name: "Chain", description: "Gold chain" },
                    ribbon: { name: "Ribbon", description: "Pretty ribbon" },
                    medal: { name: "Medal", description: "Achievement medal" },
                    cape: { name: "Cape", description: "Hero's cape" },
                    feather: { name: "Feather", description: "Feather boa" },
                    lei: { name: "Lei", description: "Flower lei" },
                    ascot: { name: "Ascot", description: "Fancy ascot" },
                    choker: { name: "Choker", description: "Punk choker" },
                    pearls: { name: "Pearls", description: "Pearl necklace" },
                    pendant: { name: "Pendant", description: "Magical pendant" },
                    bow: { name: "Bow", description: "Decorative bow" },
                    ruff: { name: "Ruff", description: "Victorian ruff" },
                    crystal: { name: "Crystal", description: "Crystal necklace" },
                    spikes: { name: "Spikes", description: "Spiked collar" },
                    amulet: { name: "Amulet", description: "Mystical amulet" },
                    scarf2: { name: "Winter Scarf", description: "Warm winter scarf" },
                    garland: { name: "Garland", description: "Flower garland" },
                    neckerchief: { name: "Neckerchief", description: "Scout neckerchief" }
                }
            },
            backwear: {
                name: "Backwear",
                category: "accessories",
                variants: {
                    none: { name: "None", description: "No backwear" },
                    backpack: { name: "Backpack", description: "Small backpack" },
                    cape: { name: "Cape", description: "Heroic cape" },
                    saddle: { name: "Saddle", description: "Riding saddle" },
                    jetpack: { name: "Jetpack", description: "Rocket jetpack" },
                    wings: { name: "Wings", description: "Angel wings" },
                    shell: { name: "Shell", description: "Turtle shell" },
                    basket: { name: "Basket", description: "Woven basket" },
                    umbrella: { name: "Umbrella", description: "Tiny umbrella" },
                    guitar: { name: "Guitar", description: "Musical guitar" },
                    rocket: { name: "Rocket", description: "Rocket pack" },
                    surfboard: { name: "Surfboard", description: "Surfboard" },
                    shield: { name: "Shield", description: "Battle shield" },
                    flag: { name: "Flag", description: "Waving flag" },
                    barrel: { name: "Barrel", description: "Wooden barrel" },
                    propeller: { name: "Propeller", description: "Flying propeller" },
                    book: { name: "Book", description: "Magic spellbook" },
                    quiver: { name: "Quiver", description: "Arrow quiver" },
                    tank: { name: "Tank", description: "Oxygen tank" },
                    treasure: { name: "Treasure", description: "Treasure chest" },
                    radio: { name: "Radio", description: "Boombox radio" },
                    lantern: { name: "Lantern", description: "Glowing lantern" },
                    antenna: { name: "Antenna", description: "Radio antenna" },
                    portal: { name: "Portal", description: "Portal device" },
                    satellite: { name: "Satellite", description: "Mini satellite" }
                }
            }
        };
        
        // Add trait state - initialize with defaults
        this.currentTraits = {};
        Object.keys(this.traitDefinitions).forEach(traitType => {
            const variants = Object.keys(this.traitDefinitions[traitType].variants);
            this.currentTraits[traitType] = variants[0]; // Set first variant as default
        });
        
        console.log('Initial traits:', this.currentTraits);
        
        // Initialize components
        this.initializeComponents();
        this.setupEventListeners();
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
        console.log('Defining base components with traits:', this.currentTraits);
        
        // Define trait variations
        const eyeVariants = {
            normal: {
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
            },
            angry: {
                front: `
                    <!-- Left eye -->
                    <path d="M-14,-6 L-2,2" stroke="black" stroke-width="2"/>
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <circle cx="-8" cy="-2" r="3.5" fill="black"/>
                    
                    <!-- Right eye -->
                    <path d="M2,2 L14,-6" stroke="black" stroke-width="2"/>
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="3.5" fill="black"/>
                `,
                side: `
                    <path d="M2,2 L14,-6" stroke="black" stroke-width="2"/>
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="3.5" fill="black"/>
                `
            },
            cute: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <circle cx="-8" cy="-2" r="4" fill="black"/>
                    <circle cx="-8" cy="-4" r="2" fill="white"/>
                    <path d="M-12,-6 Q-8,-8 -4,-6" fill="none" stroke="black" stroke-width="1.5"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="4" fill="black"/>
                    <circle cx="8" cy="-4" r="2" fill="white"/>
                    <path d="M4,-6 Q8,-8 12,-6" fill="none" stroke="black" stroke-width="1.5"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="4" fill="black"/>
                    <circle cx="8" cy="-4" r="2" fill="white"/>
                    <path d="M4,-6 Q8,-8 12,-6" fill="none" stroke="black" stroke-width="1.5"/>
                `
            },
            derp: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <circle cx="-6" cy="-4" r="3" fill="black"/>
                    <circle cx="-5" cy="-5" r="1" fill="white"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="10" cy="0" r="3" fill="black"/>
                    <circle cx="11" cy="-1" r="1" fill="white"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="10" cy="0" r="3" fill="black"/>
                    <circle cx="11" cy="-1" r="1" fill="white"/>
                `
            },
            sleepy: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <path d="M-12,-4 Q-8,-6 -4,-4" fill="none" stroke="black" stroke-width="1.5"/>
                    <path d="M-11,-2 Q-8,0 -5,-2" fill="black"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="M4,-4 Q8,-6 12,-4" fill="none" stroke="black" stroke-width="1.5"/>
                    <path d="M5,-2 Q8,0 11,-2" fill="black"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="M4,-4 Q8,-6 12,-4" fill="none" stroke="black" stroke-width="1.5"/>
                    <path d="M5,-2 Q8,0 11,-2" fill="black"/>
                `
            },
            suspicious: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <path d="M-11,-5 L-5,1" fill="none" stroke="black" stroke-width="1.5"/>
                    <circle cx="-8" cy="-2" r="3" fill="black"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="M5,1 L11,-5" fill="none" stroke="black" stroke-width="1.5"/>
                    <circle cx="8" cy="-2" r="3" fill="black"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="M5,1 L11,-5" fill="none" stroke="black" stroke-width="1.5"/>
                    <circle cx="8" cy="-2" r="3" fill="black"/>
                `
            },
            robot: {
                front: `
                    <!-- Left eye -->
                    <rect x="-12" y="-6" width="8" height="8" fill="#333" rx="1"/>
                    <rect x="-11" y="-5" width="6" height="6" fill="#0ff"/>
                    <path d="M-11,-5 L-5,1" stroke="#0ff" stroke-width="0.5"/>
                    <path d="M-5,-5 L-11,1" stroke="#0ff" stroke-width="0.5"/>
                    
                    <!-- Right eye -->
                    <rect x="4" y="-6" width="8" height="8" fill="#333" rx="1"/>
                    <rect x="5" y="-5" width="6" height="6" fill="#0ff"/>
                    <path d="M5,-5 L11,1" stroke="#0ff" stroke-width="0.5"/>
                    <path d="M11,-5 L5,1" stroke="#0ff" stroke-width="0.5"/>
                `,
                side: `
                    <rect x="4" y="-6" width="8" height="8" fill="#333" rx="1"/>
                    <rect x="5" y="-5" width="6" height="6" fill="#0ff"/>
                    <path d="M5,-5 L11,1" stroke="#0ff" stroke-width="0.5"/>
                    <path d="M11,-5 L5,1" stroke="#0ff" stroke-width="0.5"/>
                `
            },
            hypno: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <path d="M-8,-2 m-4,0 a4,4 0 1,1 8,0 a4,4 0 1,1 -8,0" fill="none" stroke="black" stroke-width="1"/>
                    <path d="M-8,-2 m-3,0 a3,3 0 1,1 6,0 a3,3 0 1,1 -6,0" fill="none" stroke="black" stroke-width="1"/>
                    <path d="M-8,-2 m-2,0 a2,2 0 1,1 4,0 a2,2 0 1,1 -4,0" fill="none" stroke="black" stroke-width="1"/>
                    <circle cx="-8" cy="-2" r="1" fill="black"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="M8,-2 m-4,0 a4,4 0 1,1 8,0 a4,4 0 1,1 -8,0" fill="none" stroke="black" stroke-width="1"/>
                    <path d="M8,-2 m-3,0 a3,3 0 1,1 6,0 a3,3 0 1,1 -6,0" fill="none" stroke="black" stroke-width="1"/>
                    <path d="M8,-2 m-2,0 a2,2 0 1,1 4,0 a2,2 0 1,1 -4,0" fill="none" stroke="black" stroke-width="1"/>
                    <circle cx="8" cy="-2" r="1" fill="black"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="M8,-2 m-4,0 a4,4 0 1,1 8,0 a4,4 0 1,1 -8,0" fill="none" stroke="black" stroke-width="1"/>
                    <path d="M8,-2 m-3,0 a3,3 0 1,1 6,0 a3,3 0 1,1 -6,0" fill="none" stroke="black" stroke-width="1"/>
                    <path d="M8,-2 m-2,0 a2,2 0 1,1 4,0 a2,2 0 1,1 -4,0" fill="none" stroke="black" stroke-width="1"/>
                    <circle cx="8" cy="-2" r="1" fill="black"/>
                `
            },
            anime: {
                front: `
                    <!-- Left eye -->
                    <path d="M-13,-6 Q-8,-8 -3,-6 Q-8,-4 -13,-6 Z" fill="white"/>
                    <circle cx="-8" cy="-6" r="2" fill="black"/>
                    <circle cx="-7" cy="-7" r="0.5" fill="white"/>
                    <path d="M-11,-3 Q-8,-1 -5,-3" fill="none" stroke="black" stroke-width="0.5"/>
                    
                    <!-- Right eye -->
                    <path d="M3,-6 Q8,-8 13,-6 Q8,-4 3,-6 Z" fill="white"/>
                    <circle cx="8" cy="-6" r="2" fill="black"/>
                    <circle cx="9" cy="-7" r="0.5" fill="white"/>
                    <path d="M5,-3 Q8,-1 11,-3" fill="none" stroke="black" stroke-width="0.5"/>
                `,
                side: `
                    <path d="M3,-6 Q8,-8 13,-6 Q8,-4 3,-6 Z" fill="white"/>
                    <circle cx="8" cy="-6" r="2" fill="black"/>
                    <circle cx="9" cy="-7" r="0.5" fill="white"/>
                    <path d="M5,-3 Q8,-1 11,-3" fill="none" stroke="black" stroke-width="0.5"/>
                `
            },
            pixel: {
                front: `
                    <!-- Left eye -->
                    <rect x="-11" y="-5" width="2" height="2" fill="white"/>
                    <rect x="-9" y="-5" width="2" height="2" fill="white"/>
                    <rect x="-7" y="-5" width="2" height="2" fill="white"/>
                    <rect x="-11" y="-3" width="2" height="2" fill="white"/>
                    <rect x="-9" y="-3" width="2" height="2" fill="black"/>
                    <rect x="-7" y="-3" width="2" height="2" fill="white"/>
                    <rect x="-11" y="-1" width="2" height="2" fill="white"/>
                    <rect x="-9" y="-1" width="2" height="2" fill="white"/>
                    <rect x="-7" y="-1" width="2" height="2" fill="white"/>
                    
                    <!-- Right eye -->
                    <rect x="5" y="-5" width="2" height="2" fill="white"/>
                    <rect x="7" y="-5" width="2" height="2" fill="white"/>
                    <rect x="9" y="-5" width="2" height="2" fill="white"/>
                    <rect x="5" y="-3" width="2" height="2" fill="white"/>
                    <rect x="7" y="-3" width="2" height="2" fill="black"/>
                    <rect x="9" y="-3" width="2" height="2" fill="white"/>
                    <rect x="5" y="-1" width="2" height="2" fill="white"/>
                    <rect x="7" y="-1" width="2" height="2" fill="white"/>
                    <rect x="9" y="-1" width="2" height="2" fill="white"/>
                `,
                side: `
                    <rect x="5" y="-5" width="2" height="2" fill="white"/>
                    <rect x="7" y="-5" width="2" height="2" fill="white"/>
                    <rect x="9" y="-5" width="2" height="2" fill="white"/>
                    <rect x="5" y="-3" width="2" height="2" fill="white"/>
                    <rect x="7" y="-3" width="2" height="2" fill="black"/>
                    <rect x="9" y="-3" width="2" height="2" fill="white"/>
                    <rect x="5" y="-1" width="2" height="2" fill="white"/>
                    <rect x="7" y="-1" width="2" height="2" fill="white"/>
                    <rect x="9" y="-1" width="2" height="2" fill="white"/>
                `
            },
            heart: {
                front: `
                    <!-- Left eye -->
                    <path d="
                        M-8,-2
                        l-4,-4
                        c-2,-2 -4,2 -2,4
                        c2,2 6,4 6,4
                        c0,0 4,-2 6,-4
                        c2,-2 0,-6 -2,-4
                        z
                    " fill="#ff6b6b"/>
                    
                    <!-- Right eye -->
                    <path d="
                        M8,-2
                        l-4,-4
                        c-2,-2 -4,2 -2,4
                        c2,2 6,4 6,4
                        c0,0 4,-2 6,-4
                        c2,-2 0,-6 -2,-4
                        z
                    " fill="#ff6b6b"/>
                `,
                side: `
                    <path d="
                        M8,-2
                        l-4,-4
                        c-2,-2 -4,2 -2,4
                        c2,2 6,4 6,4
                        c0,0 4,-2 6,-4
                        c2,-2 0,-6 -2,-4
                        z
                    " fill="#ff6b6b"/>
                `
            },
            star: {
                front: `
                    <!-- Left eye -->
                    <path d="
                        M-8,-2
                        l1.5,-4.5
                        l1.5,4.5
                        l4.5,-1.5
                        l-4.5,1.5
                        l1.5,4.5
                        l-1.5,-4.5
                        l-4.5,1.5
                        l4.5,-1.5
                        l-1.5,-4.5
                        Z
                    " fill="#ffd700"/>
                    <circle cx="-8" cy="-2" r="1" fill="#fff"/>
                    
                    <!-- Right eye -->
                    <path d="
                        M8,-2
                        l1.5,-4.5
                        l1.5,4.5
                        l4.5,-1.5
                        l-4.5,1.5
                        l1.5,4.5
                        l-1.5,-4.5
                        l-4.5,1.5
                        l4.5,-1.5
                        l-1.5,-4.5
                        Z
                    " fill="#ffd700"/>
                    <circle cx="8" cy="-2" r="1" fill="#fff"/>
                `,
                side: `
                    <path d="
                        M8,-2
                        l1.5,-4.5
                        l1.5,4.5
                        l4.5,-1.5
                        l-4.5,1.5
                        l1.5,4.5
                        l-1.5,-4.5
                        l-4.5,1.5
                        l4.5,-1.5
                        l-1.5,-4.5
                        Z
                    " fill="#ffd700"/>
                    <circle cx="8" cy="-2" r="1" fill="#fff"/>
                `
            },
            money: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#85bb65"/>
                    <text x="-8" y="0" font-size="8" fill="white" text-anchor="middle" dominant-baseline="middle">$</text>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#85bb65"/>
                    <text x="8" y="0" font-size="8" fill="white" text-anchor="middle" dominant-baseline="middle">$</text>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#85bb65"/>
                    <text x="8" y="0" font-size="8" fill="white" text-anchor="middle" dominant-baseline="middle">$</text>
                `
            },
            rainbow: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <circle cx="-8" cy="-2" r="5" fill="url(#rainbowGradient)"/>
                    <circle cx="-8" cy="-2" r="2" fill="black"/>
                    <circle cx="-9" cy="-3" r="0.5" fill="white"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="5" fill="url(#rainbowGradient)"/>
                    <circle cx="8" cy="-2" r="2" fill="black"/>
                    <circle cx="7" cy="-3" r="0.5" fill="white"/>
                    
                    <!-- Rainbow gradient definition -->
                    <defs>
                        <radialGradient id="rainbowGradient">
                            <stop offset="0%" stop-color="#ff0000"/>
                            <stop offset="17%" stop-color="#ff9900"/>
                            <stop offset="33%" stop-color="#ffff00"/>
                            <stop offset="50%" stop-color="#00ff00"/>
                            <stop offset="67%" stop-color="#0099ff"/>
                            <stop offset="83%" stop-color="#6633ff"/>
                            <stop offset="100%" stop-color="#ff00ff"/>
                        </radialGradient>
                    </defs>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <circle cx="8" cy="-2" r="5" fill="url(#rainbowGradient)"/>
                    <circle cx="8" cy="-2" r="2" fill="black"/>
                    <circle cx="7" cy="-3" r="0.5" fill="white"/>
                    
                    <!-- Rainbow gradient definition -->
                    <defs>
                        <radialGradient id="rainbowGradient">
                            <stop offset="0%" stop-color="#ff0000"/>
                            <stop offset="17%" stop-color="#ff9900"/>
                            <stop offset="33%" stop-color="#ffff00"/>
                            <stop offset="50%" stop-color="#00ff00"/>
                            <stop offset="67%" stop-color="#0099ff"/>
                            <stop offset="83%" stop-color="#6633ff"/>
                            <stop offset="100%" stop-color="#ff00ff"/>
                        </radialGradient>
                    </defs>
                `
            },
            cyclops: {
                front: `
                    <!-- Single large eye -->
                    <circle cx="0" cy="-2" r="8" fill="white"/>
                    <circle cx="0" cy="-2" r="6" fill="#ffcc00"/>
                    <circle cx="0" cy="-2" r="3" fill="black"/>
                    <circle cx="1" cy="-3" r="1" fill="white"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="8" fill="white"/>
                    <circle cx="8" cy="-2" r="6" fill="#ffcc00"/>
                    <circle cx="8" cy="-2" r="3" fill="black"/>
                    <circle cx="9" cy="-3" r="1" fill="white"/>
                `
            },
            alien: {
                front: `
                    <!-- Left eye cluster -->
                    <circle cx="-10" cy="-4" r="3" fill="black"/>
                    <circle cx="-10" cy="-4" r="1" fill="#00ff00"/>
                    <circle cx="-6" cy="-2" r="3" fill="black"/>
                    <circle cx="-6" cy="-2" r="1" fill="#00ff00"/>
                    <circle cx="-8" cy="0" r="3" fill="black"/>
                    <circle cx="-8" cy="0" r="1" fill="#00ff00"/>
                    
                    <!-- Right eye cluster -->
                    <circle cx="10" cy="-4" r="3" fill="black"/>
                    <circle cx="10" cy="-4" r="1" fill="#00ff00"/>
                    <circle cx="6" cy="-2" r="3" fill="black"/>
                    <circle cx="6" cy="-2" r="1" fill="#00ff00"/>
                    <circle cx="8" cy="0" r="3" fill="black"/>
                    <circle cx="8" cy="0" r="1" fill="#00ff00"/>
                `,
                side: `
                    <!-- Side eye cluster -->
                    <circle cx="10" cy="-4" r="3" fill="black"/>
                    <circle cx="10" cy="-4" r="1" fill="#00ff00"/>
                    <circle cx="6" cy="-2" r="3" fill="black"/>
                    <circle cx="6" cy="-2" r="1" fill="#00ff00"/>
                    <circle cx="8" cy="0" r="3" fill="black"/>
                    <circle cx="8" cy="0" r="1" fill="#00ff00"/>
                `
            },
            ghost: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white" opacity="0.5"/>
                    <circle cx="-8" cy="-2" r="4" fill="#b3e0ff" opacity="0.7"/>
                    <circle cx="-8" cy="-2" r="2" fill="#80ccff" opacity="0.9"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white" opacity="0.5"/>
                    <circle cx="8" cy="-2" r="4" fill="#b3e0ff" opacity="0.7"/>
                    <circle cx="8" cy="-2" r="2" fill="#80ccff" opacity="0.9"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white" opacity="0.5"/>
                    <circle cx="8" cy="-2" r="4" fill="#b3e0ff" opacity="0.7"/>
                    <circle cx="8" cy="-2" r="2" fill="#80ccff" opacity="0.9"/>
                `
            },
            dragon: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#ffd700"/>
                    <path d="M-12,-6 L-4,2" stroke="black" stroke-width="0.5"/>
                    <ellipse cx="-8" cy="-2" rx="2" ry="4" fill="black" transform="rotate(-45, -8, -2)"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#ffd700"/>
                    <path d="M4,2 L12,-6" stroke="black" stroke-width="0.5"/>
                    <ellipse cx="8" cy="-2" rx="2" ry="4" fill="black" transform="rotate(45, 8, -2)"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#ffd700"/>
                    <path d="M4,2 L12,-6" stroke="black" stroke-width="0.5"/>
                    <ellipse cx="8" cy="-2" rx="2" ry="4" fill="black" transform="rotate(45, 8, -2)"/>
                `
            },
            demon: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#300"/>
                    <circle cx="-8" cy="-2" r="4" fill="#f00"/>
                    <circle cx="-8" cy="-2" r="2" fill="black"/>
                    <path d="M-12,-6 L-4,2 M-4,-6 L-12,2" stroke="#f00" stroke-width="0.5"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#300"/>
                    <circle cx="8" cy="-2" r="4" fill="#f00"/>
                    <circle cx="8" cy="-2" r="2" fill="black"/>
                    <path d="M4,-6 L12,2 M12,-6 L4,2" stroke="#f00" stroke-width="0.5"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#300"/>
                    <circle cx="8" cy="-2" r="4" fill="#f00"/>
                    <circle cx="8" cy="-2" r="2" fill="black"/>
                    <path d="M4,-6 L12,2 M12,-6 L4,2" stroke="#f00" stroke-width="0.5"/>
                `
            },
            cyborg: {
                front: `
                    <!-- Left eye (normal) -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <circle cx="-8" cy="-2" r="4" fill="black"/>
                    <circle cx="-9" cy="-3" r="1.5" fill="white"/>
                    
                    <!-- Right eye (mechanical) -->
                    <rect x="4" y="-6" width="8" height="8" fill="#333" rx="1"/>
                    <circle cx="8" cy="-2" r="3" fill="#0ff"/>
                    <path d="M5,-5 L11,1 M11,-5 L5,1" stroke="#0ff" stroke-width="0.5"/>
                    <circle cx="8" cy="-2" r="1" fill="#fff"/>
                    <!-- Mechanical details -->
                    <path d="M3,-6 L13,-6" stroke="#666" stroke-width="0.5"/>
                    <path d="M3,2 L13,2" stroke="#666" stroke-width="0.5"/>
                    <circle cx="12" cy="-4" r="0.5" fill="#0ff"/>
                `,
                side: `
                    <!-- Mechanical eye -->
                    <rect x="4" y="-6" width="8" height="8" fill="#333" rx="1"/>
                    <circle cx="8" cy="-2" r="3" fill="#0ff"/>
                    <path d="M5,-5 L11,1 M11,-5 L5,1" stroke="#0ff" stroke-width="0.5"/>
                    <circle cx="8" cy="-2" r="1" fill="#fff"/>
                    <!-- Mechanical details -->
                    <path d="M3,-6 L13,-6" stroke="#666" stroke-width="0.5"/>
                    <path d="M3,2 L13,2" stroke="#666" stroke-width="0.5"/>
                    <circle cx="12" cy="-4" r="0.5" fill="#0ff"/>
                `
            },
            dizzy: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="white"/>
                    <path d="
                        M-8,-2
                        m-3,-3 l6,6
                        m0,-6 l-6,6
                        m-1,-3 l8,0
                        m-4,-4 l0,8
                    " stroke="black" stroke-width="1"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="
                        M8,-2
                        m-3,-3 l6,6
                        m0,-6 l-6,6
                        m-1,-3 l8,0
                        m-4,-4 l0,8
                    " stroke="black" stroke-width="1"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="white"/>
                    <path d="
                        M8,-2
                        m-3,-3 l6,6
                        m0,-6 l-6,6
                        m-1,-3 l8,0
                        m-4,-4 l0,8
                    " stroke="black" stroke-width="1"/>
                `
            },
            glitch: {
                front: `
                    <!-- Left eye -->
                    <g transform="translate(-8,-2)">
                        <rect x="-4" y="-4" width="8" height="8" fill="#0ff" opacity="0.5"/>
                        <rect x="-3" y="-3" width="6" height="6" fill="#f0f" opacity="0.5"/>
                        <rect x="-2" y="-2" width="4" height="4" fill="#ff0" opacity="0.5"/>
                    </g>
                    
                    <!-- Right eye -->
                    <g transform="translate(8,-2)">
                        <rect x="-4" y="-4" width="8" height="8" fill="#0ff" opacity="0.5"/>
                        <rect x="-3" y="-3" width="6" height="6" fill="#f0f" opacity="0.5"/>
                        <rect x="-2" y="-2" width="4" height="4" fill="#ff0" opacity="0.5"/>
                    </g>
                    <!-- Glitch lines -->
                    <path d="M-15,-5 L15,-5" stroke="#0ff" stroke-width="0.5" opacity="0.8"/>
                    <path d="M-15,0 L15,0" stroke="#f0f" stroke-width="0.5" opacity="0.8"/>
                    <path d="M-15,3 L15,3" stroke="#ff0" stroke-width="0.5" opacity="0.8"/>
                `,
                side: `
                    <g transform="translate(8,-2)">
                        <rect x="-4" y="-4" width="8" height="8" fill="#0ff" opacity="0.5"/>
                        <rect x="-3" y="-3" width="6" height="6" fill="#f0f" opacity="0.5"/>
                        <rect x="-2" y="-2" width="4" height="4" fill="#ff0" opacity="0.5"/>
                    </g>
                    <!-- Glitch lines -->
                    <path d="M0,-5 L15,-5" stroke="#0ff" stroke-width="0.5" opacity="0.8"/>
                    <path d="M0,0 L15,0" stroke="#f0f" stroke-width="0.5" opacity="0.8"/>
                    <path d="M0,3 L15,3" stroke="#ff0" stroke-width="0.5" opacity="0.8"/>
                `
            },
            cosmic: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#000"/>
                    <circle cx="-8" cy="-2" r="4" fill="#1a1a3a"/>
                    <circle cx="-10" cy="-4" r="0.5" fill="#fff"/>
                    <circle cx="-6" cy="-1" r="0.3" fill="#fff"/>
                    <circle cx="-8" cy="0" r="0.4" fill="#fff"/>
                    <path d="M-11,-5 Q-8,-2 -5,-5" stroke="#5d4dff" stroke-width="0.5" opacity="0.6"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#000"/>
                    <circle cx="8" cy="-2" r="4" fill="#1a1a3a"/>
                    <circle cx="6" cy="-4" r="0.5" fill="#fff"/>
                    <circle cx="10" cy="-1" r="0.3" fill="#fff"/>
                    <circle cx="8" cy="0" r="0.4" fill="#fff"/>
                    <path d="M5,-5 Q8,-2 11,-5" stroke="#5d4dff" stroke-width="0.5" opacity="0.6"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#000"/>
                    <circle cx="8" cy="-2" r="4" fill="#1a1a3a"/>
                    <circle cx="6" cy="-4" r="0.5" fill="#fff"/>
                    <circle cx="10" cy="-1" r="0.3" fill="#fff"/>
                    <circle cx="8" cy="0" r="0.4" fill="#fff"/>
                    <path d="M5,-5 Q8,-2 11,-5" stroke="#5d4dff" stroke-width="0.5" opacity="0.6"/>
                `
            },
            cat: {
                front: `
                    <!-- Left eye -->
                    <path d="M-12,-6 Q-8,-8 -4,-6 Q-8,-4 -12,-6 Z" fill="white"/>
                    <ellipse cx="-8" cy="-6" rx="1.5" ry="3" fill="black" transform="rotate(-15, -8, -6)"/>
                    <path d="M-9,-7 L-7,-5" stroke="#ffeb3b" stroke-width="0.5"/>
                    
                    <!-- Right eye -->
                    <path d="M4,-6 Q8,-8 12,-6 Q8,-4 4,-6 Z" fill="white"/>
                    <ellipse cx="8" cy="-6" rx="1.5" ry="3" fill="black" transform="rotate(15, 8, -6)"/>
                    <path d="M7,-7 L9,-5" stroke="#ffeb3b" stroke-width="0.5"/>
                `,
                side: `
                    <path d="M4,-6 Q8,-8 12,-6 Q8,-4 4,-6 Z" fill="white"/>
                    <ellipse cx="8" cy="-6" rx="1.5" ry="3" fill="black" transform="rotate(15, 8, -6)"/>
                    <path d="M7,-7 L9,-5" stroke="#ffeb3b" stroke-width="0.5"/>
                `
            },
            zombie: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#a8e6cf"/>
                    <path d="M-11,-5 L-5,1 M-5,-5 L-11,1" stroke="#2d3436" stroke-width="0.5"/>
                    <circle cx="-8" cy="-2" r="3" fill="#636e72"/>
                    <circle cx="-8" cy="-2" r="1" fill="#2d3436"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#a8e6cf"/>
                    <path d="M5,-5 L11,1 M11,-5 L5,1" stroke="#2d3436" stroke-width="0.5"/>
                    <circle cx="8" cy="-2" r="3" fill="#636e72"/>
                    <circle cx="8" cy="-2" r="1" fill="#2d3436"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#a8e6cf"/>
                    <path d="M5,-5 L11,1 M11,-5 L5,1" stroke="#2d3436" stroke-width="0.5"/>
                    <circle cx="8" cy="-2" r="3" fill="#636e72"/>
                    <circle cx="8" cy="-2" r="1" fill="#2d3436"/>
                `
            },
            fire: {
                front: `
                    <!-- Left eye -->
                    <defs>
                        <radialGradient id="fireGradient">
                            <stop offset="0%" stop-color="#fff"/>
                            <stop offset="30%" stop-color="#ff0"/>
                            <stop offset="70%" stop-color="#f40"/>
                            <stop offset="100%" stop-color="#900"/>
                        </radialGradient>
                    </defs>
                    <circle cx="-8" cy="-2" r="6" fill="url(#fireGradient)"/>
                    <path d="
                        M-8,-2
                        c-1,-2 1,-4 2,-5
                        c1,2 -1,4 -2,5
                        M-8,-2
                        c1,-2 -1,-4 -2,-5
                        c-1,2 1,4 2,5
                    " fill="none" stroke="#f40" stroke-width="0.5"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="url(#fireGradient)"/>
                    <path d="
                        M8,-2
                        c-1,-2 1,-4 2,-5
                        c1,2 -1,4 -2,5
                        M8,-2
                        c1,-2 -1,-4 -2,-5
                        c-1,2 1,4 2,5
                    " fill="none" stroke="#f40" stroke-width="0.5"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="url(#fireGradient)"/>
                    <path d="
                        M8,-2
                        c-1,-2 1,-4 2,-5
                        c1,2 -1,4 -2,5
                        M8,-2
                        c1,-2 -1,-4 -2,-5
                        c-1,2 1,4 2,5
                    " fill="none" stroke="#f40" stroke-width="0.5"/>
                `
            },
            ice: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#e3f2fd"/>
                    <path d="
                        M-8,-2 l0,-5
                        M-8,-2 l4.33,2.5
                        M-8,-2 l-4.33,2.5
                        M-8,-2 l0,5
                        M-8,-2 l4.33,-2.5
                        M-8,-2 l-4.33,-2.5
                    " stroke="#90caf9" stroke-width="1"/>
                    <circle cx="-8" cy="-2" r="2" fill="#1976d2"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#e3f2fd"/>
                    <path d="
                        M8,-2 l0,-5
                        M8,-2 l4.33,2.5
                        M8,-2 l-4.33,2.5
                        M8,-2 l0,5
                        M8,-2 l4.33,-2.5
                        M8,-2 l-4.33,-2.5
                    " stroke="#90caf9" stroke-width="1"/>
                    <circle cx="8" cy="-2" r="2" fill="#1976d2"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#e3f2fd"/>
                    <path d="
                        M8,-2 l0,-5
                        M8,-2 l4.33,2.5
                        M8,-2 l-4.33,2.5
                        M8,-2 l0,5
                        M8,-2 l4.33,-2.5
                        M8,-2 l-4.33,-2.5
                    " stroke="#90caf9" stroke-width="1"/>
                    <circle cx="8" cy="-2" r="2" fill="#1976d2"/>
                `
            },
            void: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#000"/>
                    <circle cx="-8" cy="-2" r="4" fill="#1a1a1a"/>
                    <circle cx="-8" cy="-2" r="2" fill="#000"/>
                    <path d="M-11,-5 C-8,-2 -5,-5 -5,-5" stroke="#333" stroke-width="0.5" opacity="0.5"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#000"/>
                    <circle cx="8" cy="-2" r="4" fill="#1a1a1a"/>
                    <circle cx="8" cy="-2" r="2" fill="#000"/>
                    <path d="M5,-5 C8,-2 11,-5 11,-5" stroke="#333" stroke-width="0.5" opacity="0.5"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#000"/>
                    <circle cx="8" cy="-2" r="4" fill="#1a1a1a"/>
                    <circle cx="8" cy="-2" r="2" fill="#000"/>
                    <path d="M5,-5 C8,-2 11,-5 11,-5" stroke="#333" stroke-width="0.5" opacity="0.5"/>
                `
            },
            ancient: {
                front: `
                    <!-- Left eye -->
                    <circle cx="-8" cy="-2" r="6" fill="#d4af37"/>
                    <path d="
                        M-11,-5 h6
                        M-11,1 h6
                        M-8,-5 v6
                        M-11,-2 h6
                    " stroke="#000" stroke-width="0.5"/>
                    <circle cx="-8" cy="-2" r="2" fill="#000"/>
                    
                    <!-- Right eye -->
                    <circle cx="8" cy="-2" r="6" fill="#d4af37"/>
                    <path d="
                        M5,-5 h6
                        M5,1 h6
                        M8,-5 v6
                        M5,-2 h6
                    " stroke="#000" stroke-width="0.5"/>
                    <circle cx="8" cy="-2" r="2" fill="#000"/>
                `,
                side: `
                    <circle cx="8" cy="-2" r="6" fill="#d4af37"/>
                    <path d="
                        M5,-5 h6
                        M5,1 h6
                        M8,-5 v6
                        M5,-2 h6
                    " stroke="#000" stroke-width="0.5"/>
                    <circle cx="8" cy="-2" r="2" fill="#000"/>
                `
            }
        };

        const beakVariants = {
            normal: {
                front: `
                    <path d="
                        M0,0
                        l-4,4
                        l8,0
                        z"
                        fill="#FFA000"
                    />
                `,
                side: `
                    <path d="
                        M10,0
                        l12,0
                        l-6,4
                        z"
                        fill="#FFA000"
                    />
                `
            }
        };

        const topVariants = {
            normal: {
                front: `
                    <path d="
                        M0,-20
                        C5,-25 10,-20 15,-15
                        C10,-18 5,-18 0,-20
                        C-5,-18 -10,-18 -15,-15
                        C-10,-20 -5,-25 0,-20
                        Z"
                        fill="#FF5252"
                    />
                `,
                side: `
                    <path d="
                        M0,-20
                        C5,-25 10,-20 15,-15
                        C10,-18 5,-18 0,-20
                        Z"
                        fill="#FF5252"
                    />
                `
            }
        };

        console.log('Current eye variant:', this.currentTraits.eyes);
        
        // Define front view components
        const frontBody = `
            <g id="chicken-body-front">
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

                <!-- Belly fluff -->
                <path d="
                    M-20,30
                    Q-10,33 0,34
                    Q10,33 20,30
                    M-15,25
                    Q-5,28 0,29
                    Q5,28 15,25
                " 
                    fill="none" 
                    stroke="rgba(255,255,255,0.3)" 
                    stroke-width="2"
                />
            </g>
        `;

        const frontHead = `
            <g id="chicken-head-front">
                <!-- Head shape -->
                <circle cx="0" cy="0" r="20" fill="inherit"/>
                
                <!-- Eyes -->
                <g class="eyes">
                    ${eyeVariants[this.currentTraits.eyes].front}
                </g>

                <!-- Beak -->
                ${beakVariants[this.currentTraits.beak].front}

                <!-- Comb -->
                ${topVariants[this.currentTraits.top].front}

                <!-- Wattles -->
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
            </g>
        `;

        const frontLeg = `
            <g id="chicken-leg-front">
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
            </g>
        `;

        // Define side view components
        const sideBody = `
            <g id="chicken-body-side">
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

                <!-- Tail -->
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

                <!-- Belly fluff -->
                <path d="
                    M-20,25
                    Q0,30 20,25
                    M-15,20
                    Q0,25 15,20
                " 
                    fill="none" 
                    stroke="rgba(255,255,255,0.3)" 
                    stroke-width="2"
                />
            </g>
        `;

        const sideHead = `
            <g id="chicken-head-side">
                <!-- Head -->
                <circle cx="0" cy="0" r="20" fill="inherit"/>
                
                <!-- Eye -->
                <g class="eyes">
                    ${eyeVariants[this.currentTraits.eyes].side}
                </g>

                <!-- Beak -->
                ${beakVariants[this.currentTraits.beak].side}

                <!-- Comb -->
                ${topVariants[this.currentTraits.top].side}

                <!-- Wattle -->
                <path d="
                    M6,6
                    C10,8 10,14 6,18
                    C4,16 4,10 6,6
                    Z" 
                    fill="#FF5252"
                />
            </g>
        `;

        const sideLeg = `
            <g id="chicken-leg-side">
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
            ${frontBody}
            ${frontHead}
            ${frontLeg}
            ${sideBody}
            ${sideHead}
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
    
    setupTraitUI() {
        console.log('Setting up trait UI');
        
        const traitAccordions = document.getElementById('trait-accordions');
        if (!traitAccordions) return;
        
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
                    
                    variantBox.innerHTML = `
                        <div class="variant-preview">🐔</div>
                        <div class="variant-name">${variant.name}</div>
                    `;
                    
                    variantBox.addEventListener('click', () => {
                        // Update trait
                        this.currentTraits[trait.type] = key;
                        
                        // Update UI
                        variantGrid.querySelectorAll('.variant-box').forEach(box => {
                            box.classList.remove('active');
                        });
                        variantBox.classList.add('active');
                        
                        // Update chicken
                        this.defineBaseComponents();
                        this.createChicken();
                    });
                    
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
        console.log(`Opening trait catalog for: ${traitType}`);
        
        const modal = document.createElement('div');
        modal.className = 'trait-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'trait-modal-content';
        
        // Add header with search
        const header = document.createElement('div');
        header.className = 'trait-modal-header';
        
        const title = document.createElement('h3');
        title.textContent = `${this.traitDefinitions[traitType].name} Options`;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className = 'trait-modal-close';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        const search = document.createElement('input');
        search.type = 'text';
        search.className = 'trait-search';
        search.placeholder = `Search ${this.traitDefinitions[traitType].name.toLowerCase()}...`;
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        modalContent.appendChild(header);
        modalContent.appendChild(search);
        
        // Add trait grid
        const traitGrid = document.createElement('div');
        traitGrid.className = 'trait-modal-grid';
        
        const variants = this.traitDefinitions[traitType].variants;
        const variantElements = [];
        
        Object.entries(variants).forEach(([variantKey, variant]) => {
            const traitCard = document.createElement('div');
            traitCard.className = 'trait-card';
            if (this.currentTraits[traitType] === variantKey) {
                traitCard.classList.add('active');
            }
            
            traitCard.innerHTML = `
                <div class="trait-preview">🐔</div>
                <div class="trait-name">${variant.name}</div>
                <div class="trait-description">${variant.description}</div>
            `;
            
            traitCard.addEventListener('click', () => {
                // Update trait
                this.currentTraits[traitType] = variantKey;
                
                // Update UI
                document.querySelectorAll('.trait-card').forEach(card => {
                    card.classList.remove('active');
                });
                traitCard.classList.add('active');
                
                // Update preview box
                const previewBox = document.querySelector(`.trait-preview-box[data-trait-type="${traitType}"]`);
                if (previewBox) {
                    const previewName = previewBox.querySelector('.trait-preview-name');
                    previewName.innerHTML = `
                        ${this.traitDefinitions[traitType].name}: ${variant.name}
                        <span class="trait-preview-count">(${Object.keys(variants).length} options)</span>
                    `;
                    previewBox.querySelector('.trait-preview-description').textContent = 
                        variant.description;
                }
                
                // Update chicken
                this.defineBaseComponents();
                this.createChicken();
            });
            
            traitGrid.appendChild(traitCard);
            variantElements.push({ element: traitCard, variant });
        });
        
        modalContent.appendChild(traitGrid);
        modal.appendChild(modalContent);
        
        // Add search functionality
        search.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            variantElements.forEach(({ element, variant }) => {
                const matches = 
                    variant.name.toLowerCase().includes(searchTerm) ||
                    variant.description.toLowerCase().includes(searchTerm);
                element.style.display = matches ? '' : 'none';
            });
        });
        
        document.body.appendChild(modal);
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
                    { transform: 'translate(50px, 48px)' },
                    { transform: 'translate(50px, 50px)' }
                ], {
                    duration: 1000,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });

                // Head has a slightly more pronounced bob
                headBone.animate([
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px)' : 'translate(25px, -25px)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -23px)' : 'translate(25px, -23px)' },
                    { transform: this.currentView === 'front' ? 'translate(0px, -25px)' : 'translate(25px, -25px)' }
                ], {
                    duration: 1000,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });

                // Legs have a subtle flex at the top while keeping feet planted
                const idleLegFrontPos = this.currentView === 'front' ? '10px, 25px' : '5px, 25px';
                const idleLegBackPos = this.currentView === 'front' ? '-10px, 25px' : '-5px, 25px';
                
                legFront.animate([
                    { transform: `translate(${idleLegFrontPos})` },
                    { transform: `translate(${idleLegFrontPos}) rotate(-1deg)` },
                    { transform: `translate(${idleLegFrontPos})` }
                ], {
                    duration: 1000,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });

                legBack.animate([
                    { transform: `translate(${idleLegBackPos})` },
                    { transform: `translate(${idleLegBackPos}) rotate(1deg)` },
                    { transform: `translate(${idleLegBackPos})` }
                ], {
                    duration: 1000,
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
}

// Initialize the lab when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chickenLab = new ChickenLab();
}); 