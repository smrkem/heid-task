import React from 'react'
import './SurveyManager.css'
import SurveyIntro from '../SurveyIntro/SurveyIntro'
import SurveyConsent from '../SurveyConsent/SurveyConsent'
import SurveyWellBeing from '../SurveyWellBeing/SurveyWellBeing'
import SurveySection1 from '../SurveySection1/SurveySection1'
import SurveySection2 from '../SurveySection2/SurveySection2'
import SurveySection3 from '../SurveySection3/SurveySection3'
import SurveyFinal from '../SurveyFinal/SurveyFinal'


class SurveyManager extends React.Component {
  state = { 
    issues: [],
    steps: [
      'intro',
      // 'consent',
      // 'wellbeing',
      'section1',
      'section2',
      'section3',
      'finalIssues',
      'goodbye'
    ],
    stepIndex: 0,
    section2Step: null
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

  goBackSection2() {
    this.setState({
      stepIndex: this.state.steps.indexOf('section2'),
      section2Step: 'issues'
    })
  }

  submitFinalIssues(finalIssues) {
    console.log('sfi: ', finalIssues);
    const issues = JSON.parse(JSON.stringify(this.state.issues));
    finalIssues.forEach(finalIssue => {
      const index = issues.findIndex(iss => iss.title === finalIssue.title);
      issues[index].position = finalIssue.position;
      if (finalIssue.selectedIssue) {
        issues[index].selectedIssue = true;
        issues[index].userDescription = finalIssue.userDescription;
      }
    })
    this.setState({issues});
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
          step={this.state.section2Step}
          submitIssues={this.submitIssues.bind(this)}
          onFinish={this.advanceStep.bind(this)}
          />
      )
    }

    if (this.showing() === 'section3') {
      return (
        <SurveySection3
          issues={this.state.issues.filter(iss => iss.importance2 === 'most_important')}
          submitFinalIssues={this.submitFinalIssues.bind(this)}
          goBackSection2={this.goBackSection2.bind(this)}
          onFinish={this.advanceStep.bind(this)}
          />
      )
    }


    if (this.showing() === 'finalIssues') {
      return (
        <SurveyFinal 
          issues={this.state.issues}
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