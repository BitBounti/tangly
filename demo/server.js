const Tangly = require('tangly');

const tangly = new Tangly({
  seed: 'KKOXOHAVWHX9EBROTIWQABN9UEVJRSULCOJTHVXU9XAGYTBSJJJHQLLUWVXJTUPAPBGBFMFXUNGRZIKKM',
  node: 'https://testnet140.tangle.works'
});

tangly.insert({
  firstName: "Eric",
  lastName: "Butterfield",
  birthDate: "12/04/1989"
});