"use strict";

// Replace ./data.json with your JSON feed
fetch('https://covidtracking.com/api/v1/states/current.json').then(function (response) {
  return response.json();
}).then(function (data) {
  // Work with JSON data here
  console.log(state.data);
})["catch"](function (err) {// Do something for an error here
});