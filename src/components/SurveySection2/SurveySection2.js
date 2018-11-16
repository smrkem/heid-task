import React from 'react'
import Copy1 from './Copy1'
import IssuesView from './IssuesView';

class SurveySection2 extends React.Component {
  state = { 
    steps: [
      'copy1',
      'issues',
      'showResults'
    ],
    stepIndex: 0,
    issues: []
  }

  constructor(props) {
    super(props)
    props.issues.forEach(iss => { iss.importance2 = 'uncategorized'} )
    this.state.issues = props.issues
  }

  advanceStep() {
    if (this.state.stepIndex === this.state.steps.length - 1) {
      this.props.submitIssues(this.state.issues)
      this.props.onFinish()
    }
    this.setState({stepIndex: this.state.stepIndex + 1})
  }

  showing() {
    return this.state.steps[this.state.stepIndex]
  }


  onIssueDrop(droppedIssue, cat) {
    // Make a copy of issues in state:
    let issues = JSON.parse(JSON.stringify(this.state.issues))
    issues.forEach(i => {
      if (i.title === droppedIssue.title) {
        i.importance2 = cat
      }
    })
    this.setState({issues})
  }

  render() {
    if (this.showing() === 'copy1') {
      return (
        <div className="survey-issues-bg surveySection">
          <h1 className="topBanner"> Welcome to the Social Values Task!</h1>
          <div className="social-values-copy-modal">
            <Copy1 />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.advanceStep()}
          >
            Ready to Begin</button>
        </div>
      )
    }

    if (this.showing() === 'issues') {
      return (
        <div className="black-bg surveySection thinker-icon-bottom-left sec2-issue-categorize">
          <IssuesView 
            onIssueDrop={this.onIssueDrop.bind(this)}
            issues={this.state.issues}
          />
        </div>
      )
    }
  }
}

export default SurveySection2
