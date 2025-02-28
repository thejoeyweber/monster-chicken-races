# buildplan.md

## Project Overview

We're creating **Monster Chicken Races**, a hilariously chaotic multiplayer racing game inspired by Mutant Chicken Races and Monster Rancher. Players upload images to generate uniquely funny mutant chickens, enter blind races filled with unpredictable events, and strategically bet or trade chickens. Our goal is maximum fun, silliness, and immediate engagement without upfront complexity. We'll build fast, iterate, and embrace a "vibe coding" approach—prioritizing getting playable versions quickly over perfect initial code.

---

## Current Progress Summary

We've successfully implemented the core aspects of the game:
- ✅ Core chicken generation from uploaded images with unique stats and visualization
- ✅ Coop system for managing chickens with sorting and detailed information
- ✅ Race system with multiple race types (Standard, Chaos, Endurance) and track lengths
- ✅ Chaotic events during races that affect chicken performance

Next major focus:
- Betting & Currency system (Step 4)
- Multiplayer basics (Step 6)

---

## File Rules

This is just a set of starting points. It's not an iron clad spec. We can riff on this if needed.

---

## Step-by-Step Build Checklist

### 🚩 Step 1: Core Chicken Generation ✅ COMPLETED
- [x] Let users upload an image and get a chicken with a funny, randomly generated name.
- [x] Hash the uploaded image to ensure the same image always produces the same chicken.
- [x] Generate random basic stats (Speed, Strength, Wisdom, Recklessness, Stamina).
- [x] Display chicken visually using generated sprite elements.
- [x] Allow saving chickens to the coop.

### 🚩 Step 2: Simple Race Simulation ✅ COMPLETED
- [x] Allow entering chickens into automated races.
- [x] Simulate race outcomes based on chicken stats plus random factors.
- [x] Display race animation showing chickens running across the screen.
- [x] Support different race types (Standard, Chaos, Endurance).
- [x] Support different track lengths (Short, Medium, Long).
- [x] Announce race winners and track race history.

### 🚩 Step 3: Introduce Chaos! ✅ COMPLETED
- [x] Randomly trigger chaotic events during races.
- [x] Implement positive and negative events with visual indicators.
- [x] Ensure events visibly influence race outcomes.
- [x] Log race events in the race feed.

### 🚩 Step 4: Basic Betting & Currency ⬜ NEXT PRIORITY
- [ ] Implement simple betting before each race (pick one chicken you think will win).
- [ ] Award simple currency for correct bets.
- [ ] Let users track their currency earnings.
- [ ] Add betting odds based on chicken stats and history.

### 🚩 Step 5: Coop & Chicken Management ✅ COMPLETED
- [x] Implement "coop" screen to hold chickens.
- [x] Allow players to retire (sell) chickens.
- [x] Display detailed chicken stats and race history.
- [x] Add sorting options for the coop.

### 🚩 Step 6: Multiplayer Basics ⬜ NEXT PRIORITY
- [ ] Let multiple users submit chickens for scheduled races (asynchronous multiplayer).
- [ ] Display other users' chickens anonymously (only names and basic appearance).
- [ ] Announce winners clearly after each race.
- [ ] Simple user accounts or profiles.

### 🚩 Step 7: Strategic Upgrades & Items ⬜ UPCOMING
- [ ] Add simple items like "Spy Glass" to reveal hidden stats occasionally.
- [ ] Let players spend currency on these minor strategic tools.
- [ ] Add training options to slightly improve chicken stats.

### 🚩 Step 8: Marketplace & Trading ⬜ FUTURE
- [ ] Allow players to list chickens for sale.
- [ ] Allow players to buy chickens listed by others.
- [ ] Show simple stats/traits for chickens listed in the marketplace.
- [ ] Track chicken ownership history.

### 🚩 Step 9: Advanced Traits & Events ⬜ FUTURE
- [ ] Expand chaotic traits (Benjamin Button, Teleporter, Immunity).
- [ ] Expand random environmental events (Alien Abduction, Zombie Revival).
- [ ] Ensure each trait/event is funny and impactful but not frustratingly frequent.
- [ ] Add rare "legendary" traits with special effects.

### 🚩 Step 10: Social & Shareability Features ⬜ FUTURE
- [ ] Automatically capture funny race outcomes as short replays or GIFs.
- [ ] Allow one-click sharing of races/chicken profiles to social media.
- [ ] Add chicken "hall of fame" for notable achievements.

### 🚩 Step 11: Cosmetic & Convenience Monetization ⬜ FUTURE
- [ ] Add ability to purchase extra coop slots.
- [ ] Implement "Chicken Freezing" to pause aging.
- [ ] Offer purely cosmetic items (hats, coop skins, tombstones).

### 🚩 Step 12: Player Retention & Events ⬜ FUTURE
- [ ] Add daily login bonuses (small currency or comedic items).
- [ ] Host weekly "chaos events" with limited-time traits or hazards.
- [ ] Showcase weekly "highlight reel" of funniest community-generated moments.

---

## Technical Implementation Notes

### Current Architecture
- Vanilla JavaScript (ES6+) with no dependencies
- Client-side only for now - using LocalStorage for data persistence
- HTML/CSS for UI with CSS animations for race visualization
- Modular code organization with separate JS files for major components

### Next Implementation Priorities
- Simple backend for multiplayer features (consider Firebase or similar)
- User authentication system
- Currency and betting system implementation
- Real-time or asynchronous race participation

---

## Project Development Log

### Feb 28, 2023
- Completed core chicken generation from image uploads
- Implemented coop management system
- Added race system with multiple race types and track lengths
- Implemented chaotic events during races

### March 1, 2024
- Created Character Lab for chicken design and animation
- Implemented modular SVG-based chicken components
- Added support for front and side views
- Created animation system with idle, run, jump, and trip states
- Improved chicken design with:
  - Distinct left/right wings with shading
  - Articulated tail with color support
  - Realistic feet with proper toe placement
  - Better beak design and positioning
  - Color inheritance system for all parts

(Add additional notes, bugs, ideas, or random items here as we develop.)
```