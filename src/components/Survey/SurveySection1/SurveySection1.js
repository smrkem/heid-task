import React from 'react'
import issues from '../Issues/Issues'
import { shuffle, dataFromIssue } from '../../../utils'
import Copy1 from './copy1'
import Copy2 from './copy2'
import IssueView from './IssueView'
import FigurePondering from '../components/FigurePondering/FigurePondering'
import './SurveySection1.css'


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

    if (props.step) {
      this.state.stepIndex = this.state.steps.indexOf(props.step);
    }

    if (props.issues.length) {
      this.state.issues = props.issues;  
    }
    else {
      let theIssues = shuffle(issues);
      this.state.issues = theIssues;
    }
    

    this.categorizeIssue = this.categorizeIssue.bind(this);

    // categorizeIssue(issue, cat)
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
  backIssue() {
    this.setState({issueIndex: this.state.issueIndex - 1})
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

  autoCategorize() {
    const issues = [...this.state.issues];
    issues.forEach(iss => {
      const options = ['important', 'not-important', 'somewhat-important']
      const ind = Math.floor(Math.random() * 3);
      iss.importance1 = options[ind];
    });
    this.advanceStep();
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
              className="btn btn-black btn-large"
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
              className="btn btn-black btn-large"
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
              className="btn btn-black btn-large"
              onClick={() => this.advanceStep()}
            >
              Ready to Begin</button>
          </div>
          
        </div>
      )
    }

    if (this.showing() === 'issues') {
      let backButton = this.state.issueIndex > 0
        && this.state.issues[this.state.issueIndex - 1].importance1;
      if (backButton) {
        let buttonText = this.state.issues[this.state.issueIndex - 1].title;
        backButton = (
          <div className="issues-back">
            <div 
              onClick={() => this.backIssue()} 
              className="whitePillButton iconExpandingButton">
                <div className="left_icon_blue btn_icon"></div>
                <span className="button_text">{buttonText}</span>
            </div>
          </div>
        );
      }

      let nextButton = this.state.issueIndex < (this.state.issues.length - 1)
        && this.state.issues[this.state.issueIndex].importance1;
      if (nextButton) {
        let buttonText = this.state.issues[this.state.issueIndex + 1].title;
        nextButton = (
          <div className="issues-next">
            <div 
              onClick={() => this.advanceIssue()} 
              className="whitePillButton iconExpandingButton">
                <span className="button_text">{buttonText}</span>
                <div className="right_icon_blue btn_icon"></div>
            </div>
          </div>
        );
      }

      return (
        <div className="surveySection">
          <div className="survey-black-bg"></div>

          <button onClick={() => this.autoCategorize() } 
          className="debug">categorize auto</button>
  
          <IssueView
            issue={this.state.issues[this.state.issueIndex]}
            categorizeIssue={this.categorizeIssue}
          >
            {backButton}
            {nextButton}
          </IssueView>

          <FigurePondering classNames="figure_pondering_left_bottom" />
        </div>
      )
    }

    if (this.showing() === 'showResults') {
      let issues = JSON.parse(JSON.stringify(this.state.issues))
      const issueData = issues.map(iss => dataFromIssue(iss));
      return (
        <div className="surveySection exp-results">

          <div className="survey-green-bg"></div>
          <div className="sec1-inner copy1" ref={e => this.contentWrap = e}>
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

export default SurveySection1