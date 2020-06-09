"use strict";

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("movetop").style.display = "block";
  } else {
    document.getElementById("movetop").style.display = "none";
  }
} // When the user clicks on the button, scroll to the top of the document


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$(function () {
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1; //As January is 0.

  var yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  var date = yyyy + '-' + mm + '-' + dd;
  document.getElementById('service_date').value = date;
});

function SearchResult() {
  document.getElementById('resultgrid').style.display = "none";
  var field = document.getElementById('ddfield').value;
  var date = document.getElementById('service_date').value;
  var state = document.getElementById('ddstate').value;

  if (state == '') {
    alert('please select State');
    return;
  }

  if (date == '') {
    alert('please select date');
    return;
  }

  if (field == '') {
    alert('please select Keyword');
    return;
  }

  state = state.toLowerCase();
  date = date.replace('-', '');
  date = date.replace('-', '');
  var url = '';

  if (state == 'us') {
    url = 'https://covidtracking.com/api/v1/us/' + date + '.json';
  } else {
    url = 'https://covidtracking.com/api/v1/states/' + state + '/' + date + '.json';
  }

  console.log(url);
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(request.status);

    if (request.status >= 200 && request.status < 400) {
      document.getElementById('resultgrid').style.display = "block";
      var sel = document.getElementById("ddstate");
      var text = sel.options[sel.selectedIndex].text;
      document.getElementById('statename').innerHTML = text;
      var resultval = '';
      var resultval1 = '';
      var x = document.getElementById("ddfield");
      var i;

      for (i = 0; i < x.length; i++) {
        if (field == 'all') {
          if (x.options[i].value != 'all' && x.options[i].value != '') {
            if (i < 13) {
              resultval = resultval + '<div class="row"><div class="icon"><span class="fa fa-minus" style="font-size: 10px;"></span></div><div class="col-md-5"><div class="form-group " style="text-align: left;"> <strong class="info">' + x.options[i].text + '</strong></div></div><div class="col-md-5"><div class="form-group " style="text-align: left;"><span id="positivetest" style="text-align: left;">' + replacer(data[x.options[i].value]) + '</span></div></div></div>';
            } else {
              resultval1 = resultval1 + '<div class="row"><div class="icon"><span class="fa fa-minus" style="font-size: 10px;"></span></div><div class="col-md-5"><div class="form-group " style="text-align: left;"> <strong class="info">' + x.options[i].text + '</strong></div></div><div class="col-md-5"><div class="form-group " style="text-align: left;"><span id="positivetest" style="text-align: left;">' + replacer(data[x.options[i].value]) + '</span></div></div></div>';
            }
          }
        } else {
          if (x.options[i].value == field) resultval = resultval + '<div class="row"><div class="icon"><span class="fa fa-minus" style="font-size: 10px;"></span></div><div class="col-md-5"><div class="form-group " style="text-align: left;"> <strong class="info">' + x.options[i].text + '</strong></div></div><div class="col-md-5"><div class="form-group " style="text-align: left;"><span id="positivetest" style="text-align: left;">' + replacer(data[x.options[i].value]) + '</span></div></div></div>';
        }
      }

      document.getElementById("Resultdiv").innerHTML = resultval;
      document.getElementById("Resultdiv1").innerHTML = resultval1;
      document.getElementById("nodata").innerHTML = '';
      Screenshot(date, state);
    } else {
      console.log('error');
      document.getElementById("nodata").innerHTML = 'Please make a different selection. Data is unavailable!';
    }
  };

  request.send();
}

function Screenshot(date, state) {
  var requestnew = new XMLHttpRequest();
  url = "https://covidtracking.com/api/v1/states/screenshots.json";
  requestnew.open('GET', url, true);

  requestnew.onload = function () {
    var htmllink = "";
    htmllink = htmllink + '<ul class="footer-list">';
    var data = JSON.parse(this.response);
    console.log(requestnew.status);

    if (requestnew.status >= 200 && requestnew.status < 400) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var car = _step.value;

          if (car.date == date) {
            if (car.state.toLowerCase() == state) {
              var datecheked = car.dateChecked.split("T")[1].split(".")[0];
              htmllink = htmllink + '<li><a href=' + car.url + ' target="_blank" style="color:blue">' + datecheked + '</a></li>';
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (htmllink != '') {
        htmllink = htmllink + '</ul>';
        document.getElementById('screenshotdiv').innerHTML = htmllink;
      }
    } else {}
  };

  requestnew.send();
}

function replacer(val) {
  if (val === null || typeof val == 'undefined') {
    return ""; // change null to empty string
  } else {
    return val; // return unchanged
  }
}