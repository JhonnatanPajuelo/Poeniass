const messages = [
    "Tu sonrisa ilumina mi vida",
    "Contigo, cada momento es especial",
    "Eres mi sol en un día nublado",
    "Te amo mucho Valeria",
    "Cada día contigo es un regalo",
    "Eres el sueño que nunca quiero dejar de vivir",
    "Cada momento contigo es un capítulo hermoso en nuestra historia",
    "Espero te guste esto, todo lo hago para ti"
];

const messageElement = document.getElementById('message');
const specialButton = document.getElementById('specialButton');
const flowerMessage = document.getElementById('flowerMessage');
const heartsContainer = document.getElementById('heartsContainer');

let currentMessageIndex = 0;
let typingTimeout;
let clickCount = 0;

function typeMessage(message, index = 0) {
    if (messageElement && index < message.length) {
        messageElement.textContent += message.charAt(index);
        typingTimeout = setTimeout(() => typeMessage(message, index + 1), 50);
    }
}

function showNextMessage() {
    if (messageElement) {
        clearTimeout(typingTimeout);
        messageElement.textContent = '';
        typeMessage(messages[currentMessageIndex]);
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    }
}

function createPeony() {
    const peony = document.createElement('img');
    peony.src = 'poenia.jpeg'; // Asegúrate de que esta ruta sea correcta
    peony.alt = 'Peonia';
    peony.className = 'peony';
    peony.style.left = `${Math.random() * window.innerWidth}px`;
    peony.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(peony);

    gsap.to(peony, {
        opacity: 1,
        duration: 0.5,
        y: -100,
        rotation: Math.random() * 360,
        onComplete: () => {
            gsap.to(peony, {
                opacity: 0,
                duration: 0.5,
                delay: 2,
                onComplete: () => peony.remove()
            });
        }
    });
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${Math.random() * window.innerHeight}px`;
    heartsContainer.appendChild(heart);

    gsap.to(heart, {
        scale: 2,
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
            gsap.to(heart, {
                scale: 1,
                opacity: 0,
                duration: 0.5,
                onComplete: () => heart.remove()
            });
        }
    });
}

function handleSpecialClick() {
    if (clickCount === 0) {
        flowerMessage.textContent = "🌺🌺 Una poenia para otra poenia 🌺🌺";
        flowerMessage.style.opacity = 1;
        setTimeout(() => {
            flowerMessage.style.opacity = 0;
            setTimeout(() => {
                flowerMessage.textContent = "❤️ Con todo mi amor para ti, Valeria ❤️";
                flowerMessage.style.opacity = 1;
            }, 20000); // Mostrar la segunda frase después de 20 segundos

            setTimeout(() => {
                flowerMessage.style.opacity = 0;
            }, 40000); // Ocultar la segunda frase después de 20 segundos
        }, 20000); // Mostrar la primera frase por 20 segundos

        setTimeout(() => {
            flowerMessage.textContent = "🌺🌺 Una poenia para otra poenia 🌺🌺";
            flowerMessage.style.opacity = 1;
        }, 60000); // Volver a la primera frase después de 20 segundos de descanso
    }

    showNextMessage();
    for (let i = 0; i < 3; i++) {
        setTimeout(createPeony, i * 200);
        setTimeout(createHeart, i * 300);
    }
    clickCount++;
}

if (specialButton) {
    specialButton.addEventListener('click', handleSpecialClick);
}

// Mensaje inicial
showNextMessage();
