import React from 'react'
import ExperimentIntro from '../ExperimentIntro/ExperimentIntro'
import ExperimentSurvey from '../ExperimentSurvey/ExperimentSurvey'
import Experiment from '../Experiment/Experiment'

class ExperimentManager extends React.Component {
    constructor(props) {
        super(props)

        this.steps = [
            'intro',
            'survey',
            'practiceTrial',
            'experiment'
        ]

        this.state = {
            index: 0
        }

        this.showNextStep = this.showNextStep.bind(this)
    }

    showNextStep() {
        this.setState({
            index: this.state.index + 1
        })
    }

    showing() {
        return this.steps[this.state.index]
    }

    render() {
        return (
            <div id="exp-manager">
                { (this.showing() === 'intro') && (
                    <ExperimentIntro advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'survey') && (
                    <ExperimentSurvey advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'practiceTrial') && (
                    <Experiment advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'experiment') && (
                    <div>actual exp</div>
                )}
            </div>
        )
    }
}

export default ExperimentManager
