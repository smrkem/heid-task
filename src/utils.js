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

const getMeanForLast = (arr, n) => {
  var data = arr.slice(-n);
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return Math.round(sum / n);
}


const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

const dataFromIssue = (iss) => {
  delete iss.image_src;
  delete iss.description;
  delete iss.problem_statement;
  delete iss.pros;
  delete iss.cons;
  delete iss.position_statement;
  return iss;
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
    this.currentTotal += incr ? this.getCurrentValue() : -1 * this.getCurrentValue()
    const newVal = randomFromInterval(100, 1000, 10)
    this.values.push(newVal)
  }
}


function conditionCopy(c, {name, position}) {
  const charityCauseString = position === 'for' ?
    `FOR ${name}` : `AGAINST ${name}`
  const anticharityCauseString = position === 'for' ?
    `ANTI ${name}` : `FOR ${name}`

  const copy = {
    "game": [
      "In this block, you will be playing to play. If you win, you will win points and increase your total score for this block. If you lose, you will lose points and reduce your total score.",
      "Please take a few moments to think about why it is important for you to win."
      ],
    "charity": [
      `In this block, you will be fighting to win money ${charityCauseString}, a social issue you believe in. The more points you WIN, the more likely it is you will win money to donate to this cause.`,
      "Please take a few moments to think about why this cause is important to you."  
      ],
    "anti-charity": [
      `In this block, you will be fighting an organization that is ${anticharityCauseString}. If you do not win these trials, you are at risk of donating to an organization that goes against your beliefs.`,
      "Your goal is to WIN as many trials as possible. If you WIN the trial, points will be removed from this organization and you are LESS likely to donate money to this cause. If you LOSE, points will be added to this organization and you are MORE likely to donate money to this cause.",
      "Please take a few moments to think about why it is important that you do NOT donate money to this cause. "
      ],
    "self": [
      "In this block, you will be playing to win money for yourself, to spend money on something pleasant, enjoyable, and/or fun (e.g., food, entertainment, activities, shopping, vacation).",
      "If you win, you will win points and increase the likelihood of winning money for yourself. If you lose, you will lose points and reduce the likelihood of winning money for yourself.", 
      "Please take a few moments to think about what you would do with this money and why it is important for you to win."
    ]
  }
  return copy[c]
} 

export {
  shuffle,
  randomFromInterval,
  getMeanForLast,
  closeFullscreen,
  KeyLogger,
  PointsTracker,
  conditionCopy,
  dataFromIssue
}