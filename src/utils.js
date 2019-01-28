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
  if (arr.length < n) {
    n = arr.length;
  }
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
  // console.log('selIssue:', selectedIssue);

  const forStatement = selectedIssue.position_statements.for_statement;
  const alternateStatement = selectedIssue.position_statements.alternate_statement;
  const charityStatement = position > 0 ? forStatement : alternateStatement;
  const anticharityStatement = position > 0 ? alternateStatement : forStatement;

  const copy = {
    "game": [
      `In this round, your goal is to <span class="bold">WIN</span> for the sake of winning!`,
      `There is no money at stake in this round. The more points you win by hitting your target quickly, the more points you will accumulate and be this week’s fastest player!`,
      `<span class="bold">You want to win as many trials as possible.</span> The more you win, the faster you finish playing this task.`
      ],
    "charity": [
      `In this round, your goal is to <span class="bold">WIN</span> money for <span class="bold">${charityStatement}</span>.`,
      `The more points you win by hitting your target quickly, the more likely you are to WIN money for a <b>charity that fights for ${charityStatement}</b>.`
      ],
    "anti-charity": [
      `In this round, your goal is to <span class="bold">WIN against ${anticharityStatement}</span> and avoid donating money to this issue.`,
      `The more trials you lose, the more likely you will be forced to donate money to a charity that is AGAINST ${charityStatement} and fights FOR ${anticharityStatement}.`,
      `<span class="bold">You want to win as many trials as possible.</span> Winning will result in points being removed from this “anti-charity’s” total score; losing will result in points being added to this anti-charity’s total score.</span> `
      ],
    "self": [
      `In this round, your goal is to <span class="bold">WIN</span> money for <span class="bold">yourself</b>.`,
      `The more points you win by hitting your target quickly, the more likely you are to WIN money for yourself.`
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