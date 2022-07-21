var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username!");
  }
  console.log(event);
};
// \testing javascript link to webpage
var getUserRepos = function (user) {
  // github format for the api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data);
    });
  });
};
userFormEl.addEventListener("submit", formSubmitHandler);
