app.controller('eventsController', ['$scope', 'tripsFactory', 'eventsFactory', '$http', '$rootScope', '$routeParams', '$window',
        function ($scope, tripsFactory, eventsFactory, $http, $rootScope, $routeParams, $window) {

    $scope.trips;
    $scope.trip = {};

    $scope.events;
    $scope.event = {};

    $scope.eventsByTag;
    $scope.tags;

    $scope.tripId = $routeParams.tripId

    $scope.insertEvent = function () {
        var event = $scope.event
        eventsFactory.insertEvent()
            .success(function (response) {
                $scope.status = 'Inserted event! Refreshing event list.';
                $rootScope.activeEvent = response;
                $rootScope.tagCaptureEvent = response;
                $rootScope.currentEvent = response.id
                // $scope.event.title = ''
                // $scope.event.date = ''
                // $scope.event.content = ''
            }).
            error(function(error) {
                $scope.status = 'Unable to insert event: ' + error.message;
            });
    };

    $scope.getEvents = function() {
      eventsFactory.getEvents()
        .success(function(response){
          $scope.events = response
          $scope.trip = $routeParams.tripId
        })
        .error(function(error){
          $scope.status = "Unable to load events: " + error.message;
        });
    }

    $scope.getEvent = function() {
      eventsFactory.getEvent($routeParams.eventId)
        .success(function(response){
          $scope.event = response
          $scope.trip = $routeParams.tripId
          // $scope.trip = $routeParams.tripId
        })
        .error(function(error){
          $scope.status = "Unable to load event: " + error.message;
        });
    }

// get tags for single event
    $scope.getTagsForEvent  = function() {
      eventsFactory.getTagsForEvent ($routeParams.eventId)
        .success(function(response){
          // debugger;
          $scope.tags = response
        })
        .error(function(error){
          $scope.status = "Unable to load event: " + error.message;
        });
    }

    $scope.deleteEvent = function (id) {
      eventsFactory.deleteEvent(id)
          .success(function () {
              for (var i = 0; i < $scope.events.length; i++) {
                var checkEvent = $scope.events[i];
                if (checkEvent.id === id) {
                  $scope.events.splice(i, 1);
                  break;
                }
              }
          })
          .error (function(error) {
            $scope.status = 'Unable to delete event: ' + error.message;
          });
    };

    $scope.updateEvent = function () {
      eventsFactory.updateEvent($rootScope.activeEvent)
          .success(function (response) {
              for (var i = 0; i < $scope.events.length; i++) {
                var checkEvent = $scope.events[i];
                if (checkEvent.id === $rootScope.activeEvent.id) {
                  $scope.events.checkEvent = response;
                  break;
                }
              }
          })
          .error (function(error) {
            $scope.status = 'Unable to update event: ' + error.message;
          });
    };

    $scope.editEvent = function () {
      eventsFactory.editEvent($scope.event)
          .success(function (response) {
              for (var i = 0; i < $scope.events.length; i++) {
                var checkEvent = $scope.events[i];
                if (checkEvent.id === $scope.event.id) {
                  $scope.events.checkEvent = response;
                  break;
                }
              }
          })
          .error (function(error) {
            $scope.status = 'Unable to edit the event: ' + error.message;
          });
    };

}]);

