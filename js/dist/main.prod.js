"use strict";fetch("https://covidtracking.com/api/v1/states/current.json").then(function(t){return t.json()}).then(function(t){console.log(state.data)}).catch(function(t){});