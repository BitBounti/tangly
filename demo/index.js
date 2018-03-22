const tangly = new window.tangly.default({
  seed: 'VOOGDWRRNECRXZTAASVMYZPONDFBAURNFPLFHKIBKXYCIKPISAIXIGCWVNERD9OUEIBZUZCVCRSFFJHGY',
  node: 'http://nodes.iota.fm:80',
  tagSecret: '9a41a7fc-b0ba-4275-9826-d194c3e5061f'
})

async function testTag() {
  const tag = await tangly.createTag();
  console.log(`Tag: ${ tag }`);
}

function generateSeed() {
  console.log(tangly.generateSeed());
}

async function searchTag() {
  const tag = document.getElementById("tag").value;
  const data = await tangly.searchTag(tag);
  console.log(`transferData: ${ JSON.stringify(data) }`);
}

async function addData() {
  const name = document.getElementById("name").value;
  const value = document.getElementById("value").value;
  const insert = await tangly.insert({
    name: 'Bob',
    hobbies: [ 'crochetting', 'video games', 'eating' ],
    career: 'Web Dev'
  });
  console.log(`Data Inserted successfully: ${ JSON.stringify(insert) }`)
}

async function findData() {
  const tangleData = await tangly.find();
  console.log("tangle data:", tangleData);
}
