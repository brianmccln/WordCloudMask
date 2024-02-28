// Lesson 05.08 - Word Frequency Map for a Word Cloud - START

// A Word Cloud is a visual representation of the frequency of words in a string, 
// such as found in a blog post or other article; in a word cloud, the most frequently 
// occurring words appear in the largest font size in order to do this, the frequency of words // must be known. Therefore, before we can make a Word Cloud, we have to make what is called 
// a Word Frequency Map from of the words. This takes the form of an Object, where the keys
// are unique words and the value of each key is the number of times the word occurs.
// To make the Word Frequency Map, we have to convert the text to an array, with each item
// a word. Then we loop through the array of words. every time a unique word is found, 
/// the object is assigned that word as a new key with an initial value of 1.
// the next time the word is encounterd, no new key is made, but rather the value of the // ///// existing key is incremented by 1
// the resulting Word Frequency Map can then be used to make a Word Cloud by setting the font 
// size of each word based on the frequency, with most frequent words biggest
// also, since a Word Cloud only contains interesting, important keywords, there needs to be 
// a filter that prevents what are known as stopwords from being included in the Word
// Frequency Map. Stopwords include such common words as 'the', 'and', 'of', 'on', 'with', etc.

/*
REFACTOR & UPGRADE CHALLENGE:
1.) divide the one function into 2 functions:
    - makeWordFreqMap(passageStr, stopword) 
        return wordFreqMap
    - makeWordCloud(wordFreqMap, wordCloudElemID)
        not return anything, but instead would output WC to DOM
2.) Make it interactive for the user:
    - select menu lets user pick a passage
        - that passage's word cloud appears on menu change
        - add one passage of your own -- go find sthg online
3.) Optional: have the actual passage also appear in a box
4.) Have an ordered list appear called Top 10 words that shows 
    the 10 most frequently occuring words:
    Top 10 Words:
    1. Treehouse (28)
    2. Board (11)
    3. Materials (10)
    etc.
5.) ONLY IF YOURE DONE: 
    Make the select menu options populate dynamically
*/
// get the wordCloudTag elem
const wordCloudTag = document.getElementById("word-cloud");
const selectMenu = document.getElementById("select-passage");
selectMenu.addEventListener('change', function() {
    makeWordCloud(makeWordFreqMap(eval(this.value), STOPWORDS), 'word-cloud')
});

/* --- ryan
menu.addEventListener('change', function(){
    console.log('running')
    makeWordCloud(makeWordFreqMap(eval(this.value), STOPWORDS), 'word-cloud')
}) */

function makeWordFreqMap(passageStr, stopword){

    // RegEx remove punct, spec chars, digits
    passageStr = passageStr.replace(/[^\w\s]/g, '');
    passageStr = passageStr.replace(/[0-9]/g, '');

    // make an array of the words, each word an array item
    const passageArr = passageStr.toLowerCase().split(' ');

    // declare a new object
    const passageObj = {};

    for(word of passageArr) { 
    //goes through each word of passageArr
        if(!stopword.includes(word)) {
        //checks if word is not a stop work
            if(passageObj[word]) {
            //check if the word is a key in obj
                passageObj[word]++;
                //increment value
            } else {
                passageObj[word] = 1;
                //add key and set value to 1
            }
        } 
    }
    // new obj to hold only key-value pairs where value is 5+
    const passObjMin5 = {};
    // loop the obj keys, making word cloud elems for each word w value of 5+
    for (key in passageObj) {
        if(passageObj[key] >= 5) { // if key val is 5+
            // save that 5+ key-val to new obj
            // this is not required to build the word cloud in the DOM
            // it's just to have as an obj to log in the console
            passObjMin5[key] = passageObj[key];
        }
    }
    return passObjMin5;
}//end function makeWordFreqMap

function makeWordCloud(passObj5) {
    wordCloudTag.innerHTML = '';

    for (key in passObj5){
        // make div for each word in word cloud
        const wordDiv = document.createElement('div');
        // assign word as key to the div
        wordDiv.textContent = key;
        wordDiv.className = 'word-cloud-div';

        // set the font size as 3x freq 
        // so treehouse=28 has font-size:84px 
        let fontSz = passObj5[key] * 3;
        wordDiv.style.fontSize = fontSz + 'px';

        // set the color based on font size
        const colors = ["white", "tan", "pink", "yellow", "orange", "aqua","forestgreen", "yellowgreen",  "cornflowerblue", "lime"];

            if(fontSz < 16) { // smallest size
                colr = colors[0];
            } else if(fontSz < 21) {
                colr = colors[1];
            } else if(fontSz < 27) {
                colr = colors[2];
            } else if(fontSz < 33) {
                colr = colors[3];
            } else if(fontSz < 39) {
                colr =colors[4];
            } else if(fontSz < 48) {
                colr = colors[5];
            } else if(fontSz < 54) {
                colr = colors[6];
            } else if(fontSz < 60) {
                colr = colors[7];
            } else if(fontSz < 70) {
                colr = colors[8];
            } else { // biggest font size
                colr = colors[9];
            }

            // set the color of the word based on its font size
            wordDiv.style.color = colr;

            // calculate a random rotation within limited range:
            let r = ~~(Math.random() * 11); // 0-10
            if(Math.random() - 0.5 < 0) {
                r = -r; // make r negative half the time
            }

            // apply the rotation in range of -10 to +10
            wordDiv.style.transform = `rotate(${r}deg)`;
            
            // output the divvy to the word cloud DOM element
            wordCloudTag.appendChild(wordDiv);             
    }

    // make a bitmap image out of the word cloud div
    // this way, we can apply CSS mask
    createImageBitmap(wordCloudTag);

} //function makeWordCloud

/*  
let treehouseObj = makeWordFreqMap(treehouse, STOPWORDS);
makeWordCloud(treehouseObj, 'word-cloud');
console.log(treehouseObj);
*/


makeWordCloud(makeWordFreqMap(treehouse, STOPWORDS), 'word-cloud');

