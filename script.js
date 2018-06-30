const colors = ['#0CBFF1', '#14A89D', '#8BC53F', '#B6D985', '#B6D985', '#D7B983', '#BF5D39' ];
let randomIdx = generateRandomNumber(colors.length);
let color = colors[randomIdx];
let quotesData = '';
let randomNum = 0;
let quote = {};
getQuotes();

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json"
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function(jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
                randomNum = generateRandomNumber(quotesData.quotes.length);
                quote = {
                    q: quotesData.quotes[randomNum].quote,
                    a: quotesData.quotes[randomNum].author
                };
            }
        }
    });
}

function  generateNewQuote() {
    randomNum = Math.floor(Math.random()*quotesData.quotes.length);
    quote = {
        q: quotesData.quotes[randomNum].quote,
        a: quotesData.quotes[randomNum].author
    };

    changeEverything();
}

function changeEverything() {
    randomIdx = generateRandomNumber(colors.length);
    color = colors[randomIdx];
    $('#text')
    $('#text').html(quote.q);
    $('#author').html(quote.a);
    $('.container').css('background-color', color);
    $('#quote-box').css('color', color)
    $('#tweet-quote').css('background-color', color);
    $('#new-quote').css('background-color', color);
}

function generateRandomNumber(length) {
    return Math.floor(Math.random()*length)
}

$(document).ready( function () {

    $('.container').css('background-color', color);
    $('#quote-box').css('color', color)
    $('#tweet-quote').css('background-color', color);
    $('#new-quote').css('background-color', color);

    $('#text').html(quote.q);
    $('#author').html(quote.a);

    $('#new-quote').on('click', generateNewQuote());

    $('#tweet-quote').on('click', function() {
        open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote.q + '" \n' + '--' + quote.a + '\n'));
    });
});