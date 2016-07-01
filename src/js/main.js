'use strict';

(function () {

  var deskContainer = document.getElementById('desk');
  var tableContainer = document.getElementById('table');
  var testDesk = new TestDesk(deskContainer);

  getData('./data.json', function (data) {

    if (!data.length || data.length === 0) {
      testDesk.writeText('Oops, data is wrong!')
      return;
    }

    // get more data :)
    // 4 * 250 + 1 ≤ 1001 row
    var bigData = [];
    for (var i = Math.floor(Math.random() * 250 + 1); i--; ) {
      bigData = bigData.concat(data);
    }

    //init table
    var table = new Table(tableContainer, bigData, function(processedData) {
      testDesk.writeText(JSON.stringify(processedData));
    });
  
    testDesk.writeText('Choose some columns')
  }, function (err) {
    testDesk.writeText('Oops, something went wrong!')
  });

})();
