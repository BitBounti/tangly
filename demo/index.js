const tangly = new window.tangly({
  seed: 'KKOXOHAVWHX9EBROTIWQABN9UEVJRSULCOJTHVXU9XAGYTBSJJJHQLLUWVXJTUPAPBGBFMFXUNGRZIKKM',
  node: 'https://testnet140.tangle.works'
})

function addData() {
  tangly.insert(
    {
      firstName: "Test",
      lastName: "McTesterson",
      birthDate: "01/15/1983"
    },
    {
      tag: 'ATAGIDENTITY'
    }
  );
}

function findData() {
  tangly.find();
}