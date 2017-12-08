/* eslint-disable */

window.WebFontConfig = {
  google: { families: ['Roboto:400,300,500:latin'] },
};

(function () {
  var wf = document.createElement('script');
  var s = document.getElementsByTagName('script')[0];

  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';

  wf.async = true;

  s.parentNode && s.parentNode.insertBefore(wf, s);

  var icons = document.createElement('link');

  icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  icons.rel = 'stylesheet';

  s.parentNode && s.parentNode.insertBefore(icons, s);
})();
