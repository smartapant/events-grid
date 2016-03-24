export function timelyDay() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/week/components/day/day.html',
    scope: true,
    link: (scope, $element, attrs, ctrl) => {
      ctrl.dayName = attrs.dayName;
      ctrl.dayNum = parseInt(attrs.dayNum);
    },
    controller: DayController,
    controllerAs: 'dayCtrl',
    bindToController: true,
    replace: true
  };

  return directive;
}

class DayController {
  constructor($scope) {
    'ngInject';

    this._scope = $scope;
    this.activate();
  }

  activate() {
    this.eventsNum = 0;
    this._scope.$on('events.perDay', (evt, data) => {
      this.eventsNum = data.dayNum == this.dayNum ? data.eventsNum : this.eventsNum;
    });
  }
}
