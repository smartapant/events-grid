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
    this._scope.$on('events.recalced', () => this.recalcRowsPerDay())
  }

  addEvent(row, col) {
    this.events.push({
      info: {name: 'New event', startDay: col, endDay: col},
      grid: {size: {x:1, y:1}, position: [row, col]}
    })
  }

  recalcRowsPerDay() {
    //Not the most beautiful thing, little lazy
    this.days.forEach((dayName, dayNum) => {
      let maxRow = -1;
      this.events.forEach((evt) => {
        if (dayNum >= evt.info.startDay && dayNum <= evt.info.endDay) {
          maxRow = evt.grid.position[0] >= maxRow ? evt.grid.position[0] : maxRow;
        }
      });
      this._scope.$broadcast('events.rowsPerDay', {dayNum: dayNum, maxRow: maxRow});
    })
  }
}
