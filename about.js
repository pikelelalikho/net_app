//about section typing effect

 const textElement = document.getElementById("typing-text");
    const text = `I began my journey by earning my National Senior Certificate, followed by completing Cybersecurity Fundamentals and Cybersecurity Defence Toolbox training with Digital Regenesys, where I gained a strong foundation in both theoretical and practical aspects of cybersecurity. It was during this time I was introduced to coding, learning that understanding scripts and reading lines of code would be essential for effective auditing and even developing custom cybersecurity tools in the future. This sparked my interest in programming, leading me to teach myself web development alongside my cybersecurity studies. I further strengthened my practical skills through an intensive internship in Incident Response and Digital Forensics at the Center for Cyber Security Studies and Research, gaining hands-on experience in network analysis, vulnerability assessments, and real-world threat response. To expand my AI and automation understanding, I joined the CAPACITI AI Bootcamp, aligning AI concepts with cybersecurity problem-solving. As I continue growing in this field, I am committed to earning the Certified Ethical Hacker (CEH) certification to deepen my practical skills and contribute meaningfully to the cybersecurity community.`;
    
    let index = 0;
    let deleting = false;

    function typeLoop() {
      if (!deleting && index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeLoop, 30);
      } else if (!deleting && index === text.length) {
        // Wait 3 seconds before deleting
        setTimeout(() => { 
          deleting = true; 
          typeLoop(); 
        }, 3000);
      } else if (deleting && index > 0) {
        textElement.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(typeLoop, 10);
      } else {
        deleting = false;
        index = 0;
        setTimeout(typeLoop, 1000); // Restart loop
      }
    }

    // Start typing animation
    typeLoop();

    document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".navbar-info h1, .navbar-info .navbar-subtitle");
  elements.forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight; // trigger reflow
    el.style.animation = "";
  });
});