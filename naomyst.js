// CUSTOM CURSOR
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  follower.style.left = e.clientX - 20 + "px";
  follower.style.top = e.clientY - 20 + "px";
});

// MAGNETIC EFFECT
document.querySelectorAll(".magnetic").forEach(item => {
  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0,0)";
  });
});

// SCROLL PROGRESS BAR
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  progressBar.style.width = (scrollTop / scrollHeight) * 100 + "%";
});

// ACTIVE NAV
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");
const navCenter = document.querySelector(".nav-center");

navLinks.forEach(link => {
  link.addEventListener("mouseenter", e => {
    const rect = e.target.getBoundingClientRect();
    const parentRect = navCenter.getBoundingClientRect();

    navCenter.style.setProperty("--pill-left", rect.left - parentRect.left + "px");
    navCenter.style.setProperty("--pill-width", rect.width + "px");

    navCenter.classList.add("pill-active");
  });
});

navCenter.addEventListener("mouseleave", () => {
  navCenter.classList.remove("pill-active");
});

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 50) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});

// SMOOTH REVEAL
sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(60px)";
});

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight * 0.75) {
      section.style.opacity = 1;
      section.style.transform = "translateY(0)";
    }
  });
});

// HORIZONTAL DRAG
const slider = document.querySelector(".horizontal-scroll");

if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => (isDown = false));
  slider.addEventListener("mouseup", () => (isDown = false));

  slider.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 2;
  });
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const cursor = document.querySelector(".custom-cursor");

  // Restore default cursor while loading
  document.body.style.cursor = "auto";

  if (cursor) {
    cursor.style.display = "none";
  }

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    // Activate custom cursor again
    document.body.style.cursor = "none";

    if (cursor) {
      cursor.style.display = "block";
    }
  }, 1200);
});
//shrinks navbar when scrolled
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
  
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
});

//Intro to naomi world
const intro = document.querySelector(".intro-overlay");
const enterBtn = document.querySelector(".enter-btn");

enterBtn.addEventListener("click", () => {
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
  }, 1000);
});

const ambient = document.querySelector(".ambient-light");

// parallax to the profile on landing page
const heroSection = document.querySelector("#home");
const heroImg = document.querySelector(".hero-img");
const heroLeft = document.querySelector(".hero-left");

if (heroSection) {
  heroSection.addEventListener("mousemove", e => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImg.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    heroLeft.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
  });

  heroSection.addEventListener("mouseleave", () => {
    heroImg.style.transform = "translate(0,0) scale(1)";
    heroLeft.style.transform = "translate(0,0)";
  });
}

document.addEventListener("mousemove", e => {
  ambient.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
});

// PARTICLE CANVAS
const canvas = document.getElementById("bgCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speedX: Math.random() - 0.5,
    speedY: Math.random() - 0.5
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      ctx.fillStyle = "rgba(199,0,57,0.7)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });

    requestAnimationFrame(animate);
  }

  animate();
}