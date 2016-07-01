'use strict';

var deskContainer = document.getElementById('desk');
var tableContainer = document.getElementById('table');
var testDesk = new TestDesk(deskContainer);

getData('./data.json', function (data) {
  
  if (!data.length || data.length === 0) {
    testDesk.writeText('Oops, data is wrong!')
    return;
  }
  
  // get more data :)
  var bigData = [];
  for (var i = Math.floor(Math.random() * 100 + 1); i--; ) {
    bigData = bigData.concat(data);
  }
  var table = new Table(tableContainer, bigData);

  testDesk.writeText('Choose some columns')
}, function (err) {
  testDesk.writeText('Oops, something went wrong!')
});
