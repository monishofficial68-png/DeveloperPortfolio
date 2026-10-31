
// ======================================
// 1. MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close menu after clicking a link

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.innerHTML =
      '<i class="fa-solid fa-bars"></i>';
  });
});


// ======================================
// 2. AUTOMATIC FOOTER YEAR
// ======================================

document.getElementById("year").textContent =
  new Date().getFullYear();


// ======================================
// 3. TYPING ANIMATION
// ======================================

const typingText = document.getElementById("typingText");

const roles = [
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "App Developer",
  "Creative Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function typeEffect() {
  if (reducedMotion) {
    typingText.textContent = roles[0];
    return;
  }

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingText.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typingText.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      deleting = false;

      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();


// ======================================
// 4. SCROLL REVEAL ANIMATION
// ======================================

const revealElements = document.querySelectorAll(
  ".section-heading, .about-card, .skill-card, .project-card, .contact-card"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// ======================================
// 5. ACTIVE NAVIGATION
// ======================================

const sections = document.querySelectorAll(
  "main section[id]"
);

const navigationLinks = document.querySelectorAll(
  "#navLinks a[href^='#']"
);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });
}


// ======================================
// 6. BACK TO TOP BUTTON
// ======================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "instant" : "smooth"
  });
});


// ======================================
// 7. CONSOLE MESSAGE
// ======================================

console.log(
  "%c Welcome to Monish's Developer Portfolio!",
  "color: #54d8ff; font-size: 16px; font-weight: bold;"
);

// ======================================
// STEP 10 - PROJECT DETAILS
// ======================================

// Project information

const projectData = {
  bustrack: {
    category: "TRANSPORTATION WEB APPLICATION",
    title: "BusTrackRecover",
    icon: "fa-bus-simple",

    description:
      "A bus tracking and lost-item recovery platform concept. It helps passengers search for bus information and recover belongings forgotten during travel.",

    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Node.js",
      "MongoDB"
    ],

    features: [
      "Passenger bus search",
      "Live bus location tracking concept",
      "Lost item reporting",
      "Bus information management"
    ],

    github: "",
    live: ""
  },

  eduguard: {
    category: "ARTIFICIAL INTELLIGENCE",
    title: "EduGuard AI",
    icon: "fa-chart-line",

    description:
      "An intelligent student analytics project concept designed to identify students who may need academic support using data-driven insights.",

    technologies: [
      "Python",
      "Machine Learning",
      "Data Analytics",
      "Dashboard"
    ],

    features: [
      "Student performance analysis",
      "Early warning insights",
      "Student risk classification",
      "Analytics dashboard"
    ],

    github: "",
    live: ""
  },

  agrilink: {
    category: "SMART AGRICULTURE",
    title: "AgriLink AI",
    icon: "fa-seedling",

    description:
      "An AI-powered agriculture platform concept exploring crop price prediction, demand forecasting and connections between farmers and buyers.",

    technologies: [
      "Python",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development"
    ],

    features: [
      "Crop price prediction concept",
      "Demand forecasting",
      "Farmer and buyer matching",
      "Agricultural market insights"
    ],

    github: "",
    live: ""
  }
};


// Modal elements

const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalCategory = document.getElementById("modalCategory");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalDescription =
  document.getElementById("modalDescription");

const modalTechnologies =
  document.getElementById("modalTechnologies");

const modalFeatures =
  document.getElementById("modalFeatures");

const modalGithub = document.getElementById("modalGithub");
const modalLive = document.getElementById("modalLive");

let previousFocus = null;


// Open project modal

function openProject(projectId) {
  const project = projectData[projectId];

  if (!project) return;

  previousFocus = document.activeElement;

  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modalIcon.innerHTML =
    `<i class="fa-solid ${project.icon}"></i>`;

  // Display technologies

  modalTechnologies.replaceChildren();

  project.technologies.forEach((technology) => {
    const tag = document.createElement("span");

    tag.textContent = technology;

    modalTechnologies.appendChild(tag);
  });

  // Display project features

  modalFeatures.replaceChildren();

  project.features.forEach((feature) => {
    const item = document.createElement("li");

    item.textContent = feature;

    modalFeatures.appendChild(item);
  });

  // Show links only when real URLs are provided

  modalGithub.hidden = !project.github;
  modalLive.hidden = !project.live;

  if (project.github) {
    modalGithub.href = project.github;
  }

  if (project.live) {
    modalLive.href = project.live;
  }

  // Show modal

  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  modalClose.focus();
}


// Close project modal

function closeProject() {
  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  if (previousFocus) {
    previousFocus.focus();
  }
}


// Project button events

document.querySelectorAll(".view-project").forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.dataset.project;

    openProject(projectId);
  });
});


// Close button

modalClose.addEventListener("click", closeProject);


// Close when clicking outside modal

modalOverlay.addEventListener("click", closeProject);


// Close with Escape key

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    projectModal.classList.contains("active")
  ) {
    closeProject();
  }
});


console.log("Step 10 Project Details loaded successfully!");
// STEP 11 - DARK / LIGHT THEME

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Load saved theme
const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.className = "fa-solid fa-moon";
  themeToggle.setAttribute("aria-label", "Switch to dark mode");
}

// Theme toggle button
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight =
    document.body.classList.contains("light-theme");

  if (isLight) {
    localStorage.setItem("portfolioTheme", "light");
    themeIcon.className = "fa-solid fa-moon";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  } else {
    localStorage.setItem("portfolioTheme", "dark");
    themeIcon.className = "fa-solid fa-sun";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }
});

console.log("Step 11 Theme Toggle loaded successfully!");
// STEP 12 - SCROLL PROGRESS BAR

const scrollProgress =
  document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;

  const scrollHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();

console.log("Step 12 Scroll Progress loaded successfully!");