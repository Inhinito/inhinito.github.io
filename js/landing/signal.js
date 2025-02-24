document.addEventListener("DOMContentLoaded", () => {
  // Generate initial path and update star
  generatePath();
  createProjects();
  updateScrollSpy();

  // Update on scroll & resize
  window.addEventListener("scroll", updateScrollSpy);
  window.addEventListener("resize", () => {
    // Check if the current button is button 2.
    if (buttonFlag === "button2") {
      // Generate initial path and update star
      generatePath();
      updateScrollSpy();
    }
  });
});

// The array of project objects.
const projects = [
  {
    id: 1,
    title: "TRADER APP",
    type: "SOFTWARE",
    image: "/api/placeholder/400/300",
    link: "https://articlereader.ai/",
  },
  {
    id: 2,
    title: "ANOTHER APP",
    type: "SOFTWARE",
    image: "/api/placeholder/300/200",
    link: "https://example.org/",
  },
  {
    id: 3,
    title: "WEBSITE",
    type: "WEB",
    image: "/api/placeholder/200/200",
    link: "https://example.com/",
  },
  {
    id: 4,
    title: "MOBILE APP",
    type: "MOBILE",
    image: "/api/placeholder/200/300",
    link: "https://example.net/",
  },
  {
    id: 5,
    title: "ANOTHER WEBSITE",
    type: "WEB",
    image: "/api/placeholder/300/300",
    link: "https://example.io/",
  },
  {
    id: 6,
    title: "MOBILE APP",
    type: "MOBILE",
    image: "/api/placeholder/400/200",
    link: "https://example.co/",
  },
  {
    id: 7,
    title: "WEBSITE",
    type: "WEB",
    image: "/api/placeholder/300/200",
    link: "https://example.dev/",
  },
  {
    id: 8,
    title: "TRADER APP",
    type: "SOFTWARE",
    image: "/api/placeholder/200/300",
    link: "https://example.app/",
  },
  {
    id: 9,
    title: "Another APP",
    type: "SOFTWARE",
    image: "/api/placeholder/200/200",
    link: "https://example.org/",
  },
];

const svg = document.getElementById("scrollspy-path");
const path = document.getElementById("path");
const progressPath = document.getElementById("progress-path");
const star = document.getElementById("scrollspy-star");

const numPulses = 10;
const pulseHeight = 400;

function generatePath() {
  // Get the width of the svg container.
  const containerWidth = svg.clientWidth;
  // Calculate the center of the container.
  const centerX = containerWidth / 2;
  // Calculate the amplitude of the pulses.
  const amplitude = containerWidth / 2;
  // Start the path at the center of the container.
  // (M: "move to" — sets the starting point).
  let pathData = `M${centerX},0`;
  // Set the current y position to 0.
  let currentY = 0;

  // Loop through the number of pulses to create the path.
  for (let i = 0; i < numPulses; i++) {
    // Check if this is the last pulse.
    const isLast = i === numPulses - 1;
    // Check if this is a left pulse.
    const isLeft = i % 2 === 0;

    // Move down one pulse.
    // V: "vertical line to" — draws a vertical line to the specified y-coordinate.
    pathData += ` V${currentY + pulseHeight}`;
    // Update the current y position.
    currentY += pulseHeight;

    // Check if this is the last pulse.
    if (isLast) {
      // If it is the last pulse, move to the center of the container.
      pathData += ` H${centerX}`;
      // Move down one pulse.
      pathData += ` V${currentY + pulseHeight}`;
      currentY += pulseHeight;
    } else {
      // Go left or right depending on the pulse number.
      pathData += ` H${isLeft ? centerX - amplitude : centerX + amplitude}`;
    }
  }

  // Set the path data for the path and progress-path.
  path.setAttribute("d", pathData);
  progressPath.setAttribute("d", pathData);

  // Define a margin so the 20×20 white box isn’t clipped by the viewBox.
  const margin = 10;
  // Set the viewBox so that it exactly covers the content plus the extra margin.
  svg.setAttribute(
    "viewBox",
    `-${margin} -${margin} ${containerWidth + margin * 2} ${
      currentY + margin * 2
    }`
  );
  // Set the SVG's height to cover the content plus margin.
  svg.style.height = currentY + margin * 2 + "px";

  // Get the total length of the path.
  const pathLength = path.getTotalLength();
  // Set the stroke dash array and offset to the path length.
  progressPath.style.strokeDasharray = pathLength;
  progressPath.style.strokeDashoffset = pathLength;
}

function updateScrollSpy() {
  const container = document.querySelector(".signal-container");
  // Get the top offset, height, and scroll position of the container.
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight;
  const scrollY = window.scrollY;

  // Before the container is reached, keep the star at the start.
  if (scrollY < containerTop) {
    const startPoint = path.getPointAtLength(0);
    star.setAttribute("x", startPoint.x - 10);
    star.setAttribute("y", startPoint.y - 10);
    progressPath.style.strokeDashoffset = progressPath.getTotalLength();
    path.setAttribute("stroke", "gray");
    return;
  }

  // Calculate the fraction of the scroll position within the container.
  let fraction =
    (scrollY - containerTop) /
    Math.max(containerHeight - window.innerHeight, 1);
  // Map scrollY from [containerTop, containerBottom - window.innerHeight] to fraction [0,1].
  fraction = Math.max(0, Math.min(1, fraction));

  // Get the total length of the path.
  const pathLength = path.getTotalLength();
  // Get the point on the path at the progress fraction.
  const point = path.getPointAtLength(fraction * pathLength);

  // Update the star position to the point on the path.
  star.setAttribute("x", point.x - 10);
  star.setAttribute("y", point.y - 10);
  // Update the path color to white if the star is traversing the path.
  path.setAttribute("stroke", fraction > 0 ? "white" : "gray");

  // Update the progress path dash offset to reveal the traversed portion.
  const revealLength = fraction * pathLength;
  progressPath.style.strokeDashoffset = pathLength - revealLength;
}

function createProjects() {
  const container = document.querySelector(".signal-container");
  const numProjects = numPulses - 1;

  for (let i = 0; i < numProjects; i++) {
    const pulseIndex = i + 1;
    const project = projects[i] || {
      title: `Project #${i + 1}`,
      type: "",
      image: "",
      link: "#",
    };

    // Outer container
    const cardContainer = document.createElement("div");
    cardContainer.className = "pixel-card-container";
    cardContainer.style.position = "absolute";
    cardContainer.style.top = pulseIndex * pulseHeight + 40 + "px";
    cardContainer.style.height = pulseHeight - 60 + "px";

    // Even/odd horizontal placement
    if (pulseIndex % 2 === 1) {
      cardContainer.style.left = "40px";
      cardContainer.style.width = "calc(100% - 50px)";
    } else {
      cardContainer.style.right = "40px";
      cardContainer.style.width = "calc(100% - 50px)";
    }

    // Card content
    const cardContent = document.createElement("div");
    cardContent.className = "pixel-card-content";

    // Image frame
    const imageFrame = document.createElement("div");
    imageFrame.className = "pixel-image-frame";
    const imgEl = document.createElement("img");
    imgEl.src = project.image;
    imgEl.alt = project.title;
    imgEl.className = "pixel-image";
    imageFrame.appendChild(imgEl);

    // Title
    const titleEl = document.createElement("h3");
    titleEl.className = "list-header article-header";
    titleEl.textContent = project.title;

    // Type with blinking dot
    const typeEl = document.createElement("div");
    typeEl.className = "pixel-type";
    const dotEl = document.createElement("span");
    dotEl.className = "pixel-blink-dot";
    typeEl.appendChild(dotEl);
    const typeText = document.createTextNode(project.type);
    typeEl.appendChild(typeText);

    // Button
    const buttonEl = document.createElement("button");
    buttonEl.className = "pixel-button";
    buttonEl.textContent = "PRESS START";
    buttonEl.addEventListener("click", () => {
      window.open(project.link, "_blank");
    });

    cardContent.appendChild(imageFrame);
    cardContent.appendChild(titleEl);
    cardContent.appendChild(typeEl);
    cardContent.appendChild(buttonEl);

    // Append main content
    cardContainer.appendChild(cardContent);
    container.appendChild(cardContainer);
  }
}
