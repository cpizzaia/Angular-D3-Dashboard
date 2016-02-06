app.directive('sidebar', function() {
  return {
    transclude: 'element',
    restrict: 'EA',
    replace: true,
    scope: true,
    templateUrl: 'js/directives/sidebar.html',
  };
});
