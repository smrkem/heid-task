import React from 'react'

class SurveySection3 extends React.Component {
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

  render() {
    if (this.showing() === 'copy1') {
      return (
        <div className="survey-issues-bg surveySection">
          <h1 className="topBanner"> Welcome to the Social Values Task!</h1>
          <div className="social-values-copy-modal">
            <h2>Section III</h2>
            <p>You have indicated that the following social issues are most important to you: </p>
            <ul>
              {this.state.issues.map(
                (iss, ind) => <li key={ind}>{iss.title}</li>
              )}
            </ul>
            <p>
              Do you wish to go back and make any changes?
            </p>
            <p>
              <button
                onClick={() => alert('click')}
                className="btn btn-info"
              >Go Back</button>
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.advanceStep()}
          >
            Ready to Begin</button>
        </div>
      )
    }
  }
}

export default SurveySection3
