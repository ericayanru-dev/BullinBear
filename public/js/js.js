// 🎮 THEME TOGGLE SYSTEM

const themeBtn = document.getElementById("theme");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light");
  themeBtn.innerHTML = '<i class="fa fa-sun-o"></i>';
}

// Toggle theme
themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  const isLight = body.classList.contains("light");

  // Save preference
  localStorage.setItem("theme", isLight ? "light" : "dark");

  // Change icon
  themeBtn.innerHTML = isLight
    ? '<i class="fa fa-sun-o"></i>'
    : '<i class="fa fa-moon-o"></i>';
});

// highlight clicked nav
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".sidebar a").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    ripple.style.left = e.offsetX + "px";
    ripple.style.top = e.offsetY + "px";

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 500);
  });
});

// ===== SELECT ELEMENTS =====
const menuBtn = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll(".sidebar a");

// ===== TOGGLE SIDEBAR =====
function toggleSidebar() {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

// ===== OPEN =====
function openSidebar() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
}

// ===== CLOSE =====
function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// ===== MENU BUTTON CLICK =====
if (menuBtn && sidebar && overlay) {
  menuBtn.addEventListener("click", toggleSidebar);

  overlay.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
}

// ===== CLICK OUTSIDE (OVERLAY) =====
overlay.addEventListener("click", closeSidebar);

// ===== CLOSE WHEN LINK CLICKED (MOBILE UX) =====
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 900) {
      closeSidebar();
    }
  });
});

// ===== CLOSE WITH ESC KEY =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSidebar();
  }
});

// ===== SAFETY: RESET ON RESIZE =====
window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) {
    // ensure sidebar is visible properly on desktop
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
});