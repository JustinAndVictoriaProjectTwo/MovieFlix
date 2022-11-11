// TMDB API

// PSEUDO CODE!!!
// Create an app object (movieApp) 

// Create init method to start off application setup ()

// create a method (getMovies) to make API calls and get necessary data
    // url endpoint
    // URLSearch parameters taken from API documentation /search/multi https://developers.themoviedb.org/3/search/multi-search like query and overview
    // fetch request
    // .then() x2
        
// create a method (getUserInput) to take user input and store it into variables
    // add eventListener to listen for when the user submits the form
    // HTML structure
        // <form>
        //   <label>Find your movie</label> 
        //   <input type="text">
        //   <button></button>
        // </form>
        //    
    // pass variables as an argument when calling the getMovies function

// create a method to display movies onto page (based on user input) after user hits submit/search (displayMovies)
    // HTML structure for creating elements based on user input search results
    // append to existing ul from html file
        // <li>
        //   <div class="imgContainer">
        //      <img src="" alt="">
        //   </div>
        //   <div class="textContainer">
        //      <h2>Movie Title</h2>
        //      <p>Genre</p>
        //      <p>Release Year</p>
        //      <p>Cast</p>
        //      <p>Plot</p>
        //      <p>Rating</p>
        //      <p>Popularity</p>
        //   </div>
        // </li>   

// call displayMovies inside the getUserInput method to have results only show up when user hits submit (eventListener)

// call getMovies and getUserInput methods inside init
// Call init method at the bottom after defining other methods


const movieApp = {};

movieApp.apiKey = "dee84ae74dda515ad8539f9d406d253b"

// endpoint as pathname
movieApp.endpoint = "https://api.themoviedb.org/3/search/multi";

// baseUrl = "https://api.themoviedb.org/3" as origin property;

// create init method
movieApp.init = () => {
    console.log("heyyyyyy");
    movieApp.getMovies();
    movieApp.getUserInput();
}

// create method to get movies that the user searched for
// pass in the variable for user input value created in the getUserInput method
movieApp.getMovies = (userSearch) => {
    const myUrl = new URL(movieApp.endpoint);
    console.log(myUrl);

    // search params
    myUrl.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        // update value of search param to variable for user input value created in the getUserInput method
        query: userSearch,
        language: "en-US"
        //include_adult: false
    });
    console.log(myUrl);

    // fetch
    fetch(myUrl)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        movieApp.displayMovies(data.results);
    });

};

// create method to get user input
movieApp.getUserInput = () => {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Heyyyyyyy");

        // create a variable for the user input (search bar)
        const inputEl = document.querySelector("input");
        console.log(inputEl);

        // create variable for the value of the user input
        const userSearch = inputEl.value;
        console.log(userSearch);

        // call the getMovies function and pass it the variable for the user input value
        movieApp.getMovies(userSearch);

        movieApp.displayMovies();

    });
}
        
// display movies based on user search onto the page
movieApp.displayMovies = (results) => {
    console.log("results");

    // get ul from page
    const ulElement = document.querySelector("ul");

    // forEach, loop through array of movie items to put them on the page

    // We create a new li element and a new img element: 
    const newLi = document.createElement("li");
    const newImage = document.createElement("img");
    const newTitle = document.createElement("h2");

    newTitle.innerText = results.original_title;

    // We populate our image's attribute with info from our object:
    newImage.src = results.poster_path;
    //newImage.alt = picObject.alt_description;

    // We append the image in the li, an then the li in the ul we got above:
    newLi.append(newImage, newTitle);
    ulElement.append(newLi);
}


// call init method
movieApp.init();
