import React from 'react'
import ExperimentIntro from '../ExperimentIntro/ExperimentIntro'
import ExperimentSurvey from '../ExperimentSurvey/ExperimentSurvey'
import PracticeBlock from '../PracticeBlock/PracticeBlock'
import ExperimentManager from '../ExperimentManager/ExperimentManager'


class TaskManager extends React.Component {
    constructor(props) {
        super(props)

        this.steps = [
            'intro',
            // 'survey',
            // 'practiceTrial',
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
            <div className="task-manager">
                { (this.showing() === 'intro') && (
                    <ExperimentIntro advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'survey') && (
                    <ExperimentSurvey advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'practiceTrial') && (
                    <PracticeBlock advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'experiment') && (
                    <ExperimentManager 
                      socialIssue={{
                        name: "Gender Equality",
                        position: "for"
                      }}
                      starting_duration={320}
                      advanceStep={this.showNextStep} />
                )}
            </div>
        )
    }
}

export default TaskManager
