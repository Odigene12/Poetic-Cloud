app.controller("UserCtrl", function ($scope, PoetryFactory) {

    $scope.userPoems = [];

    console.log("yes")

    //This function gets the poem from my database by calling a factory method that makes an HTTP request to my WebApi controller that accesses my repository to retrieve all of the poems in my database.
    var getUserPoems = function () {
        console.log("access")
        PoetryFactory.getUserPoetry().then(function (userPoetry) {
            for (var i = 0; i < userPoetry.data.length; i++) {
                console.log(userPoetry.data[i])
                $scope.userPoems.push(userPoetry.data[i])
            }
        })
        console.log($scope.userPoems)
    }()
  
});
