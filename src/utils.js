import issues from './components/Survey/Issues/Issues';

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
  delete iss.position_statements;
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
  const selectedIssue = issues.filter(iss => iss.title === name)[0];
  const positionStatements = selectedIssue.position_statements[position];
  const antiPosition = position === "for" ? "against" : "for";
  const antiPositionStatements = selectedIssue.position_statements[antiPosition];

  const copy = {
    "game": [
      `In this round, your goal is to <span class="bold underline">WIN</span> for the sake of winning!`,
      `There is no money at stake in this round. The more points you win by hitting your target quickly, the more points you will accumulate and be this week’s fastest player!`
      ],
    "charity": [
      `In this round, your goal is to <span class="bold underline">WIN</span> money for <span class="bold">your social issue</span>.`,
      `The more points you win by hitting your target quickly, the more likely you are to <span class="underline">WIN</span> money for a <span class="bold">charity that fights for your beliefs about ${name}</span> and is ${positionStatements.for_statement}.`
      ],
    "anti-charity": [
      `In this round, your goal is to <span class="bold underline">AVOID LOSING</span> and risk donating money to a social issue you are against.`,
      `The more trials you lose, the more likely you will donate money to a charity <span class="bold">that fights against your beliefs about ${name}</span> and is ${antiPositionStatements.for_statement}.`,
      `<span class="bold">You want to win as many trials as possible.</span> Losing will result in points being added to this "anti-charity’s" total score; winning will result in points being removed from the anti-charity’s total score.</span> `
      ],
    "self": [
      `In this round, your goal is to <span class="bold underline">WIN</span> money for <span class="bold">yourself</b>.`,
      `The more points you win by hitting your target quickly, the more likely you are to <span class="underline">WIN</span> money for yourself.`
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