app.directive('graphList', function() {
  return {
    transclude: 'element',
    restrict: 'EA',
    replace: true,
    scope: {
      graphs: '='
    },
    templateUrl: 'js/directives/graphList.html',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.emails, function(emails) {

      });
    }
  };
});
