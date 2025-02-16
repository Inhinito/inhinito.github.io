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
        this.series[0].nodes.forEach(node => {
          if (node.graphic) {
            node.graphic.attr({
              style: 'filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.82))'
            });
          }
        });
      }
    }
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
        initialPositions: 'circle',
        linkLength: 130
      },
      marker: {
        symbol: "square",
        radius: 10
      },
      point: {
        events: {
          hover: function () {
            console.log(`Hovered node: ${this.id}`);
          },
          click: function () {
            console.log(`Clicked node: ${this.id}`);
          }
        }
      }
    },
    
      
  },
  series: [
    {
      link: {
        width:1.5, // This sets the line thickness
        color: "#ffffff4f",
      },
      marker: {
        symbol: "square",
        radius: 10
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
          textOutline: "1px contrast #45156c"
        },
        x: 0,
        y: -10
      },
    }
  ]
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
        ["Marketing", "Influencers"]
      ],
      nodes: [
        { id: "Inhinito", x: 0, y: 0, color: yellow, marker: { radius: 18, lineColor: white, lineWidth: 12 }, dataLabels: { y: -24 } },
        { id: "Marketing", x: -100, y: 0, color: white, marker: { radius: 18 }, dataLabels: { y: -18 }},
        { id: "Software", x: 100, y: 0, color: white, marker: { radius: 18 }, dataLabels: { y: -18 }},
        { id: "Multimedia", x: 0, y: -100, color: white, marker: { radius: 18 }, dataLabels: { y: -18 }},
        { id: "Photography", x: -50, y: -200, color: white },
        { id: "Videography", x: 50, y: -200, color: white },
        { id: "Sound Design", x: 100, y: -150, color: white },
        { id: "Graphic Design", x: -100, y: -150, color: white },
        { id: "Websites", x: 150, y: 100, color: white },
        { id: "UX Design", x: 200, y: 50, color: white },
        { id: "Mobile Apps", x: 250, y: 100, color: white },
        { id: "Events", x: -150, y: 50, color: white },
        { id: "Digital Ads", x: -200, y: 100, color: white },
        { id: "Influencers", x: -250, y: 50, color: white }
      ]
    }
  ]
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
        ["Μάρκετινγκ", "Influencers"]
      ],
      nodes: [
        { id: "Inhinito", x: 0, y: 0, color: yellow, marker: { radius: 18, lineColor: white, lineWidth: 12 }, dataLabels: { y: -24 } },
        { id: "Μάρκετινγκ", x: -100, y: 0, color: white, marker: { radius: 18 }, dataLabels: { y: -18 }},
        { id: "Λογισμικό", x: 100, y: 0, color: white, marker: { radius: 18 }, dataLabels: { y: -18 }},
        { id: "Πολυμέσα", x: 0, y: -100, color: white, marker: { radius: 18 }, dataLabels: { y: -18 }},
        { id: "Φωτογραφία", x: -50, y: -200, color: white },
        { id: "Βιντεογραφία", x: 50, y: -200, color: white },
        { id: "Ηχοληψία", x: 100, y: -150, color: white },
        { id: "Γραφιστική", x: -100, y: -150, color: white },
        { id: "Ιστοσελίδες", x: 150, y: 100, color: white },
        { id: "Σχεδίαση UX", x: 200, y: 50, color: white },
        { id: "Εφαρμογές", x: 250, y: 100, color: white },
        { id: "Εκδηλώσεις", x: -150, y: 50, color: white },
        { id: "Διαφημίσεις", x: -200, y: 100, color: white },
        { id: "Influencers", x: -250, y: 50, color: white }
      ]
    }
  ]
});


/* Organiation Chart */

Highcharts.chart('hierarchy-english-chart', {
  chart: {
    height: 600,
    inverted: true
  },

  title: {
    text: 'Highcharts Organizational Chart'
  },

  accessibility: {
    point: {
      descriptionFormat: '{add index 1}. {toNode.name}' +
        '{#if (ne toNode.name toNode.id)}, {toNode.id}{/if}, ' +
        'reports to {fromNode.id}'
    }
  },

  series: [{
    type: 'organization',
    name: 'Highsoft',
    keys: ['from', 'to'],
    data: [
      ['Shareholders', 'Board'],
      ['Board', 'CEO'],
      ['CEO', 'CTO'],
      ['CEO', 'CPO'],
      ['CEO', 'CSO'],
      ['CEO', 'HR'],
      ['CTO', 'Product'],
      ['CTO', 'Web'],
      ['CSO', 'Sales'],
      ['HR', 'Market'],
      ['CSO', 'Market'],
      ['HR', 'Market'],
      ['CTO', 'Market']
    ],
    levels: [{
      level: 0,
      color: 'silver',
      dataLabels: {
        color: 'black'
      },
      height: 25
    }, {
      level: 1,
      color: 'silver',
      dataLabels: {
        color: 'black'
      },
      height: 25
    }, {
      level: 2,
      color: '#980104'
    }, {
      level: 4,
      color: '#359154'
    }],
    nodes: [{
      id: 'Shareholders'
    }, {
      id: 'Board'
    }, {
      id: 'CEO',
      title: 'CEO',
      name: 'Atle Sivertsen',
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2022/06/30081411/portrett-sorthvitt.jpg'
    }, {
      id: 'HR',
      title: 'CFO',
      name: 'Anne Jorunn Fjærestad',
      color: '#007ad0',
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg'
    }, {
      id: 'CTO',
      title: 'CTO',
      name: 'Christer Vasseng',
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
    }, {
      id: 'CPO',
      title: 'CPO',
      name: 'Torstein Hønsi',
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg'
    }, {
      id: 'CSO',
      title: 'CSO',
      name: 'Anita Nesse',
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg'
    }, {
      id: 'Product',
      name: 'Product developers'
    }, {
      id: 'Web',
      name: 'Web devs, sys admin'
    }, {
      id: 'Sales',
      name: 'Sales team'
    }, {
      id: 'Market',
      name: 'Marketing team',
      column: 5
    }],
    colorByPoint: false,
    color: '#007ad0',
    dataLabels: {
      color: 'white'
    },
    borderColor: 'white',
    nodeWidth: 'auto'
  }],
  tooltip: {
    outside: true
  },
  exporting: {
    allowHTML: true,
    sourceWidth: 800,
    sourceHeight: 600
  }

});