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
  constructor($scope, gridsterOptions) {
    'ngInject';

    this._scope = $scope;
    this._gridsterOprions = gridsterOptions;
    this.activate();
  }

  activate() {
    this.maxRow = -1;
    this._scope.$on('events.rowsPerDay', (evt, data) => {
      this.maxRow = data.dayNum == this.dayNum ? data.maxRow : this.maxRow;
    });
  }

  calcGutter() {
    return `${this._gridsterOprions.rowHeight * (this.maxRow + 1)}px`;
  }
}
