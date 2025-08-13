/* Network Graphs */
const baseWidth = 600;
const baseHeight = 600;

const englishNodes = [
  { id: "Inhinito", x: 295, y: 310, color: "#ffd04d", size: 18 },
  { id: "Software", x: 370, y: 430, color: "#ffffff", size: 18 },
  { id: "Multimedia", x: 320, y: 180, color: "#ffffff", size: 18 },
  { id: "3D Modeling", x: 230, y: 50, color: "#ffffff" },
  { id: "Photography", x: 150, y: 140, color: "#ffffff" },
  { id: "Videography", x: 380, y: 110, color: "#ffffff" },
  { id: "Sound Design", x: 445, y: 270, color: "#ffffff" },
  { id: "Graphic Design", x: 190, y: 240, color: "#ffffff" },
  { id: "Mobile Apps", x: 390, y: 555, color: "#ffffff" },
  { id: "UX Design", x: 460, y: 500, color: "#ffffff" },
  { id: "Websites", x: 460, y: 380, color: "#ffffff" },
  { id: "Digital Ads", x: 190, y:580, color: "#ffffff" },
  { id: "Events", x: 130, y: 515, color: "#ffffff" },
  { id: "Influencers", x: 140, y: 380, color: "#ffffff" }
];

const englishLinks = [
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
  ["Software", "Events"],
  ["Software", "Digital Ads"],
  ["Software", "Influencers"]
];

// Greek translations
const greekLabels = {
  "Inhinito": "Inhinito",
  "Software": "Λογισμικό",
  "Multimedia": "Πολυμέσα",
  "Photography": "Φωτογράφιση",
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
  ["Inhinito", "Λογισμικό"],
  ["Inhinito", "Πολυμέσα"],
  ["Πολυμέσα", "Φωτογράφιση"],
  ["Πολυμέσα", "Βιντεοσκόπηση"],
  ["Πολυμέσα", "Ηχοληψία"],
  ["Πολυμέσα", "3D Mοντελοποίηση"],
  ["Πολυμέσα", "Γραφιστική"],
  ["Φωτογράφιση", "3D Mοντελοποίηση"],
  ["Ηχοληψία", "Βιντεοσκόπηση"],
  ["Λογισμικό", "Ιστοσελίδες"],
  ["Λογισμικό", "Σχεδίαση UX"],
  ["Λογισμικό", "Εφαρμογές"],
  ["Σχεδίαση UX", "Εφαρμογές"],
  ["Σχεδίαση UX", "Ιστοσελίδες"],
  ["Πολυμέσα", "Εκδηλώσεις"],
  ["Πολυμέσα", "Διαφημίσεις"],
  ["Πολυμέσα", "Influencers"]
];


class GraphManager {
  constructor(svgId, nodes, links) {
    this.svg = document.getElementById(svgId);
    this.container = this.svg.closest('.graph-container');
    this.nodes = nodes;
    this.links = links;

    this.nodeMap = nodes.reduce((map, node) => (map[node.id] = node, map), {});
    this.nodeElements = [];
    this.linkElements = [];
    this.textElements = [];

    this.init();
  }

  init() {
    this.createGraph();
    this.addResizeListener();
  }

  createGraph() {
    const fragment = document.createDocumentFragment();

    this.links.forEach(() => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.classList.add('link');
      fragment.appendChild(line);
      this.linkElements.push(line);
    });

    this.nodes.forEach((node, index) => {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

      rect.classList.add('node');
      rect.setAttribute('fill', node.color);

      text.classList.add('node-text');
      text.textContent = node.id;

      group.append(rect, text);

      group.addEventListener('mouseover', () => console.log(`Hovered node: ${node.id}`));
      group.addEventListener('click', () => console.log(`Clicked node: ${node.id}`));

      fragment.appendChild(group);
      this.nodeElements[index] = rect;
      this.textElements[index] = text;
    });

    this.svg.textContent = '';
    this.svg.appendChild(fragment);

    this.updatePositions();
  }

  updatePositions() {
    const scale = this.container.clientWidth / baseWidth;

    this.nodes.forEach(({ x, y, size = 10, id }, i) => {
      const scaledX = x * scale;
      const rect = this.nodeElements[i];
      const text = this.textElements[i];

      rect.setAttribute('x', scaledX - size);
      rect.setAttribute('y', y - size);
      rect.setAttribute('width', size * 2);
      rect.setAttribute('height', size * 2);

      const isCentralNode = id === "Inhinito";
      rect.setAttribute('stroke', isCentralNode ? '#ffffff' : 'transparent');
      rect.setAttribute('stroke-width', isCentralNode ? 12 : 0);

      text.setAttribute('x', scaledX);
      text.setAttribute('y', y - (isCentralNode ? 36 : (size ? 28 : 20)));
      if (isCentralNode) text.setAttribute('dy', '0.15em');
      else text.removeAttribute('dy');
    });

    this.links.forEach(([sourceId, targetId], i) => {
      const { x: x1, y: y1 } = this.nodeMap[sourceId];
      const { x: x2, y: y2 } = this.nodeMap[targetId];
      const line = this.linkElements[i];

      line.setAttribute('x1', x1 * scale);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2 * scale);
      line.setAttribute('y2', y2);
    });
  }

  addResizeListener() {
    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(this.updatePositions.bind(this)));
    resizeObserver.observe(this.container);
  }
}

const setupHighlightListeners = () => {
  // Select all trees on the page
  const trees = document.querySelectorAll('.tree');
  
  trees.forEach(tree => {
    // More specific selectors
    const rootUl = tree.querySelector('ul');
    if (!rootUl) {
      // No root UL found in tree
      return;
    }
    
    // Find the direct child LI that contains the main menu
    const mainLi = rootUl.querySelector(':scope > li');
    if (!mainLi) {
      // No main LI found in tree
      return;
    }
    
    // Find the UL containing the menu categories
    const categoryUl = mainLi.querySelector(':scope > ul');
    if (!categoryUl) {
      // No category UL found in tree
      return;
    }
    
    // Now find the specific list items
    const boardMembersLi = categoryUl.querySelector(':scope > li:nth-child(1)');
    const coOpMembersLi = categoryUl.querySelector(':scope > li:nth-child(2)');
    
    if (!boardMembersLi || !coOpMembersLi) {
      // Could not find required list items
      return;
    }
    
    // Get the links
    const boardMembersLink = boardMembersLi.querySelector(':scope > a');
    const coOpMembersLink = coOpMembersLi.querySelector(':scope > a');
    
    if (!boardMembersLink || !coOpMembersLink) {
      // Required links not found
      return;
    }
    
    // Get board member children correctly
    const boardMemberChildren = boardMembersLi.querySelectorAll('ul > li > a');
    
    // Add event listeners
    coOpMembersLink.addEventListener('mouseenter', () => {
      boardMembersLink.classList.add('force-highlight');
      boardMemberChildren.forEach(child => child.classList.add('force-highlight'));
    });
    
    coOpMembersLink.addEventListener('mouseleave', () => {
      boardMembersLink.classList.remove('force-highlight');
      boardMemberChildren.forEach(child => child.classList.remove('force-highlight'));
    });
  });
};

let englishGraph, greekGraph;

document.addEventListener('DOMContentLoaded', () => {
  try {
    englishGraph = new GraphManager('english-network-graph', englishNodes, englishLinks);
    greekGraph = new GraphManager('greek-network-graph', greekNodes, greekLinks);
    setupHighlightListeners();
  } catch (error) {
    console.error('Graph initialization failed:', error);
  }
});