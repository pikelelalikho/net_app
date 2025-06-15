// Toggle navigation menu
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
  }

  // Hide menu near bottom of page
  window.addEventListener("scroll", function () {
    const menu = document.getElementById("menu");
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    if (distanceFromBottom < 100) {
      menu.classList.remove("show");
    }
  });

  // ✅ Toggle chatbot window (add this function)
  function toggleChat() {
    const chat = document.getElementById('chatContainer');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
  }