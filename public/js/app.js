const button = document.querySelector('button');
const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');


const fetchQuote = () => {
  fetch('/quote').then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message_1.textContent = data.error;
      } else {
        message_1.textContent = '';
        const wordArray = data.quote.split(" ");

        for (let i=0; i<wordArray.length; i++) {
          const newSpan = document.createElement("span");
          const latinWord = wordArray[i];
          newSpan.innerHTML = `<a href="https://en.wiktionary.org/wiki/${latinWord}#Latin" target="_blank">${latinWord} </a>`;
          message_1.appendChild(newSpan);
        }
        message_2.textContent = data.translation;
      }
    });
  });
}

button.addEventListener('click', () => {
  console.log('button was clicked');
  message_1.textContent = 'Fetching quote...';
  message_2.textContent = '';
  fetchQuote();
});
