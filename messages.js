document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const messagesContainer = document.getElementById("messagesContainer");

    // Handle form submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const plan = document.getElementById("plan").value;
            const maintenance = document.getElementById("maintenance").checked ? "Yes" : "No";
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !plan || !message) {
                return alert("⚠️ Please fill in all required fields!");
            }

            const newMessage = {
                name,
                email,
                phone: phone || "N/A",
                plan,
                maintenance,
                message,
                date: new Date().toLocaleString()
            };

            // Save messages in localStorage
            const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
            existingMessages.push(newMessage);
            localStorage.setItem("messages", JSON.stringify(existingMessages));

            alert("✅ Your message has been submitted!");
            form.reset();
        });
    }

    // If we're on the admin messages page
    if (messagesContainer) {
        const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

        if (storedMessages.length === 0) {
            messagesContainer.innerHTML = `<p>No messages yet.</p>`;
        } else {
            storedMessages.forEach(msg => {
                const card = document.createElement("div");
                card.classList.add("message-card");

                card.innerHTML = `
                    <h3>${msg.name} <span style="color:#0ff;font-size:14px;">(${msg.email})</span></h3>
                    <p><strong>Phone:</strong> ${msg.phone}</p>
                    <p><strong>Plan:</strong> ${msg.plan}</p>
                    <p><strong>Maintenance Plan:</strong> ${msg.maintenance}</p>
                    <p>${msg.message}</p>
                    <small>${msg.date}</small>
                `;
                messagesContainer.appendChild(card);
            });
        }
    }
});
