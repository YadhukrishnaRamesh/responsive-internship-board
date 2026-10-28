/* InternshipHub — responsive internship board
   Plain JavaScript: reusable records, live search, filters and accessible states. */
"use strict";

const internships = [
  { id: 1, company: "Northstar Labs", role: "Frontend Developer Intern", domain: "Web Development", mode: "Remote", duration: "3 months", stipend: "₹8,000/mo", logo: "N", tone: "purple", description: "Build responsive interfaces and reusable UI components." },
  { id: 2, company: "PixelCraft Studio", role: "UI/UX Design Intern", domain: "UI / UX Design", mode: "Hybrid", duration: "2 months", stipend: "₹6,000/mo", logo: "P", tone: "pink", description: "Help shape thoughtful digital experiences and prototypes." },
  { id: 3, company: "DataNest", role: "Python Developer Intern", domain: "Python Development", mode: "Remote", duration: "3 months", stipend: "₹10,000/mo", logo: "D", tone: "blue", description: "Write clean Python code and contribute to small automation tools." },
  { id: 4, company: "BrightMind AI", role: "Machine Learning Intern", domain: "AI / ML", mode: "Remote", duration: "4 months", stipend: "₹12,000/mo", logo: "B", tone: "green", description: "Experiment with datasets and evaluate beginner ML models." },
  { id: 5, company: "ShieldPoint", role: "Cybersecurity Intern", domain: "Cybersecurity", mode: "On-site", duration: "3 months", stipend: "₹9,000/mo", logo: "S", tone: "teal", description: "Learn security basics, documentation, and safe testing practices." },
  { id: 6, company: "MetricMint", role: "Data Analytics Intern", domain: "Data Analytics", mode: "Hybrid", duration: "3 months", stipend: "₹8,500/mo", logo: "M", tone: "orange", description: "Turn raw data into clear insights, charts, and reports." },
  { id: 7, company: "CodeHarbor", role: "Junior Web Developer Intern", domain: "Web Development", mode: "On-site", duration: "2 months", stipend: "₹5,000/mo", logo: "C", tone: "blue", description: "Practise HTML, CSS, JavaScript, and collaborative development." },
  { id: 8, company: "PySpring", role: "Python Automation Intern", domain: "Python Development", mode: "Hybrid", duration: "2 months", stipend: "₹7,000/mo", logo: "Py", tone: "green", description: "Create scripts that simplify repetitive tasks and workflows." },
  { id: 9, company: "NeuralPath", role: "AI Research Intern", domain: "AI / ML", mode: "Remote", duration: "4 months", stipend: "₹11,000/mo", logo: "N", tone: "purple", description: "Assist with model experiments and organise research findings." },
  { id: 10, company: "Form & Function", role: "Product Design Intern", domain: "UI / UX Design", mode: "Remote", duration: "3 months", stipend: "₹7,500/mo", logo: "F", tone: "pink", description: "Support user research, wireframes, and accessible design systems." },
  { id: 11, company: "SafeStack", role: "Security Operations Intern", domain: "Cybersecurity", mode: "Hybrid", duration: "3 months", stipend: "₹9,500/mo", logo: "S", tone: "teal", description: "Explore security monitoring, risk reports, and incident workflows." },
  { id: 12, company: "InsightLoop", role: "Business Data Intern", domain: "Data Analytics", mode: "On-site", duration: "2 months", stipend: "₹6,500/mo", logo: "I", tone: "orange", description: "Prepare datasets and communicate trends with simple visualisations." }
];

const grid = document.querySelector("#internship-grid");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const locationFilter = document.querySelector("#location-filter");
const resultsCount = document.querySelector("#results-count");
const listingMessage = document.querySelector("#listing-message");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const clearSearch = document.querySelector("#clear-search");
const resetButton = document.querySelector("#reset-filters");
const emptyReset = document.querySelector("#empty-reset");
const filterForm = document.querySelector("#filter-form");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function createCard(item, index) {
  const article = document.createElement("article");
  article.className = "internship-card";
  article.style.animationDelay = `${Math.min(index * 35, 210)}ms`;

  const top = document.createElement("div");
  top.className = "card-top";
  const logo = document.createElement("div");
  logo.className = `company-logo logo-${item.tone}`;
  logo.setAttribute("aria-label", `${item.company} logo`);
  logo.setAttribute("role", "img");
  logo.textContent = item.logo;
  const tag = document.createElement("span");
  tag.className = "save-tag";
  tag.textContent = "Entry level";
  top.append(logo, tag);

  const company = document.createElement("p");
  company.className = "card-company";
  company.textContent = item.company;
  const title = document.createElement("h3");
  title.textContent = item.role;
  const domain = document.createElement("span");
  domain.className = "domain-tag";
  domain.textContent = item.domain;

  const details = document.createElement("div");
  details.className = "card-details";
  const mode = document.createElement("span");
  mode.innerHTML = '<span class="detail-icon" aria-hidden="true">⌖</span>';
  mode.append(document.createTextNode(item.mode));
  const duration = document.createElement("span");
  duration.innerHTML = '<span class="detail-icon" aria-hidden="true">◷</span>';
  duration.append(document.createTextNode(item.duration));
  details.append(mode, duration);

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";
  const stipend = document.createElement("div");
  stipend.className = "stipend";
  stipend.textContent = item.stipend;
  const stipendNote = document.createElement("small");
  stipendNote.textContent = "Indicative stipend";
  stipend.append(stipendNote);
  const apply = document.createElement("a");
  apply.className = "apply-link";
  apply.href = `mailto:careers@example.com?subject=${encodeURIComponent(`Internship enquiry: ${item.role}`)}&body=${encodeURIComponent(`Hello ${item.company},\n\nI am interested in learning more about the ${item.role} opportunity listed on this demo internship board.\n\nPlease share the official application details.\n\nThank you.`)}`;
  apply.setAttribute("aria-label", `Enquire about ${item.role} at ${item.company}`);
  apply.append(document.createTextNode("Enquire "), Object.assign(document.createElement("span"), { textContent: "↗", ariaHidden: true }));
  bottom.append(stipend, apply);

  article.append(top, company, title, domain, details, bottom);
  article.setAttribute("aria-label", `${item.role} at ${item.company}. ${item.domain}. ${item.mode}. ${item.duration}. ${item.description}`);
  return article;
}

function getFilteredInternships() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const selectedDomain = domainFilter.value;
  const selectedMode = locationFilter.value;
  return internships.filter((item) => {
    const searchableText = [item.company, item.role, item.domain, item.mode, item.duration, item.description].join(" ").toLocaleLowerCase();
    return (!query || searchableText.includes(query))
      && (selectedDomain === "all" || item.domain === selectedDomain)
      && (selectedMode === "all" || item.mode === selectedMode);
  });
}

function renderInternships() {
  try {
    const filtered = getFilteredInternships();
    const fragment = document.createDocumentFragment();
    filtered.forEach((item, index) => fragment.appendChild(createCard(item, index)));
    grid.replaceChildren(fragment);
    const count = filtered.length;
    resultsCount.textContent = `${count} ${count === 1 ? "opportunity" : "opportunities"}`;
    listingMessage.textContent = count === internships.length && !searchInput.value.trim() && domainFilter.value === "all" && locationFilter.value === "all"
      ? "Showing all opportunities"
      : `Showing ${count} of ${internships.length} opportunities`;
    emptyState.hidden = count !== 0;
    grid.hidden = count === 0;
    errorState.hidden = true;
    clearSearch.hidden = searchInput.value.length === 0;
  } catch (error) {
    console.error("Unable to render internship listings:", error);
    grid.hidden = true;
    emptyState.hidden = true;
    errorState.hidden = false;
    resultsCount.textContent = "Unable to load";
  }
}

function resetFilters() {
  searchInput.value = "";
  domainFilter.value = "all";
  locationFilter.value = "all";
  renderInternships();
  searchInput.focus();
}

searchInput.addEventListener("input", renderInternships);
domainFilter.addEventListener("change", renderInternships);
locationFilter.addEventListener("change", renderInternships);
filterForm.addEventListener("submit", (event) => event.preventDefault());
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  renderInternships();
  searchInput.focus();
});
resetButton.addEventListener("click", resetFilters);
emptyReset.addEventListener("click", resetFilters);

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navLinks.classList.toggle("open", !isExpanded);
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

renderInternships();
