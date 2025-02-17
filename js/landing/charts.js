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


/* Organization Chart */
Highcharts.chart("english-hierarchy-chart", {
  chart: {
    height: 500,
    width: null,
    padding: 30,
    inverted: true,
    backgroundColor: "transparent",
  },

  title: {
    text: null,
  },

  accessibility: {
    point: {
      descriptionFormat:
        "{add index 1}. {toNode.name}" +
        "{#if (ne toNode.name toNode.id)}, {toNode.id}{/if}, " +
        "reports to {fromNode.id}",
    },
  },

  series: [
    {
      type: "organization",
      name: "Cooperative",
      keys: ["from", "to"],
      data: [
        ["Inhinito Cooperative", "Board of Directors"],
        ["Inhinito Cooperative", "Co-op Members"],
        ["Inhinito Cooperative", "External Partners"],
        ["Board of Directors", "President"],
        ["Board of Directors", "Secretary"],
        ["Board of Directors", "Treasurer"],
        ["Co-op Members", "President"],
        ["Co-op Members", "Secretary"],
        ["Co-op Members", "Treasurer"],
        ["Co-op Members", "Member 4"],
        ["Co-op Members", "Member 5"],
        ["Co-op Members", "Member 6"],
        ["Co-op Members", "Member 7"],
        ["External Partners", "Creator Network"],
        ["External Partners", "Business Partners"],
      ],
      levels: [
        {
          level: 0,
          color: "#fbc943",
          dataLabels: {
            color: "black",
          },
          height: 25,
        },
        {
          level: 1,
          color: "#ee4684",
          dataLabels: {
            color: "black",
          },
          height: 25,
        },
        {
          level: 2,
          color: "gray",
          dataLabels: {
            color: "white",
          },
        },
      ],
      nodes: [
        {
          id: "Cooperative Members",
          name: "Cooperative Members",
          column: 0,
        },
        {
          id: "Board of Directors",
          name: "Board of Directors",
          column: 1,
        },
        {
          id: "President",
          title: "President",
          name: "John Doe",
          column: 2,
        },
        {
          id: "Secretary",
          title: "Secretary",
          name: "Jane Smith",
          column: 2,
        },
        {
          id: "Treasurer",
          title: "Treasurer",
          name: "Jim Brown",
          column: 2,
        },
        {
          id: "Member 4",
          name: "Member 4",
          column: 3,
        },
        {
          id: "Member 5",
          name: "Member 5",
          column: 3,
        },
        {
          id: "Member 6",
          name: "Member 6",
          column: 3,
        },
        {
          id: "Member 7",
          name: "Member 7",
          column: 3,
        },
        {
          id: "Creator Network",
          name: "Creator Network",
          column: 4,
        },
        {
          id: "Business Partners",
          name: "Business Partners",
          column: 4,
        },
      ],

      nodeWidth: 40,
      // Make the nodes taller
      height: 50,
      borderRadius: 1,
      colorByPoint: false,
      color: "#030404",
      borderColor: "#44166d",
      borderWidth: 1,
      dataLabels: {
        enabled: true,
        color: "white",
        style: {
          fontFamily: "IBM",
          fontSize: "16px",
          textOutline: "none",
          fontWeight: "normal",
        },
      },
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 450,
        },
        chartOptions: {
          series: [
            {
              nodeWidth: 40,
              height: 60,
            },
          ],
        },
      },
    ],
  },
  tooltip: {
    outside: true,
  },
  exporting: {
    allowHTML: true,
    sourceWidth: 800,
    sourceHeight: 600,
  },
});

