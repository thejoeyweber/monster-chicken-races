/**
 * Monster Chicken Races - Main App
 * Handles UI interactions and chicken generation process
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const imageUpload = document.getElementById('image-upload');
    const generateButton = document.getElementById('generate-button');
    const chickenDisplay = document.getElementById('chicken-display');
    const chickenName = document.getElementById('chicken-name');
    const chickenImage = document.getElementById('chicken-image');
    const chickenSprite = document.getElementById('chicken-sprite');
    const saveButton = document.getElementById('save-chicken');
    
    // Stats elements
    const statBars = {
        speed: document.getElementById('speed-bar'),
        strength: document.getElementById('strength-bar'),
        wisdom: document.getElementById('wisdom-bar'),
        recklessness: document.getElementById('recklessness-bar'),
        stamina: document.getElementById('stamina-bar')
    };
    
    const statValues = {
        speed: document.getElementById('speed-value'),
        strength: document.getElementById('strength-value'),
        wisdom: document.getElementById('wisdom-value'),
        recklessness: document.getElementById('recklessness-value'),
        stamina: document.getElementById('stamina-value')
    };
    
    // Initialize chicken generator
    const chickenGenerator = new ChickenGenerator();
    
    // Current chicken
    let currentChicken = null;
    
    // Handle image upload
    imageUpload.addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
            generateButton.disabled = false;
        } else {
            generateButton.disabled = true;
        }
    });
    
    // Handle generate button click
    generateButton.addEventListener('click', async () => {
        if (imageUpload.files && imageUpload.files[0]) {
            // Show loading state
            generateButton.textContent = 'Generating...';
            generateButton.disabled = true;
            
            try {
                // Generate chicken from the uploaded image
                currentChicken = await chickenGenerator.generateChicken(imageUpload.files[0]);
                
                // Update UI with the generated chicken
                displayChicken(currentChicken);
                
                // Reset generate button
                generateButton.textContent = 'Generate Chicken';
                
                // Show the chicken display section
                chickenDisplay.classList.remove('hidden');
            } catch (error) {
                console.error('Error generating chicken:', error);
                alert('Failed to generate chicken. Please try again.');
                generateButton.textContent = 'Generate Chicken';
                generateButton.disabled = false;
            }
        }
    });
    
    // Handle save button click
    saveButton.addEventListener('click', () => {
        if (currentChicken) {
            saveChickenToCoop(currentChicken);
            alert(`${currentChicken.name} has been added to your coop!`);
            
            // Reset the form
            imageUpload.value = '';
            generateButton.disabled = true;
            chickenDisplay.classList.add('hidden');
            currentChicken = null;
        }
    });
    
    /**
     * Displays the generated chicken in the UI
     * @param {Object} chicken - The generated chicken data
     */
    function displayChicken(chicken) {
        // Set chicken name and image
        chickenName.textContent = chicken.name;
        chickenImage.src = chicken.image;
        
        // Set chicken sprite
        chickenSprite.innerHTML = chicken.sprite;
        
        // Update stat bars with animation delay for each stat
        Object.keys(chicken.stats).forEach((stat, index) => {
            // Set the stat value text
            statValues[stat].textContent = chicken.stats[stat];
            
            // Animate the stat bar after a delay
            setTimeout(() => {
                const percentage = (chicken.stats[stat] / chickenGenerator.MAX_STAT) * 100;
                statBars[stat].style.width = `${percentage}%`;
                
                // Add color based on stat value
                if (chicken.stats[stat] >= 8) {
                    statBars[stat].style.backgroundColor = '#4CAF50'; // Green for high stats
                } else if (chicken.stats[stat] >= 5) {
                    statBars[stat].style.backgroundColor = '#FFC107'; // Yellow for medium stats
                } else {
                    statBars[stat].style.backgroundColor = '#F44336'; // Red for low stats
                }
            }, 200 * index);
        });
    }
    
    /**
     * Saves the chicken to the local storage "coop"
     * @param {Object} chicken - The chicken to save
     */
    function saveChickenToCoop(chicken) {
        // Get existing coop data or initialize empty array
        const coop = JSON.parse(localStorage.getItem('chickenCoop') || '[]');
        
        // Add chicken to coop with additional properties
        coop.push({
            ...chicken,
            id: Date.now(), // Unique ID based on timestamp
            created: new Date().toISOString(),
            raceCount: 0,
            wins: 0
        });
        
        // Save updated coop
        localStorage.setItem('chickenCoop', JSON.stringify(coop));
    }
}); 