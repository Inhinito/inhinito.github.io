/* Network Graphs */
const baseWidth = 600;
const baseHeight = 550;
const nodes = [
  { id: "Inhinito", x: 300, y: 300, color: "#ffd04d", size: 18 },
  { id: "Marketing", x: 200, y: 380, color: "#ffffff", size: 18 },
  { id: "Software", x: 400, y: 400, color: "#ffffff", size: 18 },
  { id: "Multimedia", x: 300, y: 200, color: "#ffffff", size: 18 },
  { id: "Photography", x: 270, y: 50, color: "#ffffff" },
  { id: "Videography", x: 380, y: 100, color: "#ffffff" },
  { id: "Sound Design", x: 420, y: 250, color: "#ffffff" },
  { id: "Graphic Design", x: 200, y: 150, color: "#ffffff" },
  { id: "Mobile Apps", x: 400, y: 530, color: "#ffffff" },
  { id: "UX Design", x: 460, y: 460, color: "#ffffff" },
  { id: "Websites", x: 480, y: 340, color: "#ffffff" },
  { id: "Digital Ads", x: 200, y: 500, color: "#ffffff" },
  { id: "Events", x: 130, y: 440, color: "#ffffff" },
  { id: "Influencers", x: 140, y: 320, color: "#ffffff" }
];

const links = [
  ["Inhinito", "Marketing"],
  ["Inhinito", "Software"],
  ["Inhinito", "Multimedia"],
  ["Multimedia", "Photography"],
  ["Multimedia", "Videography"],
  ["Multimedia", "Sound Design"],
  ["Multimedia", "Graphic Design"],
  ["Sound Design", "Videography"],
  ["Software", "Websites"],
  ["Software", "UX Design"],
  ["Software", "Mobile Apps"],
  ["UX Design", "Mobile Apps"],
  ["UX Design", "Websites"],
  ["Marketing", "Events"],
  ["Marketing", "Digital Ads"],
  ["Marketing", "Influencers"]
];

let currentHorizontalScale = 1;
const svg = document.getElementById('network-graph');
let nodeElements = [];
let linkElements = [];
let textElements = [];

function updatePositions() {
  const container = document.querySelector('.graph-container');
  const containerWidth = container.clientWidth;
  currentHorizontalScale = containerWidth / baseWidth;

  nodes.forEach((node, index) => {
    const scaledX = node.x * currentHorizontalScale;
    const originalY = node.y;
    const size = node.size || 10;
    const rect = nodeElements[index];
    const text = textElements[index];

    // Fixed stroke attributes
    rect.setAttribute('x', scaledX - size);
    rect.setAttribute('y', originalY - size);
    rect.setAttribute('width', size * 2);
    rect.setAttribute('height', size * 2);
    rect.setAttribute('fill', node.color);
    rect.setAttribute('stroke', node.id === "Inhinito" ? '#ffffff' : 'transparent');
    rect.setAttribute('stroke-width', node.id === "Inhinito" ? 12 : 0);

    text.setAttribute('x', scaledX);
    
    if (node.id === "Inhinito") {
      // Special positioning for center node
      text.setAttribute('y', originalY - 34); // 24 base offset + 10 extra
      text.setAttribute('dy', '0.15em'); // Vertical alignment adjustment
    } else {
      // Standard positioning for other nodes
      text.setAttribute('y', originalY - (node.size ? 24 : 18));
      text.removeAttribute('dy');
    }
  });

  links.forEach(([sourceId, targetId], index) => {
    const source = nodes.find(n => n.id === sourceId);
    const target = nodes.find(n => n.id === targetId);
    const line = linkElements[index];
    
    line.setAttribute('x1', source.x * currentHorizontalScale);
    line.setAttribute('y1', source.y);
    line.setAttribute('x2', target.x * currentHorizontalScale);
    line.setAttribute('y2', target.y);
  });
}

function createGraph() {
  links.forEach(([sourceId, targetId]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('link');
    linkElements.push(line);
    svg.appendChild(line);
  });

  nodes.forEach((node, index) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    
    rect.classList.add('node');
    text.classList.add('node-text');
    text.textContent = node.id;
    
    nodeElements[index] = rect;
    textElements[index] = text;
    
    group.appendChild(rect);
    group.appendChild(text);
    svg.appendChild(group);

    group.addEventListener('mouseover', () => console.log(`Hovered node: ${node.id}`));
    group.addEventListener('click', () => console.log(`Clicked node: ${node.id}`));
  });

  updatePositions();
}

createGraph();
window.addEventListener('resize', () => requestAnimationFrame(updatePositions));






/*
// English Graph
Highcharts.chart("english-network-graph", {
  series: [
    {
      data: [
        ["Inhinito", "Marketing"],
        ["Inhinito", "Software"],
        ["Inhinito", "Multimedia"],
        ["Multimedia", "Photography"],
        ["Multimedia", "Videography"],
        ["Multimedia", "Sound Design"],
        ["Multimedia", "Graphic Design"],
        ["Sound Design", "Videography"],
        ["Software", "Websites"],
        ["Software", "UX Design"],
        ["Software", "Mobile Apps"],
        ["UX Design", "Mobile Apps"],
        ["UX Design", "Websites"],
        ["Marketing", "Digital Ads"],
        ["Marketing", "Events"],
        ["Marketing", "Influencers"],
      ],
      nodes: [
        { id: "Photography", x: -50, y: -200, color: white },
        { id: "Videography", x: 50, y: -200, color: white },
        { id: "Sound Design", x: 100, y: -150, color: white },
        { id: "Graphic Design", x: -100, y: -150, color: white },
        { id: "Mobile Apps", x: 150, y: 100, color: white },
        { id: "UX Design", x: 200, y: 50, color: white },
        { id: "Websites", x: 250, y: 100, color: white },
        { id: "Digital Ads", x: -150, y: 50, color: white },
        { id: "Events", x: -200, y: 100, color: white },
        { id: "Influencers", x: -250, y: 50, color: white },
      ],
    },
  ],
});

// Greek Graph
Highcharts.chart("greek-network-graph", {
  series: [
    {
      data: [
        ["Inhinito", "Μάρκετινγκ"],
        ["Inhinito", "Λογισμικό"],
        ["Inhinito", "Πολυμέσα"],
        ["Πολυμέσα", "Φωτογραφία"],
        ["Πολυμέσα", "Βιντεογραφία"],
        ["Ηχοληψία", "Βιντεογραφία"],
        ["Πολυμέσα", "Ηχοληψία"],
        ["Πολυμέσα", "Γραφιστική"],
        ["Λογισμικό", "Ιστοσελίδες"],
        ["Λογισμικό", "Σχεδίαση UX"],
        ["Λογισμικό", "Εφαρμογές"],
        ["Σχεδίαση UX", "Εφαρμογές"],
        ["Σχεδίαση UX", "Ιστοσελίδες"],
        ["Μάρκετινγκ", "Εκδηλώσεις"],
        ["Μάρκετινγκ", "Διαφημίσεις"],
        ["Μάρκετινγκ", "Influencers"],
      ],
      nodes: [
        { id: "Φωτογραφία", x: -50, y: -200, color: white },
        { id: "Βιντεογραφία", x: 50, y: -200, color: white },
        { id: "Ηχοληψία", x: 100, y: -150, color: white },
        { id: "Γραφιστική", x: -100, y: -150, color: white },
        { id: "Ιστοσελίδες", x: 150, y: 100, color: white },
        { id: "Σχεδίαση UX", x: 200, y: 50, color: white },
        { id: "Εφαρμογές", x: 250, y: 100, color: white },
        { id: "Εκδηλώσεις", x: -150, y: 50, color: white },
        { id: "Διαφημίσεις", x: -200, y: 100, color: white },
        { id: "Influencers", x: -250, y: 50, color: white },
      ],
    },
  ],
});
*/

document.addEventListener('DOMContentLoaded', function() {
  const coOpMembersLink = document.querySelector('.tree > ul > li > ul > li:nth-child(2) a');
  const boardMembersLink = document.querySelector('.tree > ul > li > ul > li:nth-child(1) a');

  coOpMembersLink.addEventListener('mouseenter', () => {
    boardMembersLink.classList.add('force-highlight');
    // Add the force-highlight class to all the board member children
    const boardMemberChildren = boardMembersLink.parentElement.querySelectorAll('ul li a');
    boardMemberChildren.forEach((child) => {
      child.classList.add('force-highlight');
    });
  });

  coOpMembersLink.addEventListener('mouseleave', () => {
    boardMembersLink.classList.remove('force-highlight');
    // Remove the force-highlight class from all the board member children
    const boardMemberChildren = boardMembersLink.parentElement.querySelectorAll('ul li a');
    boardMemberChildren.forEach((child) => {
      child.classList.remove('force-highlight');
    });
  });
});
