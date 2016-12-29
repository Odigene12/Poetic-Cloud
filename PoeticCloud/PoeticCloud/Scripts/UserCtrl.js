app.controller("UserCtrl", function ($scope, $window, $element, PoetryFactory) {

    $scope.userPoems = [];
    $scope.newDataAfterDelete = [];

    $scope.selectedPoemWords;

    $scope.wordCloudData = [];

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

    $scope.showCloud = function (poemId) {
 
        PoetryFactory.getSelectedPoem(poemId).then(function (poem) {
            $scope.selectedPoemWords = poem.data.Words;
            console.log($scope.selectedPoemWords)
            generateWordCloud();
        })
    }

    //this is the function to generate the word cloud
    var generateWordCloud = function () {
        
        //get the text from the userinput using $scope.
        let text = $scope.selectedPoemWords;

        var newWordArray = [];

        var deleteMarks = function () {
            var newText = text.replace(/[,.!—\-?:;]/g, " ")
            newWordArray.push(newText)

            console.log(newText)
            return newText;

        }
        var newTextAgain = deleteMarks()


        //split the words up by space.
        const words = newTextAgain.split(" ");

        //create an empty object/dictionary 
        const wordCloudObject = {};


        words.forEach(w => {

            //verifying if the current word exists within the object.
            if (!!wordCloudObject[w]) {

                //if the current word exist then increase the count of the word (which means how many times the word occurs) by one
                wordCloudObject[w] += 1;
            } else {
                //if the current word does not exist yet, then put it in and give the count of it = 1.
                wordCloudObject[w] = 1;
            }
        });

        //This iterates over the key value pairs of words (the object) and puts it in the format that the directive is expecting (that you are using. Remember, it's d3. Yea. You remember.)

        for (let key in wordCloudObject) {
            $scope.wordCloudData.push({ text: key, count: wordCloudObject[key] });
        }

        $scope.wordCloudData = $scope.wordCloudData.sort(function (a, b) {
            return b.count - a.count;
        })
        computeWordSize();
    }

    var computeWordSize = function () {
        //get the wordcloud tag and attach to variable
        var wordCloudTag = $element.find('#wordsCloud')

        //set the inner height of your $scope.
        var scopeHeight = $window.innerHeight * 0.75;

        //set the height of the wordcloud tag
        wordCloudTag.height(scopeHeight);

        var scopeWidth = wordCloudTag[0].offsetWidth;
        var maxCount = $scope.wordCloudData[0].count;
        var minCount = $scope.wordCloudData[$scope.wordCloudData.length - 1].count;
        var maxWordSize = scopeWidth * 0.15;
        var minWordSize = maxWordSize / 5;
        var spreadSpace = maxCount - minCount;

        if (spreadSpace <= 0) {
            spreadSpace = 1;
        }

        var step = (maxWordSize - minWordSize) / spreadSpace;

        $scope.words = $scope.wordCloudData.map(function (word) {
            return {
                text: word.text,
                size: Math.round(maxWordSize - ((maxCount - word.count) * step))
            }
        })

        $scope.width = scopeWidth;
        $scope.height = scopeHeight;
    }
});
