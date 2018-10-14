import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { instructions, fixation1, fixation2, target, feedback } from './stimuli'

const jsPsych = window.jsPsych

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

        const test_procedure = {
            timeline: [fixation1, target, fixation2, feedback],
            repetitions: 5
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
                advanceStep()
            },
            display_element: 'experiment'
        })
    }
}

export default Experiment