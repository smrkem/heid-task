import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { DbStaircase } from './staircase'
import { instructions } from './stimuli'
import './ExperimentBlock.css'
import { KeyLogger, randomFromInterval, PointsTracker } from '../../utils'

const jsPsych = window.jsPsych
const keyLogger = new KeyLogger()
const pointsTracker = new PointsTracker()


const cue = {
  type: "html-keyboard-response",
  stimulus: function() {
    const pointVal = pointsTracker.getNextValue()
    return `<p>cue</p><p>${pointVal} point value</p>`
  },
  data: { cue: true },
  response_ends_trial: false,
  trial_duration: 1000
}

const fixation = {
  type: "html-keyboard-response",
  stimulus: '<div style="font-size: 60px;">+</div>',
  response_ends_trial: false,
  data: {fixation: true},
  trial_duration: function() { 
    return randomFromInterval(2000, 2500) 
  },
  on_start: function(data) {
    keyLogger.keyLog = []
    document.addEventListener("keyup", keyLogger.logger)
  },
  on_finish: function(data) {
    data.presentation_duration = this.trial_duration
  }
}

const target = {
  type: "html-keyboard-response",
  stimulus: '<div style="display: block; height: 80px; width: 80px; background: #666; border-radius: 50%;"></div>',
  choices: ['Enter', 'Space'],
  data: {target: true},
  trial_duration: function() { return 300 },
  on_finish: function(data) {
    data.presentation_duration = this.trial_duration
    data.hit = data.rt ? true : false
  }
}

const blank = {
  type: "html-keyboard-response",
  stimulus: '<div></div>',
  response_ends_trial: false,
  trial_duration: function() { 
    return randomFromInterval(1500, 3000) 
  }
}

const blank1 = Object.assign({
  data: {blank1: true},
  on_finish: function(data) {
    data.presentation_duration = this.trial_duration
    data.keylog = keyLogger.keyLog
    document.removeEventListener("keyup", keyLogger.logger)
  }
}, blank)

const feedback1 = {
  type: "html-keyboard-response",
  stimulus: function(){
    const targetData = JSON.parse(
      jsPsych.data.getLastTimelineData().filter({target: true}).json()
    ).pop();

    const msg = targetData.hit ? 'You Win!!!' : 'Sorry. You Lose.';
    return `<p>${pointsTracker.getCurrentValue()} points!</p><p>${msg}</p>`;
  },
  data: { feedback: true },
  response_ends_trial: false,
  trial_duration: 1650
}

// const staircase = new DbStaircase({
//     firstVal: 400,
//     down: 2,
//     stepSizes: [8, 4, 4, 2, 2, 1]
// })
// const NUM_REVERSALS = 9
// const NUM_STAIRCASE_VALUES = 5

// function closeFullscreen() {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.mozCancelFullScreen) { /* Firefox */
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) { /* IE/Edge */
//       document.msExitFullscreen();
//     }
// }

class ExperimentBlock extends React.Component {
    state = {
      showResults: false,
      results: {}
    }

    getTimeline() {
        const timeline = []

        // 
        // timeline.push({
        //     type: 'fullscreen',
        //     fullscreen_mode: true,
        //     on_finish: function(data) {
        //         const elem = document.getElementById('jspsych-experiment')
        //         elem.classList.add("fullscreen")
        //         elem.focus()
        //     }
        // })

        timeline.push(instructions)

       
        const test_procedure = {
            timeline: [
              cue,
              fixation,
              target,
              blank1,
              feedback1,
              // feedback2,
              // blank2
            ],
            repetitions: 3
        }
        timeline.push(test_procedure)

        // timeline.push({
        //     type: 'fullscreen',
        //     fullscreen_mode: false
        // })

        return timeline
    }

    render() {
      if (this.state.showResults) {
        return <pre>{JSON.stringify(this.state.results, null, 2)}</pre>
      }
      
      return (
          <div id="jspsych-experiment"
            ref={(exp) => { this.experiment = exp }}
          >
            Experiment here
          </div>
      )
    }

    componentDidMount() {
        jsPsych.init({
            timeline: this.getTimeline(),
            on_finish: this.onExperimentFinish.bind(this),
            display_element: 'jspsych-experiment'
        })
        this.experiment.focus()
    }

    onExperimentFinish() {
        const trialData = JSON.parse(
            jsPsych.data.get().json()
        )
        // console.log("DONE:", trialData)
        this.setState({
          showResults: true,
          results: {
            data: trialData,
            points: pointsTracker.values
          }
        })
        // console.log("ponts:", pointsTracker.values)
    }

}

export default ExperimentBlock