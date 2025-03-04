// Constants
const numPulses = projects.length + 1;
const pulseHeight = 400;

// Initialize on page load - create cards only
document.addEventListener("DOMContentLoaded", () => {
  // Create project cards for both languages
  createProjects(document.getElementById("english-signal"), "english");
  createProjects(document.getElementById("greek-signal"), "greek");
  
  // Set up scroll event listener
  window.addEventListener("scroll", () => {
    if (buttonFlag === "button2") {
      updateScrollSpy(languageFlag);
    }
  });
});

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
  
  // Get reliable width
  const parentWidth = svg.parentElement.clientWidth;
  const containerWidth = parentWidth > 0 ? parentWidth : svg.clientWidth;
  const centerX = containerWidth / 2;
  const amplitude = containerWidth / 2;

  // Set margins for the SVG
  const marginHorizontal = 20;
  const marginVertical = 20;
  
  // Generate path data
  let pathData = `M${centerX},${marginVertical}`;
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
  
  svg.setAttribute(
    "viewBox",
    `-${marginHorizontal} -${marginVertical} ${containerWidth + marginHorizontal * 2} ${currentY + marginVertical * 2}`
  );
  svg.style.height = currentY + marginVertical * 2 + "px";

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

    // Define star size for consistency
    const starSize = 10; 
    // Before container is visible
    if (scrollY < containerTop) {
      const startPoint = path.getPointAtLength(0);
      star.setAttribute("x", startPoint.x - starSize);
      star.setAttribute("y", startPoint.y - starSize);
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
    star.setAttribute("x", point.x - starSize);
    star.setAttribute("y", point.y - starSize);
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

  // Set up card margins
  const cardMarginTop = 43;
  const cardMarginSide = 41;
  const cardHeightOffset = 46;

  // Loop through projects and create cards.
  projects.forEach((project, i) => {
    const pulseIndex = i + 1;
    
    // Card container with positioning
    const cardContainer = document.createElement("div");
    cardContainer.className = "pixel-card-container";
    cardContainer.style.position = "absolute";
    cardContainer.style.top = pulseIndex * pulseHeight + cardMarginTop + "px";
    cardContainer.style.height = pulseHeight - cardHeightOffset + "px";
    cardContainer.style[pulseIndex % 2 === 1 ? "left" : "right"] = cardMarginSide + "px";
    cardContainer.style.width = `calc(100% - ${cardMarginSide + 18}px)`;

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

    // Type with dot
    const typeEl = document.createElement("div");
    typeEl.className = "pixel-description pixel-type";
      
    // Loop through each type.
    for (let i = 0; i < project.type.length; i++) {
      if(i > 0) {
        // Add a slash between types.
        typeEl.appendChild(document.createElement("span")).textContent = "/";
        // Add a class to the slash.
        typeEl.lastElementChild.className = "pixel-slash";
      }

      // Add type text.
      typeEl.appendChild(document.createElement("span")).textContent = project.type[i][language];
    }

    // Title
    const titleEl = document.createElement("h3");
    titleEl.className = "list-header article-header";
    titleEl.textContent = project.title[language];

    // Client with dot
    const clientEl = document.createElement("div");
    clientEl.className = "pixel-description";
    clientEl.appendChild(document.createElement("span")).className = "pixel-blink-dot";
    clientEl.appendChild(document.createElement("span")).textContent = project.client[language];
    // Add a class to the text content.
    clientEl.lastElementChild.className = "pixel-client";


    // Button
    const buttonEl = document.createElement("button");
    buttonEl.className = "pixel-button";
    buttonEl.textContent = language === 'english' ? 'See more' : 'Περισσότερα';
    buttonEl.addEventListener("click", () => window.open(project.link, "_blank"));

    // Assemble components
    titleContainer.append(typeEl, titleEl, clientEl);
    textContainer.append(titleContainer, buttonEl);
    cardContent.append(imageFrame, textContainer);
    cardContainer.appendChild(cardContent);
    signalContainer.appendChild(cardContainer);
  });
}

// Initialize paths - completely refresh SVG setup
function initSignalPaths() {
  // Clear any existing observers
  if (window.resizeObservers) {
    window.resizeObservers.forEach(observer => observer.disconnect());
  }
  
  // Set up resize observers for both languages
  window.resizeObservers = [];
  
  ["english", "greek"].forEach(lang => {
    const container = document.getElementById(`${lang}-signal`);
    if (!container) return;
    
    // Get elements
    const elements = getElements(lang);
    if (!elements || !elements.svg) return;
    
    // Reset SVG to initial state
    elements.svg.style.width = "";
    elements.svg.style.height = "";
    elements.svg.removeAttribute("viewBox");
    
    // Clear paths to force regeneration
    if (elements.path) elements.path.removeAttribute("d");
    if (elements.progressPath) elements.progressPath.removeAttribute("d");
    
    // Create observer to watch for size changes
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Only update if visible
        if (buttonFlag === "button2" && entry.contentRect.width > 0) {
          generatePath(lang);
          // Update scrollspy position if language matches.
          if (lang === languageFlag) {
            updateScrollSpy(lang);
          }
        }
      }
    });
    
    // Observe the container
    observer.observe(container);
    window.resizeObservers.push(observer);
  });
  
  // Initial generation for current language
  generatePath(languageFlag);
  updateScrollSpy(languageFlag);
}