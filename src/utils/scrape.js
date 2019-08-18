const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/List_of_Latin_phrases_(full)';

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const $ = cheerio.load(text);
    const rawQuotes = $('td b');

    const quotesArray = [];

    rawQuotes.each((i, el) => {
      const quote = $(el).text();
      const translation = $(el).parent().next().text();

      if(!quote.includes('consonantal') && !quote.startsWith('-')) {
        quotesArray.push({
          quote,
          translation
        });
      }
    });

    //Place quoteArray in separate file to access later
    const obj = {
      quotesArray
    };

    const json = JSON.stringify(obj);

    fs.writeFile('latinquotes.json', json, 'utf8', (err) => {
      if (err) {
        console.log(err);
        return
      }
    });

    //Select random quote and return it for when the function is first run

    const singleQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    return singleQuote;

  } catch (error) {
    console.log(error);
  }
};

// getData(url)
// .then((data) => {
//   console.log(data);
// })

module.exports = getData;
