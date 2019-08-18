const express = require('express');
const path = require('path');
const getData = require('./utils/scrape');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.get('/quote', (req, res) => {
  const url = 'https://en.wikipedia.org/wiki/List_of_Latin_phrases_(full)';

  if (fs.existsSync('latinquotes.json')) {
    fs.readFile('latinquotes.json', 'utf8', function readFileCallback(err, data) {
        if (err){
            console.log(err);
        } else {
        const obj = JSON.parse(data); //make json data an object

        const singleQuote = obj.quotesArray[Math.floor(Math.random() * obj.quotesArray.length)];

        res.send({
          quote: singleQuote.quote,
          translation: singleQuote.translation
        });
      }
    });
  } else {
    getData(url)
    .then((data) => {
      res.send({
        quote: data.quote,
        translation: data.translation
      });
    });
  }
});

// app.post('/message', (req, res) => {
//   const url = 'https://en.wikipedia.org/wiki/List_of_Latin_phrases_(full)';
//   getData(url)
//   .then((data) => {
//     console.log(req.body);
//     res.send({
//       quote: data.quote,
//       translation: data.translation
//     });
//   });
// });

app.listen(port, () => {
  console.log(`The server is up on ${port}!`);
});
