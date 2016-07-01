'use strict';

(function() {
  function TestDesk(elem) {
    this.elem = elem;
  }

  TestDesk.prototype = {
    clear: function() {
      this.elem.innerHTML = '';
    },

    writeText: function(str) {
      str = str.toString();
      this.elem.textContent = str;
    }
  };

  window.TestDesk = TestDesk;

})();
