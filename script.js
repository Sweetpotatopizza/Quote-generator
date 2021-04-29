//corresopding const with each html elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//using let, because we change the value
let apiQuotes = [];

// Show Loading
function showLoadingSpinner() {
  // When loading, hide quote and show loading animation
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  //Pick a random quote from 1643 apiQuotes array
  //random: 0~1, floor:delete .xx
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //textContenct pass a string and show in the element

  //Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 50) {
    //classList.add is
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  //using const, because we don't change the value like a api, url
  const apiUrl = "https://type.fit/api/quotes";
  try {
    // this const will not be populated until some data fetched from api
    const response = await fetch(apiUrl);
    //getting the json from api and returning response into json object and pass to apiQuote
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet quote
function tweetQuote() {
  // ES6 template strings used in Backtick
  // ?text= : to use query parameter
  // template string allow us to pass in a value and it will be converted to string
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
