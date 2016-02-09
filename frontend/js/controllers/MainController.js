app.controller('MainController', ['$scope', 'emails', function($scope, emails) {
  emails.success(function(data) {
    $scope.emails = data.emails;

    $scope.emails.sort(function(email1, email2) {
      return Date.parse(email1.date) - Date.parse(email2.date);
    });
  });

  $scope.Average = function(period) {
    var emails = $scope.emails;
    var delivered = 0;
    var read = 0;
    var complaints = 0;
    var count = 0;
    var date;
    var lastDate;

    for (var i = 0; i < emails.length; i++) {
      date = new Date(emails[i].date);

      delivered += emails[i].newsletter.email_delivered;
      read += emails[i].newsletter.email_read;
      complaints += emails[i].newsletter.email_complaints;

      if (typeof lastDate !== "undefined" && date.getDate() !== lastDate.getDate()) {
        count++;
      }
      lastDate = date;

    }

    switch (period) {
      case "daily":
        return [Math.floor(delivered/count), Math.floor(read/count), Math.floor(complaints/count)];
      case "weekly":
        return [Math.floor(delivered/(count/7)), Math.floor(read/(count/7)), Math.floor(complaints/(count/7))];
      case "monthly":
        return [Math.floor(delivered/(count/30)), Math.floor(read/(count/30)), Math.floor(complaints/(count/30))];
    }

  };


  $scope.graphs = [];
  $scope.addGraph = function(type) {
    $scope.graphs.push({type: type, data: $scope.Average(type)});
  };

}]);
