document.addEventListener('DOMContentLoaded', function (e) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/data', true);

  xhr.onreadystatechange = function(e) {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    }
  };

  xhr.send();
});