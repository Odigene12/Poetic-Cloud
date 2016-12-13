var app = angular.module("poeticCloud", []);

app.controller("UserCtrl", function ($scope, PoetryFactory) {

    $scope.Poetry =
        {
            Title:"",
            Author:"",
            Words:""
        };

    $scope.searchResults =
        {
            Title: "",
            Poet: "",
            Poem: "",
        }

    $scope.resultsArray = [];

    $scope.Search = "";

    const domParser = new DOMParser();

    $scope.CreateNSavePoem = function () {
        PoetryFactory.addPoetry($scope.Poetry).then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error)
        })
    }

    $scope.SearchPoetry = function () {
        PoetryFactory.searchForPoetry($scope.Search).then(function (response) {

            var xmlData = response.data;
            var parsedXml = domParser.parseFromString(xmlData, "text/xml");
            var searchResults = parsedXml.querySelectorAll("result");
            
            for (var i = 0; i < searchResults.length; i++) {
                var nodes = searchResults[i];
                var nodeTitle = nodes.querySelector("title").textContent
                var nodePoet = nodes.querySelector("poet").textContent
                var nodePoem = nodes.querySelector("poem").textContent
                $scope.searchResults = 
                    {
                        Title: nodeTitle,
                        Poet: nodePoet,
                        Poem: nodePoem
                    }
                $scope.resultsArray.push($scope.searchResults);
                console.log($scope.resultsArray);
            }

        }, function (error) {
           
            console.log(error)
        })
    }
    debugger 

});

app.service("PoetryFactory", function ($http) {

    var getUserPoetry = function () {

     return  $http({
            method: 'GET',
            url: '/api/User'
        })

    }

     var addPoetry = function (newPoetry) {

    return  $http({
            method: 'POST',
            url: '/api/User',
            data: newPoetry
        })

     }

     var searchForPoetry = function (keyword) {
         return $http({
             method: 'GET',
             url: 'http://www.stands4.com/services/v2/poetry.php?uid=5443&tokenid=lm8xiAduoUrDyzbR&term=' + keyword
             })
     }

     return { addPoetry: addPoetry, getUserPoetry: getUserPoetry, searchForPoetry: searchForPoetry }

})