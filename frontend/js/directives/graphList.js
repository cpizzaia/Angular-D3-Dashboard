app.directive('graphList', function() {
  return {
    transclude: 'element',
    restrict: 'EA',
    replace: true,
    scope: true,
    templateUrl: 'js/directives/graphList.html',
  };
});
