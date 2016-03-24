import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

angular.module('timely', ['ui.router', 'ui.bootstrap', 'xeditable', 'gridster', 'timely.week'])
  .config(config)
  .config(routerConfig)
  .run(runBlock);
