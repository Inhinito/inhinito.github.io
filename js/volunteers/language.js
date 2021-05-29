const english = document.getElementById('english');
const greek = document.getElementById('greek');

const volunteersEnglish = document.getElementById('volunteers-english');
const volunteersGreek = document.getElementById('volunteers-greek');

const mainContent = document.querySelector('main');

mainContent.style.display = 'block';
fadeInMenu(mainContent, 500);

english.addEventListener('click', function(e){
  e.preventDefault();
  // Set the language flag to English.
  languageFlag='english';
  
  mainContent.style.opacity = 0;
  footerDetails.style.opacity = 0;
  
  // Wait half a second for the menu to fade out.
  setTimeout(function(){
    volunteersGreek.style.display = 'none';

    mainContent.style.opacity = 1;
    volunteersEnglish.style.display = 'block';

    // Change the language content of the footer.
    footerContent();
    footerDetails.style.opacity = 1;
  }, 200);
  
  
})

greek.addEventListener('click', function(e){
  e.preventDefault();
  // Set the language flag to Greek.
  languageFlag='greek';

  mainContent.style.opacity = 0;
  footerDetails.style.opacity = 0;

  // Wait half a second for the menu to fade out.
  setTimeout(function(){

    volunteersEnglish.style.display = 'none';

    mainContent.style.opacity = 1;
    volunteersGreek.style.display = 'block';

    // Change the language content of the footer.
    footerContent();
    footerDetails.style.opacity = 1;
  }, 200);


})

