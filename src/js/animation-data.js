// Animation data for chicken character
const animationData = {
    idle: {
        duration: 1000,
        keyframes: {
            0: { bodyRotation: 0, headRotation: 0 },
            50: { bodyRotation: 2, headRotation: 5 },
            100: { bodyRotation: 0, headRotation: 0 }
        }
    },
    run: {
        duration: 800,
        keyframes: {
            0: { bodyRotation: -5, headRotation: -10, legFrontRotation: 30, legBackRotation: -30 },
            50: { bodyRotation: 5, headRotation: 10, legFrontRotation: -30, legBackRotation: 30 },
            100: { bodyRotation: -5, headRotation: -10, legFrontRotation: 30, legBackRotation: -30 }
        }
    },
    jump: {
        duration: 1200,
        keyframes: {
            0: { bodyRotation: 0, headRotation: 0, legFrontRotation: 0, legBackRotation: 0, translateY: 0 },
            40: { bodyRotation: -15, headRotation: -10, legFrontRotation: -45, legBackRotation: -45, translateY: -30 },
            60: { bodyRotation: 0, headRotation: 0, legFrontRotation: 0, legBackRotation: 0, translateY: -40 },
            100: { bodyRotation: 0, headRotation: 0, legFrontRotation: 0, legBackRotation: 0, translateY: 0 }
        }
    },
    trip: {
        duration: 1000,
        keyframes: {
            0: { bodyRotation: 0, headRotation: 0 },
            30: { bodyRotation: 30, headRotation: 20 },
            60: { bodyRotation: 90, headRotation: 45 },
            100: { bodyRotation: 0, headRotation: 0 }
        }
    }
};

// Make it available globally
window.animationData = animationData; 