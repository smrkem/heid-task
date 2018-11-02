import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { DbStaircase } from './staircase'
import './ExperimentBlock.css'
import { KeyLogger, randomFromInterval, PointsTracker, closeFullscreen, getMeanForLast } from '../../utils'

const jsPsych = window.jsPsych
const NUM_REVERSALS = 3
let keyLogger = new KeyLogger()
let pointsTracker = new PointsTracker()
let staircase = null

class PracticeBlock extends React.Component {
  state = {
    showResults: false,
    results: {}
  }

  instructions = {
    type: "html-keyboard-response",
    data: { instructions: true},
    stimuli: () => {
      return (
        `<div class="instructions">` + 
          `<div class="instructions icon game"></div>` +
          `<div class="copy"><p>Practice Block instructions placeholder</p></div>` +
        `</div>`
      )
    },
    on_finish: function(data) {
      // const elem = document.getElementById('jspsych-experiment')
      // elem.classList.add("fullscreen")
      // elem.focus()
    },
    fullscreen_mode: false,
    button_label: "Begin Practice"
  }

  cue = {
    type: "html-keyboard-response",
    stimulus: () => {
      const pointVal = pointsTracker.getCurrentValue()
      return (`
        <p>${pointVal} Points</p>
        <div class="cue icon game"></div>
      `)
    },
    data: { 
      cue: true,
      beginTrial: true, 
      point_value: () => pointsTracker.getCurrentValue() 
    },
    response_ends_trial: false,
    trial_duration: 1000
  }

  fixation = {
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

  target = {
    type: "html-keyboard-response",
    stimulus: '<div style="display: block; height: 80px; width: 80px; background: #666; border-radius: 50%;"></div>',
    choices: ['Enter', 'Space'],
    data: {target: true},
    trial_duration: function() { return staircase.getValue() },
    on_finish: function(data) {
      data.presentation_duration = this.trial_duration
      data.hit = data.rt ? true : false
      staircase.addResponse(data.hit)
      data.point_value = pointsTracker.getCurrentValue()

      if (staircase.stairs.numReversals >= NUM_REVERSALS) {
        jsPsych.endExperiment("Hit max reversals: ", staircase.stairs.numReversals)
        closeFullscreen()
      }
    }
  }

  blank1 = {
    type: "html-keyboard-response",
    stimulus: '<div></div>',
    response_ends_trial: false,
    trial_duration: function() { 
      return randomFromInterval(1500, 3000) 
    },
    data: {blank1: true},
    on_finish: function(data) {
      data.presentation_duration = this.trial_duration
      data.keylog = keyLogger.keyLog
      document.removeEventListener("keyup", keyLogger.logger)
    }
  }

  blank2 = {
    type: "html-keyboard-response",
    stimulus: '<div></div>',
    response_ends_trial: false,
    trial_duration: function() { 
      return randomFromInterval(1500, 3000) 
    },
    data: {blank2: true},
    on_finish: function(data) {
      data.presentation_duration = this.trial_duration
    }
  }

  feedback1 = {
    type: "html-keyboard-response",
    stimulus: () => {
      const targetData = JSON.parse(
        jsPsych.data.getLastTimelineData().filter({target: true}).json()
      ).pop();

      pointsTracker.setNextValue(targetData.hit)

      const msg = targetData.hit ? 'Win!' : 'Lose'
      const sign = targetData.hit ? '+' : '-'
      return (`
        <div class="feedback icon game"></div>
        <p>${msg}</p>
        <p>${sign}${targetData.point_value} Points</p>
      `)
    },
    data: { feedback1: true },
    response_ends_trial: false,
    trial_duration: 1650
  }

  feedback2 = {
    type: "html-keyboard-response",
    stimulus: () => {
      const sign = (pointsTracker.currentTotal >= 0) ? '+' : ''
      return (`
        <div class="feedback icon game"></div>
        <p>Total: ${sign}${pointsTracker.currentTotal}</p>
      `)
    },
    data: { feedback2: true },
    response_ends_trial: false,
    trial_duration: 1000
  }

  constructor(props) {
    super(props)
    staircase = new DbStaircase({
      firstVal: 400,
      down: 2,
      stepSizes: [8, 4, 4, 2, 2, 1]
    })
  }

  getTimeline() {
    const timeline = []
    timeline.push(this.instructions)

    const test_procedure = {
        timeline: [
          this.cue,
          this.fixation,
          this.target,
          this.blank1,
          this.feedback1,
          this.feedback2,
          this.blank2
        ],
        repetitions: 4
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
      return (
        <div className="exp-results">
          <button
            className="btn btn-large btn-primary"
            onClick={() => { alert('advance') }}
            >Continue</button>
          <pre>{JSON.stringify(this.state.results, null, 2)}</pre>
        </div>
      )
    }

    return (
        <div id="jspsych-experiment"
          ref={(exp) => { this.experiment = exp }}
        >
          Practice here
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
    const data = this.collectTrials(trialData)
    const results = {
      points: pointsTracker.currentTotal,
      calculated_duration: getMeanForLast(staircase.stairs.values, 5),
      point_values: pointsTracker.values.splice(0, pointsTracker.values.length - 1),
      final_duration: data[data.length - 1].target_presentation_duration,
      data: data,
    }

    this.setState({ results, showResults: true })
    // this.props.finishPractice(results)
    // this.props.advanceStep()
  }

  collectTrials(trialData) {
    const trials = []
    let currentTrial = null
    let trialIndex = 1
    trialData.forEach( (trialPart) => {
        delete trialPart.stimulus

        if (trialPart.beginTrial) {
            if (currentTrial) {
                trials.push(currentTrial)
            }
            currentTrial = {index: trialIndex++}
        }

        if (trialPart.fixation) {
            currentTrial.responded_early = trialPart.rt || false
        }

        if (trialPart.target) {
            currentTrial.hit = trialPart.hit
            currentTrial.rt = trialPart.rt
            currentTrial.target_presentation_duration = trialPart.presentation_duration
        }

        if (trialPart.blank1) {
            currentTrial.responded_late = trialPart.rt || false
            currentTrial.suspect_cheating = ( trialPart.keylog.length > 2)
            currentTrial.num_responses = trialPart.keylog.length
        }

        if (trialPart.point_value) {
          currentTrial.point_value = trialPart.point_value
        }
    })
    trials.push(currentTrial)
    return trials
  }
}

export default PracticeBlock