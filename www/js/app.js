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
            {id: 123,title: ':)',start: new Date(y, m, 1),url: '#/event'},
            {id: 124,title: ':(',start: new Date(y, m, d - 5),url: '#/event'},
            {id: 125,title: ':)',start: new Date(y, m, d - 3),url: '#/event'},
            {id: 126,title: ':) :)',start: new Date(y, m, d - 2),url: '#/event'},
            {id: 127,title: ':)',start: new Date(y, m, d - 1),url: '#/event'},
            {id: 128,title: ':)',start: new Date(y, m, 23),end: new Date(y, m, 29),url: '#/event'}
	];

	return{
            all: function() {
		var deferredEventos = $q.defer();
		deferredEventos.resolve(eventos);
		return deferredEventos.promise;
            },
	}
	
    })

    .controller('CalendarCtrl', function ($scope,$ionicSlideBoxDelegate,CalendarService) {

	$scope.uiConfig = {
	    calendar:{
		height: 650,
		header:true,
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
    })

    .controller('Ctrl', function ($scope,$ionicSlideBoxDelegate, $timeout, $ionicPopup) {
	$scope.notes = [];//window.localStorage['notes'] && JSON.parse(window.localStorage['notes'])||[];
	var currDate = new Date();
	console.log(currDate);
	var temp = {'time': currDate.getTime(), 'date': currDate.toDateString(), 'text':'I bumped my foot in the door but I didn\'t feel anything'};
	console.log(temp);
	$scope.notes.push(temp); 
	var currDate = new Date(currDate.getTime()-86497836);
	temp = {'time':currDate.getTime(),'date':currDate.toDateString(),'text':'Feeling pretty great today!'};
	$scope.notes.push(temp); 
	var currDate = new Date(currDate.getTime()-126498826);
	temp = {'time':currDate.getTime(),'date':currDate.toDateString(),'text':'My glucose level was a little high today'};
	$scope.notes.push(temp); 
	var currDate = new Date(currDate.getTime()-186678322);
	temp = {'time':currDate.getTime(),'date':currDate.toDateString(),'text':'I had a hypoglycemia attack today. Blacked out for about 5 minutes'};
	$scope.notes.push(temp); 
	var currDate = new Date(currDate.getTime()-27342756);
	temp = {'time':currDate.getTime(),'date':currDate.toDateString(),'text':'I walked around for 5 hours today'};
	$scope.notes.push(temp); 
	var currDate = new Date(currDate.getTime()-37563712);
	temp = {'time':currDate.getTime(),'date':currDate.toDateString(),'text':'I walked barefoot in the grass. I know I shouldn\'t but it was fun'};
	$scope.notes.push(temp);

	console.log($scope.notes);
	//$scope.name = "Panda";
	
	/*$timeout(function() {
	    console.log('lol hi');
	    google.setOnLoadCallback(function() {
		angular.bootstrap(document.body, ['myApp']);
	    });
	    //google.load('visualization', '1', {packages: ['corechart']});
	}, 2000)*/


	// Triggered on a button click, or some other target
	$scope.newNote = function() {
	    $scope.note = {};

	    // An elaborate, custom popup
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
