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

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Only create the project cards - no path generation yet.
  createProjects(document.getElementById("english-signal"), "english");
  createProjects(document.getElementById("greek-signal"), "greek");
  
  // Set up event listeners
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});

// Handle scroll events
// Modify the handleScroll function to check if paths are initialized
function handleScroll() {
  if (buttonFlag === "button2") {
    const elements = getElements(languageFlag);
    if (!elements || !elements.path || !elements.path.getAttribute("d")) {
      // Path not initialized yet, initialize it first
      initSignalPaths();
    } else {
      // Path exists, update the scrollspy
      updateScrollSpy(languageFlag);
    }
  }
}

// Handle resize events
function handleResize() {

  
  if (buttonFlag === "button2") {
    generatePath(languageFlag);
    updateScrollSpy(languageFlag);
  }
}

// Initialize or update signal paths - called when button2 is first clicked.
function initSignalPaths() {

  console.log('init signal paths');

  try {
    generatePath(languageFlag);
    updateScrollSpy(languageFlag);
  } catch (error) {
    console.warn("Error initializing signal paths:", error);
  }
}

// Get elements for a specific language
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
  
  // If container is hidden, width might be 0
  const containerWidth = svg.clientWidth || 800; // Default width if hidden
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
      pathData += ` H${centerX}`;
      pathData += ` V${currentY + pulseHeight}`;
      currentY += pulseHeight;
    } else {
      pathData += ` H${isLeft ? centerX - amplitude : centerX + amplitude}`;
    }
  }

  // Set the path data
  path.setAttribute("d", pathData);
  progressPath.setAttribute("d", pathData);

  // Configure SVG viewBox
  const margin = 10;
  svg.setAttribute(
    "viewBox",
    `-${margin} -${margin} ${containerWidth + margin * 2} ${currentY + margin * 2}`
  );
  svg.style.height = currentY + margin * 2 + "px";

  // Store path length as data attribute for safety
  try {
    const pathLength = path.getTotalLength();
    path.dataset.length = pathLength;
    progressPath.style.strokeDasharray = pathLength;
    progressPath.style.strokeDashoffset = pathLength;
  } catch (e) {
    console.warn(`Could not get path length for ${language}`);
  }
}

// Update the scrollspy with error handling
function updateScrollSpy(language) {
  const elements = getElements(language);
  if (!elements) return;
  
  const { container, path, progressPath, star } = elements;
  
  try {
    // Get stored path length or calculate it
    let pathLength;
    try {
      pathLength = path.getTotalLength();
    } catch (e) {
      // If getTotalLength fails, regenerate the path
      generatePath(language);
      return;
    }
    
    // Calculate positions
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

    // Calculate scroll fraction
    const containerHeight = container.offsetHeight;
    let fraction = (scrollY - containerTop) / Math.max(containerHeight - window.innerHeight, 1);
    fraction = Math.max(0, Math.min(1, fraction));

    // Update star position
    const point = path.getPointAtLength(fraction * pathLength);
    star.setAttribute("x", point.x - 10);
    star.setAttribute("y", point.y - 10);
    
    // Update path styles
    path.setAttribute("stroke", fraction > 0 ? "white" : "gray");
    progressPath.style.strokeDashoffset = pathLength - (fraction * pathLength);
  } catch (error) {
    console.warn(`Error updating scrollspy for ${language}:`, error);
  }
}

// Create project cards for a specific language
function createProjects(container, language) {
  const signalContainer = container.querySelector('.signal-container');
  if (!signalContainer) return;
  
  // Clear existing cards
  signalContainer.querySelectorAll('.pixel-card-container').forEach(card => card.remove());

  // Create new cards
  projects.forEach((project, i) => {
    // Card container
    const cardContainer = document.createElement("div");
    cardContainer.className = "pixel-card-container";
    cardContainer.style.position = "absolute";
    cardContainer.style.top = (i + 1) * pulseHeight + 40 + "px";
    cardContainer.style.height = pulseHeight - 60 + "px";
    
    // Position left or right
    if ((i + 1) % 2 === 1) {
      cardContainer.style.left = "40px";
      cardContainer.style.width = "calc(100% - 50px)";
    } else {
      cardContainer.style.right = "40px";
      cardContainer.style.width = "calc(100% - 50px)";
    }

    // Build card content
    const cardContent = document.createElement("div");
    cardContent.className = "pixel-card-content";

    // Build card text container
    const textContainer = document.createElement("div");
    textContainer.className = "pixel-card-text-container";
    
    // Image frame
    const imageFrame = document.createElement("div");
    imageFrame.className = "pixel-image-frame";
    const imgEl = document.createElement("img");
    imgEl.src = project.image;
    imgEl.alt = project.title[language];
    imgEl.className = "pixel-image";
    imageFrame.appendChild(imgEl);

    // Title container
    const titleContainer = document.createElement("div");
    titleContainer.className = "pixel-title-container";

    // Title
    const titleEl = document.createElement("h3");
    titleEl.className = "list-header article-header";
    titleEl.textContent = project.title[language];

    // Type with blinking dot
    const typeEl = document.createElement("div");
    typeEl.className = "pixel-type";
    const dotEl = document.createElement("span");
    dotEl.className = "pixel-blink-dot";
    typeEl.appendChild(dotEl);
    typeEl.appendChild(document.createTextNode(project.type[language]));

    // Button
    const buttonEl = document.createElement("button");
    buttonEl.className = "pixel-button";
    buttonEl.textContent = language === 'english' ? 'Show more' : 'Περισσότερα';
    buttonEl.addEventListener("click", () => window.open(project.link, "_blank"));

    // Assemble and append
    cardContent.appendChild(imageFrame);
    titleContainer.appendChild(titleEl);
    titleContainer.appendChild(typeEl);
    textContainer.appendChild(titleContainer);
    textContainer.appendChild(buttonEl);
    cardContent.appendChild(textContainer);
    cardContainer.appendChild(cardContent);
    signalContainer.appendChild(cardContainer);
  });
}