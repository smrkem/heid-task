import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { DbStaircase } from './staircase'
import './ExperimentBlock.css'
import { KeyLogger, randomFromInterval, PointsTracker } from '../../utils'

const jsPsych = window.jsPsych
let keyLogger = new KeyLogger()
let pointsTracker = new PointsTracker()
let staircase = null


class ExperimentBlock extends React.Component {
  state = {
    showResults: false,
    results: {}
  }

  instructions = {
    type: "html-keyboard-response",
    data: { instructions: true},
    stimulus: () => {
      let copy = ''
      this.props.condition.copy.forEach(para => {
        copy += `<p>${para}</p>`
      })
      return (
        `<div class="instructions">` + 
          `<div class="instructions icon ${this.getIconClass()}"></div>` +
          `<div class="copy">${copy}</div>` +
          `<p class="continue-btn">Press any key to continue.</p>` +
        "</div>"
      )
    },
    message: () => {
      let copy = ''
      this.props.condition.copy.forEach(para => {
        copy += `<p>${para}</p>`
      })
      return (
        `<div class="instructions">` + 
          `<div class="instructions icon ${this.getIconClass()}"></div>` +
          `<div class="copy">${copy}</div>` +
          // `<p class="continue-btn">Press any key to continue.</p>` +
        "</div>"
      )
    },
    on_finish: function(data) {
      const elem = document.getElementById('jspsych-experiment')
      elem.classList.add("fullscreen")
      elem.focus()
    },
    button_label: "Begin"
  }

  cue = {
    type: "html-keyboard-response",
    stimulus: () => {
      const pointVal = pointsTracker.getCurrentValue()
      return (`
        <p>${pointVal} Points</p>
        <div class="cue icon ${this.getIconClass()}"></div>
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

      // increment if hit (decrement if anti-charity)
      const incr = ( (targetData.hit && !this.isAnti) || (!targetData.hit && this.isAnti))
      pointsTracker.setNextValue(incr)

      const msg = targetData.hit ? 'Win!' : 'Lose'
      const sign = incr ? '+' : '-'
      return (`
        <div class="feedback icon ${this.getIconClass()}"></div>
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
        <div class="feedback icon ${this.getIconClass()}"></div>
        <p>Total: ${sign}${pointsTracker.currentTotal}</p>
      `)
    },
    data: { feedback2: true },
    response_ends_trial: false,
    trial_duration: 1000
  }

  constructor(props) {
    super(props)
    this.isAnti = props.condition.type === "anti-charity"
    staircase = new DbStaircase({
      firstVal: props.starting_duration,
      down: 2,
      stepSizes: [2, 2, 1]
    })
  }

  getIconClass() {
    let iconClass = this.props.condition.type
    iconClass += this.props.condition.socialIssue ? 
      ` ${this.props.condition.socialIssue.name}  ${this.props.condition.socialIssue.position}`
      : ''
    return iconClass  
  }

  getTimeline() {
      const timeline = []

      this.instructions.type = this.props.initialBlock ? 'fullscreen' : 'html-keyboard-response'
      this.instructions.fullscreen_mode = this.props.initialBlock ? true : false
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
          repetitions: 25
      }
      timeline.push(test_procedure)

      if (this.props.finalBlock) {
        timeline.push({
            type: 'fullscreen',
            fullscreen_mode: false
        })
      }

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

  initExperiment() {
    keyLogger = new KeyLogger()
    pointsTracker = new PointsTracker()
    this.isAnti = this.props.condition.type === "anti-charity"
    this.setState({ results: {} })
    staircase = new DbStaircase({
      firstVal: this.props.starting_duration,
      down: 2,
      stepSizes: [2, 2, 1]
    })

    jsPsych.init({
      timeline: this.getTimeline(),
      on_finish: this.onExperimentFinish.bind(this),
      display_element: 'jspsych-experiment'
    })
    this.experiment.focus()
  }

  componentDidMount() {
      this.initExperiment()
  }

  componentDidUpdate(prevProps) {
    if (this.props.condition !== prevProps.condition) {
      this.initExperiment()
    }
  }

  onExperimentFinish() {
      const trialData = JSON.parse(
          jsPsych.data.get().json()
      )
      const data = this.collectTrials(trialData)
      const results = {
        points: pointsTracker.currentTotal,
        point_values: pointsTracker.values.splice(0, pointsTracker.values.length - 1),
        final_duration: data[data.length - 1].target_presentation_duration,
        data: data,
        success_rate: data.filter(trial => trial.hit).length / data.length
      }


      this.setState({ results })

      this.props.onBlockFinish(results)
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

        ['cue', 'fixation', 'target', 'blank1', 'feedback1', 'feedback2', 'blank2'].forEach((n) => {
          if (trialPart[n]) {
            currentTrial[`${n}_time_elapsed`] = trialPart.time_elapsed
          }
        })

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

export default ExperimentBlock