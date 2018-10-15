import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { DbStaircase } from './staircase'
import { instructions, fixation, target, feedback } from './stimuli'

const jsPsych = window.jsPsych
let keyLog = [];
const keyLogger = (event) => { keyLog.push(event.keyCode) }
const staircase = new DbStaircase({
    firstVal: 400,
    down: 2,
    stepSizes: [8, 4, 4, 2, 2, 1]
})
const NUM_REVERSALS = 3

function closeFullscreen() {
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

class Experiment extends React.Component {
    getTimeline() {
        const timeline = []
        timeline.push({
            type: 'fullscreen',
            fullscreen_mode: true,
            on_finish: function(data) {
                document.getElementById('experiment').focus()
            }
        })

        timeline.push(instructions)

        // fixation 1 begins trial. setup up keylogging.
        let fixation1 = Object.assign({}, fixation)
        fixation1.data = {fixation1: true, beginTrial: true}
        fixation1.on_start = function(data) {
            keyLog = []
            document.addEventListener("keyup", keyLogger)
        }
        fixation1.on_finish = function(data) {
            data.presentation_duration = this.trial_duration
        }

        // target
        target.trial_duration = () => staircase.getValue()
        target.on_finish = function(data) {
            data.presentation_duration = this.trial_duration
            data.hit = data.rt ? true : false
            staircase.addResponse(data.hit)
            data.reversed = staircase.stairs.reversed

            if (staircase.stairs.numReversals >= NUM_REVERSALS) {
                jsPsych.endExperiment("Hit max reversals: ", staircase.stairs.numReversals)
                closeFullscreen()
            }
        }

        // fixation 2 ends response part of trial. disable keylogging.
        let fixation2 = Object.assign({}, fixation)
        fixation2.data = {fixation2: true}
        fixation2.on_finish = function(data) {
            data.presentation_duration = this.trial_duration
            document.removeEventListener("keyup", keyLogger)
            data.keylog = keyLog
        }

        const test_procedure = {
            timeline: [fixation1, target, fixation2, feedback],
            repetitions: 30
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
            <div id="experiment">Experiment here</div>
        )
    }

    componentDidMount() {

        const advanceStep = this.props.advanceStep

        jsPsych.init({
            timeline: this.getTimeline(),
            on_finish: function(var1) {
                const trialData = JSON.parse(
                    jsPsych.data.get().json()
                )
                console.log("td: ", trialData)
                console.log("staircase values:", staircase.stairs.values)

                console.log("staircase reversals:", staircase.stairs.numReversals)
                // leave fullscreen

                advanceStep()
            },
            display_element: 'experiment'
        })
    }
}

export default Experiment