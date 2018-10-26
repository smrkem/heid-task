const shuffle = function(arr) {
  var currentIndex = arr.length;
  var randIndex, tempValue;

  while (currentIndex !== 0) {
    randIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = arr[currentIndex];
    arr[currentIndex] = arr[randIndex];
    arr[randIndex] = tempValue;
  }
  return arr;
}

class KeyLogger {
  keyLog = []
  logger = (event) => { this.keyLog.push(event.keyCode) }
}

export {
  shuffle,
  KeyLogger
}