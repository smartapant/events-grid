export function routerConfig ($stateProvider) {
  'ngInject';
  $stateProvider
      .state('week', {
        url: '/week',
        templateUrl: 'app/week/week.html',
        controller: 'WeekController',
        controllerAs: 'weekCtrl'
      });
}
