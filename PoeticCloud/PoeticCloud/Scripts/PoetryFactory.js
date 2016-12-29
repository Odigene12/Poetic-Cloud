app.service("PoetryFactory", function ($http) {

    var selectedPoetry = 
        {
            theTitle: "",
            theAuthor: "",
            thePoem: ""
        }

    var getUserPoetry = function () {

        return $http({
            method: 'GET',
            url: '/api/User'
        })

    }

    var getSelectedPoem = function (poemId) {
        return $http({
            method: 'GET',
            url: '/api/User/' + poemId
        })
    }

    var addPoetry = function (newPoetry) {

        return $http({
            method: 'POST',
            url: '/api/User',
            data: newPoetry
        })

    }

    var deletePoetry = function (selectedPoemId) {
        return $http({
            method: 'DELETE',
            url: '/api/User/' + selectedPoemId
        })
    }

    var searchForPoetry = function (keyword) {
        return $http({
            method: 'GET',
            url: 'http://www.stands4.com/services/v2/poetry.php?uid=5443&tokenid=lm8xiAduoUrDyzbR&term=' + keyword
        })
    }



    return { addPoetry: addPoetry, getUserPoetry: getUserPoetry, getSelectedPoem:getSelectedPoem, deletePoetry: deletePoetry, searchForPoetry: searchForPoetry, selectedPoetry }

})