import React from 'react'
import Copy1 from './Copy1'
import IssuesView from './IssuesView';
import FigurePondering from '../components/FigurePondering/FigurePondering'
import { dataFromIssue } from '../../../utils'
import './SurveySection2.css';


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
    props.issues.forEach(iss => { iss.importance2 = 'less_important'} )

    if (props.step) {
      this.state.stepIndex = this.state.steps.indexOf(props.step);
    }
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

  resetIssues() {
    let issues = JSON.parse(JSON.stringify(this.state.issues))
    issues.forEach(i => {
        i.importance2 = 'less_important'
    })
    this.setState({issues}) 
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
        <div className="surveySection sec2">
          <div className="survey-issues-bg"></div>
          <div className="sec1-inner">          
            <div className="social-values-copy-modal">
              <Copy1 />
            </div>
            <button
              className="btn btn-black btn-large"
              onClick={() => this.advanceStep()}
            >
              Ready to Begin</button>
          </div>
        </div>
      )
    }

    if (this.showing() === 'issues') {
      return (
        <div className="surveySection sec2-issue-categorize">
          <div className="survey-black-bg"></div>
          <IssuesView 
            onIssueDrop={this.onIssueDrop.bind(this)}
            finishedSorting={() => this.advanceStep()}
            resetIssues={() => this.resetIssues()}
            issues={this.state.issues}
          />
          <FigurePondering classNames="figure_pondering_left_bottom" />
        </div>
      )
    }

    if (this.showing() === 'showResults') {
      let issues = JSON.parse(JSON.stringify(this.state.issues));
      const issueData = issues.map(iss => dataFromIssue(iss));

      return (
        <div className="surveySection exp-results">
          <div className="survey-green-bg"></div>
          
          <div className="sec1-inner copy1" ref={e => this.contentWrap = e}>
            <h1 className="topBanner">Section 2 Results</h1>
            <div className="social-values-copy-modal">
              <p>Section 2 completed by user.</p>
              <p>Do we want to store any data at this point? Can we throw out all data pertaining to issues catgorized as LESS IMPORTANT?</p>
              <p>Data at this point shown below:</p>
              <div className="exp-data">
                <pre>{JSON.stringify(issueData, null, 3)}</pre>
              </div>
            </div>
            <button
              className="btn btn-black btn-large"
              onClick={() => this.advanceStep()}
            >
              Continue</button>
          </div>
          
        </div>
      )
    }
  }
}

export default SurveySection2
