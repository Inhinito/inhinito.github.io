
// Set the language flag to english at the beginning.
let languageFlag = 'english';

// Get the go to the top link button.
const goTop = document.getElementById('go-top');

const footer = document.querySelector('footer');
const footerDetails = document.getElementById('footer-details');

const footerEnglish = document.getElementById('footer-english');
const footerGreek = document.getElementById('footer-greek');

const footerYears = document.getElementsByClassName('current-year');

/**
 * Fade in the main menu.
 * @param {*} el The menu div element.
 * @param {*} time The amount of time it takes to fade in.
 */
 function fadeInMenu(el, time) {
    el.style.opacity = 0;

    let last = +new Date();
    let tick = function () {
        el.style.opacity = +el.style.opacity + (new Date() - last) / time;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };
    tick();
}

let currentYear = new Date().getFullYear();
// Set the current Year in both the English and the Greek footers.
footerYears[0].innerText = currentYear;
footerYears[1].innerText = currentYear;


// Fade in the footer.
fadeInMenu(footer, 700);
footer.style.display = 'block';

// Change the footer's language content.
function footerContent(){
    console.log('Gets called');
    // Check wether to load English or Greek menu content.
    if(languageFlag=='english'){
        footerEnglish.style.display = 'block';
        footerGreek.style.display = 'none';
    } else {
        footerGreek.style.display = 'block';
        footerEnglish.style.display = 'none';
    }
}

// Scroll back to the top of the page.
// goTop.addEventListener('click', function(){
//     soundRestart(toggle);
//     window.scrollTo(0,0);
// });
  

// Facebook Chat.
// var chatbox = document.getElementById('fb-customer-chat');
// chatbox.setAttribute("page_id", "175067943434194");
// chatbox.setAttribute("attribution", "biz_inbox");
// window.fbAsyncInit = function() {
//     FB.init({
//     xfbml            : true,
//     version          : 'v10.0'
//     });
// };

// (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
