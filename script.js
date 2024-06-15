document.addEventListener('DOMContentLoaded', function() {
    const fire = document.querySelector('.fire');
    const texts = document.querySelectorAll('.typing-text');
    let currentIndex = 0;
    const typingSpeed = 110; // Time in milliseconds to type each character
    const displayTime = 1500; // Time in milliseconds to display the text before fading out
    const fadeOutTime = 1500; // Time in milliseconds for the text to fade out

    function animateFire() {
        fire.style.transform = `scale(${1 + Math.random() * 0.1})`;
        setTimeout(animateFire, 1000);
    }

    function createSmoke() {
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        const shade = Math.floor(Math.random() * 50); // Darker shades of black
        smoke.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
        smoke.style.setProperty('--swivel', `${(Math.random() - 0.3) * 200}px`); // Adds random left-right movement
        smoke.style.setProperty('--scale', `${Math.random() * 0.5 + 0.3}`); // Random size from 0.5 to 1 times the base size
        smoke.style.width = `${Math.random() * 10 + 10}px`; // Random width from 10px to 30px
        smoke.style.height = smoke.style.width; // Keep it circular
        document.body.appendChild(smoke);

        // Positioning the smoke above the fire
        smoke.style.left = `${fire.getBoundingClientRect().left + fire.offsetWidth / 2}px`;
        smoke.style.top = `${fire.getBoundingClientRect().top}px`;

        // Remove the smoke element after animation to clean up the DOM
        setTimeout(() => {
            smoke.remove();
        }, 4000); // Corresponds to animation duration
    }

    function typeText() {
        texts.forEach((text, index) => {
            text.style.display = 'none'; // Hide all texts initially
        });

        const textElement = texts[currentIndex];
        const text = textElement.getAttribute('data-text');
        textElement.textContent = '';
        textElement.style.display = 'inline-block';
        textElement.style.width = 'auto';
        textElement.style.borderRight = '2px solid white'; // Ensure border-right is visible during typing
        textElement.style.animation = 'none';

        let i = 0;
        function type() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed); // Adjust typing speed here
            } else {
                textElement.style.borderRight = 'none'; // Remove border-right after typing
                setTimeout(() => {
                    textElement.style.animation = `fade-out ${fadeOutTime / 1000}s forwards`;
                    setTimeout(() => {
                        textElement.style.display = 'none';
                        currentIndex = (currentIndex + 1) < texts.length ? currentIndex + 1 : 0;
                        typeText();
                    }, fadeOutTime); // Time for fade-out
                }, displayTime); // Time before fade-out starts
            }
        }
        type();
    }

    animateFire(); // Start the flame animation
    setInterval(createSmoke, 600); // Create a new smoke particle every 600 milliseconds
    typeText(); // Start the text typing animation
});
