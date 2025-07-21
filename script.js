// DOM Elements
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  }
});

// Active navigation link
function setActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Scroll indicator functionality
document.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".skill-category, .service-card, .project-card, .about-main-card, .info-card, .timeline-card, .contact-card"
  );
  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const codeLines = document.querySelectorAll(".code-line");
  const texts = [
    "<developer>",
    "  passion = true;",
    "  innovation = ∞;",
    "</developer>",
  ];

  codeLines.forEach((line, index) => {
    setTimeout(() => {
      typeWriter(line, texts[index], 50);
    }, index * 800);
  });
});

// Parallax effect for floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

// Skills animation on scroll
const skillsSection = document.getElementById("skills");
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !skillsAnimated) {
      const skillItems = document.querySelectorAll(".skill-item");
      skillItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 100);
      });
      skillsAnimated = true;
    }
  });
});

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Contact form animation
function animateContactForm() {
  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 200);
  });
}

// Initialize contact animation when section is visible
const contactSection = document.getElementById("contact");
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateContactForm();
    }
  });
});

if (contactSection) {
  contactObserver.observe(contactSection);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    setActiveNavLink();
  }, 100)
);

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll("section");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease-out";
  revealObserver.observe(el);
});

// Fixed Skills Carousel
class SkillsCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".skill-slide");
    this.indicators = document.querySelectorAll(".indicator");
    this.prevBtn = document.getElementById("skillsPrev");
    this.nextBtn = document.getElementById("skillsNext");
    this.init();
  }

  init() {
    if (!this.prevBtn || !this.nextBtn || this.slides.length === 0) return;

    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    this.addTouchSupport();
  }

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;

    this.slides[this.currentSlide].classList.remove("active");
    this.indicators[this.currentSlide].classList.remove("active");

    this.currentSlide = index;

    this.slides[this.currentSlide].classList.add("active");
    this.indicators[this.currentSlide].classList.add("active");
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  addTouchSupport() {
    const carousel = document.querySelector(".skills-carousel");
    if (!carousel) return;

    let startX = 0;
    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }
}

// Fixed Project Carousel
class ProjectCarousel {
  constructor() {
    this.carousels = {};
    this.init();
  }

  init() {
    const projectImages = document.querySelectorAll(".project-images");
    projectImages.forEach((imageContainer) => {
      const projectId = imageContainer.dataset.project;
      if (!projectId) return;

      this.carousels[projectId] = {
        currentIndex: 0,
        images: imageContainer.querySelectorAll(".project-image"),
        dots: imageContainer.parentElement.querySelectorAll(".dot"),
        autoPlayInterval: null,
      };

      // Add navigation event listeners
      const prevBtn = document.querySelector(
        `[data-project="${projectId}"].prev`
      );
      const nextBtn = document.querySelector(
        `[data-project="${projectId}"].next`
      );

      if (prevBtn)
        prevBtn.addEventListener("click", () => this.prevImage(projectId));
      if (nextBtn)
        nextBtn.addEventListener("click", () => this.nextImage(projectId));

      // Add dot navigation
      this.carousels[projectId].dots.forEach((dot, index) => {
        dot.addEventListener("click", () => this.goToImage(projectId, index));
      });

      // Auto-play for each project
      this.startAutoPlay(projectId);

      // Pause on hover
      const projectCard = imageContainer.closest(".project-card");
      if (projectCard) {
        projectCard.addEventListener("mouseenter", () =>
          this.stopAutoPlay(projectId)
        );
        projectCard.addEventListener("mouseleave", () =>
          this.startAutoPlay(projectId)
        );
      }

      // Touch support
      this.addTouchSupport(projectId, imageContainer);
    });
  }

  goToImage(projectId, index) {
    const carousel = this.carousels[projectId];
    if (!carousel || index < 0 || index >= carousel.images.length) return;

    // Remove active class from current image and dot
    carousel.images[carousel.currentIndex].classList.remove("active");
    carousel.dots[carousel.currentIndex].classList.remove("active");

    // Add prev class for animation
    carousel.images[carousel.currentIndex].classList.add("prev");

    // Update current index
    carousel.currentIndex = index;

    // Add active class to new image and dot
    carousel.images[carousel.currentIndex].classList.add("active");
    carousel.dots[carousel.currentIndex].classList.add("active");

    // Remove prev class after animation
    setTimeout(() => {
      carousel.images.forEach((img) => img.classList.remove("prev"));
    }, 500);
  }

  nextImage(projectId) {
    const carousel = this.carousels[projectId];
    if (!carousel) return;
    const nextIndex = (carousel.currentIndex + 1) % carousel.images.length;
    this.goToImage(projectId, nextIndex);
  }

  prevImage(projectId) {
    const carousel = this.carousels[projectId];
    if (!carousel) return;
    const prevIndex =
      (carousel.currentIndex - 1 + carousel.images.length) %
      carousel.images.length;
    this.goToImage(projectId, prevIndex);
  }

  startAutoPlay(projectId) {
    const carousel = this.carousels[projectId];
    if (!carousel) return;
    if (carousel.autoPlayInterval) {
      clearInterval(carousel.autoPlayInterval);
    }
    carousel.autoPlayInterval = setInterval(() => {
      this.nextImage(projectId);
    }, 4000);
  }

  stopAutoPlay(projectId) {
    const carousel = this.carousels[projectId];
    if (!carousel || !carousel.autoPlayInterval) return;
    clearInterval(carousel.autoPlayInterval);
    carousel.autoPlayInterval = null;
  }

  addTouchSupport(projectId, container) {
    let startX = 0;
    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextImage(projectId);
        } else {
          this.prevImage(projectId);
        }
      }
    });
  }
}

// Particle System for Hero
class ParticleSystem {
  constructor() {
    this.container = document.querySelector(".hero-particles");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.className = "hero-particles";
      const heroSection = document.querySelector(".hero");
      if (heroSection) {
        heroSection.appendChild(this.container);
      }
    }
    this.particles = [];
    this.init();
  }

  init() {
    this.createParticles();
    setInterval(() => this.createParticle(), 3000);
  }

  createParticles() {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => this.createParticle(), i * 300);
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 4 + 6 + "s";
    particle.style.animationDelay = Math.random() * 2 + "s";
    this.container.appendChild(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 10000);
  }
}

// Counter Animation for Stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = Number.parseInt(
      counter.getAttribute("data-target") || counter.textContent
    );
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Image loading with error handling
function handleImageErrors() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      // Create a simple colored rectangle as fallback
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 500, 300);
      gradient.addColorStop(0, "#00ff88");
      gradient.addColorStop(1, "#4ecdc4");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 500, 300);

      // Add text
      ctx.fillStyle = "#0a0a0a";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Proyecto", 250, 140);
      ctx.fillText("Imagen", 250, 170);

      this.src = canvas.toDataURL();
    });

    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particle system
  new ParticleSystem();

  // Initialize carousels
  new SkillsCarousel();
  new ProjectCarousel();

  // Handle image errors
  handleImageErrors();

  // Animate counters when about section is visible
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          aboutObserver.unobserve(entry.target);
        }
      });
    });
    aboutObserver.observe(aboutSection);
  }

  // Add skill item hover effects
  document.querySelectorAll(".skill-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add project button animations
  document.querySelectorAll(".project-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });
    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

console.log("🚀 Portfolio loaded successfully!");
