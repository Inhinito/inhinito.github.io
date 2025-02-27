// The array of project objects.
const projects = [
  {
    id: 1,
    title: {
      english: "TRADER APP",
      greek: "ΕΦΑΡΜΟΓΗ ΣΥΝΑΛΛΑΓΩΝ"
    },
    type: {
      english: "SOFTWARE",
      greek: "ΛΟΓΙΣΜΙΚΟ"
    },
    image: "/api/placeholder/400/300",
    link: "https://articlereader.ai/",
  },
  {
    id: 2,
    title: {
      english: "ANOTHER APP",
      greek: "ΑΛΛΗ ΕΦΑΡΜΟΓΗ"
    },
    type: {
      english: "SOFTWARE",
      greek: "ΛΟΓΙΣΜΙΚΟ"
    },
    image: "/api/placeholder/300/200",
    link: "https://example.org/",
  },
  {
    id: 3,
    title: {
      english: "WEBSITE",
      greek: "ΙΣΤΟΣΕΛΙΔΑ"
    },
    type: {
      english: "WEB",
      greek: "ΙΣΤΟΣ"
    },
    image: "/api/placeholder/200/200",
    link: "https://example.com/",
  },
  {
    id: 4,
    title: {
      english: "TRADER APP",
      greek: "ΕΦΑΡΜΟΓΗ ΣΥΝΑΛΛΑΓΩΝ"
    },
    type: {
      english: "SOFTWARE",
      greek: "ΛΟΓΙΣΜΙΚΟ"
    },
    image: "/api/placeholder/200/300",
    link: "https://example.net/",
  },
  {
    id: 5,
    title: {
      english: "ANOTHER APP",
      greek: "ΑΛΛΗ ΕΦΑΡΜΟΓΗ"
    },
    type: {
      english: "SOFTWARE",
      greek: "ΛΟΓΙΣΜΙΚΟ"
    },
    image: "/api/placeholder/300/300",
    link: "https://example.io/",
  },
  {
    id: 6,
    title: {
      english: "WEBSITE",
      greek: "ΙΣΤΟΣΕΛΙΔΑ"
    },
    type: {
      english: "WEB",
      greek: "ΙΣΤΟΣ"
    },
    image: "/api/placeholder/400/200",
    link: "https://example.co/",
  },
  {
    id: 7,
    title: {
      english: "ANOTHER APP",
      greek: "ΑΛΛΗ ΕΦΑΡΜΟΓΗ"
    },
    type: {
      english: "SOFTWARE",
      greek: "ΛΟΓΙΣΜΙΚΟ"
    },
    image: "/api/placeholder/300/200",
    link: "https://example.dev/",
  },
  {
    id: 8,
    title: {
      english: "WEBSITE",
      greek: "ΙΣΤΟΣΕΛΙΔΑ"
    },
    type: {
      english: "WEB",
      greek: "ΙΣΤΟΣ"
    },
    image: "/api/placeholder/200/300",
    link: "https://example.app/",
  },
  {
    id: 9,
    title: {
      english: "ANOTHER APP",
      greek: "ΑΛΛΗ ΕΦΑΡΜΟΓΗ"
    },
    type: {
      english: "SOFTWARE",
      greek: "ΛΟΓΙΣΜΙΚΟ"
    },
    image: "/api/placeholder/200/200",
    link: "https://example.org/",
  },
];


// Constants
const numPulses = projects.length + 1;
const pulseHeight = 400;

// Initialize on page load - create cards only
document.addEventListener("DOMContentLoaded", () => {
  createProjects(document.getElementById("english-signal"), "english");
  createProjects(document.getElementById("greek-signal"), "greek");
  
  // Set up event listeners
  window.addEventListener("scroll", () => {
    if (buttonFlag === "button2") {
      handleSignalScroll();
    }
  });
  
  // Enhance the window resize handler to store dimensions even if button2 is not active
window.addEventListener("resize", () => {
  // Reset path dimensions so they'll be recalculated next time
  ["english", "greek"].forEach(lang => {
    const elements = getElements(lang);
    if (elements && elements.svg) {
      elements.path?.removeAttribute("d");
    }
  });
  
  // If button2 is active, update paths immediately
  if (buttonFlag === "button2") {
    generatePath(languageFlag);
    updateScrollSpy(languageFlag);
  }
});
});

// Handle scrolling for the active language
function handleSignalScroll() {
  const language = languageFlag;
  const elements = getElements(language);
  
  // If path doesn't exist yet, initialize it
  if (!elements?.path?.getAttribute("d")) {
    generatePath(language);
  }
  
  updateScrollSpy(language);
}

// Get elements for a specific language (using optional chaining)
function getElements(language) {
  const container = document.getElementById(`${language}-signal`);
  if (!container) return null;
  
  return {
    container: container.querySelector('.signal-container'),
    svg: container.querySelector('.scrollspy-path'),
    path: container.querySelector('.path'),
    progressPath: container.querySelector('.progress-path'),
    star: container.querySelector('.scrollspy-star')
  };
}

// Generate the path for a specific language
function generatePath(language) {
  const elements = getElements(language);
  if (!elements) return;
  
  const { svg, path, progressPath } = elements;
  

// Get the width of the parent container instead of the SVG
  // This is more reliable for responsive layouts
  const parentWidth = svg.parentElement.clientWidth;
  const containerWidth = parentWidth > 0 ? parentWidth : (svg.clientWidth || 800);
  const centerX = containerWidth / 2;
  const amplitude = containerWidth / 2;
  
  // Generate path data
  let pathData = `M${centerX},0`;
  let currentY = 0;

  for (let i = 0; i < numPulses; i++) {
    const isLast = i === numPulses - 1;
    const isLeft = i % 2 === 0;

    pathData += ` V${currentY + pulseHeight}`;
    currentY += pulseHeight;

    if (isLast) {
      pathData += ` H${centerX} V${currentY + pulseHeight}`;
      currentY += pulseHeight;
    } else {
      pathData += ` H${isLeft ? centerX - amplitude : centerX + amplitude}`;
    }
  }

  // Set path data and configure SVG
  path.setAttribute("d", pathData);
  progressPath.setAttribute("d", pathData);
  
  const margin = 10;
  svg.setAttribute(
    "viewBox",
    `-${margin} -${margin} ${containerWidth + margin * 2} ${currentY + margin * 2}`
  );
  svg.style.height = currentY + margin * 2 + "px";

  // Set up stroke animation properties
  try {
    const pathLength = path.getTotalLength();
    progressPath.style.strokeDasharray = pathLength;
    progressPath.style.strokeDashoffset = pathLength;
  } catch (e) {
    console.warn(`Could not get path length for ${language}`);
  }
}

// Update the scrollspy position
function updateScrollSpy(language) {
  const elements = getElements(language);
  if (!elements) return;
  
  const { container, path, progressPath, star } = elements;
  
  try {
    // If path is invalid, regenerate it
    if (!path.getAttribute("d")) {
      generatePath(language);
      return;
    }
    
    const pathLength = path.getTotalLength();
    const containerTop = container.offsetTop;
    const scrollY = window.scrollY;

    // Before container is visible
    if (scrollY < containerTop) {
      const startPoint = path.getPointAtLength(0);
      star.setAttribute("x", startPoint.x - 10);
      star.setAttribute("y", startPoint.y - 10);
      progressPath.style.strokeDashoffset = pathLength;
      path.setAttribute("stroke", "gray");
      return;
    }

    // Calculate scroll progress
    const containerHeight = container.offsetHeight;
    let fraction = (scrollY - containerTop) / Math.max(containerHeight - window.innerHeight, 1);
    fraction = Math.max(0, Math.min(1, fraction));

    // Update star position and path progress
    const point = path.getPointAtLength(fraction * pathLength);
    star.setAttribute("x", point.x - 10);
    star.setAttribute("y", point.y - 10);
    path.setAttribute("stroke", fraction > 0 ? "white" : "gray");
    progressPath.style.strokeDashoffset = pathLength - (fraction * pathLength);
  } catch (error) {
    console.warn(`Error in scrollspy: ${error.message}`);
  }
}

// Create project cards for a specific language
function createProjects(container, language) {
  const signalContainer = container?.querySelector('.signal-container');
  if (!signalContainer) return;
  
  signalContainer.querySelectorAll('.pixel-card-container').forEach(card => card.remove());

  projects.forEach((project, i) => {
    const pulseIndex = i + 1;
    
    // Card container with positioning
    const cardContainer = document.createElement("div");
    cardContainer.className = "pixel-card-container";
    cardContainer.style.position = "absolute";
    cardContainer.style.top = pulseIndex * pulseHeight + 40 + "px";
    cardContainer.style.height = pulseHeight - 60 + "px";
    cardContainer.style[pulseIndex % 2 === 1 ? "left" : "right"] = "40px";
    cardContainer.style.width = "calc(100% - 50px)";

    // Build content structure
    const cardContent = document.createElement("div");
    cardContent.className = "pixel-card-content";
    const textContainer = document.createElement("div");
    textContainer.className = "pixel-card-text-container";
    const titleContainer = document.createElement("div");
    titleContainer.className = "pixel-title-container";
    
    // Image
    const imageFrame = document.createElement("div");
    imageFrame.className = "pixel-image-frame";
    const imgEl = document.createElement("img");
    imgEl.src = project.image;
    imgEl.alt = project.title[language];
    imgEl.className = "pixel-image";
    imageFrame.appendChild(imgEl);

    // Title
    const titleEl = document.createElement("h3");
    titleEl.className = "list-header article-header";
    titleEl.textContent = project.title[language];

    // Type with dot
    const typeEl = document.createElement("div");
    typeEl.className = "pixel-type";
    typeEl.appendChild(document.createElement("span")).className = "pixel-blink-dot";
    typeEl.appendChild(document.createTextNode(project.type[language]));

    // Button
    const buttonEl = document.createElement("button");
    buttonEl.className = "pixel-button";
    buttonEl.textContent = language === 'english' ? 'Show more' : 'Περισσότερα';
    buttonEl.addEventListener("click", () => window.open(project.link, "_blank"));

    // Assemble components
    titleContainer.append(titleEl, typeEl);
    textContainer.append(titleContainer, buttonEl);
    cardContent.append(imageFrame, textContainer);
    cardContainer.appendChild(cardContent);
    signalContainer.appendChild(cardContainer);
  });
}

// Initialize paths - exposed for external use
function initSignalPaths() {

  
  // Use active language
  generatePath(languageFlag);
  updateScrollSpy(languageFlag);
}