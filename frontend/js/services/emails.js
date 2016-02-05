app.factory('emails', ['$http', function($http) {
  return $http.get('/emails')
            .success(function(data) {
              return data;
            }) 
            .error(function(err) {
              return err;
            });
}]);
