const particlesContainer = document.querySelector(".particles");
const colors = ["#ff00ff", "#00ffff", "#ffff00", "#ff0000", "#00ff00", "#ff6600", "#8a2be2", "#00ffea"];

function createParticle() {
    const span = document.createElement("span");
    const size = Math.random() * 12 + 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 12 + 8;
    const left = Math.random() * 100;

    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${left}%`;
    span.style.background = color;
    span.style.boxShadow = `
        0 0 15px ${color},
        0 0 30px ${color},
        0 0 60px ${color},
        0 0 90px ${color}
    `;
    span.style.animationDuration = `${duration}s`;
    span.addEventListener("animationend", () => span.remove());
    particlesContainer.appendChild(span);
}

setInterval(createParticle, 300);

const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

const cards = document.querySelectorAll(".project-card");
cards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * 20;
        const rotateY = ((x - rect.width / 2) / rect.width) * -20;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        const color = card.getAttribute("data-color");
        cursor.style.background = `radial-gradient(circle, ${color}80 0%, transparent 70%)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        cursor.style.background = `radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(255,0,255,0) 70%)`;
    });
});



    const paragraphs = [
        "Hello! I'm Riley, a passionate web developer and designer with a knack for creating stunning and functional websites. With years of experience in the industry, I specialize in building custom solutions that cater to your unique needs.",
        "Whether you're a small business looking to establish an online presence or an individual wanting a personal website, I've got you covered. My goal is to deliver high-quality work that exceeds your expectations.",
        "Feel free to explore my work and let's create something amazing together!"
    ];

    const typingElement = document.getElementById("typing-text");
    const aboutTextContainer = document.querySelector(".about-text");
    const profilePic = document.querySelector(".profile-pic");
    const sectionTitle = document.querySelector(".section-title");

    let currentParagraph = 0;
    let charIndex = 0;
    let typingTimeout;

    function type() {
        if (charIndex < paragraphs[currentParagraph].length) {
            typingElement.textContent += paragraphs[currentParagraph].charAt(charIndex);
            charIndex++;
            typingTimeout = setTimeout(type, 25);
        } else {
            typingTimeout = setTimeout(() => {
                typingElement.textContent += "\n\n";
                currentParagraph++;
                if (currentParagraph < paragraphs.length) {
                    charIndex = 0;
                    type();
                }
            }, 800);
        }
    }

    function startTyping() {
        clearTimeout(typingTimeout);
        typingElement.textContent = "";
        currentParagraph = 0;
        charIndex = 0;
        type();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutTextContainer.classList.add("visible");
                profilePic.classList.add("visible");
                sectionTitle.classList.add("visible");
                startTyping();
            } else {
                aboutTextContainer.classList.remove("visible");
                profilePic.classList.remove("visible");
                sectionTitle.classList.remove("visible");
                clearTimeout(typingTimeout);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(document.getElementById("about"));


