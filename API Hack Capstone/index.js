"use strict";

const dinnerApiKey = "c78d6bb5335bd92c";
const dinnerSearchURL =
  "https://cors-anywhere.herokuapp.com/https://eatstreet.com/publicapi/v1/restaurant/search";

let responseJsonResultsDinner = [];

let currentDinnerIndex = Math.floor(Math.random() * 10);

const movieApiKey = "354423-Dinneran-7CSLUZNY";
const movieSearchURL =
  "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar";

let responseJsonResultsMovie = [];

let currentMovieIndex = Math.floor(Math.random() * 10);

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function startApp() {
  $(".dinnerBox").hide();
  $(".movieBox").hide();
  $(".resultsBox ").hide();
  $(".restartBox").hide();
  $("#startAppButton").on("click", function(event) {
    generateDinner();
  });
}

function generateDinner() {
  $(".headerBox").hide();
  $(".introBox").hide();
  $(".dinnerBox").show();
  displayDinnerForm();
}

function displayDinnerForm() {
  $("#js-dinner-form").submit(event => {
    event.preventDefault();
    const streetAddress = $("#js-search-term-dinner").val();
    const deliveryOrPickup = $("input[name='deliveryOrPickup']:checked").val();
    getDinner(streetAddress, deliveryOrPickup);
  });
}

function getDinner(streetAddress, deliveryOrPickup) {
  const params = {
    "street-address": streetAddress,
    method: deliveryOrPickup,
    "access-token": dinnerApiKey
  };
  const queryString = formatQueryParams(params);
  const dinnerURL = dinnerSearchURL + "?" + queryString;

  fetch(dinnerURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    // .then(responseJson => displayDinnerResults(responseJson))
    .then(responseJson => storeDinnerResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function storeDinnerResults(responseJson) {
  //assigns them to your responseJsonResults array
  //.push
  //  var dinnerJsonReponseRestaurantUrl = responseJson.restaurants[0].url;
  // const dinnerJsonReponseRestaurantName = responseJson.restaurants[0].name;
  // const dinnerJsonReponseRestaurantLogo = responseJson.restaurants[0].logoUrl;
  // const dinnerJsonReponseRestaurantAddress = responseJson.restaurants[0].streetAddress;
  // const dinnerJsonReponseRestaurantCity = responseJson.restaurants[0].city;
  // const dinnerJsonReponseRestaurantState = responseJson.restaurants[0].state;
  // const dinnerJsonReponseRestaurantZip = responseJson.restaurants[0].zip;
  // const dinnerJsonReponseRestaurantPhone = responseJson.restaurants[0].phone;

  responseJsonResultsDinner = responseJson;
  displayDinnerResults();
}

function displayDinnerResults() {
  // if there are previous results, remove them
  $("#dinnerResults").empty();

  $("#dinnerResults").append(
    `<h2>Now let's find a movie to watch!</h2><button type="button" id="goToMovieButton">Find a movie</button><br/><br/>`
  );
  for (let i = 0; i < 10; i++) {
    // iterate through the items array
    // console.log(
    // // $('#dinnerResults').append(
    // //   `<li><h2><a href="${responseJsonResultsDinner.restaurants[currentIndex].url}" target="_blank">${responseJsonResultsDinner.restaurants[currentIndex].name}</a></h2>
    // //   <p><img src="${responseJsonResultsDinner.restaurants[currentIndex].logoUrl}" alt="restaurant logo"></p>
    // //  <p>${responseJsonResultsDinner.restaurants[currentIndex].streetAddress}<br/>
    // //  ${responseJsonResultsDinner.restaurants[currentIndex].city}, ${responseJsonResultsDinner.restaurants[currentIndex].state}, ${responseJsonResultsDinner.restaurants[currentIndex].zip}<br/>
    // //  ${responseJsonResultsDinner.restaurants[currentIndex].phone}<br/><br/>
    // //  </p></li>`
    //   `<li><h2><a href="${responseJsonResultsDinner.restaurants[i].url}" target="_blank">${responseJsonResultsDinner.restaurants[i].name}</a></h2>
    //   <p><img src="${responseJsonResultsDinner.restaurants[i].logoUrl}" alt="restaurant logo"></p>
    //  <p>${responseJsonResultsDinner.restaurants[i].streetAddress}<br/>
    //  ${responseJsonResultsDinner.restaurants[i].city}, ${responseJsonResultsDinner.restaurants[i].state}, ${responseJsonResultsDinner.restaurants[i].zip}<br/>
    //  ${responseJsonResultsDinner.restaurants[i].phone}<br/><br/>
    //  </p></li>`
    // )

    $("form").hide();
  }
  $("#goToMovieButton").on("click", function(event) {
    generateMovie();
  });
}

function generateMovie() {
  $(".headerBox").hide();
  $(".introBox").hide();
  $(".dinnerBox").hide();
  $(".movieBox").show();
  $("form").show();
  displayMovieForm();
}

function displayMovieForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term-movie").val();
    const maxResults = 10;
    getMovies(searchTerm, maxResults);
  });
}

function getMovies(query, maxResults) {
  const params = {
    q: query,
    type: "movies",
    info: 1,
    limit: maxResults,
    k: movieApiKey
  };
  const queryString = formatQueryParams(params);
  const movieURL = movieSearchURL + "?" + queryString;

  console.log(movieURL);

  fetch(movieURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    //.then(responseJson => displayMovieResults(responseJson))
    .then(responseJson => storeMovieResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function storeMovieResults(responseJson) {
  responseJsonResultsMovie = responseJson;
  displayMovieResults();
}

function displayMovieResults() {
  // if there are previous results, remove them
  $("#movie-results-list").empty();
  $("h2").hide();
  $("form").hide();

  $("#movie-results-list").append(
    `<h1>Now let's view the perfect dinner and movie for you tonight!</h1><button type="button" id="goToResultsButton">View my Dinner & Movie Pairing</button><br/><br/>`
  );
  for (let i = 0; i < responseJsonResultsMovie.Similar.Results.length; i++) {
    // iterate through the items array
    // $('#movie-results-list').append(
    //   `<li><h3><a href="${responseJsonResultsMovie.Similar.Results[i].wUrl}" target="_blank">${responseJsonResultsMovie.Similar.Results[i].Name}</a></h3>
    //   <iframe width="560" height="315" src="${responseJsonResultsMovie.Similar.Results[i].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>${responseJsonResultsMovie.Similar.Results[i].wTeaser}</p></li>`
    // )
  }
  $("#goToResultsButton").on("click", function(event) {
    generateMovieDinnerPair();
  });
}

function generateMovieDinnerPair() {
  $(".headerBox").hide();
  $(".introBox").hide();
  $(".dinnerBox").hide();
  $(".movieBox").hide();
  $("form").show();
  $("h2").show();
  $(".resultsBox").show();
  // const currentRest = responseJsonResultsDinner.restaurants[currentIndex];
  // const streetAddress = $('#js-search-term-dinner').val();
  // const deliveryOrPickup = $("input[name='deliveryOrPickup']:checked").val();
  // getDinner(streetAddress, deliveryOrPickup);
  $("#dinner-results-list-final").append(
    //     `<li><h2><a href="${responseJsonResultsDinner.restaurants[0].url}" target="_blank">${responseJsonResultsDinner.restaurants[0].name}</a></h2>
    //   <p><img src="${responseJsonResultsDinner.restaurants[0].logoUrl}" alt="restaurant logo"></p>
    //  <p>${responseJsonResultsDinner.restaurants[0].streetAddress}<br/>
    //  ${responseJsonResultsDinner.restaurants[0].city}, ${responseJsonResultsDinner.restaurants[0].state}, ${responseJsonResultsDinner.restaurants[0].zip}<br/>
    //  ${responseJsonResultsDinner.restaurants[0].phone}<br/><br/>
    //  </p></li>`
    `<li><h2><a href="${responseJsonResultsDinner.restaurants[currentDinnerIndex].url}" target="_blank">${responseJsonResultsDinner.restaurants[currentDinnerIndex].name}</a></h2>
        <p><img src="${responseJsonResultsDinner.restaurants[currentDinnerIndex].logoUrl}" alt="restaurant logo"></p>
       <p>${responseJsonResultsDinner.restaurants[currentDinnerIndex].streetAddress}<br/>
       ${responseJsonResultsDinner.restaurants[currentDinnerIndex].city}, ${responseJsonResultsDinner.restaurants[currentDinnerIndex].state}, ${responseJsonResultsDinner.restaurants[currentDinnerIndex].zip}<br/>
       ${responseJsonResultsDinner.restaurants[currentDinnerIndex].phone}<br/><br/>
       </p></li>`
  );

  getMovies();
  $("#movie-results-list-final")
    .append(`<li><h3><a href="${responseJsonResultsMovie.Similar.Results[currentMovieIndex].wUrl}" target="_blank">${responseJsonResultsMovie.Similar.Results[currentMovieIndex].Name}</a></h3>
        <iframe width="560" height="315" src="${responseJsonResultsMovie.Similar.Results[currentMovieIndex].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>${responseJsonResultsMovie.Similar.Results[currentMovieIndex].wTeaser}</p></li>
        <h1>Restart the app</h1>
        <button type="button" id="goToRestartButton">Get more Dinner & Movie Recommendations</button><br/><br/>`);
  $("#goToRestartButton").on("click", function(event) {
    generateFinalScreen();
  });
}

function generateFinalScreen() {
  $(".resultsBox").hide();
  $(".restartBox").show();
  $("#restartAppButton").on("click", function(event) {
    $("h2").show();
    $(".headerBox").show();
    $(".introBox").show();
    document.location.reload();
    startApp();
  });
}

$(startApp);
