const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formFeedback = document.getElementById("form-feedback");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Check for empty fields
    if (name === "" || email === "" || message === "") {
        formFeedback.textContent =
            "Please fill in your name, email address, and message.";
        return;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formFeedback.textContent =
            "Please enter a valid email address.";
        return;
    }

    // All validation checks passed
    formFeedback.textContent =
        "Validation successful! Your message is ready, but this demo form does not send messages.";

    contactForm.reset();
});