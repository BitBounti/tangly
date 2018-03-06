
function mergeMessagesWithHistory(messages) {
  return messages.reduce((acc, message) => {
    for (let key in message) {
      // if the property already exists in the acc, add it to the history of the new object and
      // replace the old object with the new in the acc
      if (acc[key]) {
        message.history.push({
          value: acc[key]
        })
      }
      acc[key] = message[key];
    }
    return acc;
  }, {})
}

function mergeMessagesWithoutHistory(messages) {
  return messages.reduce((acc, message) => {
    for (let key in message) {
      acc[key] = {
        value: message[key]
      }
    }
    return acc;
  }, {})
}

function separateObjects(messages) {
  return messages.reduce((acc, message) => {
    if (Object.keys(message).length <= 1) {
      acc.push(message);

      return acc;
    }
    for (let item in message) {
      acc.push({ [item]: message[item] });
    }

    return acc;
  }, [])
};

export function untangle(messages, options) {
  const separatedMessages = separateObjects(messages);
  const finalObject = mergeMessagesWithoutHistory(separatedMessages);
  console.log(`Final Object: ${ JSON.stringify(finalObject) }`)
}