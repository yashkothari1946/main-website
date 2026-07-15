// JavaScript for WhatsApp button functionality
document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.querySelector(".whatsapp-button");
  const chatBox = document.querySelector(".chat-box");
  const closeButton = document.querySelector(".close-button");
  const notification = document.querySelector(".notification");
  const sendButton = document.querySelector(".send-button");
  const chatInput = document.querySelector(".chat-input");

  // Show notification after a delay
  setTimeout(() => {
    notification.classList.add("active");
  }, 3000);

  // Toggle chat box on button click
  whatsappButton.addEventListener("click", function () {
    chatBox.classList.toggle("active");
    notification.classList.remove("active");
  });

  // Close chat box
  closeButton.addEventListener("click", function () {
    chatBox.classList.remove("active");
  });

  // Open WhatsApp on send
  sendButton.addEventListener("click", function () {
    const message = chatInput.value.trim();
    if (message) {
      // Replace with your phone number
      const phoneNumber = "+918000530501";
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    }
  });

  // Also open WhatsApp when pressing Enter in the input
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendButton.click();
    }
  });
});
