'use strict';

(function() {

  var XHR_LOAD_TIMEOUT = 10000;


  function getData(url, onSuccess, onFailure) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.timeout = XHR_LOAD_TIMEOUT;

    if (onFailure) {
      xhr.ontimeout = onFailure;
      xhr.onerror = onFailure;
    }

    xhr.onload = function () {
      if (xhr.status != 200 && onFailure) {
        onFailure();
      } else {
        try {
          var data = JSON.parse(xhr.responseText)
        } catch (err) {
          onFailure(err);
        }
        onSuccess(data);
      }
    }

    xhr.send();
  }

  window.getData = getData;
})();
