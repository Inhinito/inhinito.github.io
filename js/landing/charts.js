/* Network Graphs */
const baseWidth = 600;
const baseHeight = 550;

const englishNodes = [
  { id: "Inhinito", x: 300, y: 300, color: "#ffd04d", size: 18 },
  { id: "Marketing", x: 200, y: 380, color: "#ffffff", size: 18 },
  { id: "Software", x: 350, y: 400, color: "#ffffff", size: 18 },
  { id: "Multimedia", x: 300, y: 200, color: "#ffffff", size: 18 },
  { id: "Photography", x: 270, y: 50, color: "#ffffff" },
  { id: "Videography", x: 380, y: 100, color: "#ffffff" },
  { id: "Sound Design", x: 420, y: 250, color: "#ffffff" },
  { id: "Graphic Design", x: 200, y: 150, color: "#ffffff" },
  { id: "Mobile Apps", x: 400, y: 530, color: "#ffffff" },
  { id: "UX Design", x: 460, y: 460, color: "#ffffff" },
  { id: "Websites", x: 460, y: 355, color: "#ffffff" },
  { id: "Digital Ads", x: 200, y: 500, color: "#ffffff" },
  { id: "Events", x: 130, y: 440, color: "#ffffff" },
  { id: "Influencers", x: 140, y: 320, color: "#ffffff" }
];

const englishLinks = [
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

// Greek translations
const greekLabels = {
  "Inhinito": "Inhinito",
  "Marketing": "Μάρκετινγκ",
  "Software": "Λογισμικό",
  "Multimedia": "Πολυμέσα",
  "Photography": "Φωτογραφία",
  "Videography": "Βιντεοσκόπηση",
  "Sound Design": "Ηχοληψία",
  "Graphic Design": "Γραφιστική",
  "Mobile Apps": "Εφαρμογές",
  "UX Design": "Σχεδίαση UX",
  "Websites": "Ιστοσελίδες",
  "Digital Ads": "Διαφημίσεις",
  "Events": "Εκδηλώσεις",
  "Influencers": "Influencers"
};

const greekNodes = englishNodes.map(node => ({
  ...node,
  id: greekLabels[node.id] || node.id
}));

// Make sure Greek links match the Greek IDs:
const greekLinks = [
  ["Inhinito", "Μάρκετινγκ"],
  ["Inhinito", "Λογισμικό"],
  ["Inhinito", "Πολυμέσα"],
  ["Πολυμέσα", "Φωτογραφία"],
  ["Πολυμέσα", "Βιντεοσκόπηση"],
  ["Πολυμέσα", "Ηχοληψία"],
  ["Πολυμέσα", "Γραφιστική"],
  ["Ηχοληψία", "Βιντεοσκόπηση"],
  ["Λογισμικό", "Ιστοσελίδες"],
  ["Λογισμικό", "Σχεδίαση UX"],
  ["Λογισμικό", "Εφαρμογές"],
  ["Σχεδίαση UX", "Εφαρμογές"],
  ["Σχεδίαση UX", "Ιστοσελίδες"],
  ["Μάρκετινγκ", "Εκδηλώσεις"],
  ["Μάρκετινγκ", "Διαφημίσεις"],
  ["Μάρκετινγκ", "Influencers"]
];

class GraphManager {
  constructor(svgId, nodes, links) {
    this.svg = document.getElementById(svgId);
    this.container = this.svg.closest('.graph-container');
    this.nodes = nodes;
    this.links = links;
    this.nodeElements = [];
    this.linkElements = [];
    this.textElements = [];
    this.currentHorizontalScale = 1;
    
    this.init();
  }

  init() {
    this.createGraph();
    this.addResizeListener();
  }

  createGraph() {
    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);

    this.links.forEach(([sourceId, targetId]) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.classList.add('link');
      this.linkElements.push(line);
      this.svg.appendChild(line);
    });

    this.nodes.forEach((node, index) => {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      
      rect.classList.add('node');
      text.classList.add('node-text');
      text.textContent = node.id;
      
      this.nodeElements[index] = rect;
      this.textElements[index] = text;
      
      group.appendChild(rect);
      group.appendChild(text);
      this.svg.appendChild(group);

      group.addEventListener('mouseover', () => console.log(`Hovered node: ${node.id}`));
      group.addEventListener('click', () => console.log(`Clicked node: ${node.id}`));
    });

    this.updatePositions();
  }

  updatePositions() {
    const containerWidth = this.container.clientWidth;
    this.currentHorizontalScale = containerWidth / baseWidth;

    this.nodes.forEach((node, index) => {
      const scaledX = node.x * this.currentHorizontalScale;
      const originalY = node.y;
      const size = node.size || 10;
      const rect = this.nodeElements[index];
      const text = this.textElements[index];

      rect.setAttribute('x', scaledX - size);
      rect.setAttribute('y', originalY - size);
      rect.setAttribute('width', size * 2);
      rect.setAttribute('height', size * 2);
      rect.setAttribute('fill', node.color);
      rect.setAttribute('stroke', node.id === "Inhinito" || node.id === "Inhinito" ? '#ffffff' : 'transparent');
      rect.setAttribute('stroke-width', node.id === "Inhinito" || node.id === "Inhinito" ? 12 : 0);

      text.setAttribute('x', scaledX);
      
      if (node.id === "Inhinito" || node.id === "Inhinito") {
        text.setAttribute('y', originalY - 34);
        text.setAttribute('dy', '0.15em');
      } else {
        text.setAttribute('y', originalY - (node.size ? 24 : 18));
        text.removeAttribute('dy');
      }
    });

    this.links.forEach(([sourceId, targetId], index) => {
      const source = this.nodes.find(n => n.id === sourceId);
      const target = this.nodes.find(n => n.id === targetId);
      const line = this.linkElements[index];

      if (!source || !target) {
        console.error(`Link references non-existent node: sourceId=${sourceId}, targetId=${targetId}`);
        return;
      }

      line.setAttribute('x1', source.x * this.currentHorizontalScale);
      line.setAttribute('y1', source.y);
      line.setAttribute('x2', target.x * this.currentHorizontalScale);
      line.setAttribute('y2', target.y);
    });
  }

  addResizeListener() {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => this.updatePositions());
    });
    resizeObserver.observe(this.container);
  }
}

var englishGraph;
var greekGraph;

// Initialize graphs
function initGraphs() {
  try {
    englishGraph = new GraphManager('english-network-graph', englishNodes, englishLinks);
    greekGraph = new GraphManager('greek-network-graph', greekNodes, greekLinks);
  } catch (error) {
    console.error('Graph initialization failed:', error);
  }
}

document.addEventListener('DOMContentLoaded', initGraphs);
// ...existing code...





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
