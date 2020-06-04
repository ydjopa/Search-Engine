const url = 'https://covidtracking.com/api/v1/states/current.json';
const inputRandom = "WHAT";
const inputDate = "DATE";
const inputState = "STATE";

$(document).ready(() => {

});
var array = new Array();
var arrayImages = new Array();

function getData() {

    var e = document.getElementById("dropdown");
    var states = e.options[e.selectedIndex].value;
    if (array.length > 0) {
        for (i = 0; i < array.length; i++) {
            if (array[i].state == states) {
                $('.card-title').html("<h3> Positives are " + array[i].state + " " + array[i].positive + "</h3>")
                $('.card-body').html("<p class='lead'> " + array[i].lastUpdateEt + "</p>")
            }
        }
        for (i = 0; i < arrayImages.length; i++) {
            if (arrayImages[i].state == states) {
                $('.card-body').html("<img class='img-fluid' src='" + arrayImages[i].url + "'/>")
            }
        }
    } else {
        $.get('https://covidtracking.com/api/v1/states/current.json', function(response) {

            array = response;
            let output = '';
            var obj;
            for (i = 0; i < response.length; i++) {
                if (response[i].state == states) {
                    $('.card-title').html("<h3> Positives are " + response[i].state + " " + response[i].positive + "</h3>")
                    $('.card-footer').html("<p class='lead'> " + response[i].lastUpdateEt + "</p>")
                }
            }

        })
        $.get('https://covidtracking.com/api/v1/states/screenshots.json', function(response) {

            arrayImages = response;
            let output = '';
            var obj;
            for (i = 0; i < response.length; i++) {
                if (response[i].state == states) {
                    $('.card-body').html("<img class='img-fluid' src='" + response[i].url + "'/>")
                }
            }
        })
    }
}