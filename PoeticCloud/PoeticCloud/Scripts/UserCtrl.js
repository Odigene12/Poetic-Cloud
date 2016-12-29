app.controller("UserCtrl", function ($scope, PoetryFactory) {

    $scope.userPoems = [];
    $scope.newDataAfterDelete = [];

    console.log("yes")

    //This function gets the poem from my database by calling a factory method that makes an HTTP request to my WebApi controller that accesses my repository to retrieve all of the poems in my database.
    $scope.getUserPoems = function () {
        console.log("access")
        PoetryFactory.getUserPoetry().then(function (userPoetry) {
            for (var i = 0; i < userPoetry.data.length; i++) {
                $scope.userPoems.push(userPoetry.data[i]);
            }
        })
        console.log($scope.userPoems)
    }();
  
    $scope.deletePoem = function (poemId) {
        PoetryFactory.deletePoetry(poemId).then(function () {
            console.log("poem deleted");
          location.reload()
        })
    }
});
