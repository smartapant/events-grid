export class WeekController {
  constructor($scope) {
    'ngInject';

    this._scope = $scope;
    this.activate();
  }

  activate() {
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.events = [];
    this.gridsterOpts = {
      columns: 7,
      rowHeight: 55,
      margins: [10, 20],
      defaultSizeX: 1,
      defaultSizeY: 1,
      minSizeX: 1,
      maxSizeX: 7,
      minSizeY: 1,
      maxSizeY: 1,
      mobileModeEnabled: false,
      resizable: {
        enabled: true,
        handles: ['e', 'w']
      },
      draggable: {
        enabled: true, // whether dragging items is supported
        handle: '.my-class' // optional selector for resize handle
      }
    };
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
