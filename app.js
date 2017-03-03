function doAnalysis(text) {

  let textArray = parseText(text); // array of strings for each word
  let wordBin = makeWordBin(textArray); // to count the use of each individual word

  function parseText(text) {
    // replace new lines and carriage returns with white spaces.
    let mod1 = text.replace(/[\n\r]/g," ").toLowerCase();
    // use regexp to get rid of all punctuation, then return array of words as strings
    return mod1.replace(/[\.:\-\(!\?_\$;}\),{]/g, "").split(" ");
  }

  function makeWordBin(arr) {
    // Create an object with each unique word and num times each word is used
    let wordBin = {};
    let uniqueWords = 0;
    for (let i=0; i<arr.length; i++) {
      if (!wordBin.hasOwnProperty(arr[i])) {
        wordBin[arr[i]] = 1;
        uniqueWords++;
      } else {
        wordBin[arr[i]]++;
      }
    }
    return [wordBin, uniqueWords];
  }

  function getTopWord(arr, wordBin) {
    let maxWord;
    let maxVal;
    for (let prop in wordBin) {
      if (typeof maxWord === "undefined" || wordBin[prop] > maxVal) {
        maxWord = prop;
        maxVal = wordBin[prop];
      }
    }
    return [maxWord, maxVal];
  }

  function getAvgLength(arr) {
    let chars = 0;
    for (let i=0; i<arr.length; i++) {
      chars += arr[i].length;
    }
    return Math.round(chars / arr.length);
  }

  return { // each data point to display is organized as a prop in the returned object
    wordCount: textArray.length,
    uniqueCount: wordBin[1],
    avgWordLength: getAvgLength(textArray),
    topWord: getTopWord(textArray, wordBin[0])
  };
}

// Functions for interacting with the DOM and rendering into the DOM
function renderData(res) {
  $(".js-word-count").text(res["wordCount"]);
  $(".js-unique-word-count").text(res["uniqueCount"]);
  $(".js-average-word-length").text(res["avgWordLength"]);
  $(".js-top-word").text("The word '"+res["topWord"][0]+"' appears "+res["topWord"][1]+" times");
  $(".js-text-report").removeClass("hidden");
}

// Event listener
function getInputDoApp($btn, $userText){
  $btn.on("click", function(e) {
    let text = $userText.val();
    let res = doAnalysis(text);
    renderData(res);
    e.preventDefault();
  });
}

// Document ready...
$(function() {
  getInputDoApp($("button"), $("#user-text"));
});
