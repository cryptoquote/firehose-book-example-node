# How to handle Book (level 2) Data via the Firehose

This is a Nodejs example on how to correctly process and maintain a cryptocurrency order book in real-time.

* get your free API here: https://www.cryptoquote.io/register

## Getting Started

```bash
$ npm install
$ node index YOUR_API_KEY
```

## Outputs

```
------------ BOOK ------------
 [ { price: 8089.95, size: 0.9 },
  { price: 8089.85, size: 0.00154501 },
  { price: 8089.84, size: 0.00117396 },
  { price: 8084.98, size: 0.00426698 },
  { price: 8084.97, size: 0.00117499 },
  { price: 8084.96, size: 0.00216436 },
  { price: 8084.95, size: 0.0012984 },
  { price: 8081.36, size: 0.13527531 },
  { price: 8081.33, size: 0.1 },
  { price: 8081, size: 1.67071095 } ] 
^ ASKS -----------------BIDS V 
 [ { price: 8080.99, size: 33.98419221 },
  { price: 8080.97, size: 0.0015 },
  { price: 8079.99, size: 5.32286802 },
  { price: 8079.9, size: 0.07644566 },
  { price: 8079.4, size: 6.94 },
  { price: 8079.03, size: 0.512 },
  { price: 8078.99, size: 3.5 },
  { price: 8078.98, size: 1 },
  { price: 8077.2, size: 0.204 },
  { price: 8075.99, size: 0.53068158 } ] 
---------- END BOOK ----------
```
