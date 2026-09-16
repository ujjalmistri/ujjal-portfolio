const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const backToTop = document.querySelector(".back-to-top");

// Keep the mobile navigation open state and button label in sync.
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "×" : "☰";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

// Convert the skills and project grids into looping, paused-on-hover tracks.
document.querySelectorAll(".skills-grid, .projects-grid").forEach(grid => {
  const cards = [...grid.children];
  const track = document.createElement("div");
  track.className = "card-track";

  cards.forEach(card => track.appendChild(card));
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a").forEach(link => link.setAttribute("tabindex", "-1"));
    track.appendChild(clone);
  });
  grid.appendChild(track);
  grid.classList.add("is-marquee");
});

// Reveal the back-to-top control after the user moves down the page.
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 420);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Prevent placeholder project links from navigating away from the page.
document.querySelectorAll(".project-link").forEach(link => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
      alert("Replace this # link with your real project URL.");
    }
  });
});

// Load Lucide without requiring a separate script tag in the page markup.
const initializeIcons = () => {
  if (window.lucide) {
    lucide.createIcons();
  }
};

if (window.lucide) {
  initializeIcons();
} else {
  const lucideScript = document.createElement("script");
  lucideScript.src = "https://unpkg.com/lucide@latest";
  lucideScript.onload = initializeIcons;
  document.head.appendChild(lucideScript);
}

