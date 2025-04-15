// The array of project objects.
const projects = [
  {
    id: 1,
    title: {
        english: "Article Reader Mobile App",
        greek: "Article Reader Mobile App"
    },
    type: [
      {
        english: "Sofware",
        greek: "Λογισμικό"
      }
    ],
    subtype: [
      {
        english: "Mobile Apps",
        greek: "Εφαρμογές"
      }
    ],
    client: {
        english: "Ideas Forward",
        greek: "Ideas Forward"
    },
    image: "media/images/projects/article-reader.png",
    link: "https://articlereader.ai/",
  },
  {
    id: 2,
    title: {
        english: "Eptapyrgio Videography",
        greek: "Βιντεοσκόπηση Επταπυργίου"
    },
    type: [
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      }
    ],
    subtype: [
      {
        english: "Videography",
        greek: "Βιντεοσκόπηση"
      }
    ],
    client: {
        english: "Cultural Center of Central Macedonia",
        greek: "Κέντρο Πολιτισμού Kεντρικής Μακεδονίας"
    },
    image: "media/images/projects/eptapyrgio-festival.png",
    link: "https://kepo.gr/festival/",
  },
  {
    id: 3,
    title: {
        english: "Walk Advertisement",
        greek: "Walk Διαφήμιση",
    },
    type: [
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      }, {
        english: "Marketing",
        greek: "Μάρκετινγκ"
      }
    ],
    subtype: [
      {
        english: "Videography",
        greek: "Βιντεοσκόπηση"
      }, {
        english: "Digital Ads",
        greek: "Διαφημίσεις"
      }
    ],
    client: {
        english: "Aristotle University",
        greek: "Αριστοτέλειο Πανεπιστήμιο"
    },
    image: "media/images/projects/walk.svg",
    link: "https://www.instagram.com/p/C_gOfe8o_k8/",
  },
  {
    id: 4,
    title: {
        english: "3D Drone Design",
        greek: "3D Σχεδίαση Drone"
    },
    type: [
        {
            english: "Multimedia",
            greek: "Πολυμέσα"
        }
    ],
    subtype: [
      {
        english: "3D Design",
        greek: "3D Σχεδίαση"
      },
    ],
    client: {
        english: "GEP Unmanned Technologies",
        greek: "GEP Μη-επανδρωμένες Τεχνολογίες"
    },
    image: "media/images/projects/gep.png",
    link: "https://www.gepdrones.com/",
  },
  {
    id: 5,
    title: {
        english: "Multispace Brand & Website",
        greek: "Multispace Brand & Ιστοσελίδα"
    },
    type: [
      {
        english: "Sofware",
        greek: "Λογισμικό"
      },
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      }
    ],
    subtype: [
      {
        english: "Websites",
        greek: "Ιστοσελίδες"
      },
      {
        english: "UX Design",
        greek: "Σχεδίαση UX"
      },
      {
        english: "Photography",
        greek: "Φωτογράφιση"
      },
      {
        english: "Graphic Design",
        greek: "Γραφιστική"
      }
    ],
    client: {
        english: "Multispace Serres",
        greek: "Multispace Σέρρες"
    },
    image: "media/images/projects/multispace.svg",
    link: "https://multispace.gr/",
  },
  {
    id: 6,
    title: {
        english: "Artist-Run Initiative Platform",
        greek: "Πλατφόρμα για τους καλλιτέχνες"
    },
    type: [
      {
        english: "Sofware",
        greek: "Λογισμικό"
      }
    ],
    subtype: [
      {
        english: "Websites",
        greek: "Ιστοσελίδες"
      },
    ],
    client: {
        english: "ArtNet",
        greek: "ArtNet"
    },
    image: "media/images/projects/artnet.svg",
    link: "https://aart.gr/",
  },
  {
    id: 7,
    title: {
        english: "Product Photography",
        greek: "Φωτογράφιση Προϊόντων"
    },
    type: [
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      }
    ],
    subtype: [
      {
        english: "Photography",
        greek: "Φωτογράφιση"
      }
    ],
    client: {
        english: "Arte",
        greek: "Arte"
    },
    image: "media/images/projects/arte.png",
    link: "https://www.arte.gr/",
  },
  {
    id: 8,
    title: {
        english: "Arch of Galerius 3D Reconstruction",
        greek: "Τρισδιάστατη ανακατασκευή της Καμάρας"
    },
    type: [
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      }
    ],
    subtype: [
      {
        english: "Photography",
        greek: "Φωτογράφιση"
      },
      {
        english: "3D Design",
        greek: "3D Σχεδίαση"
      }
    ],
    client: {
        english: "Project 210",
        greek: "Project 210"
    },
    image: "media/images/projects/project210.png",
    link: "https://project210.gr/",
  },
  {
    id: 9,
    title: {
        english: "Lofi Record Label",
        greek: "Δισκογραφική Lofi"
    },
    type: [
        {
            english: "Sofware",
            greek: "Λογισμικό"
        },
        {
            english: "Multimedia",
            greek: "Πολυμέσα"
        },
        {
            english: "Marketing",
            greek: "Μάρκετινγκ"
        }
    ],
    subtype: [
      {
        english: "Websites",
        greek: "Ιστοσελίδες"
      },
      {
        english: "Sound Design",
        greek: "Ηχοληψία"
      }
    ],
    client: {
        english: "Greek Lofi Community",
        greek: "Ελληνική Lofi Κοινότητα"
    },
    image: "media/images/projects/lofi.png",
    link: "https://lofi.gr/",
  },
  {
    id: 10,
    title: {
        english: "Promotional Videos",
        greek: "Διαφημιστικά Βίντεο"
    },
    type: [
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      },
    ],
    subtype: [
      {
        english: "Videography",
        greek: "Βιντεοσκόπηση"
      }
    ],
    client: {
        english: "PlayWise",
        greek: "PlayWise"
    },
    image: "media/images/projects/playwise.png",
    link: "https://playwise.gr/",
  },
  {
    id: 11,
    title: {
        english: "Event Videography",
        greek: "Βιντεοσκόπηση Εκδηλώσεων"
    },
    type: [
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      },
    ],
    subtype: [
      {
        english: "Videography",
        greek: "Βιντεοσκόπηση"
      },
      {
        english: "Photography",
        greek: "Φωτογράφιση"
      }
    ],
    client: {
        english: "Timing for Sports",
        greek: "Timing for Sports"
    },
    image: "media/images/projects/timing-for-sports.png",
    link: "https://timing4s.com/",
  },
  {
    id: 12,
    title: {
        english: "Become our partner",
        greek: "Γίνε συνεργάτης μας"
    },
    type: [
      {
        english: "Sofware",
        greek: "Λογισμικό"
      },
      {
        english: "Multimedia",
        greek: "Πολυμέσα"
      },
      {
        english: "Marketing",
        greek: "Μάρκετινγκ"
      },
    ],
    subtype: [
      {
        english: "Videography",
        greek: "Βιντεοσκόπηση"
      },
      {
        english: "Photography",
        greek: "Φωτογράφιση"
      }
    ],
    client: {
        english: "You are next",
        greek: "Είστε οι επόμενοι"
    },
    image: "media/images/projects/cooperate.png",
    link: "https://inhinito.com/",
  },
];