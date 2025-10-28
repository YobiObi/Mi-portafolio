// Añadir recomendación con popup accesible
function addRecommendation() {
  const recommendation = document.getElementById("new_recommendation");
  const list = document.getElementById("all_recommendations");
  if (recommendation && recommendation.value && recommendation.value.trim() !== "") {
    const el = document.createElement("div");
    el.className = "recommendation";
    el.innerHTML = `<span>&#8220;</span>${recommendation.value.trim()}<span>&#8221;</span>`;
    list.appendChild(el);
    recommendation.value = "";
    showPopup(true);
  }
}

function showPopup(show) {
  const p = document.getElementById("popup");
  if (!p) return;
  if (show) {
    p.classList.add("show");
    p.setAttribute("aria-hidden", "false");
  } else {
    p.classList.remove("show");
    p.setAttribute("aria-hidden", "true");
  }
}

// Año dinámico en el footer
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menú responsive
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }
});
