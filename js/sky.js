function init(){

    // The styles of the stars.
    var style = ["style1", "style2", "style3", "style4"];
    var size = ["size1", "size1", "size1", "size2", "size3"];
    var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var stars = "";
    var constellation = document.querySelector(".constellation");
    
    // A function to re-load the stars on demand.
    function loadStars(){
        // Clear the existing stars.
        stars = "";
        constellation.innerHTML = '';

        // Get the current window's width and height.
        let windowWidth = window.innerWidth - 25;
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        let windowHeight = scrollHeight - 30;

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
            amountOfStars = 250;
        }

        // Generate all the stars.
        for (var i = 0; i < amountOfStars; i++) {
            stars += "<span class='star " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
            + size[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
            + getRandomArbitrary(25, windowWidth) + "px; top: " + getRandomArbitrary(0, windowHeight) + "px;'></span>";
        }

        // Add the generated stars to the DOM.
        constellation.innerHTML = stars;
    }

    // Load the stars for the first time.
    loadStars();

    // A function to debounce loading the stars every time the screen size changes.
    function debounce(func, timeout = 500){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    
    // Check if the size of the screen has changed and reload the stars for that size.
    window.addEventListener('resize', debounce(() => loadStars()));


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