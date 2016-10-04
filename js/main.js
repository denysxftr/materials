function render(file) {
  var request = new XMLHttpRequest();
  request.open('GET', file, true);

  request.onload = function() {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    document.querySelector('.js-content').innerHTML = marked(request.responseText);
  }

  request.send();
}
