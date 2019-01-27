import React from 'react'
import './SurveyManager.css'
import SurveyIntro from '../SurveyIntro/SurveyIntro'
import SurveySection1 from '../SurveySection1/SurveySection1'
import SurveySection2 from '../SurveySection2/SurveySection2'
import SurveySection3 from '../SurveySection3/SurveySection3'
import { dataFromIssue } from '../../../utils';
// import SurveyFinal from '../SurveyFinal/SurveyFinal'



class SurveyManager extends React.Component {
  state = { 
    issues: [],
    steps: [
      // 'intro',
      'section1',
      'section2',
      'section3',
      'results'
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
    console.log("Submitting final Issues: ", finalIssues);
    
    const issues = JSON.parse(JSON.stringify(this.state.issues));
    finalIssues.forEach(finalIssue => {
      const index = issues.findIndex(iss => iss.title === finalIssue.title);
      issues[index].position = finalIssue.position;
      if (finalIssue.selectedIssue) {
        issues[index].selectedIssue = true;
        issues[index].position = finalIssue.position;
        issues[index].userDescription = finalIssue.userDescription;
        issues[index].svt3_q1 = finalIssue.svt3_q1;
        issues[index].svt3_q2 = finalIssue.svt3_q2;
        issues[index].svt3_q3 = finalIssue.svt3_q3;
        issues[index].svt3_q4 = finalIssue.svt3_q4;
      }
    })
    this.setState({issues});
    
    // this.finishSurvey();
  }

  finishSurvey() {
    const selectedIssues = this.state.issues.filter(iss => iss.selectedIssue);
    this.props.submitSocialIssue(selectedIssues[0]);
  }

  render() {
    if (this.showing() === 'intro') {
      return (
        <SurveyIntro onFinish={this.advanceStep.bind(this)} />
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

    if (this.showing() === 'results') {
      let issues = JSON.parse(JSON.stringify(this.state.issues))
      const issueData = issues.map(iss => dataFromIssue(iss));
      return (
        <div className="surveySection exp-results">
          <div className="survey-green-bg"></div>

          <div className="sec1-inner copy1" ref={e => this.contentWrap = e}>
            <h1 className="topBanner">SVT 3 Results</h1>
            <div className="social-values-copy-modal">
              <p>SVT completed by user.</p>
              <p>What data do we want to store at this point?</p>
              <p>Data from this section shown below:</p>
              <div className="exp-data">
                <pre>{JSON.stringify(issueData, null, 3)}</pre>
              </div>
            </div>
            <button
              className="btn btn-black btn-large"
              onClick={this.finishSurvey.bind(this)}
            >
              Continue</button>
          </div>
          
        </div>
      )
    }

    

  }
}

export default SurveyManager