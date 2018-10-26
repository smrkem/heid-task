import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { DbStaircase } from './staircase'
import { instructions, fixation, target, feedback } from './stimuli'
import './ExperimentBlock.css'
import { KeyLogger } from '../../utils'

const jsPsych = window.jsPsych

const keyLogger = new KeyLogger()
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

    getTimeline() {
        const timeline = []
        timeline.push({
            type: 'fullscreen',
            fullscreen_mode: true,
            on_finish: function(data) {
                const elem = document.getElementById('jspsych-experiment')
                elem.classList.add("fullscreen")
                elem.focus()
            }
        })

        timeline.push(instructions)

        // fixation 1 begins trial. setup up keylogging.
        let fixation1 = Object.assign({}, fixation)
        fixation1.data = {fixation1: true, beginTrial: true}
        fixation1.on_start = function(data) {
          console.log('implement keylog')
            // keyLog = []
            // document.addEventListener("keyup", keyLogger)
        }
        fixation1.on_finish = function(data) {
            data.presentation_duration = this.trial_duration
        }

        // target
        // fixation 2 ends response part of trial. disable keylogging.
        let fixation2 = Object.assign({}, fixation)
        fixation2.data = {fixation2: true}
        fixation2.on_finish = function(data) {
            data.presentation_duration = this.trial_duration
            // document.removeEventListener("keyup", keyLogger)
            // data.keylog = keyLog
            console.log('disable keylog')
        }

        const test_procedure = {
            timeline: [fixation1, fixation2],
            repetitions: 3
        }
        timeline.push(test_procedure)

        timeline.push({
            type: 'fullscreen',
            fullscreen_mode: false
        })

        return timeline
    }

    render() {
        
      return (
          <div id="jspsych-experiment">Experiment here</div>
      )
        
    }

    componentDidMount() {
        jsPsych.init({
            timeline: this.getTimeline(),
            on_finish: this.onExperimentFinish.bind(this),
            display_element: 'jspsych-experiment'
        })
    }

    onExperimentFinish() {
        const trialData = JSON.parse(
            jsPsych.data.get().json()
        )
        console.log("DONE:", trialData)
    }

}

export default ExperimentBlock