import React from 'react'
import './SurveyManager.css'
import SurveyIntro from '../SurveyIntro/SurveyIntro'
import SurveyConsent from '../SurveyConsent/SurveyConsent'
import SurveyWellBeing from '../SurveyWellBeing/SurveyWellBeing'
import SurveySection1 from '../SurveySection1/SurveySection1'
import SurveySection2 from '../SurveySection2/SurveySection2'


class SurveyManager extends React.Component {
  state = { 
    issues: [],
    steps: [
      'intro',
      'consent',
      'wellbeing',
      'section1',
      'section2',
      'issueSelection',
      'finalIssue',
      'goodbye'
    ],
    stepIndex: 0
  }

  showing() {
    return this.state.steps[this.state.stepIndex]
  }

  advanceStep() {
    this.setState({
      stepIndex: this.state.stepIndex + 1
    })
  }

  submitIssues(issues) {
    this.setState({issues})
  }

  showGoodbye() {
    const index = this.state.steps.indexOf('goodbye')
    this.setState({stepIndex: index})
  }

  render() {
    if (this.showing() === 'intro') {
      return (
        <SurveyIntro onFinish={this.advanceStep.bind(this)} />
      )
    }

    if (this.showing() === 'consent') {
      return (
        <SurveyConsent
          onFinish={this.advanceStep.bind(this)}
          showGoodbye={this.showGoodbye.bind(this)}
          />
      )
    }

    if (this.showing() === 'wellbeing') {
      return (
        <SurveyWellBeing
          onFinish={this.advanceStep.bind(this)}
          />
      )
    }

    if (this.showing() === 'section1') {
      return (
        <SurveySection1
          submitIssues={this.submitIssues.bind(this)}
          onFinish={this.advanceStep.bind(this)}
          />
      )
    }

    if (this.showing() === 'section2') {
      return (
        <SurveySection2
          issues={this.state.issues}
          onFinish={this.advanceStep.bind(this)}
          />
      )
    }




    if (this.showing() === 'goodbye') {
      return (
        <div>
          <h2>Thanks for your time :)</h2>
          <p>You have chosen not to continue the survey.</p>
        </div>
      )
    }

  }
}

export default SurveyManager