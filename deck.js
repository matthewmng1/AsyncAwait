// Make a request to the Deck of Cards API to request a single card 
// from a newly shuffled deck. Once you have the card, console.log the 
// value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// Make a request to the deck of cards API to request a single card 
// from a newly shuffled deck. Once you have the card, make a request 
// to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of 
// both cards.

// Build an HTML page that lets you draw cards from a deck. When the 
// page loads, go to the Deck of Cards API to create a new deck, and 
// show a button on the page that will let you draw a card.  Every time 
// you click the button, display a new card, until there are no cards 
// left in the deck.

// Get a deck of cards
baseurl = "https://deckofcardsapi.com/api/deck/"
// Draw a card

async function P1(){
    let deck = await $.getJSON(`${baseurl}/new/draw?json`);
    let { suit, value} = deck.cards[0];
    console.log("Part I")
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
}

P1()

async function P2(){
    let deck = await $.getJSON(`${baseurl}/new/draw?json`);
    let deck_id = deck.deck_id

    let draw = await Promise.all(
        Array.from({length:2}, () => $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`))
    );
    console.log("Part II")
    draw.forEach(data => {
        let { suit, value } = data.cards[0]
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    })
}

P2()

async function P3(){
    let $button = $('button');
    let $cardArea = $('#card-area')

    let shuffleDeck = await $.getJSON(`${baseurl}/new/shuffle`);
    $button.show().on('click', async function() {
        let card = await $.getJSON(`${baseurl}/${shuffleDeck.deck_id}/draw`);
        let cardImage = card.cards[0].image;
        $cardArea.append(
            $('<img>', {
                src: cardImage})
        )
        if (card.remaining === 0) $button.remove();
    })
}

P3()