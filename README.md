# Tangly: Identity library for the IOTA Tangle
Tangly (tangle + identity) interfaces with the IOTA Tangle; allowing for storing and retrieving data based on a seed. Instead of a user registering and sending sensitive data to a centralized data store, user data is encrypted based off of the user's seed that only the user knows and stored in the decentralized Tangle. The Tangle has the unique property of having free transactions which allows for data to be stored through Tangly one field at a time. Data is then retrieved and decrypted based off of a user's seed. No sensitive data needs to touch a centralized database, not even a username and password.

It is sometimes necessary to store meta data like user reputation and stats. Tangly allows you to add an "anchor" ID to the Tangle which can be stored in a centralized database. This anchor ID can be retrieved from the tangle to be used to send meta data to a database.
## Quick Start
### Installation
```
npm install --save tangly
```
### Client-side usage
example.html
```html
<script src="../path/to/node_modules/tangly/dist/tangly.js"></script>
```
example.js
```javascript
const tangly = new window.tangly({
  seed: 'your_seed',
  node: 'https://testnet140.tangle.works'  // testnet node. Can use testnet or mainnet
})

tangly.find({}).then(data => data)
```
### Server-side usage
server.js
```javascript
const Tangly = require('tangly');

const tangly = new Tangly({
  seed: 'your_seed',
  node: 'https://testnet140.tangle.works'  // testnet node. Can use any testnet or mainnet node
});

tangly.insert({ firstName: "Jane" })
  .then(data => data)
```
## API
### `tangly.insert()`
Insert an object into the Tangle by attaching a zero-value transaction.
#### **Input**
```javascript
tangly.insert(data, options)
```
- `data` (`Object`) `required`: Data you will be attaching to the tangle.
- `options` (`Object`) `optional`: Tangle meta data.
  - `tag` (`String`): Tryte-encoded tag. Maximum value is 27 trytes.
##### Example
```javascript
tangly.insert(
    {
      firstName: "Jane",
      lastName: "Doe"
    },
    {
      tag: 'SuperDescriptiveTag'
    }
  ).then(data => data)
```
#### **Return Value**
- `Object`
  - `address` (`String`): Address that was used to insert data into the Tangle.
  - `tag` (`String`): Tag that was assigned.
  - `generatedSeed` (`String`): If no seed was supplied a seed will be generated and returned here.
##### Example
```javascript
{
  address: 'W9AZFNWZZZNTAQIOOGYZHKYJHSVMALVTWJSSZDDRVEIXXWPNWEALONZLPQPTCDZRZLHNIHSUKZRSZAZ9W',
  tag: 'SUPER9DESCRIPTIVE9TAG'
}
```
-------
### `tangly.find()`
Find data that was inserted by the specified seed.
#### **Input**
```javascript
tangly.find(query, field, options)
```
- `query` (`Object`) `required`: Specifies selection filters using query operators. To return all fields, omit this parameter or include an empty object(`{}`). There are currently no query operators available.
- `field` (`String`) `optional`: The name of the field you are attempting to find.
- `options` (`Object`) `optional`: Optional search parameters
  - `history` (`Boolean`) `default` `false`: Flag to return a field's history
  - `timestamp` (`String`) `default` `true`: flag ti return a timestamp attached to the field
##### Example
###### Single field query
```javascript
tangly.find({}, 'firstName', { history: false }).then(data => data)
```
###### All fields query
```javascript
tangly.find({}, '', { history: false }).then(data => data)
```
#### **Return Value**
- `Object`
  - `fieldName` (`Object`)
    - `fieldValue` (`Any`)
    - `timestamp` (`String`)
##### Example
```javascript
{
  firstName: {
    value: "Jane",
    timestamp: '3534534234'
  }
  lastName: {
    value: "Doe",
    timestamp: '3534534234'
  }
}
```
```javascript
{
  firstName: {
    value: 'Jane',
    timestamp: '34567893233'
    history: [
      {
        value: 'jaane'
        timestamp: '3456789876'
      }
    ]
  },
  lastName: 'Doe'
}
```
----
TODO: tangly.addAnchorId()

----
TODO: tangly.getAnchorId()