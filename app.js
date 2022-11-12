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

// call displayMovies inside the second .then of the getMovies method  to have results only show up after getting data

// call getMovies and getUserInput methods inside init
// Call init method at the bottom after defining other methods

// workflow: getMovies(), displayMovies(), getUserInput(), getMovies(from userInput), displayMovies(from userInput)


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
        // results name of predefined object for multi-search API
        console.log(data.results);
        
        // clear the movieList (ul) when user inputs new search
        document.querySelector(".movieList").innerHTML = "";

        // call displayMovies method with the data of our results object as an argument to get results displayed to the page after getting a response from the API call
        movieApp.displayMovies(data.results);
    });

};

// create method to get user input
movieApp.getUserInput = () => {

    // add event listener to our existing form to listen for when the user hits the search button
    document.querySelector("form").addEventListener("submit", function(event) {
        // prevent default behaviour of form (constantly refreshing)
        event.preventDefault();
        console.log("Heyyyyyyy");

        // create a variable for the user input (search bar)
        const inputEl = document.querySelector("input");
        console.log(inputEl);

        // create a variable for the value of the user input
        const userSearch = inputEl.value;
        console.log(userSearch);

        // if statetement to change default movie displayed
        if (userSearch) {
            console.log(userSearch);
        }
        else {
            console.log("It's the avengers");
            userSearch = "Avengers";
        }
        // call the getMovies method and pass it the variable for the user input value
        movieApp.getMovies(userSearch);

        // movieApp.displayMovies(data.results);
        // console.log(data.results);

       

    });
}
        
// create a method to display movies based on user search onto the page
movieApp.displayMovies = (searchResults) => {
    console.log(searchResults);

    // forEach, loop through array of movie items to put them onto the page
    // movie as a parameter for each search result
    searchResults.forEach(movie => {
        console.log(movie);
    
        // get ul from page
        const ulElement = document.querySelector("ul");
        // create a new li element, a new img, h2, p (media type) p (plot), p (language), p (popularity), p (vote average), p (vote count) element: 
        const newLi = document.createElement("li");
        const newImage = document.createElement("img");
        const newTitle = document.createElement("h2");
        const mediaType = document.createElement("p");
        const plot = document.createElement("p");
        const language = document.createElement("p");
        const releaseDate = document.createElement("p");
        const popularRating = document.createElement("p");
        const voteAverage = document.createElement("p");
        const voteCount = document.createElement("p");

        // use predefined original_title property of our object for the newTitle variable
        newTitle.innerText = movie.original_title;
        console.log(movie.original_title);

        // create variable for base url and file size to have complete url for the poster, add that to the poster_path property of the object
        const baseUrl = "https://image.tmdb.org/t/p/w500/";

        // We populate our image's attribute with info from our object:
        newImage.src = `${baseUrl}${movie.poster_path}`;
        console.log(newImage.src);
        //newImage.alt = picObject.alt_description;

        // add alt description to poster img
        newImage.alt = `${movie.original_title}`;
        console.log(newImage.alt);

        // use predefined media_type property of our object for the p element:
        mediaType.innerText = movie.media_type;
        console.log(movie.media_type);

        // use predefined overview property of our object for the p element
        plot.innerText = `Plot: ${movie.overview}`;
        console.log(movie.overview);

        // use predefined original language property of our object for the p element:
        language.innerText = `Original Language: ${movie.original_language}`;
        console.log(movie.original_language);

        // use predefined release date property of our object for the p element:
        releaseDate.innerText = `Release Date: ${movie.release_date}`;


        // use predefined popularity property of our object for another p element
        popularRating.innerText = `Popularity: ${movie.popularity}`;
        console.log(movie.popularity);

        // use predefined vote average and vote count properties of our object for other p elements:
        voteAverage.innerText = `Vote Average: ${movie.vote_average}`;

        voteCount.innerText = `Vote Count: ${movie.vote_count}`;

        console.log(movie.vote_average, movie.vote_count);

        // append the image and the title in the li, an then the li in the ul we got above:
        newLi.append(newImage, newTitle, mediaType, plot, language, releaseDate, popularRating, voteAverage, voteCount);
        ulElement.append(newLi);
    });

    
}


// call init method
movieApp.init();
