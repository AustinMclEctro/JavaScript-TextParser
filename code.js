/*
SENG 513 Winter 2018
Assignment 2
By Austin Sullivan
*/

let validTokens = /^([a-zA-Z0-9]+)$/;   // run regex on this

function getStats(txt) {
    
    // Initialize most of the parts to return
    let nChars = txt.length;
    let words = [];
    let nextWord = "";
    let nLines = 0;
    let lineHasContent = false;
    let nonEmptyLines = 0;
    let maxLineLength = 0;
    let line = "";
    
    // Iterate over the user's text input to count words
    for(let i = 0; i < txt.length; i++)
    {
        // Check for newline
        if(txt.charAt(i) === "\n")
        {
            nLines++;
            
            if(line.length > maxLineLength)
                maxLineLength = line.length;
            
            line = "";
            
            if(lineHasContent)
            {
                nonEmptyLines++;
                lineHasContent = false;
            }
        }
        else
        {
            line += txt.charAt(i);
        }

        // Check line content
        if(txt.charAt(i) !== " " && txt.charAt(i) !== "	" && txt.charAt(i) !== "\n")
        {
            lineHasContent = true;
        }
        
        // Check for a token we should split on to find words
        if(!validTokens.test(txt.charAt(i)))
        {
            if(nextWord !== "")
            {
                nextWord = nextWord.toLowerCase();
                words.push(nextWord);
                nextWord = "";
            }
        }
        // Otherwise keep going
        else
        {
            nextWord += txt.charAt(i);
            if(i+1 === txt.length)
            {
                nextWord = nextWord.toLowerCase();
                words.push(nextWord);
                nextWord = "";
            }
        }
    }
    
    // Final check for number of lines
    if(nChars !== 0)
        nLines++;
    
    // Final check on the line's content
    if(lineHasContent)
        nonEmptyLines++;
    

    // Final check on line length
    if(line.length > maxLineLength)
        maxLineLength = line.length;
    
    // Called upon return to get the average word length
    let averageWordLength = function(){
        if(words.length === 0)
            return 0;
        
        let sum = 0;
        for(let w = 0; w < words.length; w++)
        {
            sum += words[w].length;
        }
        return sum/words.length;
    }();
    
    // Called upon return to get a list of palindromes
    let palindromes = function(){
        let p = [];
        for(let w = 0; w < words.length; w++)
        {
            if(words[w].length > 2)
            {
                let r = Math.floor(words[w].length/2);
                let start = words[w].substring(0,r);
                let end = words[w].substring(words[w].length,words[w].length-r).reverse();

                if(start === end && !p.includes(words[w]))
                    p.push(words[w]);
            }
        }
        return p;
    }();
    
    // Called upon return to get a list of the 10 longest words
    let longestWords = function(){
        let lWords = words;
        // First: sort words by length, or alphabetically if lengths are equal
        // Second: filter out duplicate words by looking at the word after each word (since our words are sorted now)
        lWords = lWords.sort(function(w1,w2)
        {
            return w2.length - w1.length || w1.localeCompare(w2);
        }).filter(function(word,i)
        {
            return word !== lWords[i+1];
        });
        return lWords.slice(0,10);
    }();
    
    // Called upon return to get a list of the 10 most frequently used words
    let mostFrequentWords = function(){
        let fWords = words;
        let t = [];
        
        // Create frequency map f
        let f = {};
        fWords.forEach(function(word){
            if(!f[word])
                f[word] = 0;
            
            f[word] += 1;
        });
        
        // Populate array t
        for(let value in f)
            t.push(value);

        // Sort t by corresponding frequency map f
        // Break tie with alphabetical order
        t = t.sort(function(a,b){
            return f[b]-f[a] || a.localeCompare(b);
        });
        
        // Finally, format the names and return
        for(let value in f)
        {
            let i = t.indexOf(value);
            t[i] += "("+f[value]+")";
        }
        return t.slice(0,10);
    }();
    
    return {
        nChars: nChars,
        nWords: words.length,
        nLines: nLines,
        nonEmptyLines: nonEmptyLines,
        maxLineLength: maxLineLength,
        averageWordLength: averageWordLength,
        palindromes: palindromes,
        longestWords: longestWords,
        mostFrequentWords: mostFrequentWords
    };
}

// Method extended from string class to reverse the given string.
String.prototype.reverse = function() {
    let reversed = "";
    for(let i = this.length-1; i >= 0; i--)
        reversed += this.charAt(i);
    
    return reversed;
}