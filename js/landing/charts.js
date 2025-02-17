/* Network Graphs */
let white = "#ffffff";
let yellow = "#ffd04d";
let red = "#f05181";

// Shared configuration
const baseConfig = {
  chart: {
    type: "networkgraph",
    marginTop: 30,
    height: 600,
    backgroundColor: "transparent",
    events: {
      render: function () {
        this.series[0].nodes.forEach((node) => {
          if (node.graphic) {
            node.graphic.attr({
              style:
                "filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.82))",
            });
          }
        });
      },
    },
  },
  title: { text: null },
  subtitle: { text: null },
  tooltip: { enabled: false },
  plotOptions: {
    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        integration: "verlet",
        // Disable simulation for static positioning.
        enableSimulation: true,
        initialPositions: "circle",
        linkLength: 130,
      },
      marker: {
        symbol: "square",
        radius: 10,
      },
      point: {
        events: {
          hover: function () {
            console.log(`Hovered node: ${this.id}`);
          },
          click: function () {
            console.log(`Clicked node: ${this.id}`);
          },
        },
      },
    },
  },
  series: [
    {
      link: {
        width: 1.5, // This sets the line thickness
        color: "#ffffff4f",
      },
      marker: {
        symbol: "square",
        radius: 10,
      },
      dataLabels: {
        enabled: true,
        linkFormat: "",
        allowOverlap: true,
        style: {
          fontSize: "10px",
          fontFamily: "PressStart",
          // fontSize: "18px",
          // fontFamily: "IBM",
          color: "#fbc943",
          textOutline: "1px contrast #45156c",
        },
        x: 0,
        y: -10,
      },
    },
  ],
};

// English Graph
Highcharts.chart("english-network-graph", {
  ...baseConfig,
  series: [
    {
      ...baseConfig.series[0],
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
        ["Marketing", "Events"],
        ["Marketing", "Digital Ads"],
        ["Marketing", "Influencers"],
      ],
      nodes: [
        {
          id: "Inhinito",
          x: 0,
          y: 0,
          color: yellow,
          marker: { radius: 18, lineColor: white, lineWidth: 12 },
          dataLabels: { y: -24 },
        },
        {
          id: "Marketing",
          x: -100,
          y: 0,
          color: white,
          marker: { radius: 18 },
          dataLabels: { y: -18 },
        },
        {
          id: "Software",
          x: 100,
          y: 0,
          color: white,
          marker: { radius: 18 },
          dataLabels: { y: -18 },
        },
        {
          id: "Multimedia",
          x: 0,
          y: -100,
          color: white,
          marker: { radius: 18 },
          dataLabels: { y: -18 },
        },
        { id: "Photography", x: -50, y: -200, color: white },
        { id: "Videography", x: 50, y: -200, color: white },
        { id: "Sound Design", x: 100, y: -150, color: white },
        { id: "Graphic Design", x: -100, y: -150, color: white },
        { id: "Websites", x: 150, y: 100, color: white },
        { id: "UX Design", x: 200, y: 50, color: white },
        { id: "Mobile Apps", x: 250, y: 100, color: white },
        { id: "Events", x: -150, y: 50, color: white },
        { id: "Digital Ads", x: -200, y: 100, color: white },
        { id: "Influencers", x: -250, y: 50, color: white },
      ],
    },
  ],
});

// Greek Graph
Highcharts.chart("greek-network-graph", {
  ...baseConfig,
  series: [
    {
      ...baseConfig.series[0],
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
        {
          id: "Inhinito",
          x: 0,
          y: 0,
          color: yellow,
          marker: { radius: 18, lineColor: white, lineWidth: 12 },
          dataLabels: { y: -24 },
        },
        {
          id: "Μάρκετινγκ",
          x: -100,
          y: 0,
          color: white,
          marker: { radius: 18 },
          dataLabels: { y: -18 },
        },
        {
          id: "Λογισμικό",
          x: 100,
          y: 0,
          color: white,
          marker: { radius: 18 },
          dataLabels: { y: -18 },
        },
        {
          id: "Πολυμέσα",
          x: 0,
          y: -100,
          color: white,
          marker: { radius: 18 },
          dataLabels: { y: -18 },
        },
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
