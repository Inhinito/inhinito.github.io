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
// An array to hold the coordinates of all the stars;
starTops = [];
starStrings = [];

// A function to re-load the stars on demand.
function loadStars(changeStars = false){
    // Get the current window's width and height.
    let windowWidth = window.innerWidth - 25;
    let scrollHeight = document.body.offsetHeight;
    
    let windowHeight = scrollHeight - 30;

    // Clear the existing stars.
    stars = "";
    // Clear the constellation.
    constellation.innerHTML = '';

    
    // If the changeStars flag is on, do business as usual.
    if(changeStars) {
        // Clear the star tops array.
        starTops = [];
        starStrings = [];
    
        console.log('the window\'s width', windowWidth);
    
        // Initialize the amount of stars.
        let amountOfStars;
        // Check the width of the screen.
        if(windowWidth < 500) {
            amountOfStars = 50;
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

            let star = "<span class='star " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
            + size[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
            + getRandomArbitrary(25, windowWidth) + "px; top:" + top + "px;'></span>";

            // Add the star to the rest of the stars.
            stars += star;

            // Add a star to the star array.
            starTops.push(top);
            starStrings.push(star);
        }

    // In this case we will remove stars if they are overflowing over the HTML element and 
    // add them if they do not reach the end of the HTML element.
    } else {
        // Get the height of the HTML element.
        var htmlHeight = document.getElementsByTagName('html')[0].offsetWidth;
        console.log('The html height: ', htmlHeight);
        console.log('The window height: ', windowHeight);
        
        
        console.log('The HTML element is shorter');

        console.log('The star tops: ', starTops);
        // Loop through all of the stars.
        for (let i = 0; i < starTops.length; i++) {
            // Check if the star's distance from the top of the page is 
            // shorter than the HTML element's height.
            if(starTops[i] < (windowHeight)) {

                // Add the star's HTML as a string to the stars.
                stars += starStrings[i];
            
                
            }

        }

            

        // Check if the height of the HTML element is smaller than that of the page.
        if(htmlHeight > windowHeight) {
            // If the height of the page has grown, add stars to page's new height.
            console.log('The HTML element is longer');
        }


    }
    
    // Add the generated stars to the DOM.
    constellation.innerHTML = stars;


}

function init(){


    // Load the stars for the first time.
    loadStars(changeStars = true);

    // A function to debounce loading the stars every time the screen size changes.
    function debounce(func, timeout = 500){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    // Check if the size of the screen has changed and reload the stars for that size.
    window.addEventListener('resize', debounce(() => loadStars(changeStars = true)));

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