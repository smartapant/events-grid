export function timelyCuteBg() {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: (scope, el) => {
      var colors = ['#9effb1', '#ff9191', '#ffe59b', '#8ccaff', '#bceae8'];
      el.css('background-color', colors[Math.floor(Math.random()*colors.length)]);
    }
  };

  return directive;
}
