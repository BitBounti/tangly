# Tangly: Identity library for the IOTA Tangle
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
```
### Server-side usage
server.js
```javascript
const Tangly = require('tangly');

const tangly = new Tangly({
  seed: 'your_seed',
  node: 'https://testnet140.tangle.works'  // testnet node. Can use any testnet or mainnet node
});
```
## API
--------
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
  ).then((data) => {})
```
#### **Return Value**
- `Object`
  - `address` (`String`): Address that was used to insert data into the Tangle.
  - `tag` (`String`): Tag that was assigned.
##### Example
```javascript
{
  address: 'W9AZFNWZZZNTAQIOOGYZHKYJHSVMALVTWJSSZDDRVEIXXWPNWEALONZLPQPTCDZRZLHNIHSUKZRSZAZ9W',
  tag: 'SUPER9DESCRIPTIVE9TAG'
}
```

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
tangly.find({}, 'firstName', { history: false }).then((data) => {})
```
###### All fields query
```javascript
tangly.find({}, '', { history: false }).then((data) => {})
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