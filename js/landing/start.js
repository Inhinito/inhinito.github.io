// Basic button pressed
const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");

// Get the main-menu div.
const mainContent = document.querySelector("main");
const mainMenu = document.getElementById("main-menu");

// Set the button flag to button1 at the beginning.
let buttonFlag = "button1";
// Set the start flag to false at the beginning
let startFlag = false;

const startMenu = document.getElementById("start-menu");

const startButton = document.querySelector("#start-button");
const reloadMainMenu = document.getElementById("reload-main-menu");
const contactButton = document.getElementById("contact-button");

const startMenuEnglish = document.getElementById("start-menu-english");
const startMenuGreek = document.getElementById("start-menu-greek");

// Set the fancy flag to true.
fancyFlag = true;

mainContent.style.display = "block";
// Show the start menu.
fadeInElement(mainContent, 500);

// The user has pressed the 'Start!' button.
startButton.addEventListener("click", function () {
  started();
});

function started() {
  soundRestart(pressStart);

  // Fade out the main content.
  mainContent.style.opacity = 0;
  // Fade out the footer.
  footer.style.opacity = 0;

  // Change the main content and fade in the new content.
  const startMenuInterval = setInterval(function () {
    // Make the start menu display on the DOM.
    startMenu.style.display = "block";
    // Fade in the main content.
    startMenu.style.opacity = 1;
    // Fade in the footer.
    footer.style.opacity = 1;

    // Remove the main menu from the DOM.
    mainContent.style.display = "none";
    mainMenu.style.display = "none";

    // Show the start menu.
    fillStartMenu();
    // Stop the interval from repeating itself.
    clearInterval(startMenuInterval);
    // Load the stars
    loadStars();
  }, 400);
}

// Go back to the main menu.
reloadMainMenu.addEventListener("click", function (evt) {
  soundRestart(back);

  evt.preventDefault();
  reloadMain(evt);
});

function reloadMain(evt) {
  startFlag = false;

  // Fade out the start menu.
  startMenu.style.opacity = 0;
  // Fade out the footer.
  footer.style.opacity = 0;

  // Change the main content and fade in the old content.
  const startMenuInterval = setInterval(function () {
    // Fade in the main content.
    fadeInElement(mainContent, 300);

    mainContent.style.display = "block";
    // Add the main menu back to the DOM.
    mainMenu.style.display = "block";
    mainMenu.style.opacity = 1;

    // Fade in the footer.
    footer.style.opacity = 1;

    // Remove the start menu from the DOM.
    startMenu.style.display = "none";

    // Stop the interval from repeating itself.
    clearInterval(startMenuInterval);
    // Load the stars
    loadStars();
  }, 300);
}

function fillStartMenu() {
  // Set the start flag to true.
  startFlag = true;

  // Fade in start menu.
  fadeInElement(startMenu, 300);

  startMenuContent();
}

function startMenuContent() {
  // Load the English menu content.
  if (languageFlag == "english") {
    // Set the main menu button value.
    reloadMainMenu.style.setProperty("--content", '"← Home Page"');

    startMenuGreek.style.display = "none";
    startMenuEnglish.style.display = "block";
  } else {
    // Set the main menu button value.
    reloadMainMenu.style.setProperty("--content", '"← Αρχική Σελίδα"');

    startMenuEnglish.style.display = "none";
    // Load the Greek menu content.// Check wether to load English or Greek menu content.
    startMenuGreek.style.display = "block";
  }
}

/* Main menu button functionality */

// Initialize the menu buttons.
contactButton.innerText = "Contact";
button1.style.setProperty("--background", "#fbc943");
button1.style.setProperty("--color", "#372963", "important");
button1.style.setProperty("--content", '"Mission"');
button2.style.setProperty("--color", "white", "important");
button2.style.setProperty("--content", '"Projects"');
button3.style.setProperty("--color", "white", "important");
button3.style.setProperty("--content", '"Cooperative"');

// Get the menuButtons section.
const menuButtons = document.getElementById("menu-buttons");
// Main menu selected effect.
menuButtons.addEventListener("mousedown", function (evt) {
  if (evt.target.nodeName == "BUTTON") {
    buttonColorReset(evt);
  }
});

menuButtons.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter" || evt.key === " ") {
    if (evt.target.nodeName == "BUTTON") {
      buttonColorReset(evt);
    }
  }
});

function buttonColorReset(evt) {
  // Set the background and text color of the buttons.
  button1.style.setProperty("--background", "#00000033");
  button1.style.setProperty("--color", "white", "important");

  button2.style.setProperty("--background", "#00000033");
  button2.style.setProperty("--color", "white", "important");

  button3.style.setProperty("--background", "#00000033");
  button3.style.setProperty("--color", "white", "important");

  evt.target.style.setProperty("--background", "#fbc943");
  evt.target.style.setProperty("--color", "#372963", "important");
}

// User pressed button 1.
button1.addEventListener("mousedown", function () {
  button1restart();
});
button1.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter" || evt.key === " ") {
    button1restart();
  }
});

function button1restart() {
  // Set the button flag.
  buttonFlag = "button1";
  // Button sfx.
  soundRestart(buttonClick);
  // Fade in main menu. Setting opacity to 0 is enough to fade the menu out.
  mainMenu.style.opacity = 0;
  // Fade out the footer.
  footer.style.opacity = 0;

  // Wait half a second for the menu to fade out.
  setTimeout(function () {
    clearMainMenu();
    // Fill the menu with content.
    button1content();
    // Fade in main menu. Setting opacity to 1 is enough to fade the menu in.
    mainMenu.style.opacity = 1;
    // Fade in the footer.
    footer.style.opacity = 1;

    loadStars();
  }, 300);
}

// User pressed button 2.
button2.addEventListener("mousedown", function () {
  button2restart();
});
button2.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter" || evt.key === " ") {
    button2restart();
  }
});

function button2restart() {
  // Set the button flag.
  buttonFlag = "button2";
  // Button sfx.
  soundRestart(buttonClick);
  // Fade in main menu. Setting opacity to 0 is enough to fade the menu out.
  mainMenu.style.opacity = 0;
  // Fade out the footer.
  footer.style.opacity = 0;

  // Wait half a second for the menu to fade out.
  setTimeout(function () {
    clearMainMenu();
    // Fill the menu with content.
    button2content();
    // Fade in main menu. Setting opacity to 1 is enough to fade the menu in.
    mainMenu.style.opacity = 1;
    // Fade in the footer.
    footer.style.opacity = 1;
    loadStars();
  }, 300);
}

// User pressed button 3.
button3.addEventListener("mousedown", function () {
  button3restart();
});
button3.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter" || evt.key === " ") {
    button3restart();
  }
});

function button3restart() {
  // Set the button flag.
  buttonFlag = "button3";
  // Button sfx.
  soundRestart(buttonClick);
  // Fade in main menu. Setting opacity to 0 is enough to fade the menu out.
  mainMenu.style.opacity = 0;
  // Fade out the footer.
  footer.style.opacity = 0;

  // Wait half a second for the menu to fade out.
  setTimeout(function () {
    clearMainMenu();
    // Fill the menu with content.
    button3content();
    // Fade in main menu. Setting opacity to 1 is enough to fade the menu in.
    mainMenu.style.opacity = 1;
    // Fade in the footer.
    footer.style.opacity = 1;
    loadStars();
  }, 300);
}
