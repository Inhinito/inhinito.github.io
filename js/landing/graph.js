let white = "#ffffff";
let red = "#ee4684";
let yellow = "#fbc943";

Highcharts.chart("graph-container", {
  chart: {
    type: "networkgraph",
    marginTop: 30,
    spacingTop: 60,
    backgroundColor: "transparent",
    events: {
      render: function () {
        // Apply a drop-shadow style to every node
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

  title: {
    text: null,
  },

  subtitle: {
    text: null,
  },

  plotOptions: {
    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        enableSimulation: true,
        integration: "verlet",
        linkLength: 100,
      },
    },
  },

  series: [
    {
      marker: {
        symbol: "square",
        radius: 10,
      },
      dataLabels: {
        enabled: true,
        linkFormat: "",
        allowOverlap: true,
        style: {
          fontSize: '18px',
          fontFamily: 'IBM',
          paddingBottom: '50px',
          color: '#fbc943',          // or your desired text color
          textOutline: '1px contrast #45156c'
        },
        x: 0,    // Shift the label horizontally
        y: -10   // Shift the label vertically (up in this example)
      },
      data: [
        ["Creative Agency", "Balto-Slavic"],
        ["Creative Agency", "Germanic"],
        ["Creative Agency", "Celtic"],
        ["Creative Agency", "Software"],
        ["Creative Agency", "Hellenic"],
        ["Creative Agency", "Anatolian"],
        ["Creative Agency", "Multimedia"],
        ["Creative Agency", "Tocharian"],
        ["Multimedia", "Dardic"],
        ["Multimedia", "Indic"],
        ["Multimedia", "Iranian"],
        ["Iranian", "Old Persian"],
        ["Old Persian", "Middle Persian"],
        ["Indic", "Sanskrit"],
        ["Software", "Osco-Umbrian"],
        ["Software", "Latino-Faliscan"],
        ["Latino-Faliscan", "Latin"],
        ["Celtic", "Brythonic"],
        ["Celtic", "Goidelic"],
      ],
      nodes: [
        {
          id: "Multimedia",
          color: yellow,
        },
        {
          id: "Dardic",
          color: yellow,
        },
        {
          id: "Indic",
          color: yellow,
        },
        {
          id: "Iranian",
          color: yellow,
        },
        {
          id: "Old Persian",
          color: yellow,
        },
        {
          id: "Middle Persian",
          color: yellow,
        },
        {
          id: "Sanskrit",
          color: yellow,
        },
        {
          id: "Celtic",
          color: white,
        },
        {
          id: "Brythonic",
          color: white,
        },
        {
          id: "Goidelic",
          color: white,
        },
        {
          id: "Creative Agency",
          color: white,
          marker: {
            radius: 20 // larger radius for this particular node
          },
          dataLabels: {
            y: -20,  // Shift the label vertically (up in this example)
          }
        },
        {
          id: "Balto-Slavic",
          color: white,
        },
        {
          id: "Germanic",
          color: white,
        },
        {
          id: "Hellenic",
          color: white,
        },
        {
          id: "Anatolian",
          color: white,
        },
        {
          id: "Tocharian",
          color: white,
        },
        {
          id: "Software",
          color: red,
        },
        {
          id: "Osco-Umbrian",
          color: red,
        },
        {
          id: "Latino-Faliscan",
          color: red,
        },
        {
          id: "Latin",
          color: red,
        },
        
      ],
    },
  ],
});
