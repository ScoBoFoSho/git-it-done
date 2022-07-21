var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
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
// display the data that we are returning from the repos
var displayRepos = function (repos, searchTerm) {
  console.log(repos);
  console.log(searchTerm);
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo's name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // container for each repo
    var repoEl = document.createElement("div");
    repoEl.classlist =
      "list-item flex-row justify-space-between align-center greek";

    // create a span elment for the repo name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to the container
    repoEl.appendChild(titleEl);
    // create status element
    var statusEl = document.createElement("span");
    statusEl.classlist = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    // append to the container
    repoEl.appendChild(statusEl);

    // append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};
// \testing javascript link to webpage
var getUserRepos = function (user) {
  // github format for the api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    console.log(response);
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data, user);
      });
    } else {
      alert("Error: GitHub User Not Found!");
    }
  });
};
userFormEl.addEventListener("submit", formSubmitHandler);
