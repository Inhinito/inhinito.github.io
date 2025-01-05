let white = "#ffffffd4";
let yellow = "#ffd04d";
let red = "#f05181";

Highcharts.chart("graph-container", {
  chart: {
    type: "networkgraph",
    marginTop: 30,
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

  // Disable tooltips globally:
  tooltip: {
    enabled: false
  },

  plotOptions: {

    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        enableSimulation: true,
        integration: "verlet",
        // Arrange nodes in a circle by default
        initialPositions: "circle",
        // Spread them out for less clutter
        linkLength: 120,
      },
      // Define hover/select states here
      marker: {
        symbol: "square",
        radius: 10,
        states: {
          // hover: {
          //   fillColor: "#ffffff",   // Node color on hover
          // },
        },
      },
      // Attach the event here:
      point: {
        events: {
          hover: function () {
            console.log(`Hovered node: ${this.id}`);
            // Change the color of the node on hover
          },
          click: function () {
            // `this` refers to the clicked point (node).
            // `this.id` is the node's ID, e.g. "Inhinito", "Media", etc.
            console.log(`Clicked node: ${this.id}`);
            // Or call a function, pass it this.id, etc.
          }
        }
      }
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
          color: '#fbc943',          
          // Outline color (optional). Remove or modify as you like:
          textOutline: '1px contrast #45156c',
        },
        x: 0,
        y: -10
      },
      data: [
        ["Inhinito", "Marketing"],
        ["Inhinito", "Software"],
        ["Inhinito", "Media"],
        ["Media", "Photography"],
        ["Media", "Videography"],
        ["Sound Design", "Videography"],
        ["Media", "Sound Design"],
        ["Media", "Graphic Design"],
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
        {
          id: "Media",
          color: white,
          marker: {
            radius: 18
          },
          dataLabels: {
            y: -18
          }
        },
        {
          id: "Videography",
          color: white
        },
        {
          id: "Sound Design",
          color: white
        },
        {
          id: "Graphic Design",
          color: white
        },
        {
          id: "Photography",
          color: white
        },
        {
          id: "Influencers",
          color: white
        },
        {
          id: "Marketing",
          color: white,
          marker: {
            radius: 18
          },
          dataLabels: {
            y: -18
          }
        },
        {
          id: "Events",
          color: white
        },
        {
          id: "Digital Ads",
          color: white
        },
        {
          id: "Inhinito",
          color: yellow,
          marker: {
            radius: 18,
            lineColor: white,  // Border color
            lineWidth: 12      // Border width
          },
          dataLabels: {
            y: -24
          }
        },
        {
          id: "Software",
          color: white,
          marker: {
            radius: 18
          },
          dataLabels: {
            y: -18
          }
        },
        {
          id: "Websites",
          color: white
        },
        {
          id: "UX Design",
          color: white
        },
        {
          id: "Mobile Apps",
          color: white
        }
      ]
    }
  ]
});
