// CACHE DOM ELEMENTS
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const ambient = document.querySelector(".ambient-light");
const progressBar = document.querySelector(".progress-bar");
const navbar = document.querySelector(".navbar");
const navCenter = document.querySelector(".nav-center");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");


// -----------------------------
// CUSTOM CURSOR (SMOOTH)
// -----------------------------
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  if (cursor && follower) {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    follower.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
  }

  if (ambient) {
    ambient.style.transform = `translate(${mouseX - 300}px, ${mouseY - 300}px)`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();


// -----------------------------
// MAGNETIC EFFECT
// -----------------------------
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


// -----------------------------
// NAV PILL HOVER
// -----------------------------
navLinks.forEach(link => {

  link.addEventListener("mouseenter", e => {

    if (!navCenter) return;

    const rect = e.target.getBoundingClientRect();
    const parentRect = navCenter.getBoundingClientRect();

    navCenter.style.setProperty("--pill-left", rect.left - parentRect.left + "px");
    navCenter.style.setProperty("--pill-width", rect.width + "px");

    navCenter.classList.add("pill-active");

  });

});

if (navCenter) {
  navCenter.addEventListener("mouseleave", () => {
    navCenter.classList.remove("pill-active");
  });
}


// -----------------------------
// HORIZONTAL DRAG
// -----------------------------
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

  slider.addEventListener("mouseleave", () => isDown = false);
  slider.addEventListener("mouseup", () => isDown = false);

  slider.addEventListener("mousemove", e => {

    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;

    slider.scrollLeft = scrollLeft - (x - startX) * 2;

  });

}

// -----------------------------
// HERO PARALLAX
// -----------------------------
const heroSection = document.querySelector("#home");
const heroImg = document.querySelector(".hero-img");
const heroLeft = document.querySelector(".hero-left");

if (heroSection && heroImg && heroLeft) {

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


// -----------------------------
// INITIAL SECTION STYLE
// -----------------------------
sections.forEach(section => {

  section.style.opacity = 0;
  section.style.transform = "translateY(60px)";

});


// -----------------------------
// SINGLE OPTIMIZED SCROLL LISTENER
// -----------------------------
let ticking = false;

window.addEventListener("scroll", () => {

  if (!ticking) {

    window.requestAnimationFrame(() => {

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // progress bar
      if (progressBar) {
        progressBar.style.width = (scrollTop / scrollHeight) * 100 + "%";
      }

      // navbar shrink
      if (navbar) {
        if (window.scrollY > 80) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }

      // active nav
      let current = "";

      sections.forEach(section => {

        if (scrollY >= section.offsetTop - 50) {
          current = section.id;
        }

        // reveal
        if (section.getBoundingClientRect().top < window.innerHeight * 0.75) {

          section.style.opacity = 1;
          section.style.transform = "translateY(0)";

        }

      });

      navLinks.forEach(link => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + current
        );

      });

      ticking = false;

    });

    ticking = true;

  }

});


// -----------------------------
// LOADER SCREEN
// -----------------------------
window.addEventListener("load", () => {

  const loader = document.querySelector(".loader");
  const customCursor = document.querySelector(".custom-cursor");

  // disable cursor during loader
  document.body.style.cursor = "auto";
  if (customCursor) customCursor.style.display = "none";

  // FORCE PAGE TO START AT TOP
  window.scrollTo(0, 0);

  setTimeout(() => {

    if (loader) {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
    }

    // enable custom cursor
    document.body.style.cursor = "none";
    if (customCursor) customCursor.style.display = "block";

    // ensure hero section is visible
    const hero = document.querySelector("#home");
    if (hero) {
      hero.scrollIntoView({ behavior: "instant" });
    }

  }, 1200);

});


// -----------------------------
// INTRO OVERLAY
// -----------------------------
const intro = document.querySelector(".intro-overlay");
const enterBtn = document.querySelector(".enter-btn");

if (enterBtn && intro) {

  enterBtn.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {

      intro.style.display = "none";

    }, 1000);

  });

}


// -----------------------------
// PARTICLE CANVAS
// -----------------------------
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

  // -----------------------------
// achievements hover
// -----------------------------
const achievementItems = document.querySelectorAll(".achievement-list li");
const previewImage = document.getElementById("achievementImage");

if(previewImage){

achievementItems.forEach(item=>{

item.addEventListener("mouseenter",()=>{

const preview=item.getAttribute("data-preview");

previewImage.src=preview;
previewImage.style.display="block";

});

item.addEventListener("mouseleave",()=>{

previewImage.style.display="none";

});

});

}
}