//Get Quotes from API
//https://type.fit/api/quotes
//https://jacintodesign.github.io/quotes-api/data/quotes.json  

const QuoteContainer = document.getElementById('quote-container');
const QuoteText = document.getElementById('quote');
const AuthorText = document.getElementById('author');
const NewQuoteBtn = document.getElementById('new-quote');
const TwitterBtn = document.getElementById('twitter');
const Loader = document.getElementById('loader');

function Loading() {
    Loader.hidden = false;
    QuoteContainer.hidden = true;
}

function Complete() {
    Loader.hidden = true;
    QuoteContainer.hidden = false;
}


let apiQuotes = [];

async function GetQuotes() {
    Loading();
    const API_URL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(API_URL);
        apiQuotes = await response.json();
        NewQuote()
    } catch (error) {

    }

}

function NewQuote() {
    Loading();
    const Quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!Quote.author) {
        AuthorText.textContent = 'Unknown Author';
    } else {
        AuthorText.textContent = Quote.author;
    }

    if (Quote.text.length > 50) {
        QuoteText.classList.add('long-quote');
    } else {
        QuoteText.classList.remove('long-quote');
    }
    QuoteText.textContent = Quote.text;
    console.log(Quote);
    Complete();
}


function TwitterQuote() {
    const TwitterURL = `https://twitter.com/intent/tweet?text=${QuoteText.textContent} - ${AuthorText.textContent}`;
    window.open(TwitterURL, '_blank');
}


//Event Listeners
NewQuoteBtn.addEventListener('click', NewQuote);
TwitterBtn.addEventListener('click', TwitterQuote);


GetQuotes();