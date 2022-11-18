
const movieApp = {};
movieApp.apiKey = "dee84ae74dda515ad8539f9d406d253b"

// endpoint as pathname
movieApp.endpoint = "https://api.themoviedb.org/3/search/multi";

// endpoint tv genres
movieApp.endpointTvGenres = "https://api.themoviedb.org/3/genre/tv/list?api_key=dee84ae74dda515ad8539f9d406d253b&language=en-US"

// baseUrl = "https://api.themoviedb.org/3" as origin property;

// create init method
movieApp.init = () => {
    movieApp.getMovies();
    movieApp.getUserInput();
    movieApp.getTotalResults();
}


// create method to get movies that the user searched for
// pass in the variable for user input value created in the getUserInput method
movieApp.getMovies = (userSearch) => {
    const myUrl = new URL(movieApp.endpoint);

    // if statetement to change default movie displayed
    if (userSearch === undefined) {
        userSearch = "avengers";
    }

    // search params
    myUrl.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        // update value of search param to variable for user input value created in the getUserInput method
        query: userSearch,
        // language: "en-US"
        //include_adult: false
    });

    // fetch
    fetch(myUrl)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(data => {
        // results name of predefined object for multi-search API
        const totalResults = (data.total_results);
        
        // clear the movieList (ul) and the errorField (div) when user inputs new search
        document.querySelector(".movieList").innerHTML = "";
        document.querySelector(".errorField").innerHTML = "";
        document.querySelector(".totalResults").innerHTML = "";
        // call displayMovies method with the data of our results object as an argument to get results displayed to the page after getting a response from the API call
        movieApp.displayMovies(data.results);
        movieApp.getTotalResults(totalResults)
  
    });

};

// Method for total results
movieApp.getTotalResults = (totalResults) =>{
    // Error handling when no results are found
    if (totalResults == undefined){
        totalResults = 0;
    }
    const resultsContainer = document.querySelector('.totalResults');
    const resultsValue = document.createElement("p");
    resultsValue.innerText = `Total Results: ${totalResults}`;
    resultsContainer.append(resultsValue);
}


// create method to get user input
movieApp.getUserInput = () => {

    // add event listener to our existing form to listen for when the user hits the search button
    document.querySelector("form").addEventListener("submit", function(event) {
        // prevent default behaviour of form (constantly refreshing)
        event.preventDefault();

        // create a variable for the user input (search bar)
        const inputEl = document.querySelector("input");

        // create a variable for the value of the user input
        const userSearch = inputEl.value;

        // call the getMovies method and pass it the variable for the user input value
        movieApp.getMovies(userSearch);

        // clearing the user search input after submitting
        inputEl.value = "";
        // clearing the placeholder text after submitting
        inputEl.placeholder = "";
    });

}
  
// create a method to display movies based on user search onto the page
movieApp.displayMovies = (searchResults) => {

    // forEach, loop through array of movie items to put them onto the page
    // movie as a parameter for each search result
  
    searchResults.forEach(movie => {
      
        // get ul from page
        const ulElement = document.querySelector("ul");
        // variables for creating new elements to display them to the page
        const newLi = document.createElement("li");
        newLi.classList.add("resultsContainer");
        const textContainer = document.createElement("div");
        textContainer.classList.add("textContainer");
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("imageContainer");
        const newImage = document.createElement("img");
        const profile = document.createElement("img");
        const newTitle = document.createElement("h2");
        const tvTitle = document.createElement("h2");
        const mediaType = document.createElement("p");
        const knownForDep = document.createElement("p");
        const plot = document.createElement("p");
        const language = document.createElement("p");
        const country = document.createElement("p");
        const releaseDate = document.createElement("p");
        const airDate = document.createElement("p");
        const popularRating = document.createElement("p");
        const voteAverage = document.createElement("p");
        const voteCount = document.createElement("p");

        // watchlist feature
        const watchList = document.createElement("a");
        const watchListIcon = document.createElement("img");

        // if statement to only display watchlist feature for movies and tv shows
        if (movie.media_type != "person") {
            watchListIcon.src = "./assets/playlist-plus.svg";
            watchListIcon.alt = "add to watchlist";
            watchList.href = "https://www.themoviedb.org/";
            watchList.target = "_blank";
            watchList.classList.add("watchList");
            watchList.append(watchListIcon);
        }
        

        // create variable for base url and file size to have complete url for the poster, add that to the poster_path property of the object
        const baseUrl = "https://image.tmdb.org/t/p/w500/";

        const baseUrlPerson = "https://image.tmdb.org/t/p/w300/";

        // We populate our image's attribute with info from our object:
        // newImage.src = `${baseUrl}${movie.poster_path}`;
        // console.log(newImage.src);

        if(movie.poster_path != undefined && movie.media_type == "movie") {
            // We populate our image's attribute with info from our object:
            newImage.src = `${baseUrl}${movie.poster_path}`;
            newImage.alt = `${movie.original_title}`;
        }
        else if (movie.poster_path != undefined && movie.media_type == "tv") {
            newImage.src = `${baseUrl}${movie.poster_path}`;
            newImage.alt = `${movie.name}`;
        }
        else if (movie.poster_path == null && movie.media_type == "movie") {
            newImage.src = "./assets/movie_default.png";
            newImage.alt = `${movie.original_title}`;
        }
        else if (movie.poster_path == null && movie.media_type == "tv") {
            imageContainer.classList.add("tvPlaceholder");
            newImage.src = "./assets/tv_default.webp";
            newImage.alt = `${movie.name}`;
        }

        // console.log(`${baseUrl}${movie.profile_path}`);

        

        // if statement to check if profile_path has a value
        if(movie.profile_path != undefined) {
            // use predefined profile_path property of our object for img element for people:
            profile.src = `${baseUrlPerson}${movie.profile_path}`;
            profile.alt = `${movie.name}`;
        }
        else if (movie.profile_path == null && movie.media_type == "person") {
            // if profile img not found, display default img for person
            profile.src = "./assets/default_person.png";
            profile.alt = `${movie.name}`;
            
        }

        // variables for known for object for people first object
        const knownLiOne = document.createElement("li");
        knownLiOne.classList.add("resultsContainer");
        const knownImageContainer = document.createElement("div");
        knownImageContainer.classList.add("knownImageContainer");
        const knownTextContainer = document.createElement("div");
        knownTextContainer.classList.add("knownTextContainer");
        const knownHeader = document.createElement("h2");
        const knownImgOne = document.createElement("img");
        const knownTitleOne = document.createElement("h3");
        const knownNameOne = document.createElement("h3");
        const knownMediaOne = document.createElement("p");
        const knownPlotOne = document.createElement("p");
        const knownLanguageOne = document.createElement("p");
        const knownCountryOne = document.createElement("p");
        const knownReleaseOne = document.createElement("p");
        const knownAirOne = document.createElement("p");
        const knownVoteAvgOne = document.createElement("p");
        const knownVoteCountOne = document.createElement("p");

        
        

        // if statement to check if media type is not equal to person
        if(movie.media_type != "person") {
            mediaType.innerText = `${movie.media_type}`;
        }
        // media type is equal to person
        else {
            if (movie.known_for[0]) {
                knownForDep.innerText = `Role in film department: ${movie.known_for_department}`;
            
            // classes for actors
            textContainer.classList.add("actorTextContainer");
            imageContainer.classList.add("actorImageContainer");

            // add another class to list container to give it more space, separate it from results outside of known_for object
            knownLiOne.classList.add("knownResultsContainer");

            // heading for known_for results
            knownHeader.innerText = "Known for";

            // poster for known_for results
            knownImgOne.src = `${baseUrl}${movie.known_for[0].poster_path}`;

            // media type for known_for object only if media type is movie or tv
            // movie.known_for[0].media_type == "movie" || "tv" ? `${ knownMediaOne.innerText = movie.known_for[0].media_type} : ${knownMediaOne.innerText} = " "`:

            if (movie.known_for[0].media_type == "movie" || movie.known_for[0].media_type == "tv") {
                knownMediaOne.innerText = `${knownMediaOne.innerText = movie.known_for[0].media_type}`;
            }
            else {
                knownMediaOne.innerText = "";
            }
          
            // if statement to check if media type is movie
            if (movie.known_for[0].media_type == "movie") {
                knownImgOne.alt = `${movie.known_for[0].original_title}`;
                knownTitleOne.innerText = movie.known_for[0].original_title;
                knownReleaseOne.innerText = `Release Date: ${movie.known_for[0].release_date}`;
            }
            // checking if media type is TV
            else if (movie.known_for[0].media_type == "tv") {
                knownImgOne.alt = `${movie.known_for[0].name}`;
                knownNameOne.innerText = movie.known_for[0].name;
                
                knownCountryOne.innerText = `Origin Country: ${movie.known_for[0].origin_country}`;
            }
            // checking if media type is TV and if air date is not empty
            else if (movie.known_for[0].media_type = "tv" && movie.known_for[0].first_air_date != null) {
                knownAirOne.innerText = `First Air Date: ${movie.known_for[0].first_air_date}`;
            }
            // checking if media type is movie and if release date is not empty
            else if (movie.known_for[0].media_type = "movie" && movie.known_for[0].release_date != null) {
                knownReleaseOne.innerText = `Release Date: ${movie.known_for[0].release_date}`;
            };

            // if statement to add placeholder image for movie or tv if poster_path property is undefined
            if (movie.known_for[0].media_type == "movie" && movie.known_for[0].poster_path == undefined) {
                knownImgOne.src = "./assets/movie_default.png";
            }
            else if (movie.known_for[0].media_type == "tv" && movie.known_for[0].poster_path == undefined) {
                knownImgOne.src = "./assets/tv_default.webp";
            };
           

            // if statement to check if overview of known_for object is not empty
            if (movie.known_for[0].overview) {
                knownPlotOne.innerText = `Plot: ${movie.known_for[0].overview}`;
            }
            
            // other properties of known_for object like language, vote avrg & vote count
            knownLanguageOne.innerText = `Original language: ${movie.known_for[0].original_language}`;
            knownVoteAvgOne.innerText = `Vote average: ${movie.known_for[0].vote_average}`;
            knownVoteCountOne.innerText = `Vote count: ${movie.known_for[0].vote_count}`;
            

            // Appending elements to page
            knownImageContainer.append(knownHeader,knownImgOne, watchList);
            knownTextContainer.append( knownTitleOne, knownNameOne, knownMediaOne, knownPlotOne, knownLanguageOne, knownCountryOne, knownReleaseOne, knownAirOne, knownVoteAvgOne, knownVoteCountOne)
            knownLiOne.append( knownImageContainer, knownTextContainer);
            }
            
        }
        
        // If statements to check if properties have values
        if(movie.original_title) {

            newTitle.innerText = movie.original_title;
            newImage.alt = `${movie.original_title}`;
            tvTitle.innerText = "";
        }
        else {
            newTitle.innerText = "Title currently unavailable";
        }

        if(movie.name) {
            // use predefined vote count property of our object for other p elements:
            tvTitle.innerText = `${movie.name}`;
            newTitle.innerText = "";       
        }

        if(movie.overview) {
            plot.innerText = `Plot: ${movie.overview}`;
        }
       
        if(movie.original_language) {
            language.innerText = `Original Language: ${movie.original_language}`;
        }

        if(movie.origin_country != undefined) {
            country.innerText = `Origin country: ${movie.origin_country[0]}`;
        }
        else {
            country.innerText = "";
        };

        if(movie.release_date) {
             releaseDate.innerText = `Release Date: ${movie.release_date}`;
        }

        if(movie.first_air_date) {
            airDate.innerText = `First air date: ${movie.first_air_date}`;
        }

        if(movie.vote_average) {
            voteAverage.innerText = `Vote Average: ${movie.vote_average}`;       
        }

        if(movie.vote_count) {
            // use predefined vote count property of our object for other p elements:
            voteCount.innerText = `Vote count: ${movie.vote_count}`; 
        }


        // use predefined popularity property of our object for another p element
        popularRating.innerText = `Popularity: ${movie.popularity}`;
   

        // append the image and the title in the li, an then the li in the ul we got above:
        textContainer.append(newTitle, tvTitle, mediaType, knownForDep, plot, language, country, releaseDate, airDate, popularRating, voteAverage, voteCount);
        imageContainer.append(newImage, watchList, profile)
        newLi.append(imageContainer, textContainer);
        ulElement.append(newLi, knownLiOne);
    });

    // if statement to handle user search input with 0 results
    if (searchResults.length == 0) {
        const errorMessage = document.createElement("p");
        const errorField = document.querySelector(".errorField");

        errorMessage.innerText = "No results found";
        errorField.appendChild(errorMessage);
    } 
    
    
}


// call init method
movieApp.init();
