import { routerConfig } from './week.route.js';
import { WeekController } from './week.controller.js';
import { timelyDay } from './components/day/day.directive.js';
import { timelyEvent } from './components/event/event.directive.js';
import { timelyCuteBg } from './components/event/cuteBg.directive.js';
import gridsterOptions from './gridsterOpts.constant.js';

angular.module('timely.week', [])
    .config(routerConfig)
    .controller('WeekController', WeekController)
    .directive('timelyDay', timelyDay)
    .directive('timelyEvent', timelyEvent)
    .directive('timelyCuteBg', timelyCuteBg)
    .constant('gridsterOptions', gridsterOptions);

