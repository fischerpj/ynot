/* ----------------------------------------------------------
   Load Utterances with the correct theme
   ---------------------------------------------------------- */
function loadUtterances(theme) {
  const container = document.getElementById("utterances-container");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";

  script.setAttribute("repo", container.dataset.repo);
  script.setAttribute("issue-term", container.dataset.issueTerm);
  script.setAttribute("theme", theme);

  container.appendChild(script);
}

/* ----------------------------------------------------------
   Detect current Quarto theme
   ---------------------------------------------------------- */
function currentTheme() {
  const body = document.querySelector("body");
  return body.classList.contains("quarto-dark")
    ? "bare-minimal-dark"
    : "bare-minimal-light";
}

/* ----------------------------------------------------------
   Initial load
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadUtterances(currentTheme());
});

/* ----------------------------------------------------------
   Reload when Quarto switches theme
   ---------------------------------------------------------- */
window.addEventListener("quarto:themeChanged", () => {
  loadUtterances(currentTheme());
});