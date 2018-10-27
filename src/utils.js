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

const randomFromInterval = (min, max, step=1) => {
  const range = (max - min) / step
  return min + Math.floor(Math.random() * range) * step
}

class KeyLogger {
  keyLog = []
  logger = (event) => { this.keyLog.push(event.keyCode) }
}

class PointsTracker {
  values = []
  currentTotal = 0

  constructor() {
    this.values.push(randomFromInterval(100, 1000, 10))
  }

  getCurrentValue() {
    return this.values[this.values.length - 1]
  }

  setNextValue(incr=true) {
    console.log('incr: ', incr)
    this.currentTotal += incr ? this.getCurrentValue() : -1 * this.getCurrentValue()
    const newVal = randomFromInterval(100, 1000, 10)
    this.values.push(newVal)
  }
}

export {
  shuffle,
  randomFromInterval,
  KeyLogger,
  PointsTracker
}