import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { DbStaircase } from './staircase'
import './ExperimentBlock.css'
import { KeyLogger, randomFromInterval, PointsTracker } from '../../utils'

const jsPsych = window.jsPsych
const keyLogger = new KeyLogger()
const pointsTracker = new PointsTracker()


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

    cue = {
      type: "html-keyboard-response",
      stimulus: () => {
        const pointVal = pointsTracker.getCurrentValue()
        return (`
          <p>${pointVal} Points</p>
          <p>${this.props.condition}</p>        
        `)
      },
      data: { cue: true },
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
      trial_duration: function() { return 300 },
      on_finish: function(data) {
        data.presentation_duration = this.trial_duration
        data.hit = data.rt ? true : false
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
          <p>${msg}</p>
          <p>${sign}${targetData.point_value} Points</p>
          <p>${this.props.condition}</p>   
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
          <p>Total: ${sign}${pointsTracker.currentTotal}</p>
          <p>${this.props.condition}</p>     
        `)
      },
      data: { feedback2: true },
      response_ends_trial: false,
      trial_duration: 1000
    }

    constructor(props) {
      super(props)
      this.isAnti = props.condition.includes("anti-charity")
      console.log('isanti?', this.isAnti)
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
        console.log(this.props.condition)
        const instructions = {
          type: "html-keyboard-response",
          data: { instructions: true },
          stimulus: () => {
            return (
              "<p>The fixation will appear followed by the target. Try to press the ENTER key as quickly as possible while the target is displayed.</p>" +
              "<p></p><p>Press any key to begin.</p>"
            )
          }
        }

        timeline.push(instructions)

       
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
      console.log(this.props)
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
            points: pointsTracker.currentTotal,
            point_values: pointsTracker.values.splice(0, pointsTracker.values.length - 1),
            data: trialData,
          }
        })
        // console.log("ponts:", pointsTracker.values)
    }

}

export default ExperimentBlock