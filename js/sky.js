// The styles of the stars.
var style = ["style1", "style2", "style3", "style4"];
var size = ["size1", "size1", "size1", "size2", "size3"];
var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Remove the string of start from the string that contains all of the stars.
function removeStarFromStars(string, stringToRemove) {
    let start = string.indexOf(stringToRemove);
    return string.substr(0, start) + string.substr(start + stringToRemove.length);
}

var stars = "";
var constellation = document.querySelector(".constellation");
// A set to hold the heights / tops of all the stars;
const starHeights = new Set();


// The height of the previous page.
previousHeight = '';
// The width of the page from the previous loadStars event.
previousWidth = '';
// The previous page.
var previousPage = '';
// The previous language.
var previousLanguage = '';
// The previous menu.
var previousMenu = '';

// A function to re-load the stars on demand.
function loadStars(changeStars = false){
    console.log('\n\n\n');
    console.log('the previous page: ', previousPage);
    console.log('the previous language: ', previousLanguage);
    console.log('the previous menu: ', previousMenu);

    
    // Check if the user has changed tab or page width. This is important as some mobile browsers change height
    // when you scroll, so the stars should only re-render when the tab or the width of the page change.
    if((document.body.clientWidth == previousWidth) && (previousPage == buttonFlag) && (previousLanguage == languageFlag) && (previousMenu == startFlag)) {
        console.log('ABORT.');
        return
    } else {
        console.log('Load new stars!')
    }

    // Get the current window's width (do not add stars to the last 30 pixels of the page).
    let windowWidth = window.innerWidth - 50;
    // Get the height of the page.
    let scrollHeight = document.body.offsetHeight;
    // Do not add stars to the last 30 pixels of the page.
    let windowHeight = scrollHeight - 50;


    // If the changeStars flag is on, do business as usual.
    if(changeStars) {
        // Clear the existing stars.
        stars = "";
        // Clear the constellation.
        constellation.innerHTML = '';
        // Clear the star heights.
        starHeights.clear();
    
        // console.log('the window\'s width', windowWidth);
    
        // Initialize the amount of stars.
        let amountOfStars;
        // Check the width of the screen.
        if(windowWidth < 500) {
            amountOfStars = 60;
        } else if (windowWidth >= 500 && windowWidth <800) {
            amountOfStars = 90;
        } else if (windowWidth >= 800 && windowWidth < 1500){
            amountOfStars = 120;
        } else {
            amountOfStars = 200;
        }
    
        // Generate all the stars.
        for (var i = 0; i < amountOfStars; i++) {
            // The distance of the star from the top of the screen.
            let top = getRandomArbitrary(0, windowHeight);
            // Check if there is another star with this height. If we add 2 stars with the same height
            // then only of the two will be deleted when removing stars as sets delete all instances with delete().
            if(!starHeights.has(top)) {
                
                // Add a star's top to the starHeights set.
                starHeights.add(top);
    
                // Add the star to the rest of the stars.
                stars += "<span class='star " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
                + size[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
                + getRandomArbitrary(25, windowWidth) + "px; top:" + top + "px;'></span>";
            }
        }

        // Add the generated stars to the DOM.
        constellation.innerHTML = stars;

    // In this case we will remove stars if they are overflowing over the HTML element and 
    // add them if they do not reach the end of the HTML element.
    } else {
        

        // Check if the height of the new page is bigger than that of the previous page.
        if(scrollHeight > previousHeight) {
            // If the height of the page has grown, add stars to page's new height.
            // console.log('The HTML element is LONGER!');

            let newHeight = scrollHeight - previousHeight;
            // console.log('The old height: ', previousHeight);
            // console.log('The new height: ', newHeight);

            // Initialize the amount of filler stars.
            let fillerStarsAmount = 0;

            // Check the width of the screen.
            if(windowWidth < 500) {
                fillerStarsAmount = 40;
            } else if (windowWidth >= 500 && windowWidth <800) {
                fillerStarsAmount = 35;
            } else if (windowWidth >= 800 && windowWidth < 1500){
                fillerStarsAmount = 30;
            } else {
                fillerStarsAmount = 25;
            }
    

            let fillerStars = "";
            // Generate new filler stars to be placed in between the old and the new height.
            for (var i = 0; i < fillerStarsAmount; i++) {
                // The distance of the star from the old height.
                let top = getRandomArbitrary(previousHeight, scrollHeight);
                // Check if there is another star with this height. If we add 2 stars with the same height
                // then only of the two will be deleted when removing stars as sets delete all instances with delete().
                if(!starHeights.has(top)) {
                    
                    // Add a star's top to the starHeights set.
                    starHeights.add(top);
        
                    // Add the star to the rest of the stars.
                    fillerStars += "<span class='star " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
                    + size[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
                    + getRandomArbitrary(25, windowWidth) + "px; top:" + top + "px;'></span>";
                }
            }
            // Add the generated filler stars to the DOM.
            constellation.innerHTML += fillerStars;

        } else {
            console.log('The HTML element is SHORTER!!!');


            console.log('The star heights: ', starHeights)
            // Loop through all of the stars.
            starHeights.forEach((starHeight)=> {

                // Check if the star's distance from the top of the page is 
                // shorter than the HTML element's height.
                if(starHeight > windowHeight) {

                    // Get a single star that matches this height from the DOM.
                    let star = document.querySelector(`[style~="top:${starHeight}px;"]`);

                    // Remove the star from the DOM.
                    star.remove();
                    // Remove the star from the set.
                    starHeights.delete(starHeight);
                    
                }
            })

            
            
        }

    }

    // Save the height of the previous page.
    previousHeight = scrollHeight;
    // Save the width of this loadStars event.
    previousWidth = document.body.clientWidth;

    // Save the previous page.
    previousPage = buttonFlag;
    // Save the previous language.
    previousLanguage = languageFlag;
    // Save the previous menu.
    previousMenu = startFlag;
    
    console.log('The button flag: ', buttonFlag);
    console.log('The language flag: ', languageFlag);
    console.log('The menu flag: ', startFlag);
}

function init(){
    // The previous flags.
    previousPage = buttonFlag;
    previousLanguage = languageFlag;
    previousMenu = startFlag;

    // Load the stars for the first time.
    loadStars(changeStars = true);

    // A function to debounce loading the stars every time the screen size changes.
    function debounce(func, timeout = 1500){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    // Check if the size of the screen has changed and reload the stars for that size.
    window.addEventListener('resize', 
        debounce(() => {
            loadStars(changeStars = true);
        })
    );

    // A random number ().    
    var randomNumber = 1000;
    // Shoot the meteor at random intervals of time.
    setTimeout(function(){
        loadMeteor();
    }, randomNumber);

    // The function that generates a meteor.
    function loadMeteor(){
        setTimeout(loadMeteor, randomNumber);
        // Get a random number between 5000 and 10000.
        randomNumber = getRandomArbitrary(5000, 10000);
        // Create a meteor div element.
        var meteor = "<div class='meteor "+ style[getRandomArbitrary(0, 1.6)] +"'></div>";

        document.getElementsByClassName('meteorShower')[0].innerHTML = meteor;
        setTimeout(function(){
            document.getElementsByClassName('meteorShower')[0].innerHTML = "";
        }, 900);
    }

}


window.onload = init;