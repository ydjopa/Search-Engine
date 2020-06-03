// $(document).ready(function () {
/*--Selection--*/
// let inputRandom = 'WHAT';
//  let inputDate = 'DATE';
//  let inputState = 'STATE';

//  let url = 'https://covidtracking.com/api/v1/states/current.json' + inputRandom + inputDate + inputLocation;
//  let p = '';
//  let loadMore; 
// fetchData(url);

const url = 'https://covidtracking.com/api/v1/states/current.json';
const inputRandom = "WHAT";
const inputDate = "DATE";
const inputState = "STATE";

$(document).ready(() => {
    $('.js-search').on('submit', (e) => {
        let btnSearch = $('.btn-search').val();
        getState(btn - search);
        e.preventDefault();
    });
});

function getState(btnSearch) {
    axios.get(Url + btnSearch + inputRandom + inputDate + inputState)
        .then(function(response) {
                console.log(response);
                let covid = response.data.Search;
                let output = '';
                $.each(state, (index, state) => {
                    output += `
                  <div class = "col-md-3">
                   
                  `;
                });
                $(state).html(output);
            }