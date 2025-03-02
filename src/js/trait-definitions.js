/**
 * Trait Definitions
 * Contains all chicken character trait definitions and their SVG content
 */

export const traitDefinitions = {
  eyes: {
    name: "Eyes",
    category: "head",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard chicken eyes",
        live: true,
        frontSVG: `
          <!-- Left eye -->
          <circle cx="-8" cy="-2" r="6" fill="white"/>
          <circle cx="-8" cy="-2" r="4" fill="black"/>
          <circle cx="-9" cy="-3" r="1.5" fill="white"/>
          
          <!-- Right eye -->
          <circle cx="8" cy="-2" r="6" fill="white"/>
          <circle cx="8" cy="-2" r="4" fill="black"/>
          <circle cx="7" cy="-3" r="1.5" fill="white"/>
        `,
        sideSVG: `
          <circle cx="8" cy="-2" r="6" fill="white"/>
          <circle cx="8" cy="-2" r="4" fill="black"/>
          <circle cx="7" cy="-3" r="1.5" fill="white"/>
        `,
        rarityWeight: 1.0
      },
      angry: { 
        name: "Angry", 
        description: "Angled eyes with eyebrows",
        live: true,
        frontSVG: `
          <!-- Left eye -->
          <circle cx="-8" cy="-2" r="5" fill="white"/>
          <circle cx="-8" cy="-2" r="3" fill="black"/>
          <path d="-13,-4 L-3,-7" stroke="black" stroke-width="1.5" />
          
          <!-- Right eye -->
          <circle cx="8" cy="-2" r="5" fill="white"/>
          <circle cx="8" cy="-2" r="3" fill="black"/>
          <path d="3,-7 L13,-4" stroke="black" stroke-width="1.5" />
        `,
        sideSVG: `
          <circle cx="8" cy="-2" r="5" fill="white"/>
          <circle cx="8" cy="-2" r="3" fill="black"/>
          <path d="3,-6 L13,-3" stroke="black" stroke-width="1.5" />
        `,
        rarityWeight: 0.9
      },
      cute: { 
        name: "Cute", 
        description: "Big adorable eyes with sparkles",
        live: true,
        frontSVG: `
          <!-- Left eye -->
          <circle cx="-8" cy="-2" r="7" fill="white"/>
          <circle cx="-8" cy="-2" r="5" fill="black"/>
          <circle cx="-6" cy="-4" r="2" fill="white"/>
          <path d="-12,-6 L-10,-4 M-13,-3 L-11,-1" stroke="white" stroke-width="1" />
          
          <!-- Right eye -->
          <circle cx="8" cy="-2" r="7" fill="white"/>
          <circle cx="8" cy="-2" r="5" fill="black"/>
          <circle cx="6" cy="-4" r="2" fill="white"/>
          <path d="10,-4 L12,-6 M11,-1 L13,-3" stroke="white" stroke-width="1" />
        `,
        sideSVG: `
          <circle cx="8" cy="-2" r="7" fill="white"/>
          <circle cx="8" cy="-2" r="5" fill="black"/>
          <circle cx="6" cy="-4" r="2" fill="white"/>
          <path d="10,-4 L12,-6 M11,-1 L13,-3" stroke="white" stroke-width="1" />
        `,
        rarityWeight: 0.8
      },
      derp: { name: "Derp", description: "Crossed/silly eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      sleepy: { name: "Sleepy", description: "Half-closed tired eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      suspicious: { name: "Suspicious", description: "Narrowed, skeptical eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      robot: { name: "Robot", description: "Mechanical/digital eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      hypno: { name: "Hypno", description: "Spiral hypnotic pattern", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      anime: { name: "Anime", description: "Large, expressive anime-style eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      pixel: { name: "Pixel", description: "8-bit retro pixel eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      heart: { name: "Heart", description: "Heart-shaped loving eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      star: { name: "Star", description: "Star-struck sparkly eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      money: { name: "Money", description: "Dollar signs for eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      rainbow: { name: "Rainbow", description: "Colorful rainbow iris", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cyclops: { name: "Cyclops", description: "Single large central eye", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      alien: { name: "Alien", description: "Multiple alien eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ghost: { name: "Ghost", description: "Hollow, spectral eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      dragon: { name: "Dragon", description: "Reptilian slitted pupils", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      demon: { name: "Demon", description: "Glowing red demonic eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      cyborg: { name: "Cyborg", description: "One normal, one mechanical eye", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      dizzy: { name: "Dizzy", description: "Spinning spiral eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      glitch: { name: "Glitch", description: "Glitchy, distorted eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      cosmic: { name: "Cosmic", description: "Galaxy swirls in eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.2 },
      cat: { name: "Cat", description: "Feline-style eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      zombie: { name: "Zombie", description: "Undead, cloudy eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      fire: { name: "Fire", description: "Flames in the eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ice: { name: "Ice", description: "Crystalline ice eyes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      void: { name: "Void", description: "Empty black holes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.2 },
      ancient: { name: "Ancient", description: "Hieroglyphic symbols", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.2 }
    }
  },
  beak: {
    name: "Beak",
    category: "head",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard triangular beak",
        live: true,
        frontSVG: `
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
        sideSVG: `
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
        `,
        rarityWeight: 1.0
      },
      sharp: {
        name: "Sharp",
        description: "Long pointed beak",
        live: true,
        frontSVG: `
          <!-- Upper beak -->
          <path d="
            M0,0
            l-4,8
            l8,0
            z"
            fill="#FFB74D"
          />
          <!-- Lower beak -->
          <path d="
            M-2,5
            l2,3
            l2,-3
            l-2,4
            z"
            fill="#FFA000"
          />
        `,
        sideSVG: `
          <!-- Upper beak -->
          <path d="
            M10,0
            l20,-1
            l-4,3
            z"
            fill="#FFB74D"
          />
          <!-- Lower beak -->
          <path d="
            M10,0
            l16,2
            l-12,2
            z"
            fill="#FFA000"
          />
        `,
        rarityWeight: 0.9
      },
      hook: { name: "Hook", description: "Curved hook-like beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      small: { name: "Small", description: "Tiny cute beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      wide: { name: "Wide", description: "Broad duck-like beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      parrot: { name: "Parrot", description: "Curved parrot beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      broken: { name: "Broken", description: "Chipped/broken beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      buck: { name: "Buck", description: "Buck-toothed beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      toucan: { name: "Toucan", description: "Large colorful beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      pelican: { name: "Pelican", description: "Expandable pouch beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      crossbill: { name: "Crossbill", description: "Crossed-over beak tips", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      shovel: { name: "Shovel", description: "Flat spade-like beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      needle: { name: "Needle", description: "Extra thin needle beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      scissor: { name: "Scissor", description: "Scissor-like beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      drill: { name: "Drill", description: "Spiral drill beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      hammer: { name: "Hammer", description: "Hammer-shaped beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      sword: { name: "Sword", description: "Sword-like beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      cannon: { name: "Cannon", description: "Cannon barrel beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.2 },
      trumpet: { name: "Trumpet", description: "Musical instrument beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      pencil: { name: "Pencil", description: "Writing utensil beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      brush: { name: "Brush", description: "Paint brush tip", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      crystal: { name: "Crystal", description: "Crystalline formation", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      metal: { name: "Metal", description: "Chrome-plated beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      gold: { name: "Gold", description: "Solid gold beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.2 },
      rainbow: { name: "Rainbow", description: "Color-changing beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.2 },
      pixel: { name: "Pixel", description: "8-bit style beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      ghost: { name: "Ghost", description: "Transparent spectral beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      lava: { name: "Lava", description: "Molten rock beak", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.2 }
    }
  },
  top: {
    name: "Comb",
    category: "head",
    variants: {
      normal: {
        name: "Normal",
        description: "Classic jagged comb",
        live: true,
        frontSVG: `
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
        sideSVG: `
          <!-- Multiple poof sections -->
          <path d="
            M0,-25
            C3,-28 6,-26 9,-23
            C6,-25 3,-25 0,-23
            Z"
            fill="#FF5252"
          />
          <path d="
            M4,-24
            C7,-27 10,-25 13,-22
            C10,-24 7,-24 4,-22
            Z"
            fill="#FF5252"
          />
          <path d="
            M8,-23
            C11,-26 14,-24 17,-21
            C14,-23 11,-23 8,-21
            Z"
            fill="#FF5252"
          />
        `,
        rarityWeight: 1.0
      },
      mohawk: {
        name: "Mohawk",
        description: "Tall spiky mohawk",
        live: true,
        frontSVG: `
          <!-- Main mohawk -->
          <path d="
            M0,-25
            C-2,-35 -4,-33 -6,-30
            C-4,-32 -2,-32 0,-30
            C2,-32 4,-32 6,-30
            C4,-33 2,-35 0,-25
            Z"
            fill="#FF5252"
          />
          <!-- Additional spikes -->
          <path d="
            M-4,-31
            C-2,-36 0,-35 2,-31
            C4,-35 6,-36 8,-31
            Z"
            fill="#FF5252"
          />
        `,
        sideSVG: `
          <!-- Multiple spikes -->
          <path d="
            M0,-25
            C3,-35 6,-33 9,-30
            C6,-32 3,-32 0,-30
            Z"
            fill="#FF5252"
          />
          <path d="
            M4,-27
            C7,-37 10,-35 13,-32
            C10,-34 7,-34 4,-32
            Z"
            fill="#FF5252"
          />
          <path d="
            M8,-29
            C11,-39 14,-37 17,-34
            C14,-36 11,-36 8,-34
            Z"
            fill="#FF5252"
          />
        `,
        rarityWeight: 0.8
      },
      fancy: {
        name: "Fancy",
        description: "Elegant curved comb",
        live: true,
        frontSVG: `
          <!-- Main comb -->
          <path d="
            M0,-25
            C-5,-28 -8,-26 -10,-23
            C-8,-25 -5,-25 0,-23
            C5,-25 8,-25 10,-23
            C8,-26 5,-28 0,-25
            Z"
            fill="#FF5252"
          />
          <!-- Decorative curves -->
          <path d="
            M-8,-24
            C-6,-27 -3,-26 0,-24
            C3,-26 6,-27 8,-24
            C6,-26 3,-25 0,-23
            C-3,-25 -6,-26 -8,-24
            Z"
            fill="#FF5252"
          />
        `,
        sideSVG: `
          <!-- Elegant curves -->
          <path d="
            M0,-25
            C5,-28 8,-26 10,-23
            C8,-25 5,-25 0,-23
            Z"
            fill="#FF5252"
          />
          <path d="
            M4,-24
            C9,-27 12,-25 14,-22
            C12,-24 9,-24 4,-22
            Z"
            fill="#FF5252"
          />
          <path d="
            M8,-23
            C13,-26 16,-24 18,-21
            C16,-23 13,-23 8,-21
            Z"
            fill="#FF5252"
          />
        `,
        rarityWeight: 0.7
      },
      punk: {
        name: "Punk",
        description: "Aggressive spiky comb",
        live: true,
        frontSVG: `
          <!-- Spiky comb -->
          <path d="
            M-10,-25 L-5,-35 L0,-25 L5,-35 L10,-25
            Z"
            fill="#FF5252"
          />
        `,
        sideSVG: `
          <path d="
            M0,-25 L5,-35 L10,-25 L15,-35 L20,-25
            Z"
            fill="#FF5252"
          />
        `,
        rarityWeight: 0.7
      },
      royal: { name: "Royal", description: "Crown-like comb", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      flat: { name: "Flat", description: "Low-profile smooth comb", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      heart: { name: "Heart", description: "Heart-shaped comb", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      horns: { name: "Horns", description: "Devil-like horns", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      antlers: { name: "Antlers", description: "Majestic deer antlers", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      unicorn: { name: "Unicorn", description: "Magical unicorn horn", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      samurai: { name: "Samurai", description: "Traditional samurai helmet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      viking: { name: "Viking", description: "Norse warrior horns", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      wizard: { name: "Wizard", description: "Mystical floating crystals", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      cyber: { name: "Cyber", description: "Digital antenna array", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      flame: { name: "Flame", description: "Living fire crest", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      crystal: { name: "Crystal", description: "Growing crystal formation", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      flower: { name: "Flower", description: "Blooming flower petals", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      cloud: { name: "Cloud", description: "Floating cloud formation", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      lightning: { name: "Lightning", description: "Electric discharge", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      tentacles: { name: "Tentacles", description: "Writhing tentacles", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      pyramid: { name: "Pyramid", description: "Ancient pyramid structure", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      satellite: { name: "Satellite", description: "Space satellite dish", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      brain: { name: "Brain", description: "Exposed brain matter", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      coral: { name: "Coral", description: "Growing coral formation", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      mushroom: { name: "Mushroom", description: "Fungal growth", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      bamboo: { name: "Bamboo", description: "Bamboo shoots", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      gears: { name: "Gears", description: "Mechanical gear assembly", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      feathers: { name: "Feathers", description: "Exotic feather display", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 }
    }
  },
  wattle: {
    name: "Wattle",
    category: "head",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard wattle",
        live: true,
        frontSVG: `
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
        sideSVG: `
          <path d="
            M6,6
            C10,8 10,14 6,18
            C4,16 4,10 6,6
            Z" 
            fill="#FF5252"
          />
        `,
        rarityWeight: 1.0
      },
      long: {
        name: "Long",
        description: "Extra long dangly wattle",
        live: true,
        frontSVG: `
          <path d="
            M-6,6
            C-12,10 -12,20 -6,24
            C-4,20 -4,10 -6,6
            Z" 
            fill="#FF5252"
          />
          <path d="
            M6,6
            C12,10 12,20 6,24
            C4,20 4,10 6,6
            Z" 
            fill="#FF5252"
          />
        `,
        sideSVG: `
          <path d="
            M6,6
            C12,10 12,20 6,24
            C4,20 4,10 6,6
            Z" 
            fill="#FF5252"
          />
        `,
        rarityWeight: 0.8
      },
      fancy: { name: "Fancy", description: "Decorative frilly wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      tiny: { name: "Tiny", description: "Minimal wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      heart: { name: "Heart", description: "Heart-shaped wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      double: { name: "Double", description: "Two-tiered wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      none: { name: "None", description: "No wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.9 },
      spiked: { name: "Spiked", description: "Spiky punk wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      ruffled: { name: "Ruffled", description: "Multi-layered ruffles", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      jeweled: { name: "Jeweled", description: "Gem-encrusted wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      chain: { name: "Chain", description: "Chain-link wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      tentacle: { name: "Tentacle", description: "Writhing tentacle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      flame: { name: "Flame", description: "Fire-like wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      ice: { name: "Ice", description: "Frozen crystal wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      leaf: { name: "Leaf", description: "Plant-like growth", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      metal: { name: "Metal", description: "Mechanical plates", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      bubble: { name: "Bubble", description: "Transparent bubbles", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      pixel: { name: "Pixel", description: "8-bit style wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      neon: { name: "Neon", description: "Glowing neon tubes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cloud: { name: "Cloud", description: "Fluffy cloud form", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      crystal: { name: "Crystal", description: "Growing crystals", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      coral: { name: "Coral", description: "Sea coral growth", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      circuit: { name: "Circuit", description: "Electronic pathways", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      origami: { name: "Origami", description: "Paper-folded design", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      candy: { name: "Candy", description: "Sweet treat design", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      rainbow: { name: "Rainbow", description: "Color-changing wattle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 }
    }
  },
  bodyShape: {
    name: "Body Shape",
    category: "body",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard chicken body",
        live: true,
        frontSVG: `
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
        sideSVG: `
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
        `,
        rarityWeight: 1.0
      },
      round: {
        name: "Round",
        description: "Extra plump body",
        live: true,
        frontSVG: `
          <path d="
            M0,-25 
            C-30,-25 -35,-10 -35,0
            C-35,25 -30,40 0,40
            C30,40 35,25 35,0
            C35,-10 30,-25 0,-25
            Z" 
            fill="inherit"
          />
        `,
        sideSVG: `
          <path d="
            M-30,-25
            C-45,-20 -45,20 -30,25
            C-20,35 -10,35 0,35
            C15,35 25,30 35,25
            C45,15 45,-15 35,-20
            C25,-30 15,-35 0,-35
            C-10,-35 -20,-30 -30,-25
            Z" 
            fill="inherit"
          />
        `,
        rarityWeight: 0.9
      },
      slim: { name: "Slim", description: "Slender racing body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      buff: { name: "Buff", description: "Muscular body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      fluffy: { name: "Fluffy", description: "Extra fluffy feathers", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      spiky: { name: "Spiky", description: "Spiky feather pattern", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      square: { name: "Square", description: "Blocky minecraft-style", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      tall: { name: "Tall", description: "Extended vertical body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      tiny: { name: "Tiny", description: "Miniature body size", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      giant: { name: "Giant", description: "Oversized body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      noodle: { name: "Noodle", description: "Long flexible body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      balloon: { name: "Balloon", description: "Inflated round body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      origami: { name: "Origami", description: "Paper-folded angles", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      crystal: { name: "Crystal", description: "Geometric crystal form", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      ghost: { name: "Ghost", description: "Transparent spectral body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      robot: { name: "Robot", description: "Mechanical body parts", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      slime: { name: "Slime", description: "Gelatinous body form", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cloud: { name: "Cloud", description: "Fluffy cloud-like body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      pixel: { name: "Pixel", description: "8-bit retro style", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      armored: { name: "Armored", description: "Plated armor body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      skeleton: { name: "Skeleton", description: "Exposed bone structure", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      plant: { name: "Plant", description: "Living plant body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      liquid: { name: "Liquid", description: "Flowing water form", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      fire: { name: "Fire", description: "Living flame body", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      shadow: { name: "Shadow", description: "Dark ethereal form", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 }
    }
  },
  wings: {
    name: "Wings",
    category: "body",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard wings",
        live: true,
        frontSVG: `
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
        sideSVG: `
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
        `,
        rarityWeight: 1.0
      },
      large: {
        name: "Large",
        description: "Oversized wings",
        live: true,
        frontSVG: `
          <!-- Left wing -->
          <g class="wing-left">
            <path d="
              M-28,-15
              C-38,-8 -38,15 -36,20
              C-32,24 -24,24 -16,18
              C-20,12 -20,-8 -16,-15
              C-20,-20 -24,-20 -28,-15
              Z" 
              fill="inherit"
            />
            <path d="
              M-28,-10
              C-34,-4 -34,12 -32,16
              C-30,18 -26,18 -22,14
              Z" 
              fill="rgba(0,0,0,0.15)"
            />
          </g>

          <!-- Right wing -->
          <g class="wing-right">
            <path d="
              M28,-15
              C38,-8 38,15 36,20
              C32,24 24,24 16,18
              C20,12 20,-8 16,-15
              C20,-20 24,-20 28,-15
              Z" 
              fill="inherit"
            />
            <path d="
              M28,-10
              C34,-4 34,12 32,16
              C30,18 26,18 22,14
              Z" 
              fill="rgba(0,0,0,0.15)"
            />
          </g>
        `,
        sideSVG: `
          <!-- Wing -->
          <g class="wing">
            <path d="
              M-25,-25
              C-38,-18 -38,18 -30,25
              C-22,28 -15,24 -10,18
              C-16,12 -16,-15 -10,-20
              C-15,-26 -20,-30 -25,-25
              Z" 
              fill="inherit"
            />
            <path d="
              M-25,-20
              C-32,-14 -32,14 -28,20
              C-24,22 -18,20 -14,16
              Z" 
              fill="rgba(0,0,0,0.15)"
            />
          </g>
        `,
        rarityWeight: 0.9
      },
      tiny: { name: "Tiny", description: "Undersized wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      pointed: { name: "Pointed", description: "Sharp angular wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      fancy: { name: "Fancy", description: "Decorative feathered wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      bat: { name: "Bat", description: "Bat-like wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      robot: { name: "Robot", description: "Mechanical wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      butterfly: { name: "Butterfly", description: "Colorful insect wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      dragon: { name: "Dragon", description: "Scaled dragon wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      angel: { name: "Angel", description: "Divine feathered wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      demon: { name: "Demon", description: "Dark leathery wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      crystal: { name: "Crystal", description: "Crystalline wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      energy: { name: "Energy", description: "Glowing energy wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      pixel: { name: "Pixel", description: "8-bit style wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      origami: { name: "Origami", description: "Paper-folded wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      steampunk: { name: "Steampunk", description: "Gear-driven wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cloud: { name: "Cloud", description: "Fluffy cloud wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      fire: { name: "Fire", description: "Flaming wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ice: { name: "Ice", description: "Frozen crystal wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      lightning: { name: "Lightning", description: "Electric wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      rainbow: { name: "Rainbow", description: "Color-changing wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ghost: { name: "Ghost", description: "Spectral wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cyber: { name: "Cyber", description: "Digital hologram wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      leaf: { name: "Leaf", description: "Natural leaf wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      bone: { name: "Bone", description: "Skeletal wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 }
    }
  },
  tail: {
    name: "Tail",
    category: "body",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard tail",
        live: true,
        frontSVG: `
          <!-- No front view for tail -->
        `,
        sideSVG: `
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
        `,
        rarityWeight: 1.0
      },
      long: {
        name: "Long",
        description: "Long flowing tail",
        live: true,
        frontSVG: `
          <!-- No front view for tail -->
        `,
        sideSVG: `
          <g class="tail">
            <path d="
              M-35,-20
              C-50,-30 -60,-20 -65,-10
              C-60,0 -50,-5 -35,-5
              C-40,-12 -40,-18 -35,-20
              Z" 
              fill="inherit"
            />
            <path d="
              M-38,-18
              C-48,-25 -55,-18 -58,-12
              C-55,-6 -48,-8 -38,-10
              Z" 
              fill="rgba(0,0,0,0.15)"
            />
          </g>
        `,
        rarityWeight: 0.9
      },
      fan: { name: "Fan", description: "Peacock-like fan tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      spiky: { name: "Spiky", description: "Spiky tail feathers", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      curly: { name: "Curly", description: "Curled tail feathers", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      stub: { name: "Stub", description: "Short stubby tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      forked: { name: "Forked", description: "Split/forked tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      phoenix: { name: "Phoenix", description: "Flaming feather tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      dragon: { name: "Dragon", description: "Long scaled tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      robot: { name: "Robot", description: "Mechanical tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      crystal: { name: "Crystal", description: "Crystal formation tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      energy: { name: "Energy", description: "Glowing energy trail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      pixel: { name: "Pixel", description: "8-bit retro tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      rainbow: { name: "Rainbow", description: "Color-changing tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ghost: { name: "Ghost", description: "Spectral tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cloud: { name: "Cloud", description: "Fluffy cloud tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      lightning: { name: "Lightning", description: "Electric discharge", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      bone: { name: "Bone", description: "Skeletal tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      plant: { name: "Plant", description: "Living vine tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      ice: { name: "Ice", description: "Frozen crystal tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      metal: { name: "Metal", description: "Chrome plated tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      tentacle: { name: "Tentacle", description: "Writhing tentacle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      spring: { name: "Spring", description: "Bouncy spring tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      ribbon: { name: "Ribbon", description: "Flowing ribbon tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      star: { name: "Star", description: "Star-trailing tail", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 }
    }
  },
  legs: {
    name: "Legs",
    category: "legs",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard chicken legs",
        live: true,
        frontSVG: `
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
        sideSVG: `
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
        rarityWeight: 1.0
      },
      long: {
        name: "Long",
        description: "Extra long legs",
        live: true,
        frontSVG: `
          <!-- Upper leg -->
          <path d="
            M0,0
            C2,10 2,20 0,30
            C-2,20 -2,10 0,0
            Z"
            fill="#FFA000"
          />
          
          <!-- Lower leg -->
          <path d="
            M0,30
            C1,36 1,42 0,48
            M0,48
            L0,52
            M0,52
            L-3,56
            M0,52
            L0,56
            M0,52
            L3,56
            M0,50
            L-2,48"
            stroke="#FFA000"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
          />
        `,
        sideSVG: `
          <!-- Upper leg -->
          <path d="
            M0,0
            C2,10 2,20 0,30
            C-2,20 -2,10 0,0
            Z"
            fill="#FFA000"
          />
          
          <!-- Lower leg -->
          <path d="
            M0,30
            C1,36 1,42 0,48
            M0,48
            L0,52
            M0,52
            L-3,56
            M0,52
            L0,56
            M0,52
            L3,56
            M0,50
            L-2,48"
            stroke="#FFA000"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
          />
        `,
        rarityWeight: 0.9
      },
      short: { name: "Short", description: "Stubby legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      thick: { name: "Thick", description: "Muscular legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      scaly: { name: "Scaly", description: "Extra scaly texture", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      robot: { name: "Robot", description: "Mechanical legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      fuzzy: { name: "Fuzzy", description: "Feathered legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      spring: { name: "Spring", description: "Bouncy spring legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      crystal: { name: "Crystal", description: "Crystal formation legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      tentacle: { name: "Tentacle", description: "Tentacle legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      noodle: { name: "Noodle", description: "Wiggly noodle legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      stilts: { name: "Stilts", description: "Extra tall stilts", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      peg: { name: "Peg", description: "Wooden peg legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      wheel: { name: "Wheel", description: "Rolling wheel legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      hover: { name: "Hover", description: "Floating hover pads", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      spider: { name: "Spider", description: "Multiple spider legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      energy: { name: "Energy", description: "Pure energy legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ghost: { name: "Ghost", description: "Spectral legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      pixel: { name: "Pixel", description: "8-bit style legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      bone: { name: "Bone", description: "Skeletal legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      plant: { name: "Plant", description: "Growing vine legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cloud: { name: "Cloud", description: "Cloud formation legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      fire: { name: "Fire", description: "Flame trail legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ice: { name: "Ice", description: "Ice crystal legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      metal: { name: "Metal", description: "Chrome plated legs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 }
    }
  },
  feet: {
    name: "Feet",
    category: "legs",
    variants: {
      normal: {
        name: "Normal",
        description: "Standard chicken feet",
        live: true,
        frontSVG: `
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
        sideSVG: `
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
        rarityWeight: 1.0
      },
      webbed: {
        name: "Webbed",
        description: "Duck-like webbed feet",
        live: true,
        frontSVG: `
          <path d="
            M0,34
            L-4,38
            M0,34
            L0,38
            M0,34
            L4,38"
            stroke="#FFA000"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
          />
          <path d="
            M-4,38
            C-2,39 0,39 4,38
            Z"
            fill="#FFCC80"
            fill-opacity="0.6"
          />
        `,
        sideSVG: `
          <path d="
            M0,34
            L-4,38
            M0,34
            L0,38
            M0,34
            L4,38"
            stroke="#FFA000"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
          />
          <path d="
            M-4,38
            C-2,39 0,39 4,38
            Z"
            fill="#FFCC80"
            fill-opacity="0.6"
          />
        `,
        rarityWeight: 0.9
      },
      talons: { name: "Talons", description: "Sharp eagle-like talons", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      boots: { name: "Boots", description: "Boot-like feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      dino: { name: "Dino", description: "Dinosaur-like feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      robot: { name: "Robot", description: "Mechanical feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      sneakers: { name: "Sneakers", description: "Athletic shoes", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      rocket: { name: "Rocket", description: "Rocket boosters", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      spring: { name: "Spring", description: "Bouncy springs", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      hover: { name: "Hover", description: "Hover platforms", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      wheel: { name: "Wheel", description: "Rolling wheels", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      crystal: { name: "Crystal", description: "Crystal formation", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      energy: { name: "Energy", description: "Energy projections", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ghost: { name: "Ghost", description: "Spectral feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      pixel: { name: "Pixel", description: "8-bit style feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      bone: { name: "Bone", description: "Skeletal feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      plant: { name: "Plant", description: "Root-like feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      cloud: { name: "Cloud", description: "Cloud formations", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      fire: { name: "Fire", description: "Flame trails", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.3 },
      ice: { name: "Ice", description: "Ice crystal feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      metal: { name: "Metal", description: "Chrome plated feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      tentacle: { name: "Tentacle", description: "Tentacle ends", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      paw: { name: "Paw", description: "Animal-like paws", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      flipper: { name: "Flipper", description: "Swimming flippers", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      suction: { name: "Suction", description: "Suction cup feet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 }
    }
  },
  headwear: {
    name: "Headwear",
    category: "accessories",
    variants: {
      none: {
        name: "None",
        description: "No headwear",
        live: true,
        frontSVG: `
          <!-- No headwear -->
        `,
        sideSVG: `
          <!-- No headwear -->
        `,
        rarityWeight: 1.0
      },
      cap: {
        name: "Cap",
        description: "Simple cap",
        live: true,
        frontSVG: `
          <path d="
            M-12,-15
            C-12,-22 12,-22 12,-15
            C12,-8 -12,-8 -12,-15
            Z"
            fill="#2196F3"
          />
          <path d="
            M-12,-15
            C-8,-20 8,-20 12,-15
            "
            fill="none"
            stroke="#1976D2"
            stroke-width="1"
          />
          <path d="
            M0,-22
            L0,-26
            Z"
            fill="none"
            stroke="#1976D2"
            stroke-width="2"
          />
        `,
        sideSVG: `
          <path d="
            M-10,-15
            C-10,-22 10,-22 10,-15
            C10,-8 -10,-8 -10,-15
            Z"
            fill="#2196F3"
          />
          <path d="
            M-10,-15
            C-6,-20 6,-20 10,-15
            "
            fill="none"
            stroke="#1976D2"
            stroke-width="1"
          />
          <path d="
            M15,-15
            C15,-22 20,-20 20,-15
            C20,-10 15,-12 15,-15
            Z"
            fill="#2196F3"
          />
        `,
        rarityWeight: 0.8
      },
      tophat: { name: "Top Hat", description: "Fancy top hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      cowboy: { name: "Cowboy", description: "Western cowboy hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      beanie: { name: "Beanie", description: "Knitted beanie", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      crown: { name: "Crown", description: "Royal crown", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      helmet: { name: "Helmet", description: "Safety helmet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      party: { name: "Party", description: "Party hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      chef: { name: "Chef", description: "Chef's hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      pirate: { name: "Pirate", description: "Pirate hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      ninja: { name: "Ninja", description: "Ninja headband", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      flower: { name: "Flower", description: "Flower crown", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      bucket: { name: "Bucket", description: "Bucket hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      fedora: { name: "Fedora", description: "Classic fedora", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      propeller: { name: "Propeller", description: "Propeller cap", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      viking: { name: "Viking", description: "Viking helmet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      astronaut: { name: "Astronaut", description: "Space helmet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      detective: { name: "Detective", description: "Detective hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      jester: { name: "Jester", description: "Jester hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      graduate: { name: "Graduate", description: "Graduation cap", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      military: { name: "Military", description: "Military cap", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      winter: { name: "Winter", description: "Winter hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      safari: { name: "Safari", description: "Safari hat", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      headphones: { name: "Headphones", description: "Gaming headset", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 }
    }
  },
  neckwear: {
    name: "Neckwear",
    category: "accessories",
    variants: {
      none: {
        name: "None",
        description: "No neckwear",
        live: true,
        frontSVG: `
          <!-- No neckwear -->
        `,
        sideSVG: `
          <!-- No neckwear -->
        `,
        rarityWeight: 1.0
      },
      bowtie: {
        name: "Bowtie",
        description: "Fancy bowtie",
        live: true,
        frontSVG: `
          <path d="
            M-6,5
            L-12,2
            L-12,8
            L-6,5
            L0,8
            L0,2
            Z"
            fill="#FF5252"
          />
          <path d="
            M6,5
            L12,2
            L12,8
            L6,5
            L0,8
            L0,2
            Z"
            fill="#FF5252"
          />
          <circle cx="0" cy="5" r="2" fill="#D50000" />
        `,
        sideSVG: `
          <path d="
            M6,5
            L12,2
            L12,8
            L6,5
            L0,8
            L0,2
            Z"
            fill="#FF5252"
          />
          <circle cx="0" cy="5" r="2" fill="#D50000" />
        `,
        rarityWeight: 0.8
      },
      scarf: { name: "Scarf", description: "Cozy scarf", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      tie: { name: "Tie", description: "Business tie", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      necklace: { name: "Necklace", description: "Decorative necklace", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      collar: { name: "Collar", description: "Pet collar", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.8 },
      bandana: { name: "Bandana", description: "Neck bandana", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      chain: { name: "Chain", description: "Gold chain", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      ribbon: { name: "Ribbon", description: "Pretty ribbon", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      medal: { name: "Medal", description: "Achievement medal", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      cape: { name: "Cape", description: "Hero's cape", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      feather: { name: "Feather", description: "Feather boa", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      lei: { name: "Lei", description: "Flower lei", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      ascot: { name: "Ascot", description: "Fancy ascot", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      choker: { name: "Choker", description: "Punk choker", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      pearls: { name: "Pearls", description: "Pearl necklace", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      pendant: { name: "Pendant", description: "Magical pendant", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      bow: { name: "Bow", description: "Decorative bow", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      ruff: { name: "Ruff", description: "Victorian ruff", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      crystal: { name: "Crystal", description: "Crystal necklace", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      spikes: { name: "Spikes", description: "Spiked collar", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      amulet: { name: "Amulet", description: "Mystical amulet", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      scarf2: { name: "Winter Scarf", description: "Warm winter scarf", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      garland: { name: "Garland", description: "Flower garland", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      neckerchief: { name: "Neckerchief", description: "Scout neckerchief", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 }
    }
  },
  backwear: {
    name: "Backwear",
    category: "accessories",
    variants: {
      none: {
        name: "None",
        description: "No backwear",
        live: true,
        frontSVG: `
          <!-- No backwear visible from front -->
        `,
        sideSVG: `
          <!-- No backwear -->
        `,
        rarityWeight: 1.0
      },
      backpack: {
        name: "Backpack",
        description: "Small backpack",
        live: true,
        frontSVG: `
          <!-- Backpack straps visible from front -->
          <path d="
            M-15,0
            L-10,15
            "
            stroke="#795548"
            stroke-width="2"
            fill="none"
          />
          <path d="
            M15,0
            L10,15
            "
            stroke="#795548"
            stroke-width="2"
            fill="none"
          />
        `,
        sideSVG: `
          <!-- Backpack -->
          <rect x="-45" y="-15" width="15" height="25" rx="2" fill="#A1887F" />
          <rect x="-44" y="-14" width="13" height="5" rx="1" fill="#8D6E63" />
          <path d="
            M-30,0
            L-25,0
            "
            stroke="#795548"
            stroke-width="2"
            fill="none"
          />
          <path d="
            M-30,-10
            L-25,-10
            "
            stroke="#795548"
            stroke-width="2"
            fill="none"
          />
        `,
        rarityWeight: 0.8
      },
      cape: { name: "Cape", description: "Heroic cape", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      saddle: { name: "Saddle", description: "Riding saddle", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      jetpack: { name: "Jetpack", description: "Rocket jetpack", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      wings: { name: "Wings", description: "Angel wings", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      shell: { name: "Shell", description: "Turtle shell", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      basket: { name: "Basket", description: "Woven basket", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.7 },
      umbrella: { name: "Umbrella", description: "Tiny umbrella", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      guitar: { name: "Guitar", description: "Musical guitar", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      rocket: { name: "Rocket", description: "Rocket pack", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      surfboard: { name: "Surfboard", description: "Surfboard", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      shield: { name: "Shield", description: "Battle shield", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      flag: { name: "Flag", description: "Waving flag", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      barrel: { name: "Barrel", description: "Wooden barrel", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      propeller: { name: "Propeller", description: "Flying propeller", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      book: { name: "Book", description: "Magic spellbook", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      quiver: { name: "Quiver", description: "Arrow quiver", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      tank: { name: "Tank", description: "Oxygen tank", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      treasure: { name: "Treasure", description: "Treasure chest", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      radio: { name: "Radio", description: "Boombox radio", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      lantern: { name: "Lantern", description: "Glowing lantern", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.6 },
      antenna: { name: "Antenna", description: "Radio antenna", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.5 },
      portal: { name: "Portal", description: "Portal device", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 },
      satellite: { name: "Satellite", description: "Mini satellite", live: false, frontSVG: "", sideSVG: "", rarityWeight: 0.4 }
    }
  }
}; 