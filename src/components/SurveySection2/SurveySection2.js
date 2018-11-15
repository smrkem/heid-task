import React from 'react'

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
            <h2>Section II</h2>      
            <p>
              The social issues that were categorized as somewhat and very important will be presented again.
            </p>
            <p>
              This time, you will be asked to select your top three social issues.
            </p>
              
            <div>
              <p>
                <b>Your Task:</b>
              </p>
              <ul>
                <li>Categorize each social issue as either <b>Most Important to Me</b> or <b>Less Important to Me</b> by dragging and dropping them in the appropriate box.</li>
                <li>You can have no more than 3 cards and no less than 1 card  in the <b>Most Important Box</b>.</li>
              </ul>
            </div>

            <p>
              You will get the chance to read more about the social issues you think are important to you in Section III.  Just try your best in determining how important each social issue is for you. 
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

    if (this.showing() === 'issues') {
      return (
        <div className="black-bg surveySection thinker-icon-bottom-left sec2-issue-categorize">
          <div className="issue-drop">
            <div className="cat most-important">
              <h3>Most Important To Me</h3>
            </div>
            <div className="cat less-important">
              <h3>Less Important To Me</h3>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default SurveySection2
