angular.module('calendar', ['ionic','ui.calendar'])

    .config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	// setup an abstract state for the tabs directive
	    .state('tab', {
		url: "/tab",
		abstract: true,
		template: function() { return document.getElementById('tab.html').innerHTML; },
	    })
	    .state('tab.calendar', {
		url: '/calendar',
		views: {
		    'tab-calendar': {
			template: function() { return document.getElementById('tab-calendar.html').innerHTML; },
			controller: 'CalendarCtrl'
		    }
		}
	    })
            .state('event', {
                url: '/event',
		template: function() { return document.getElementById('event.html').innerHTML; },
		controller: 'CalendarCtrl',
            })
	    .state('tab.notes', {
		url: '/notes',
		views: {
		    'tab-notes': {
			template: function() { return document.getElementById('tab-notes.html').innerHTML; },
			controller: 'Ctrl'
		    }
		}
	    })
	    .state('tab.weight', {
		url: '/weight',
		views: {
		    'tab-weight': {
			template: function() { return document.getElementById('tab-weight.html').innerHTML; },
			controller: 'Ctrl'
		    }
		}
	    })
	    .state('tab.export', {
		url: '/export',
		views: {
		    'tab-export': {
			template: function() { return document.getElementById('tab-export.html').innerHTML; },
			controller: 'Ctrl'
		    }
		}
	    })
	    .state('tab.about', {
		url: '/about',
		views: {
		    'tab-about': {
			template: function() { return document.getElementById('tab-about.html').innerHTML; },
			controller: 'Ctrl'
		    }
		}
	    })
	$urlRouterProvider.otherwise('/tab/calendar');
    })

    .factory('CalendarService', function($q) {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var eventos =[
            {id: 123,title: ':)',start: new Date(y, m, 1), url: '#/event'},
            {id: 124,title: ':(',start: new Date(y, m, d - 5), url: '#/event'},
            {id: 125,title: ':)',start: new Date(y, m, d - 3), url: '#/event'},
            {id: 126,title: ':) :)',start: new Date(y, m, d - 2), url: '#/event'},
            {id: 127,title: ':)',start: new Date(y, m, d - 1), url: '#/event'},
	];

	return{
            all: function() {
		var deferredEventos = $q.defer();
		deferredEventos.resolve(eventos);
		return deferredEventos.promise;
            },
	}
	
    })

    .controller('CalendarCtrl', function ($scope,$ionicSlideBoxDelegate,CalendarService, $ionicModal, $state) {

	$scope.backToCalendar = function () {
	    //$state.go('tab.calendar');
	    window.location.href = '#/tab/calendar';
	}

	// Event Modal **************************************************************************
	
	/*$ionicModal.fromTemplateUrl('event.html', function(modal) {
	    $scope.eventModal = modal;
	}, {
	    scope: $scope
	});
	
	$scope.currentEvent={};

	$scope.showEventModal = function() {
	    $scope.eventModal.show();
	};
	
	$scope.closeEventModal = function(task) {
	    $scope.eventModal.hide();
	}*/


	$scope.uiConfig = {
	    calendar:{
		height: 550,
		editable: false,
		header: {
		    left: 'title',
		    center: '',
		    right: 'prev,next'
		},
		eventClick: function(){console.log('clicked');}
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
    })

    .controller('Ctrl', function ($scope,$ionicSlideBoxDelegate, $timeout, $ionicPopup) {
	console.log($ionicSlideBoxDelegate.$getByHandle('weight').slidesCount('weight'));
	$ionicSlideBoxDelegate.next();

	window.localStorage['notes'] = '[{"time":1413122317774,"date":"Sun Oct 12 2014","text":"I bumped my foot in the door but I didn\'t feel anything"},{"time":1413035819938,"date":"Sat Oct 11 2014","text":"Feeling pretty great today!"},{"time":1412909321112,"date":"Thu Oct 09 2014","text":"My glucose level was a little high today"},{"time":1412722642790,"date":"Tue Oct 07 2014","text":"I had a hypoglycemia attack today. Blacked out for about 5 minutes"},{"time":1412695300034,"date":"Tue Oct 07 2014","text":"I walked around for 5 hours today"},{"time":1412657736322,"date":"Tue Oct 07 2014","text":"I walked barefoot in the grass. I know I shouldn\'t but it was fun"}]';
	$scope.notes = window.localStorage['notes'] && JSON.parse(window.localStorage['notes']) || [];	

	$scope.newNote = function() {
	    $scope.note = {};

	    var myPopup = $ionicPopup.show({
		template: '<input type="text" ng-model="note.res">',
		title: 'Have any odd details to share?',
		scope: $scope,
		buttons: [
		    { text: 'Cancel' },
		    {
			text: '<b>Save</b>',
			type: 'button-positive',
			onTap: function(e) {
			    return $scope.note.res;
			}
		    },		]
	    });
	    myPopup.then(function(res) {
		if (res) {
		    var date = new Date();
		    $scope.notes.push({'time': date.getTime(), 'date': date.toDateString(), 'text': res});
		    window.localStorage['notes'] = JSON.stringify($scope.notes);
		}
	    })
	}
    })
