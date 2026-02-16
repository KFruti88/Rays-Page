// Data for commands
const commands = {
    contract: "number of contracts for farm simulator",
    greatone: "Great Ones! Pack it up, boys. There’s nothing left to shoot but the breeze. 🌲👑",
    diamond: "Diamonds! Finally, a trophy that doesn't look like it was found in a dumpster. 🦌💎",
    myth: "Mythical creatures down. Keep this up and Bigfoot is going to start getting nervous. 🏹✨",
    legend: "Legendary animals? At this point, the animals are starting to recognize you by name. 🏹🐾",
    gold: "Gold Medals. Not quite a Diamond, but at least it's enough to pay for the gas to get home. 🦌⛽",
    silver: "Silver medals. The 'participation trophy' of the hunting world. Better luck next time. 🌲🙄",
    bronze: "Bronze harvests... what a waste of ammo. Just throw a rock next time. 🙄🔫"
};

// Initialize counters from LocalStorage or set to 0
const counters = JSON.parse(localStorage.getItem('rayCounters')) || {
    fs22_session: 0,
    contract: 0,
    greatone: 0,
    diamond: 0,
    myth: 0,
    legend: 0,
    gold: 0,
    silver: 0,
    bronze: 0
};

// Function to update UI on load
function updateUI() {
    for (const [key, value] of Object.entries(counters)) {
        const el = document.getElementById(key.startsWith('fs22') ? key : `count-${key}`);
        if (el) el.innerText = value;
    }
}

// Save to LocalStorage
function saveCounters() {
    localStorage.setItem('rayCounters', JSON.stringify(counters));
}

// Handle Command Button Clicks
function triggerCommand(key) {
    // 1. Show Response
    const msgEl = document.getElementById(`msg-${key}`);
    if (msgEl && commands[key]) {
        msgEl.innerText = commands[key];
        
        // Clear message after 5 seconds (optional)
        setTimeout(() => { msgEl.innerText = ''; }, 5000);
    }

    // 2. Increment Counter
    if (counters[key] !== undefined) {
        counters[key]++;
        saveCounters();
        updateUI();
    }
}

// Handle Manual Counter (+/-)
function updateCounter(key, change) {
    if (counters[key] !== undefined) {
        counters[key] += change;
        saveCounters();
        updateUI();
    }
}

// Initial Load
updateUI();

// Register Service Worker for Smart Caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Smart Cache registered!', reg.scope))
            .catch((err) => console.log('Smart Cache failed:', err));
    });
}