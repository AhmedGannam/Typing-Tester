// Sample texts for typing practice
const textSamples = {
    random: [
        "The quick brown fox jumps over the lazy dog. This pangram contains all letters of the English alphabet. It is widely used for touch-typing practice and testing typewriters and computer keyboards.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. Persistence and determination alone are omnipotent. The power of persistence is often underestimated.",
        "Typing practice improves both speed and accuracy over time. Regular practice sessions of even just fifteen minutes per day can lead to significant improvements in typing proficiency.",
        "Learning to touch type is an investment in your productivity. Once mastered, typing becomes second nature, allowing you to focus more on content creation rather than looking for keys.",
        "Effective communication is crucial in today's digital world. Being able to type quickly and accurately enhances your ability to communicate through written means."
    ],
    quotes: [
        "Life is what happens when you're busy making other plans. - John Lennon",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
        "The only impossible journey is the one you never begin. - Tony Robbins"
    ],
    code: [
        "function calculateFactorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  } else {\n    return n * calculateFactorial(n - 1);\n  }\n}",
        "const filterArray = (arr, condition) => {\n  return arr.filter(item => condition(item));\n};\n\nconst numbers = [1, 2, 3, 4, 5, 6];\nconst evenNumbers = filterArray(numbers, num => num % 2 === 0);",
        "class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  greet() {\n    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;\n  }\n}",
        "const fetchData = async (url) => {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n};",
        "document.addEventListener('DOMContentLoaded', () => {\n  const button = document.getElementById('submitBtn');\n  button.addEventListener('click', () => {\n    const input = document.getElementById('userInput').value;\n    console.log('User input:', input);\n  });\n});"
    ],
    paragraph: [
        "Digital technology has revolutionized the way we communicate, learn, and work. With smartphones in our pockets and computers on our desks, we have unprecedented access to information and connectivity. This technological advancement has created new opportunities and challenges that previous generations could not have imagined. As we navigate this digital landscape, developing digital literacy and critical thinking skills becomes increasingly important for success in modern society.",
        "The environmental challenges facing our planet require immediate and coordinated action. Climate change, pollution, deforestation, and loss of biodiversity threaten not only wildlife but also human wellbeing. Sustainable development practices that balance economic growth with environmental protection are essential for ensuring a healthy planet for future generations. Individual actions, from reducing waste to supporting eco-friendly businesses, can collectively make a significant positive impact.",
        "Effective communication skills are vital in both personal and professional settings. Being able to clearly express ideas, actively listen, and understand different perspectives contributes to stronger relationships and better outcomes. In an increasingly globalized world, cross-cultural communication skills are particularly valuable. Developing empathy and adaptability in communication can help bridge differences and foster collaborative environments where diverse ideas can flourish.",
        "Physical and mental wellness are interconnected aspects of overall health. Regular exercise, balanced nutrition, adequate sleep, and stress management contribute to physical wellbeing and can positively impact mental health. Similarly, maintaining good mental health through practices like mindfulness, seeking support when needed, and engaging in meaningful activities can improve physical health outcomes. A holistic approach to wellness recognizes the importance of caring for both body and mind.",
        "Continuous learning is a lifelong journey that extends far beyond formal education. In a rapidly changing world, the ability to adapt and acquire new knowledge and skills is invaluable. Learning can take many forms, from structured courses to self-directed exploration. Cultivating curiosity and a growth mindset enables individuals to embrace challenges as opportunities for development. The pursuit of knowledge not only enhances career prospects but also enriches personal fulfillment and understanding of the world."
    ]
};

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const textToType = document.getElementById('textToType');
const inputArea = document.getElementById('inputArea');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const settingsBtn = document.getElementById('settingsBtn');
const showKeyboardBtn = document.getElementById('showKeyboardBtn');
const practiceErrorsBtn = document.getElementById('practiceErrorsBtn');
const profileBtn = document.getElementById('profileBtn');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const cpmElement = document.getElementById('cpm');
const accuracyElement = document.getElementById('accuracy');
const progressBar = document.getElementById('progressBar');
const countdownElement = document.getElementById('countdown');
const resultBox = document.getElementById('resultBox');
const resultWpm = document.getElementById('result-wpm');
const resultCpm = document.getElementById('result-cpm');
const resultAccuracy = document.getElementById('result-accuracy');
const resultErrors = document.getElementById('result-errors');
const errorList = document.getElementById('errorList');
const keyboardContainer = document.getElementById('keyboardContainer');
const keys = document.querySelectorAll('.key');

// Settings Modal Elements
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const timeLimit = document.getElementById('timeLimit');
const textType = document.getElementById('textType');
const difficultyLevel = document.getElementById('difficultyLevel');
const soundEffects = document.getElementById('soundEffects');

// Profile Modal Elements
const profileModal = document.getElementById('profileModal');
const closeProfileBtn = document.getElementById('closeProfileBtn');
const testsCompleted = document.getElementById('testsCompleted');
const bestWpm = document.getElementById('bestWpm');
const avgWpm = document.getElementById('avgWpm');
const avgAccuracy = document.getElementById('avgAccuracy');
const currentLevel = document.getElementById('currentLevel');
const levelProgress = document.getElementById('levelProgress');
const nextLevel = document.getElementById('nextLevel');
const badgesContainer = document.getElementById('badgesContainer');
const heatMap = document.getElementById('heatMap');

// Variables
let timer;
let timeLeft;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let startTime;
let totalKeystrokes = 0;
let errorChars = {};
let currentTextType = 'random';
let currentTimeLimitSeconds = 60;
let currentDifficulty = 'medium';
let soundEffectsEnabled = true;
let testHistory = [];
let userProfile = {
    testsCompleted: 0,
    bestWpm: 0,
    totalWpm: 0,
    totalAccuracy: 0,
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    badges: []
};

// Initialize keyboard heat map
const initializeHeatMap = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    heatMap.innerHTML = '';
    
    alphabet.forEach(char => {
        const cell = document.createElement('div');
        cell.className = 'heat-cell';
        cell.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
        cell.textContent = char.toUpperCase();
        heatMap.appendChild(cell);
    });
};

// Initialize app
const init = () => {
    // Load saved settings and user profile
    loadSettings();
    loadUserProfile();
    initializeHeatMap();
    
    // Get a random text sample based on current settings
    loadTextSample();
};

// Load a random text sample based on settings
const loadTextSample = () => {
    // Choose a random text from the selected category
    const samples = textSamples[currentTextType];
    const randomIndex = Math.floor(Math.random() * samples.length);
    const text = samples[randomIndex];
    
    // Split text into individual characters with spans
    textToType.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        textToType.appendChild(span);
    });
    
    // Mark the first character as active
    textToType.querySelector('span').classList.add('active');
    
    // Reset variables
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    timeLeft = currentTimeLimitSeconds;
    errorChars = {};
    
    // Update the timer display
    timerElement.innerText = timeLeft + 's';
    countdownElement.innerText = timeLeft;
    
    // Reset progress bar
    progressBar.style.width = '0%';
    
    // Clear input area
    inputArea.value = '';
    
    // Disable input area until start
    inputArea.disabled = true;
    
    // Hide result box
    resultBox.style.display = 'none';
    
    // Reset stats
    wpmElement.innerText = '0';
    cpmElement.innerText = '0';
    accuracyElement.innerText = '0%';
    
    // Disable practice errors button
    practiceErrorsBtn.disabled = true;
};

// Start the typing test
const startTest = () => {
    // Enable input area and focus it
    inputArea.disabled = false;
    inputArea.focus();
    
    // Set isTyping flag to true
    isTyping = true;
    
    // Start timer
    startTime = new Date().getTime();
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.innerText = timeLeft + 's';
            countdownElement.innerText = timeLeft;
            
            // Update progress bar
            const progress = (currentTimeLimitSeconds - timeLeft) / currentTimeLimitSeconds * 100;
            progressBar.style.width = progress + '%';
            
            // Calculate and update stats while typing
            calculateStats();
        } else {
            // Time's up
            finishTest();
        }
    }, 1000);
    
    // Hide start button, show reset button
    startBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
};

// Reset the typing test
const resetTest = () => {
    // Clear interval
    clearInterval(timer);
    
    // Reset variables
    loadTextSample();
    
    // Show start button, hide reset button
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';
};

// Finish the typing test
const finishTest = () => {
    // Stop the timer
    clearInterval(timer);
    
    // Set isTyping flag to false
    isTyping = false;
    
    // Disable input area
    inputArea.disabled = true;
    
    // Calculate final stats
    const finalStats = calculateStats();
    
    // Update result box
    resultWpm.innerText = finalStats.wpm;
    resultCpm.innerText = finalStats.cpm;
    resultAccuracy.innerText = finalStats.accuracy + '%';
    resultErrors.innerText = (100 - finalStats.accuracy).toFixed(1) + '%';
    
    // Display error analysis
    displayErrorAnalysis();
    
    // Show result box
    resultBox.style.display = 'block';
    
    // Enable practice errors button if there were errors
    if (Object.keys(errorChars).length > 0) {
        practiceErrorsBtn.disabled = false;
    }
    
    // Update user profile
    updateProfile(finalStats);
    
    // Save test history
    saveTestHistory(finalStats);
    
    // Check for badges
    checkForBadges(finalStats);
};

// Calculate typing statistics
const calculateStats = () => {
    const currentTime = new Date().getTime();
    const elapsedTimeMinutes = (currentTime - startTime) / 60000; // Convert to minutes
    
    // Words per minute (assuming 5 characters = 1 word)
    const typedCharacters = charIndex - mistakes;
    const wpm = Math.round((typedCharacters / 5) / elapsedTimeMinutes) || 0;
    
    // Characters per minute
    const cpm = Math.round(typedCharacters / elapsedTimeMinutes) || 0;
    
    // Accuracy
    const accuracy = charIndex > 0 ? Math.round(((charIndex - mistakes) / charIndex) * 100) : 0;
    
    // Update display
    wpmElement.innerText = wpm;
    cpmElement.innerText = cpm;
    accuracyElement.innerText = accuracy + '%';
    
    return { wpm, cpm, accuracy };
};

// Display error analysis
const displayErrorAnalysis = () => {
    errorList.innerHTML = '';
    
    // Sort errors by count (descending)
    const sortedErrors = Object.entries(errorChars)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Show top 5 errors
    
    if (sortedErrors.length === 0) {
        errorList.innerHTML = '<p>No errors! Perfect typing!</p>';
        return;
    }
    
    sortedErrors.forEach(([char, count]) => {
        const errorElem = document.createElement('div');
        errorElem.className = 'error-char';
        errorElem.innerHTML = `
            ${char}
            <span class="error-count">${count}x</span>
        `;
        errorList.appendChild(errorElem);
    });
};

// Practice error keys
const practiceErrorKeys = () => {
    if (Object.keys(errorChars).length === 0) return;
    
    // Create a practice text containing problem characters
    const errorKeys = Object.keys(errorChars);
    let practiceText = '';
    
    // Generate practice text with error characters
    for (let i = 0; i < 10; i++) { // Generate 10 practice words
        let word = '';
        for (let j = 0; j < 5; j++) { // Each word has 5 characters
            // 70% chance to use an error character, 30% chance for a random one
            if (Math.random() < 0.7) {
                const randomErrorIndex = Math.floor(Math.random() * errorKeys.length);
                word += errorKeys[randomErrorIndex];
            } else {
                const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase letter
                word += randomChar;
            }
        }
        practiceText += word + ' ';
    }
    
    // Update text to type
    textToType.innerHTML = '';
    practiceText.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        textToType.appendChild(span);
    });
    
    // Mark the first character as active
    textToType.querySelector('span').classList.add('active');
    
    // Reset variables
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    timeLeft = 30; // Shorter time for practice
    errorChars = {};
    
    // Update the timer display
    timerElement.innerText = timeLeft + 's';
    countdownElement.innerText = timeLeft;
    
    // Reset progress bar
    progressBar.style.width = '0%';
    
    // Clear input area
    inputArea.value = '';
    
    // Enable input area for immediate start
    inputArea.disabled = false;
    inputArea.focus();
    
    // Set isTyping flag to true
    isTyping = true;
    
    // Start timer
    startTime = new Date().getTime();
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.innerText = timeLeft + 's';
            countdownElement.innerText = timeLeft;
            
            // Update progress bar
            const progress = (30 - timeLeft) / 30 * 100;
            progressBar.style.width = progress + '%';
            
            // Calculate and update stats while typing
            calculateStats();
        } else {
            // Time's up for practice
            finishTest();
        }
    }, 1000);
};

// Update user profile with test results
const updateProfile = (stats) => {
    userProfile.testsCompleted++;
    userProfile.totalWpm += stats.wpm;
    userProfile.totalAccuracy += stats.accuracy;
    
    // Update best WPM
    if (stats.wpm > userProfile.bestWpm) {
        userProfile.bestWpm = stats.wpm;
    }
    
    // Calculate averages
    const avgWpmValue = Math.round(userProfile.totalWpm / userProfile.testsCompleted);
    const avgAccuracyValue = Math.round(userProfile.totalAccuracy / userProfile.testsCompleted);
    
    // Add XP based on performance
    const baseXP = 10;
    const wpmBonus = Math.floor(stats.wpm / 10);
    const accuracyBonus = Math.floor(stats.accuracy / 10);
    const earnedXP = baseXP + wpmBonus + accuracyBonus;
    
    userProfile.xp += earnedXP;
    
    // Check for level up
    checkLevelUp();
    
    // Update profile display
    testsCompleted.innerText = userProfile.testsCompleted;
    bestWpm.innerText = userProfile.bestWpm;
    avgWpm.innerText = avgWpmValue;
    avgAccuracy.innerText = avgAccuracyValue + '%';
    
    // Update level progress bar
    const progressPercent = (userProfile.xp / userProfile.nextLevelXp) * 100;
    levelProgress.style.width = progressPercent + '%';
    
    // Update level display
    currentLevel.innerText = `Lvl ${userProfile.level}`;
    nextLevel.innerText = `Lvl ${userProfile.level + 1}`;
    
    // Save profile
    saveUserProfile();
};

// Check for level up
const checkLevelUp = () => {
    if (userProfile.xp >= userProfile.nextLevelXp) {
        userProfile.level++;
        userProfile.xp -= userProfile.nextLevelXp;
        userProfile.nextLevelXp = Math.round(userProfile.nextLevelXp * 1.5); // Increase XP needed for next level
        
        // Show level up notification
        const levelUpNotification = document.createElement('div');
        levelUpNotification.className = 'level-up-notification';
        levelUpNotification.innerHTML = `<span>Level Up! You're now level ${userProfile.level}</span>`;
        document.body.appendChild(levelUpNotification);
        
        // Remove notification after animation
        setTimeout(() => {
            levelUpNotification.remove();
        }, 3000);
        
        // Check if we need to level up again
        checkLevelUp();
    }
};

// Check for badges
const checkForBadges = (stats) => {
    const badges = [];
    
    // Speed Demon badge
    if (stats.wpm >= 100 && !userProfile.badges.includes('speed-demon')) {
        badges.push('speed-demon');
    }
    
    // Accuracy King badge
    if (stats.accuracy === 100 && !userProfile.badges.includes('accuracy-king')) {
        badges.push('accuracy-king');
    }
    
    // Marathon Typer badge
    if (userProfile.testsCompleted >= 10 && !userProfile.badges.includes('marathon-typer')) {
        badges.push('marathon-typer');
    }
    
    // Consistent badge - check if last 5 tests have 90%+ accuracy
    if (testHistory.length >= 5) {
        const last5Tests = testHistory.slice(-5);
        const allAccurate = last5Tests.every(test => test.accuracy >= 90);
        if (allAccurate && !userProfile.badges.includes('consistent')) {
            badges.push('consistent');
        }
    }
    
    // Early Bird badge
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 9 && !userProfile.badges.includes('early-bird')) {
        badges.push('early-bird');
    }
    
    // Night Owl badge
    if ((currentHour >= 0 && currentHour < 5) || currentHour >= 22 && !userProfile.badges.includes('night-owl')) {
        badges.push('night-owl');
    }
    
    // Add new badges to user profile
    if (badges.length > 0) {
        userProfile.badges = [...new Set([...userProfile.badges, ...badges])];
        saveUserProfile();
        
        // Show badge notifications
        badges.forEach(badge => {
            showBadgeNotification(badge);
            
            // Update badge display in profile
            const badgeElement = document.querySelector(`.badge[data-badge="${badge}"]`);
            if (badgeElement) {
                badgeElement.classList.add('earned');
            }
        });
    }
};

// Show badge notification
const showBadgeNotification = (badge) => {
    const badgeData = {
        'speed-demon': { icon: '🚀', title: 'Speed Demon', description: 'Achieved 100+ WPM' },
        'accuracy-king': { icon: '🎯', title: 'Accuracy King', description: '100% accuracy in a test' },
        'marathon-typer': { icon: '🏃', title: 'Marathon Typer', description: 'Completed 10 tests' },
        'consistent': { icon: '📊', title: 'Consistent', description: '5 tests with 90%+ accuracy' },
        'early-bird': { icon: '🌅', title: 'Early Bird', description: 'First test of the day' },
        'night-owl': { icon: '🦉', title: 'Night Owl', description: 'Test after midnight' }
    };
    
    const { icon, title, description } = badgeData[badge];
    
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div class="badge-icon">${icon}</div>
        <div class="badge-info">
            <div class="badge-title">New Badge: ${title}</div>
            <div class="badge-description">${description}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add XP for new badge
    userProfile.xp += 50;
    checkLevelUp();
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 4000);
};

// Save test history
const saveTestHistory = (stats) => {
    const testData = {
        date: new Date().toISOString(),
        wpm: stats.wpm,
        cpm: stats.cpm,
        accuracy: stats.accuracy,
        textType: currentTextType,
        difficulty: currentDifficulty
    };
    
    testHistory.push(testData);
    
    // Keep only last 100 tests
    if (testHistory.length > 100) {
        testHistory = testHistory.slice(-100);
    }
    
    // Save to local storage
    localStorage.setItem('typemaster_history', JSON.stringify(testHistory));
    
    // Update heat map
    updateHeatMap();
};

// Update keyboard heat map
const updateHeatMap = () => {
    // Reset all cells
    const heatCells = document.querySelectorAll('.heat-cell');
    
    // Count character frequencies
    const charFrequency = {};
    let maxFrequency = 0;
    
    Object.entries(errorChars).forEach(([char, count]) => {
        const lowerChar = char.toLowerCase();
        if (/[a-z0-9]/.test(lowerChar)) {
            charFrequency[lowerChar] = (charFrequency[lowerChar] || 0) + count;
            maxFrequency = Math.max(maxFrequency, charFrequency[lowerChar]);
        }
    });
    
    // Update heat map cells
    heatCells.forEach(cell => {
        const char = cell.textContent.toLowerCase();
        if (charFrequency[char]) {
            const intensity = charFrequency[char] / maxFrequency;
            cell.style.backgroundColor = `rgba(255, 0, 0, ${intensity.toFixed(2)})`;
        } else {
            cell.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
        }
    });
};

// Handle keyboard input
const handleInput = (e) => {
    if (!isTyping) return;
    
    const chars = textToType.querySelectorAll('span');
    const typedChar = e.target.value.charAt(charIndex);
    
    if (typedChar) {
        // Check if the typed character matches the expected character
        if (typedChar === chars[charIndex].innerText) {
            // Correct character
            chars[charIndex].classList.remove('active');
            chars[charIndex].classList.add('correct');
            
            // Highlight next character if available
            if (charIndex < chars.length - 1) {
                chars[charIndex + 1].classList.add('active');
            }
            
            // Highlight matching key on virtual keyboard
            highlightKey(chars[charIndex].innerText);
            
            // Play correct sound if enabled
            if (soundEffectsEnabled) {
                playSound('correct');
            }
        } else {
            // Incorrect character
            chars[charIndex].classList.remove('active');
            chars[charIndex].classList.add('incorrect');
            
            // Highlight next character if available
            if (charIndex < chars.length - 1) {
                chars[charIndex + 1].classList.add('active');
            }
            
            // Track error character
            const expectedChar = chars[charIndex].innerText;
            errorChars[expectedChar] = (errorChars[expectedChar] || 0) + 1;
            
            // Increment mistakes
            mistakes++;
            
            // Highlight incorrect key on virtual keyboard
            highlightKey(chars[charIndex].innerText, true);
            
            // Play error sound if enabled
            if (soundEffectsEnabled) {
                playSound('error');
            }
        }
        
        charIndex++;
        totalKeystrokes++;
        
        // If all characters are typed, finish the test
        if (charIndex === chars.length) {
            finishTest();
        }
    }
};

// Highlight key on virtual keyboard
const highlightKey = (char, isError = false) => {
    // Convert special characters
    const keyMap = {
        ' ': 'Space',
        '.': '.',
        ',': ',',
        '/': '/',
        ';': ';',
        '\'': '\'',
        '\\': '\\',
        '[': '[',
        ']': ']',
        '-': '-',
        '=': '='
    };
    
    const keySelector = keyMap[char] ? 
        `.key[data-key="${keyMap[char]}"]` : 
        `.key[data-key="${char.toLowerCase()}"]`;
    
    const keyElement = document.querySelector(keySelector);
    
    if (keyElement) {
        // Remove any existing highlights
        keys.forEach(key => {
            key.classList.remove('active-key');
            key.classList.remove('error-key');
        });
        
        // Add appropriate class
        if (isError) {
            keyElement.classList.add('error-key');
        } else {
            keyElement.classList.add('active-key');
        }
        
        // Remove highlight after a short delay
        setTimeout(() => {
            keyElement.classList.remove('active-key');
            keyElement.classList.remove('error-key');
        }, 200);
    }
};

// Play sound effects
const playSound = (type) => {
    if (!soundEffectsEnabled) return;
    
    const sound = new Audio();
    if (type === 'correct') {
        sound.src = 'sounds/key-press.mp3';
    } else if (type === 'error') {
        sound.src = 'sounds/error.mp3';
    }
    
    sound.volume = 0.3;
    sound.play();
};

// Save settings to local storage
const saveSettings = () => {
    const settings = {
        timeLimit: currentTimeLimitSeconds,
        textType: currentTextType,
        difficulty: currentDifficulty,
        soundEffects: soundEffectsEnabled
    };
    
    localStorage.setItem('typemaster_settings', JSON.stringify(settings));
};

// Load settings from local storage
const loadSettings = () => {
    const savedSettings = localStorage.getItem('typemaster_settings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        currentTimeLimitSeconds = settings.timeLimit || 60;
        currentTextType = settings.textType || 'random';
        currentDifficulty = settings.difficulty || 'medium';
        soundEffectsEnabled = settings.soundEffects !== undefined ? settings.soundEffects : true;
        
        // Update settings form
        timeLimit.value = currentTimeLimitSeconds;
        textType.value = currentTextType;
        difficultyLevel.value = currentDifficulty;
        soundEffects.value = soundEffectsEnabled ? 'on' : 'off';
    }
};

// Save user profile to local storage
const saveUserProfile = () => {
    localStorage.setItem('typemaster_profile', JSON.stringify(userProfile));
};

// Load user profile from local storage
const loadUserProfile = () => {
    const savedProfile = localStorage.getItem('typemaster_profile');
    
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
    } else {
        // Default profile for new users
        userProfile = {
            testsCompleted: 0,
            bestWpm: 0,
            totalWpm: 0,
            totalAccuracy: 0,
            level: 1,
            xp: 0,
            nextLevelXp: 100,
            badges: []
        };
    }
    
    // Load test history
    const savedHistory = localStorage.getItem('typemaster_history');
    if (savedHistory) {
        testHistory = JSON.parse(savedHistory);
    }
    
    // Update profile display
    testsCompleted.innerText = userProfile.testsCompleted;
    bestWpm.innerText = userProfile.bestWpm;
    
    const avgWpmValue = userProfile.testsCompleted > 0 ? 
        Math.round(userProfile.totalWpm / userProfile.testsCompleted) : 0;
    
    const avgAccuracyValue = userProfile.testsCompleted > 0 ? 
        Math.round(userProfile.totalAccuracy / userProfile.testsCompleted) : 0;
    
    avgWpm.innerText = avgWpmValue;
    avgAccuracy.innerText = avgAccuracyValue + '%';
    
    // Update level display
    currentLevel.innerText = `Lvl ${userProfile.level}`;
    nextLevel.innerText = `Lvl ${userProfile.level + 1}`;
    
    // Update level progress bar
    const progressPercent = (userProfile.xp / userProfile.nextLevelXp) * 100;
    levelProgress.style.width = progressPercent + '%';
    
    // Update badges display
    userProfile.badges.forEach(badge => {
        const badgeElement = document.querySelector(`.badge[data-badge="${badge}"]`);
        if (badgeElement) {
            badgeElement.classList.add('earned');
        }
    });
};

// Toggle dark/light theme
const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('typemaster_theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
};

// Load theme preference
const loadTheme = () => {
    const savedTheme = localStorage.getItem('typemaster_theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    init();
    loadTheme();
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Start button
    startBtn.addEventListener('click', startTest);
    
    // Reset button
    resetBtn.addEventListener('click', resetTest);
    
    // Input handling for typing
    inputArea.addEventListener('input', handleInput);
    
    // Show/hide keyboard
    showKeyboardBtn.addEventListener('click', () => {
        keyboardContainer.style.display = keyboardContainer.style.display === 'none' ? 'block' : 'none';
        showKeyboardBtn.textContent = keyboardContainer.style.display === 'none' ? 'Show Keyboard' : 'Hide Keyboard';
    });
    
    // Practice errors button
    practiceErrorsBtn.addEventListener('click', practiceErrorKeys);
    
    // Settings button
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });
    
    // Close settings modal
    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
    
    // Save settings
    saveSettingsBtn.addEventListener('click', () => {
        currentTimeLimitSeconds = parseInt(timeLimit.value);
        currentTextType = textType.value;
        currentDifficulty = difficultyLevel.value;
        soundEffectsEnabled = soundEffects.value === 'on';
        
        // Save settings and reload text sample
        saveSettings();
        loadTextSample();
        
        // Close modal
        settingsModal.style.display = 'none';
    });
    
    // Profile button
    profileBtn.addEventListener('click', () => {
        profileModal.style.display = 'block';
    });

    // clear profile button
document.getElementById('clearProfileBtn').addEventListener('click', () => {
    localStorage.removeItem('typemaster_profile');
    localStorage.removeItem('typemaster_history');
    userProfile = {
      testsCompleted: 0,
      bestWpm: 0,
      totalWpm: 0,
      totalAccuracy: 0,
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      badges: []
    };
    testHistory = [];
    loadUserProfile();
    loadTextSample();
  });
    
    // Close profile modal
    closeProfileBtn.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
    
    // Keyboard events for virtual keyboard animation
    window.addEventListener('keydown', (e) => {
        const key = e.key;
        let keyElement;
        
        if (key === ' ') {
            keyElement = document.querySelector('.key[data-key=" "]');
        } else if (key === 'Backspace') {
            keyElement = document.querySelector('.key[data-key="Backspace"]');
        } else if (key === 'Shift') {
            keyElement = document.querySelector('.key[data-key="Shift"]');
        } else if (key === 'CapsLock') {
            keyElement = document.querySelector('.key[data-key="CapsLock"]');
        } else if (key === 'Tab') {
            keyElement = document.querySelector('.key[data-key="Tab"]');
        } else if (key === 'Enter') {
            keyElement = document.querySelector('.key[data-key="Enter"]');
        } else {
            keyElement = document.querySelector(`.key[data-key="${key.toLowerCase()}"]`);
        }
        
        if (keyElement) {
            keyElement.classList.add('pressed');
        }
    });
    
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        let keyElement;
        
        if (key === ' ') {
            keyElement = document.querySelector('.key[data-key=" "]');
        } else if (key === 'Backspace') {
            keyElement = document.querySelector('.key[data-key="Backspace"]');
        } else if (key === 'Shift') {
            keyElement = document.querySelector('.key[data-key="Shift"]');
        } else if (key === 'CapsLock') {
            keyElement = document.querySelector('.key[data-key="CapsLock"]');
        } else if (key === 'Tab') {
            keyElement = document.querySelector('.key[data-key="Tab"]');
        } else if (key === 'Enter') {
            keyElement = document.querySelector('.key[data-key="Enter"]');
        } else {
            keyElement = document.querySelector(`.key[data-key="${key.toLowerCase()}"]`);
        }
        
        if (keyElement) {
            keyElement.classList.remove('pressed');
        }
    });
    
    // Challenge buttons
    const challengeBtns = document.querySelectorAll('.challenge-btn');
    challengeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const challengeCard = btn.closest('.challenge-card');
            const challengeTitle = challengeCard.querySelector('.challenge-title').textContent;
            
            // Set up specific challenge parameters
            if (challengeTitle === 'Speed Burst') {
                currentTimeLimitSeconds = 30;
                currentTextType = 'random';
            } else if (challengeTitle === 'Perfectionist') {
                currentTimeLimitSeconds = 60;
                currentTextType = 'quotes';
            } else if (challengeTitle === 'Code Master') {
                currentTimeLimitSeconds = 120;
                currentTextType = 'code';
            }
            
            // Close profile modal
            profileModal.style.display = 'none';
            
            // Load text sample and prepare test
            loadTextSample();
            
            // Focus on the app
            window.scrollTo(0, 0);
        });
    });
});