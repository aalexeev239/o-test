'use strict';
(function() {

  var templateElement = document.getElementById('table-row');

  var tr;

  if ('content' in templateElement) {
    tr = templateElement.content.querySelector('tr');
  } else {
    tr = templateElement.querySelector('tr');
  }

  function Table(elem, data) {
    this.elem = elem;
    this.thead = this.elem.tHead.children[0];
    this.tbody = elem.tBodies[0];
    this.data = data;

    this._selectedCols = {};
    this._initSelectedRows();

    this._onInsideTableClick = this._onInsideTableClick.bind(this);


    this._render();
    this._attachListeners();
  }

  Table.prototype = {

    _initSelectedRows: function () {
      var dataExample = this.data[0];
      var self = this;


      Object.keys(dataExample).forEach(function(key) {
        if (key === 'date') {
          self._selectedCols['date'] = true
        } else {
          self._selectedCols[key] = false;
        }
      });


    },

    _render: function() {
      var self = this;


      this.data.forEach(function (dataRow) {
        var row = self._getRow(dataRow)
        self.tbody.appendChild(row);
      });
    },


    _getRow: function(dataRow) {
      var newTr = tr.cloneNode(true);
      var newHTML = newTr.innerHTML;
      var dateFormated = this._formatDate(dataRow.date);

      newHTML = newHTML.replace('{{datetime}}', dateFormated.dateTime);
      newHTML = newHTML.replace('{{datetime_human}}', dateFormated.dateTimeHuman);

      Object.keys(dataRow).forEach(function(key) {
        if (key === 'date') return;
        newHTML = newHTML.replace('{{' + key + '}}', dataRow[key]);
      });

      newTr.innerHTML = newHTML;

      return newTr;
    },


    _attachListeners: function() {
      this.elem.addEventListener('click', this._onInsideTableClick);
    },


    _onInsideTableClick: function (ev) {
      var target = ev.target;

      //bubble up to th or td elem
      while (target !== this.elem) {
        if (target.tagName !== 'TD' || target.tagName !== 'TH') {
          break;
        }
        target = target.parentNode;
      }

      //stop handling, if nothing found
      if (target.tagName !== 'TD' && target.tagName !== 'TH') {
        return;
      }

      var columnIndex = Array.prototype.indexOf.call(target.parentNode.children, target);
      var columnId = this.thead.children[columnIndex].getAttribute('data-row');

      this._toggleColumn(columnId);
    },



    _toggleColumn: function(columnId) {
      if (columnId === 'date') return;

      this._selectedCols[columnId] = !this._selectedCols[columnId];

      this._processColumns();
    },


    _processColumns: function() {

      var self = this;

      Object.keys(this._selectedCols).forEach(function(id){

        var th = self.thead.querySelector('th[data-row="'+ id + '"]');

        th.classList.toggle('mod-active-col', self._selectedCols[id]);
      });
    },



    _formatDate: function(timestamp) {
      var date = new Date(timestamp);

      var year = date.getFullYear();
      var yy = year % 100;
      if (yy < 10) {
        yy = '0' + yy;
      }

      var month = date.getMonth() + 1;
      var mm = month < 10 ? '0' + month : month;

      var day = date.getDate();
      var dd = day < 10 ? '0' + day : day;


      var dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

      return {
        dateTime: year + '-' + mm + '-' + dd,
        dateTimeHuman: dd + '.' + mm + '.' + yy
      }
    }
  };

  window.Table = Table;

})();

