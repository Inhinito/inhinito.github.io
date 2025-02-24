document.addEventListener("DOMContentLoaded", () => {
  // Generate initial path and update star
  generatePath();
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

const svg = document.getElementById("scrollspy-path");
const path = document.getElementById("path");
const progressPath = document.getElementById("progress-path");
const star = document.getElementById("scrollspy-star");

const numPulses = 10;
const pulseHeight = 400;

function generatePath() {
    console.log('generatePath')

    const containerWidth = svg.clientWidth;
    const centerX = containerWidth / 2;
    const amplitude = containerWidth / 2;
    let pathData = `M${centerX},0`;
    let currentY = 0;

    for (let i = 0; i < numPulses; i++) {
      const isLast = i === numPulses - 1;
      const isLeft = i % 2 === 0;

      // Move down one pulse
      pathData += ` V${currentY + pulseHeight}`;
      currentY += pulseHeight;

      if (isLast) {
        // Final horizontal and vertical move to end at center
        pathData += ` H${centerX}`;
        pathData += ` V${currentY + pulseHeight}`;
        currentY += pulseHeight;
      } else {
        // Go left or right
        pathData += ` H${isLeft ? centerX - amplitude : centerX + amplitude}`;
      }
    }

    path.setAttribute("d", pathData);
    progressPath.setAttribute("d", pathData);

    // Define a margin so the 20×20 white box isn’t clipped at the edges
    const margin = 10;
    // Set the viewBox so that it exactly covers the content plus the extra margin.
    svg.setAttribute(
      "viewBox",
      `-${margin} -${margin} ${containerWidth + margin * 2} ${
        currentY + margin * 2
      }`
    );
    // Set the SVG's height to cover the content plus margin
    svg.style.height = currentY + margin * 2 + "px";

    // Reset the dash style for the progress path
    const pathLength = path.getTotalLength();
    progressPath.style.strokeDasharray = pathLength;
    progressPath.style.strokeDashoffset = pathLength;
  }

  function updateScrollSpy() {
    const container = document.querySelector(".signal-container");
    const containerTop = container.offsetTop;
    const scrollY = window.scrollY;

    // When before containerTop, keep the star at the start point.
    if (scrollY < containerTop) {
      const startPoint = path.getPointAtLength(0);
      star.setAttribute("x", startPoint.x - 10);
      star.setAttribute("y", startPoint.y - 10);
      progressPath.style.strokeDashoffset = progressPath.getTotalLength();
      path.setAttribute("stroke", "gray");
      return;
    }

    // Calculate the maximum scrollable distance.
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    // Map scrollY from [containerTop, maxScroll] to fraction [0,1]
    let fraction = (scrollY - containerTop) / (maxScroll - containerTop);
    fraction = Math.max(0, Math.min(1, fraction));

    const pathLength = path.getTotalLength();
    const point = path.getPointAtLength(fraction * pathLength);

    star.setAttribute("x", point.x - 10);
    star.setAttribute("y", point.y - 10);
    path.setAttribute("stroke", fraction > 0 ? "white" : "gray");

    // Update the progress path dash offset to reveal the traversed portion
    const revealLength = fraction * pathLength;
    progressPath.style.strokeDashoffset = pathLength - revealLength;
  }
