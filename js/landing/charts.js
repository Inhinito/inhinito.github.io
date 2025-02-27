/* Network Graphs */
const baseWidth = 600;
const baseHeight = 600;

const englishNodes = [
  { id: "Inhinito", x: 295, y: 310, color: "#ffd04d", size: 18 },
  { id: "Marketing", x: 170, y: 430, color: "#ffffff", size: 18 },
  { id: "Software", x: 370, y: 415, color: "#ffffff", size: 18 },
  { id: "Multimedia", x: 320, y: 200, color: "#ffffff", size: 18 },
  { id: "3D Modeling", x: 230, y: 50, color: "#ffffff" },
  { id: "Photography", x: 150, y: 145, color: "#ffffff" },
  { id: "Videography", x: 380, y: 100, color: "#ffffff" },
  { id: "Sound Design", x: 445, y: 270, color: "#ffffff" },
  { id: "Graphic Design", x: 190, y: 250, color: "#ffffff" },
  { id: "Mobile Apps", x: 390, y: 530, color: "#ffffff" },
  { id: "UX Design", x: 460, y: 480, color: "#ffffff" },
  { id: "Websites", x: 460, y: 365, color: "#ffffff" },
  { id: "Digital Ads", x: 190, y: 555, color: "#ffffff" },
  { id: "Events", x: 130, y: 490, color: "#ffffff" },
  { id: "Influencers", x: 140, y: 370, color: "#ffffff" }
];

const englishLinks = [
  ["Inhinito", "Marketing"],
  ["Inhinito", "Software"],
  ["Inhinito", "Multimedia"],
  ["Multimedia", "Photography"],
  ["Multimedia", "Videography"],
  ["Multimedia", "Sound Design"],
  ["Multimedia", "3D Modeling"],
  ["Multimedia", "Graphic Design"],
  ["Photography", "3D Modeling"],
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
  "3D Modeling": "3D Mοντελοποίηση",
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
  ["Πολυμέσα", "3D Mοντελοποίηση"],
  ["Πολυμέσα", "Γραφιστική"],
  ["Φωτογραφία", "3D Mοντελοποίηση"],
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
        text.setAttribute('y', originalY - 36);
        text.setAttribute('dy', '0.15em');
      } else {
        text.setAttribute('y', originalY - (node.size ? 28 : 20));
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

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Init the network graphs
    englishGraph = new GraphManager('english-network-graph', englishNodes, englishLinks);
    greekGraph = new GraphManager('greek-network-graph', greekNodes, greekLinks);
  } catch (error) {
    console.error('Graph initialization failed:', error);
  }

  // Highlight board members when hovering over co-op members.
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
