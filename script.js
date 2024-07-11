document.addEventListener('DOMContentLoaded', function() {
    const fire = document.querySelector('.fire');
    const texts = document.querySelectorAll('.typing-text');
    const permanentTexts = document.querySelectorAll('.permanent-text span');
    const fadeText = document.getElementById('fadeText');
    let currentIndex = 0;
    const typingSpeed = 110; // Time in milliseconds to type each character
    const displayTime = 2000; // Time in milliseconds to display the text before fading out
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
        textElement.style.borderRight = '2px solid gray'; // Ensure border-right is visible during typing
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

    function showFadeText(text) {
        fadeText.style.animation = 'none'; // Reset animation
        fadeText.style.display = 'block';
        fadeText.innerHTML = text; // Use innerHTML to allow HTML content
        fadeText.style.opacity = 0; // Ensure it's hidden before fading in
        fadeText.style.animation = `fade-in 1s forwards`; // Fade in animation
    }

    function createGlitterTrail(startElement, endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;

        const numCircles = 27;
        for (let i = 0; i <= numCircles; i++) {
            setTimeout(() => {
                const circle = document.createElement('div');
                circle.className = 'glitter-circle';
                const progress = i / numCircles;
                const curveX = startX + progress * (endX - startX) + (Math.sin(progress * Math.PI * 2) * 50);
                const curveY = startY + progress * (endY - startY) + (Math.cos(progress * Math.PI * 2) * 30);
                circle.style.left = `${curveX}px`;
                circle.style.top = `${curveY}px`;

                // Set random color between yellow and light gray
                const color = `hsl(${Math.random() * 60}, 100%, 60%)`;
                circle.style.backgroundColor = color;

                document.body.appendChild(circle);

                setTimeout(() => {
                    circle.remove();
                }, 3000); // Remove circle after animation
            }, i * 100); // Delay each circle creation
        }
    }

    permanentTexts.forEach((text, index) => {
        text.style.animationDelay = `${index * .8}s`; // Delay the wave animation for each text
        text.addEventListener('click', () => {
            const predefinedTexts = {
                "About Me": "Hello! My name is Anthony, a rising senior in Highschool with the utmost passion in programming. Every day I am looking to innovate, and make the world better, one program at a time.",
                "Portfolio": 'Click the link to navigate to my <a href="https://github.com/Anfoy?ocid=AID2202669_SEM_Cj0KCQjw8uOWBhDXARIsAOxKJ2GkHWVf14N8cEl5amHuNOhT3qeaPMToKtpyD_ADdBrkW6HRK_B48zMaAhiLEALw_wcB:G:s" target="_blank">GitHub</a>.',
                "Connections": "Email: Anthonydierkes@gmail.com<br>Discord: _anfony_"
            };
            const newText = predefinedTexts[text.textContent] || "";
            if (fadeText.innerHTML !== newText) {
                fadeText.style.animation = `fade-out 1s forwards`;
                setTimeout(() => {
                    showFadeText(newText);
                    createGlitterTrail(text, fadeText); // Add glitter trail on click
                }, 1000); // Wait for fade-out to complete before showing new text
            }
        });
    });

    animateFire(); // Start the flame animation
    setInterval(createSmoke, 600); // Create a new smoke particle every 600 milliseconds
    typeText(); // Start the text typing animation
});
