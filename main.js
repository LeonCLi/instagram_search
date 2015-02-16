var app = angular.module('instaApp', ['ngAnimate'])

app.controller('instaController', function($scope, $http){
  $scope.submitted = false
  $scope.message = null
  $scope.submit = function() {
    $scope.submitted = true;
    var tag = $scope.instaData.tag;
    console.log("you searched for: " + tag)
    getImages(tag);
  };

  //search
  function getImages(tag) {
    // api config
    var base = "http://api.instagram.com/v1";
    var clientId = '890e785cf1ea43f2997d57cc47f91bb8';
    //request
    var request = '/tags/' + tag + '/media/recent';
    var url = base + request;
    // parameters
    var config = {
      'params': {'client_id': clientId, 'callback': 'JSON_CALLBACK', 'count': 15,}
    };
    $http.jsonp(url, config).success(function (results) {
      if(results.meta.code == 200) {
        if (results.data.length > 0 ){
          $scope.images = results.data;
          $scope.message = "Found" +results.data.length+ " results tagged with '" +tag+"' ..."
        } else {
            $scope.message = "Sorry. No results were found."
        }
      } else {
          $scope.message = "Error: '" +result.meta.error_type+"'."
      }
    }).error(function(){
        $scope.message = "Error."
    });
  }

  $scope.reset = function() {
      console.log("test")
      $scope.submitted = false
      $scope.message = null
      $scope.instaData = {}
      $scope.images = {}
  }

});
