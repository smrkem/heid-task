import React from 'react'
import issues from '../../issues.json'
import { shuffle } from '../../utils'
import Copy1 from './copy1'
import Copy2 from './copy2'
import IssueView from './IssueView'
import figureHandsOnHips from './figure_handsonhips.png'
import figurePondering from './figure_pondering.png'


const FigureHandsOnHips = (props) => (
  <div className="figure_handsonhips_center">
    <img src={figureHandsOnHips} />
  </div>
);


const FigurePondering = (props) => (
  <div className={`figure_pondering ${props.classNames}`}>
    <img src={figurePondering} />
  </div>
);

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
  contentWrap = null

  constructor(props) {
    super(props);
    this.state.issues = shuffle(issues);

    this.categorizeIssue = this.categorizeIssue.bind(this);
  }

  advanceStep() {
    if (this.state.stepIndex === this.state.steps.length - 1) {
      this.props.submitIssues(this.state.issues)
      this.props.onFinish()
    }
    this.setState({stepIndex: this.state.stepIndex + 1});
    this.contentWrap && this.contentWrap.scrollTo(0,0);
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
        <div className="surveySection">
          <div className="survey-issues-bg"></div>
          <div className="sec1-inner welcome">
            <h1 className="topBanner"> Welcome to the Social Values Task!</h1>
            <button
              className="btn btn-primary btn-large"
              onClick={() => {this.advanceStep()}}
            >
              Begin</button>
          </div>
          
          <FigurePondering classNames="figure_pondering_large_top figure_pondering_center_bottom" />
        </div>
      )
    }

    if (this.showing() === 'copy1') {
      return (
        <div className="surveySection">
          <div className="survey-issues-bg"></div>

          <div className="sec1-inner copy1" ref={e => this.contentWrap = e}>
            <h1 className="topBanner"> Welcome to the Social Values Task!</h1>
            <div className="social-values-copy-modal">          
              <Copy1 />
            </div>
            <button
              onClick={() => this.advanceStep()}
              className="btn btn-primary btn-large"
            >
              Next</button>
          </div>
          
        </div>
      )
    }

    if (this.showing() === 'copy2') {
      return (
        <div className="surveySection">
          <div className="survey-issues-bg"></div>

          <div className="sec1-inner copy2" ref={e => this.contentWrap = e}>
            <div className="social-values-copy-modal">
              <Copy2 />
            </div>
            <button
              className="btn btn-primary btn-large"
              onClick={() => this.advanceStep()}
            >
              Ready to Begin</button>
          </div>
          
        </div>
      )
    }

    if (this.showing() === 'issues') {
      return (
        <div className="surveySection">
          <IssueView
            issue={this.state.issues[this.state.issueIndex]}
            categorizeIssue={this.categorizeIssue}
          />
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
        return iss;
      })
      return (
        <div className="green-bg surveySection exp-results">
          <h1 className="topBanner">Section 1 Results</h1>
          <div className="social-values-copy-modal">
            <p>Section 1 completed by user.</p>
            <p>Do we want to store any data at this point? Can we throw out all data pertaining to issues catgorized as NOT IMPORTANT or SOMEWHAT IMPORTANT?</p>
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