
'use strict';

const WebSocket = require('ws');
const request = require('request-promise');

let host = 'wss://feed.cryptoquote.io';
let key = process.argv[2] ||  'CHANGE_ME';

console.log(process.argv[2]);

let us = new WebSocket(`${host}/v1/firehose/${key}?services=book`);

let book = {
    bids: [],
    asks: []
};

getBook().then((b) => {
    b = JSON.parse(b);
    b.bids.forEach((bid) => {
        book.bids.push({ price: bid[0], size: Number(bid[1].size) });
    });
    b.asks.forEach((ask) => {
        book.asks.push({ price: ask[0], size: Number(ask[1].size) });
    });

    console.log('Book Snap', book);
});


function addOrUpdatePrice(side, price, size) {
    let ary = (side === 'buy') ? book.bids : book.asks;

    let i = ary.findIndex(p => p.price === price);

    if (i > -1 && size === 0.0) {
        // delete this price level
        ary.splice(i, 1);
    } else if (i > -1) {
        // replace size at this price level
        ary[i].size = size;
    } else if (size > 0.0) {
        // add to book
        ary.push({ price, size });
    }
}

setInterval(() => {
    console.log('\n------------ BOOK ------------\n',
        book.asks.sort(compAsks).slice(0, 10).reverse(),
        '\n^ ASKS -----------------BIDS V \n',
        book.bids.sort(compBids).slice(0, 10),
        '\n---------- END BOOK ----------\n');
}, 1000);

function compBids(a, b) {
    return b.price - a.price;
}

function compAsks(a, b) {
    return a.price - b.price;
}

us.on('message', (e) => {
    const m = JSON.parse(e);
    if (m.updateType === 'book_update' && m.exchange.name === 'GDAX' && m.symbol === 'BTCUSD') {
        addOrUpdatePrice(m.side, m.price, Number(m.size));
    }
});

function getBook() {
    return request.get(`https://feed.cryptoquote.io/api/v1/book/btcusd.gdax/10`);
}
