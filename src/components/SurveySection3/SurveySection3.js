import React from 'react'
import IssueDetail from './IssueDetail'


class SurveySection3 extends React.Component {
  state = { 
    steps: [
      'copy1',
      'issues',
      'finalChoice',
      'showResults'
    ],
    stepIndex: 0,
    issues: [],
    issueIndex: 0,
    finalIssueDescription: ""
  }

  contentWrap = null;

  constructor(props) {
    super(props)
    this.state.issues = props.issues
  }

  advanceStep() {
    if (this.state.stepIndex === this.state.steps.length - 1) {
      this.props.submitFinalIssues(this.state.issues);
      this.props.onFinish();
    }
    this.setState({stepIndex: this.state.stepIndex + 1})
  }

  showing() {
    return this.state.steps[this.state.stepIndex]
  }

  advanceIssue() {
    if (this.state.issueIndex === this.state.issues.length - 1) {
      this.advanceStep();
    }
    else {
      this.setState({issueIndex: this.state.issueIndex + 1});
    }
    this.contentWrap.scrollTo(0,0);
  }

  sumbitIssue(position) {
    let issues = JSON.parse(JSON.stringify(this.state.issues))
    issues[this.state.issueIndex].position = position;
    this.setState({issues});
    this.advanceIssue();
  }

  selectFinal(issue) {
    let issues = JSON.parse(JSON.stringify(this.state.issues));
    issues.forEach(iss => {
      delete iss.selectedIssue;
      if (iss.title === issue.title) {
        iss.selectedIssue = true;
      }
    })
    this.setState({
      issues,
      finalIssueDescription: ""
    });
  }

  selectedIssue() {
    const final = this.state.issues.filter(iss => iss.selectedIssue);
    if (final.length) {
      return final[0];
    }
    return null;
  }

  handleFinalIssueDescriptionChange(event) {
    this.setState({finalIssueDescription: event.target.value})
  }

  finishFinalIssue() {
    const issues = JSON.parse(JSON.stringify(this.state.issues));
    issues.forEach(iss => {
      if (iss.selectedIssue) {
        iss.userDescription = this.state.finalIssueDescription;
      }
    });
    this.setState({issues});
    this.advanceStep();
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
                onClick={this.props.goBackSection2}
                className="btn btn-info"
              >Go Back</button>
            </p>
            <p>In this Section III, the goal is to clarify your views on these issues. Please answer each question as best as you can.</p>
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
      const currentIssue = this.state.issues[this.state.issueIndex];
      return (
        <div className="black-bg surveySection thinker-icon-bottom-left sec3">
          <div className="sec3-content-wrap" ref={elem => {this.contentWrap = elem}}>
            <h1>{currentIssue.title}</h1>
            <IssueDetail
              finishIssue={this.sumbitIssue.bind(this)}
              issue={currentIssue}
            />
          </div>
        </div>
      )
    }

    if (this.showing() === 'finalChoice') {
      const finalIssue = this.selectedIssue();
      let finalIssuePosition;
      if (finalIssue) {
        finalIssuePosition = finalIssue.position > 0 ? 'FOR' : 'AGAINST';
        if (parseInt(finalIssue.position) === 0) {
          finalIssuePosition = 'NEUTRAL';
        }
      }

      return (
        <div className="black-bg surveySection thinker-icon-bottom-left sec3">
          <div className="social-values-copy-modal">
            <p>In the next task, you will have the opportunity to fight for one of these causes (i.e., donate $75 towards it). Please carefully select the cause you would be MOST MOTIVATED to fight for by clicking one of these options: </p>
            <ul>
              {this.state.issues.map(iss => {
                let pos = iss.position < 0 ? 'AGAINST' : 'FOR';
                if (parseInt(iss.position) === 0) {
                  pos = 'NEUTRAL';
                }
                return (
                  <li key={iss.title}>
                    <button
                      className="btn btn-primary finalIssueSelection"
                      disabled={iss.selectedIssue}
                      onClick={() => this.selectFinal(iss)}
                    >{pos} {iss.title}</button>
                  </li>)
              })}
            </ul>
            
            {finalIssue && (
              <div className="finalIssue-description">
                <p>Amazing! You have decided to fight <b>{finalIssuePosition} {finalIssue.title}</b></p>
                <p>In this section, please write in 5 sentences or less WHY you chose this social issue (e.g., what do you believe in and/or why it is motivating to fight for): </p>
                <p>
                  <textarea 
                    className="finalIssue-textarea"
                    value={this.state.finalIssueDescription} 
                    onChange={this.handleFinalIssueDescriptionChange.bind(this)} 
                    maxLength={500} />
                  <small>{500 - this.state.finalIssueDescription.length} remaining</small>
                </p>
                <p style={{textAlign: 'right'}}>
                  <button
                    className="btn btn-primary"
                    disabled={this.state.finalIssueDescription.length < 100}
                    onClick={() => this.finishFinalIssue()}
                  >Finish</button>
                </p>
              </div>
            )}

          </div>
        </div>
      )
    }

    if (this.showing() === 'showResults') {
      let issues = JSON.parse(JSON.stringify(this.state.issues))
      const issueData = issues.map(iss => {
        delete iss.image;
        delete iss.content;
        delete iss.problem_statement;
        delete iss.position_statement;
        if (iss.selectedIssue) {
          iss.userDescription = this.state.finalIssueDescription;
        }
        return iss;
      })
      return (
        <div className="green-bg surveySection exp-results">
          <h1 className="topBanner">Section 3 Results</h1>
          <div className="social-values-copy-modal">
            <p>Section 3 completed by user.</p>
            <p>What data do we want to store at this point?</p>
            <p>Data from this section shown below:</p>
            <div className="exp-data">
              <pre>{JSON.stringify(issueData, null, 3)}</pre>
            </div>
          </div>
          <button
            className="btn btn-info"
            onClick={() => this.advanceStep()}
          >
            Continue</button>
        </div>
      )
    }
  }

}

export default SurveySection3
