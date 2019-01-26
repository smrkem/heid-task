import React from 'react'
import SurveyWellBeingManager from '../SurveyWellBeing/SurveyWellBeingManager'
import SurveyManager from '../Survey/SurveyManager/SurveyManager'
import PracticeBlock from '../ExperimentBlock/PracticeBlock'
import ExperimentManager from '../ExperimentManager/ExperimentManager'
import Consent from '../Consent/Consent'
import Break from '../Break/Break';
import HEIDWelcome from '../HEIDWelcome/HEIDWelcome';

class TaskManager extends React.Component {
  state = {
    index: 0,
    blockData: [],
    practiceData: {},
    socialIssue: {},
    wellbeingData: {}
  }

  steps = [
    'consent',
    // 'wellbeing',
    // 'break1',
    'survey',
    // 'break2',
    'HEIDWelcome',
    // 'practiceTrial',
    'experiment',
    'final',
    'goodbye'
  ]

  constructor(props) {
      super(props)
      this.showNextStep = this.showNextStep.bind(this);
      this.setPracticeData = this.setPracticeData.bind(this);
      this.submitSocialIssue = this.submitSocialIssue.bind(this);
      this.submitWellbeingData = this.submitWellbeingData.bind(this);

      // console.log('setting social issue');
      // this.state.socialIssue = {
      //   name: "Abortion Rights",
      //   position: "for"
      // }

      this.state.socialIssue = {
        name: "Legalization of Same-Sex Marriage",
        position: "against"
      }
  }

  showNextStep(blockData=false) {
      if (blockData) {
        this.setState({ blockData })
      }
      this.setState({
          index: this.state.index + 1
      })
  }

  submitWellbeingData(data) {
    this.setState({wellbeingData: data})
  }

  submitSocialIssue(issue) {
    let position = issue.position < 0 ? "against" : "for";
    this.setState({
      socialIssue: {
        name: issue.title,
        position: position
      }
    });
    this.showNextStep();
  }

  showing() {
      return this.steps[this.state.index]
  }

  setPracticeData(practiceData) {
    this.setState({practiceData})
  }

  showGoodbye() {
    const index = this.steps.indexOf('goodbye');
    this.setState({index});
  }

    render() {

        return (
            <div className="task-manager">
                { (this.showing() === 'consent') && (
                  <Consent
                    onFinish={this.showNextStep.bind(this)}
                    showGoodbye={this.showGoodbye.bind(this)}
                    />
                )}

                { (this.showing() === 'wellbeing') && (
                  <SurveyWellBeingManager
                    submitWellbeingData={this.submitWellbeingData}
                    onFinish={this.showNextStep.bind(this)}
                    />
                )}

                 { (this.showing().includes('break')) && (
                  <Break
                    onFinish={this.showNextStep.bind(this)}
                    />
                )}

                { (this.showing() === 'survey') && (
                    <SurveyManager
                      submitSocialIssue={this.submitSocialIssue}
                      advanceStep={this.showNextStep} 
                    />
                )}
                { (this.showing() === 'HEIDWelcome') && (
                    <HEIDWelcome
                      socialIssue={this.state.socialIssue}
                      advanceStep={this.showNextStep} 
                      />
                )}
                { (this.showing() === 'practiceTrial') && (
                    <PracticeBlock
                      advanceStep={this.showNextStep} 
                      finishPractice={this.setPracticeData}
                      />
                )}
                { (this.showing() === 'experiment') && (
                    <ExperimentManager 
                      socialIssue={this.state.socialIssue}
                      starting_duration={this.state.practiceData.calculated_duration2 || 320}
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
                { (this.showing() === 'goodbye') && (
                  <div>
                    <h2>Thanks for your time :)</h2>
                    <p>You have chosen not to continue the survey.</p>
                  </div>
                )}
            </div>
        )
    }
}

export default TaskManager
