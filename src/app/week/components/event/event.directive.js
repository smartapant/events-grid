export function timelyEvent() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/week/components/event/event.html',
    scope: {
      grid: '=eventGridItem',
      info: '=eventInfo'
    },
    controller: EventController,
    controllerAs: 'eventCtrl',
    bindToController: true,
    replace: true
  };

  return directive;
}

class EventController {
  constructor($scope) {
    'ngInject';

    this._scope = $scope;
    this.activate();
  }

  activate() {
    this.gridMap = {
      sizeX: 'eventCtrl.grid.size.x',
      sizeY: 'eventCtrl.grid.size.y',
      row: 'eventCtrl.grid.position[0]',
      col: 'eventCtrl.grid.position[1]'
    };

    this._scope.$watch('eventCtrl.grid', () => this.updateInfo() , true);
  }

  updateInfo() {
    this.info.startDay = this.grid.position[1];
    this.info.endDay = this.grid.position[1] + this.grid.size.x - 1;
    this._scope.$emit('events.recalced');
  }
}
