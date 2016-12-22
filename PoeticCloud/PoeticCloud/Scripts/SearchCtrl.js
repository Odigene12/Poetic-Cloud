app.controller("SearchCtrl", function ($scope, PoetryFactory) {


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

    //This function uses the a function in my factory that makes an HTTP call to the Poetry API that I am using and returns the list of poems based on the input of the user in the search field.
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
})