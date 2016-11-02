function render(file) {
  var request = new XMLHttpRequest();
  request.open('GET', window.location.pathname + file, true);

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

function getPage() {
  if (window.location.hash === '') {
    render('index.md');
  } else {
    render(window.location.hash.replace('#', '') + '.md');
  }
}

window.addEventListener('hashchange', getPage, false);
