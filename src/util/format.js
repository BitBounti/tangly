
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
      acc[key] = message[key];
    }
    return acc;
  }, {})
}

function mergeMessagesWithHistory(messages) {
  return messages.reduce((acc, message) => {
    for (let key in message) {
      if (acc.hasOwnProperty(key)) {
        if (acc[key].history) {
          message[key].history = acc[key].history;
          message[key].history.unshift({ value: acc[key].value, timestamp: acc[key].timestamp });
        } else {
          message[key].history = [];
          message[key].history.push(acc[key]);
        }
        acc[key] = message[key];
      } else {
        acc[key] = message[key];
      }
    }
    return acc;
  }, {})
}

function separateObjects(messages) {
  return messages.reduce((acc, message) => {
    for (let item in message) {
      if (item !== 'timestamp') {
        acc.push({ [item]: { value: message[item], timestamp: message.timestamp } });
      }
    }

    return acc;
  }, [])
};

export function untangle(messages, options) {
  const separatedMessages = separateObjects(messages);
  console.log("separated messages:", separatedMessages);
  if (options.history) {
    return mergeMessagesWithHistory(separatedMessages);
  } else {
    return mergeMessagesWithoutHistory(separatedMessages);
  }
  console.log(`Final Object: ${ JSON.stringify(finalObject) }`)
}