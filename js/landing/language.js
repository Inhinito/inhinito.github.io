const english = document.getElementById('english');
const greek = document.getElementById('greek');

const button1english = document.getElementById('button1-english');
const button1greek = document.getElementById('button1-greek');

const button2english = document.getElementById('button2-english');
const button2greek = document.getElementById('button2-greek');

const button3english = document.getElementById('button3-english');
const button3greek = document.getElementById('button3-greek');

// Clear the main menu's content.
function clearMainMenu() {
  // Loop through the main menu's children.
  for (let i = 0; i < mainMenu.children.length; i++) {
    // Make the content of the main menu disappear.
    mainMenu.children[i].style.display = 'none';
  }
}

english.addEventListener('click', function(e){
  e.preventDefault();

  // Set the language flag to English.
  languageFlag='english';
  soundRestart(toggle);

  startMenu.style.opacity = 0;
  footer.style.opacity = 0;

  // Fade in main menu. Setting opacity to 0 is enough to fade the menu out.
  menuButtons.style.opacity = 0;

  // Wait half a second for the menu to fade out.
  setTimeout(function(){
    // Set button values to English.
    supportButton.innerText = 'SUPPORT';
    button1.style.setProperty('--content', '"Intro"'); 
    button2.style.setProperty('--content', '"Projects"'); 
    button3.style.setProperty('--content', '"Story"'); 

    startMenuContent();
    startMenu.style.opacity = 1;

    // Fade in main menu. Setting opacity to 1 is enough to fade the menu in.
    menuButtons.style.opacity = 1;

    // Change the language content of the footer.
    footerContent();
    footer.style.opacity = 1;
  }, 200);
  
  
  // Load the menu content that the user was on before changing to Greek.
  rememberButton();
  
})

greek.addEventListener('click', function(e){
  e.preventDefault();

  // Set the language flag to Greek.
  languageFlag='greek';
  soundRestart(toggle);

  startMenu.style.opacity = 0;
  footer.style.opacity = 0;

  // Fade in main menu. Setting opacity to 0 is enough to fade the menu out.
  menuButtons.style.opacity = 0;

  // Wait half a second for the menu to fade out.
  setTimeout(function(){
    // Set button values to English.
    supportButton.innerText = 'ΥΠΟΣΤΗΡΙΞΗ';
    button1.style.setProperty('--content', '"Εισαγωγή"'); 
    button2.style.setProperty('--content', '"Έργα"');
    button3.style.setProperty('--content', '"Ιστορία"');

    startMenuContent();
    startMenu.style.opacity = 1;

    // Fade in main menu. Setting opacity to 1 is enough to fade the menu in.
    menuButtons.style.opacity = 1;

    // Change the language content of the footer.
    footerContent();
    footer.style.opacity = 1;
  }, 200);

  // Load the menu content that the user was on before changing to Greek.
  rememberButton();
})



function rememberButton(){

  // Fade in main menu. Setting opacity to 0 is enough to fade the menu out.
  mainMenu.style.opacity = 0;
  
  // Wait half a second for the menu to fade out.
  setTimeout(function(){

    clearMainMenu();
  
    // Fill the menu with content.
    if(buttonFlag=='button1'){
      button1content();
    } else if(buttonFlag=='button2'){
      button2content();
    } else if(buttonFlag=='button3'){
      button3content();
    }
    // Fade in main menu. Setting opacity to 1 is enough to fade the menu in.
    mainMenu.style.opacity = 1;

    // Reload the stars in the background.
    loadStars()
  }, 200);
}

// Button 1 was clicked.
function button1content(){
  // Check wether to load English or Greek menu content.
  if(languageFlag=='english'){
    button1english.style.display = 'block';
  } else {
    button1greek.style.display = 'block';
  }
}

// Button 2 was clicked.
function button2content(){
  // Check wether to load English or Greek menu content.
  if(languageFlag=='english'){
    button2english.style.display = 'block';
  } else {
    button2greek.style.display = 'block';
  }
}

// Button 3 was clicked.
function button3content(){
  // Check wether to load English or Greek menu content.
  if(languageFlag=='english'){
    button3english.style.display = 'block';
  } else {
    button3greek.style.display = 'block';
  }
}