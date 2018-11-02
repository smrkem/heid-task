import React from 'react'
import ExperimentIntro from '../ExperimentIntro/ExperimentIntro'
import ExperimentSurvey from '../ExperimentSurvey/ExperimentSurvey'
import PracticeBlock from '../ExperimentBlock/PracticeBlock'
import ExperimentManager from '../ExperimentManager/ExperimentManager'


class TaskManager extends React.Component {
  state = {
    index: 0,
    blockData: [],
    practiceData: {}
  }
  steps = [
    'intro',
    // 'survey',
    'practiceTrial',
    // 'experiment',
    'final'
  ]

  constructor(props) {
      super(props)
      this.showNextStep = this.showNextStep.bind(this)
      this.setPracticeData = this.setPracticeData.bind(this)
  }

  showNextStep(blockData=false) {
      if (blockData) {
        this.setState({ blockData })
      }
      this.setState({
          index: this.state.index + 1
      })
  }

  showing() {
      return this.steps[this.state.index]
  }

  setPracticeData(practiceData) {
    this.setState({practiceData})
  }

    render() {
        console.log('manager render', this.state)
        return (
            <div className="task-manager">
                { (this.showing() === 'intro') && (
                    <ExperimentIntro advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'survey') && (
                    <ExperimentSurvey advanceStep={this.showNextStep} />
                )}
                { (this.showing() === 'practiceTrial') && (
                    <PracticeBlock
                      advanceStep={this.showNextStep} 
                      finishPractice={this.setPracticeData}
                      />
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
                { (this.showing() === 'final') && (
                    <div className="exp-results">
                      <h2>Experiment Over</h2>
                      <p>This is placeholder. What do we want to display when the exp is over?</p>
                      <p>This is also where we would send data to server for storage.</p>
                      <pre>{ JSON.stringify(this.state, null, 2) }</pre>
                    </div>
                )}
            </div>
        )
    }
}

export default TaskManager
