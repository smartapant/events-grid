export class WeekController {
  constructor($scope, gridsterOptions) {
    'ngInject';

    this._scope = $scope;
    this.gridsterOpts = gridsterOptions
    this.activate();
  }

  activate() {
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.events = [];
    this._scope.$on('events.recalced', () => this.recalcEventsPerDay())
  }

  addEvent(row, col) {
    this.events.push({
      info: {name: 'New event', startDay: col, endDay: col},
      grid: {size: {x:1, y:1}, position: [row, col]}
    })
  }

  recalcEventsPerDay() {
    this.days.forEach((dayName, dayNum) => {
      let eventPerDay = this.events.filter((evt) => ( dayNum >= evt.info.startDay && dayNum <= evt.info.endDay)).length;
      this._scope.$broadcast('events.perDay', {dayNum: dayNum, eventsNum: eventPerDay});
    })
  }
}
