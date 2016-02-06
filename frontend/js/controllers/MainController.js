app.controller('MainController', ['$scope', 'emails', function($scope, emails) {
  emails.success(function(data) {
    $scope.emails = data.emails;
  });

  $scope.graphs = [];
  $scope.addGraph = function() {
    $scope.graphs.push({content: "hi"});
  };
  $scope.removeGraph= function(item) {
    var index = $scope.graphs.indexOf(item);
    $scope.graphs.splice(index, 1);
  };

}]);
