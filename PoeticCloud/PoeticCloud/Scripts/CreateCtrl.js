app.controller("CreateCtrl", function ($scope, $window, $element, PoetryFactory) {

    $scope.Poetry =
          {
              Title: "",
              Author: "",
              Words: ""
          };

  
    $scope.wordCloudData = [];

  


    $scope.CreateNSavePoem = function () {
        console.log("clicked")
        PoetryFactory.addPoetry($scope.Poetry).then(function (response) {
            generateWordCloud();
        }, function (error) {
            console.log(error)
        })
    }


    //this is the function to generate the word cloud
    var generateWordCloud = function () {

        //get the text from the userinput using $scope.
      let text = $scope.Poetry.Words;
      
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

     $scope.wordCloudData =  $scope.wordCloudData.sort(function (a, b) {
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
                size: Math.round(maxWordSize -((maxCount - word.count) * step))
            }
        })

        $scope.width = scopeWidth;
        $scope.height = scopeHeight;
    }
});
