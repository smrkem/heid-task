import React from 'react'
import issues from '../../issues.json'
import { shuffle } from '../../utils'

class SurveySection1 extends React.Component {
  state = { 
    steps: [
      'welcome',
      'copy1',
      'copy2',
      'issues',
      'showResults'
    ],
    stepIndex: 0,
    issueIndex: 0
  }

  constructor(props) {
    super(props);
    this.state.issues = shuffle(issues);
  }

  advanceStep() {
    if (this.state.stepIndex === this.state.steps.length - 1) {
      this.props.submitIssues(this.state.issues)
      this.props.onFinish()
    }
    this.setState({stepIndex: this.state.stepIndex + 1})
  }

  advanceIssue() {
    this.setState({issueIndex: this.state.issueIndex + 1})
  }

  categorizeIssue(issue, cat) {
    const index = this.state.issues.indexOf(issue);
    let issues = [...this.state.issues]
    issues[index].importance1 = cat
    this.setState({issues})
    if (this.state.issueIndex === this.state.issues.length - 1) {
      this.advanceStep()
    }
    else {
      this.advanceIssue()
    }
  }

  showing() {
    return this.state.steps[this.state.stepIndex]
  }

  render() {
    if (this.showing() === 'welcome') {
      return (
        <div className="survey-issues-bg surveySection thinker-icon-center">
          <h1 className="topBanner"> Welcome to the Social Values Task!</h1>
          <button
            className="btn btn-primary btn-large"
            onClick={() => {this.advanceStep()}}
          >
            Begin</button>
        </div>
      )
    }

    if (this.showing() === 'copy1') {
      return (
        <div className="survey-issues-bg surveySection">
          <h1 className="topBanner"> Welcome to the Social Values Task!</h1>
          <div className="social-values-copy-modal">          
            <p>In this task, you will review a number of controversial social topics where people tend to be either 
              <b>FOR</b> or <b>AGAINST</b> these issues (e.g., same-sex marriage, animal testing, etc.).</p>
            <p>The goal is to understand which social issues  are <b>MOST IMPORTANT TO YOU</b> and what <b>YOU BELIEVE IN</b> 
              (e.g., are you FOR or AGAINST this issue). You will be asked to complete three exercises in this task that will help us identify a final social issue that appears important to you and that you are most motivated to fight for in the next task. </p>

            <p>
              There are no right or wrong answers. What social issues you value are very individual; values are not based on what others expect of us or what we think we should be doing. They are based on what you believe in, what is truly important and meaningful to you.
            </p>

            <p>
            We realize that not all social values are equally popular in today's society. Please be aware that your responses will be completely de-identified and there will be no link between your value choices and your personal identity. What is most important is that you answer honestly from your own perspective, rather than what you think is socially desirable. 
            </p>
          </div>
          <button
            onClick={() => this.advanceStep()}
            className="btn btn-primary"
          >
            Next</button>
        </div>
      )
    }

    if (this.showing() === 'copy2') {
      return (
        <div className="survey-issues-bg surveySection">
          <h1 className="topBanner"> Welcome to the Social Values Task!</h1>
          <div className="social-values-copy-modal">
            <h2>Section I</h2>      
            <p>
              In this section, you will be presented with a short description of 19 controversial social issue.
            </p>
            <p>
              The goal is to determine which of these social issues are most important to you and what you believe in. 
            </p>
              
            <div>
              <p>
                <b>Your Task:</b><br />
                Indicate how important each social issue is to you and what you believe in by clicking on one of three possible boxes:
              </p>
              <p>
                <b>&#x25cb; Not Important to Me</b><br />
                <b>&#x25cb; Somewhat Important to Me</b><br />
                <b>&#x25cb; Very Important to Me</b>
              </p>
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
      const issue = this.state.issues[this.state.issueIndex];
      return (
        <div className="black-bg surveySection thinker-icon-bottom-left">
          <div className="card social-values-sec1-issue-modal">
            <h2>{issue.title}</h2>
            <div className="sec1-issue-bottom">
              <div 
                style={{backgroundImage: `url(/images/${issue.image})`}}
                className="sec1-issue-image"></div>
              <p className="sec1-issue-problem-statement">{issue.problem_statement}</p>
            </div>          
          </div>
          <div className="sec1-issue-selections">
            <button
              className="btn btn-info"
              onClick={() => this.categorizeIssue(issue, 'not-important')}
              >NOT<br /> IMPORTANT</button>
            <button
              className="btn btn-info"
              onClick={() => this.categorizeIssue(issue, 'somewhat-important')}
              >SOMEWHAT<br /> IMPORTANT</button>
            <button
              className="btn btn-info"
              onClick={() => this.categorizeIssue(issue, 'important')}
              >IMPORTANT</button>
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
        return iss;
      })
      return (
        <div className="green-bg surveySection exp-results">
          <h1 className="topBanner">Section 1 Results</h1>
          <div className="social-values-copy-modal">
            <p>Section 1 completed by user.</p>
            <p>Do we want to store any data at this point? Can we throw out all data pertaining to issues catgorized as NOT IMPORTANT?</p>
            <p>Data at this point shown below:</p>
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

export default SurveySection1