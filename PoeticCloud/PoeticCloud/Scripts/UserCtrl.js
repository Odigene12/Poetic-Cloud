app.controller("UserCtrl", function ($scope, PoetryFactory) {

   

    $scope.searchResults =
        {
            Title: "",
            Poet: "",
            Poem: "",
        }

    $scope.resultsArray = [];

    $scope.displayResults = [];

    $scope.Search = "";

    const domParser = new DOMParser();

    $scope.SearchPoetry = function () {
        PoetryFactory.searchForPoetry($scope.Search).then(function (response) {
            console.log(response);
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
});
