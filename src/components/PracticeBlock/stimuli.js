const jsPsych = window.jsPsych
const FIXATION_MIN = 1000
const FIXATION_MAX = 2500

const randomFromInterval = (min, max, step) => {
    const range = max - min
    return min + Math.floor(Math.random() * range)
}

const instructions = {
    type: "html-keyboard-response",
    data: { instructions: true },
    stimulus: "<p>This practice block will consist of 23 trials</p>" +
        "<p>The fixation will appear followed by the target. Try to press the ENTER key as quickly as possible while the target is displayed.</p>" +
        "<p></p><p>Press any key to begin.</p>"
}

const fixation = {
    type: "html-keyboard-response",
    stimulus: '<div style="font-size: 60px;">+</div>',
    response_ends_trial: false,
    trial_duration: function() { return randomFromInterval(FIXATION_MIN, FIXATION_MAX) },
}

// const fixation1 = {
//     type: "html-keyboard-response",
//     data: {fixation1: true, beginTrial: true},
//     on_start: function(data) {
//         keyLog = []
//         document.addEventListener("keyup", keyLogger)
//     },
//     stimulus: '<div style="font-size: 60px;">+</div>',
//     response_ends_trial: false,
//     trial_duration: function() { return randomFromInterval(FIXATION_MIN, FIXATION_MAX) },
//     on_finish: function(data) {
//         data.presentation_duration = this.trial_duration
//     }
// }

// const fixation2 = {
//     type: "html-keyboard-response",
//     data: {fixation2: true},
//     on_start: function(data) {
//         data.keylog = []
//     },
//     stimulus: '<div style="font-size: 60px;">+</div>',
//     response_ends_trial: false,
//     trial_duration: function() { return randomFromInterval(FIXATION_MIN, FIXATION_MAX) },
//     on_finish: function(data) {
//         data.presentation_duration = this.trial_duration
//         document.removeEventListener("keyup", keyLogger)
//         data.keylog = keyLog
//     }
// }

const target = {
    type: "html-keyboard-response",
    stimulus: '<div style="display: block; height: 80px; width: 80px; background: #666; border-radius: 50%;"></div>',
    choices: ['Enter', 'Space'],
    data: {target: true},
}

const feedback = {
    type: "html-keyboard-response",
    stimulus: function(){
      const targetData = JSON.parse(
        jsPsych.data.getLastTimelineData().filter({target: true}).json()
      ).pop();
  
      const msg = targetData.hit ? 'You Win!!!' : 'Sorry. You Lose.';
      return '<p>' + msg + '</p>';
    },
    data: { feedback: true },
    response_ends_trial: false,
    trial_duration: function() { return 800 }
  }

export {
    instructions,
    fixation,
    target,
    feedback
}