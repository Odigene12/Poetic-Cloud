app.service("PoetryFactory", function ($http) {

    var getUserPoetry = function () {

        return $http({
            method: 'GET',
            url: '/api/User'
        })

    }

    var addPoetry = function (newPoetry) {

        return $http({
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