angular.module('calendar', ['ionic','ui.calendar'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('calendar', {
                url: '/',
                templateUrl: 'calendar.html',
                controller: 'CalendarCtlr'
            })

            .state('event', {
                url: '/event',
                templateUrl: 'event.html',
            });

       $urlRouterProvider.otherwise('/');

    })

    .factory('CalendarService', function($q) {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      var eventos =[
        {id: 123,title: 'All Day Event',start: new Date(y, m, 1),url: '#/event'},
        {id: 124,title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2),url: '#/event'},
        {id: 125,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false,url: '#/event'},
        {id: 126,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false,url: '#/event'},
        {id: 127,title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false,url: '#/event'},
        {id: 128,title: 'Test event',start: new Date(y, m, 28),end: new Date(y, m, 29),url: '#/event'}
      ];

      return{
        all: function() {
          var deferredEventos = $q.defer();
          deferredEventos.resolve(eventos);
          return deferredEventos.promise;
        },
    }
      
  })

  .controller('CalendarCtlr', function ($scope,$ionicSlideBoxDelegate,CalendarService) {

    $scope.uiConfig = {
      calendar:{
        height: 650,
        header:false,
        firstDay:1,
      }
    };

    $("#calendar1").fullCalendar('prev');
    $("#calendar3").fullCalendar('next');

    $scope.events=[];
    $scope.eventSources=[$scope.events];
    
    CalendarService.all().then(function(events){
      angular.forEach(events,function(event){
        $scope.events.push(event);
      });
    });
});