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
    constructor(props) {
        super(props)
        this.state = {
            displayResults: false,
            trials: [],
            trialData: null,
            staircaseValues: null,
        }
    }

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
        if (this.state.displayResults) {
            const style = {
                fontSize: '0.7rem',
                background: '#eee',
                textAlign: 'left'
            }
            return (
                <div id="experiment-results">
                    <h2>Practice Trial Results</h2>
                    <pre style={style}>
                        {JSON.stringify(this.state.staircaseValues)}
                    </pre>
                    <pre style={style}>
                        {JSON.stringify(this.state.trials, null, 3)}
                    </pre>
                    <pre style={style}>
                        {JSON.stringify(this.state.trialData, null, 3)}
                    </pre>
                </div>
            )
        }
        else {
            return (
                <div id="experiment">Experiment here</div>
            )
        }
    }

    componentDidMount() {
        jsPsych.init({
            timeline: this.getTimeline(),
            on_finish: this.onExperimentFinish.bind(this),
            display_element: 'experiment'
        })
    }

    onExperimentFinish() {
        const trialData = JSON.parse(
            jsPsych.data.get().json()
        )
        const trials = this.collectTrials(trialData)

        this.setState({
            trialData,
            trials,
            staircaseValues: staircase.stairs.values,
            displayResults: true
        })
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

            if (trialPart.fixation1) {
                currentTrial.responded_early = trialPart.rt || false
            }

            if (trialPart.target) {
                currentTrial.hit = trialPart.hit
                currentTrial.rt = trialPart.rt
                currentTrial.target_presentation_duration = trialPart.presentation_duration
            }

            if (trialPart.fixation2) {
                currentTrial.responded_late = trialPart.rt || false
                currentTrial.suspect_cheating = ( trialPart.keylog.length > 2)
                currentTrial.num_responses = trialPart.keylog.length
            }
        })
        trials.push(currentTrial)
        return trials
    }
}

export default Experiment