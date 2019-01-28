import React from 'react'
import IssueDetail from './IssueDetail'
import FigurePondering from '../components/FigurePondering/FigurePondering'
import { dataFromIssue } from '../../../utils'
import FinalChoice from './FinalChoice';
import FinalDetails from './FinalDetails';

class SurveySection3 extends React.Component {
  state = { 
    steps: [
      'copy1',
      'issues',
      'finalChoice',
      'finalDetail',
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
    this.setSelectedIssue = this.setSelectedIssue.bind(this);
    // this.submitFinalIssue = this.submitFinalIssue.bind(this);
    this.finishFinalIssue = this.finishFinalIssue.bind(this);
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

  sumbitIssue(issueData) {
    let issues = JSON.parse(JSON.stringify(this.state.issues))
    issues[this.state.issueIndex].position = issueData.position;
    this.setState({issues});
    this.advanceIssue();
  }

  selectedIssue() {
    const final = this.state.issues.filter(iss => iss.selectedIssue);
    if (final.length) {
      return final[0];
    }
    return null;
  }

  setSelectedIssue(issue) {
    let issues = JSON.parse(JSON.stringify(this.state.issues));
    issues.forEach(iss => {
      delete iss.selectedIssue;
      if (iss.title === issue.title) {
        iss.selectedIssue = true;
      }
    })
    this.setState({issues});

    this.advanceStep();
  }

  // handleFinalIssueDescriptionChange(event) {
  //   this.setState({finalIssueDescription: event.target.value})
  // }

  finishFinalIssue(finalDetails) {
    // console.log('finishFinalIssue: ', finalDetails);
    const issues = JSON.parse(JSON.stringify(this.state.issues));
    issues.forEach(iss => {
      if (iss.selectedIssue) {
        iss.userDescription = finalDetails.finalIssueDescription;
        iss.svt3_q1 = finalDetails.svt3_q1;
        iss.svt3_q2 = finalDetails.svt3_q2;
        iss.svt3_q3 = finalDetails.svt3_q3;
        iss.svt3_q4 = finalDetails.svt3_q4;
      }
    });
    this.setState({issues});
    this.advanceStep();
  }

  render() {
    if (this.showing() === 'copy1') {
      return (
        <div className="surveySection">
          <div className="survey-issues-bg"></div>

          <div className="sec1-inner copy1" ref={e => this.contentWrap = e}>
            <div className="social-values-copy-modal">
              <h2 className="sec1-inner-h2">Social Values Task - Section III</h2>
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
              <p>In this Section III, the goal is to clarify your views on these issues. You will be provided with a description of the controversial social issue and a list of some arguments for each opposing positions. You are not required to read these sections if you feel familiar with the topic. Your task is to answer each question presented at the end of these descriptions as best as you can.</p>
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
      const currentIssue = this.state.issues[this.state.issueIndex];
      return (
        <div className="surveySection sec3">
          <div className="survey-black-bg"></div>

          <div className="sec3-content-wrap" ref={elem => {this.contentWrap = elem}}>
            <h1>{currentIssue.title}</h1>
            <IssueDetail
              finishIssue={this.sumbitIssue.bind(this)}
              issue={currentIssue}
            />
          </div>

          <FigurePondering classNames="figure_pondering_left_bottom" />
        </div>
      )
    }

    if (this.showing() === 'finalChoice') {

      return (
        <FinalChoice
          setSelectedIssue={this.setSelectedIssue}
          issues={this.state.issues}
        />
      )
    }

    if (this.showing() === 'finalDetail') {
      return (
        <FinalDetails
         issue={this.selectedIssue()}
         finishFinalIssue={this.finishFinalIssue}
         />
      )
    }


    if (this.showing() === 'showResults') {
      let issues = JSON.parse(JSON.stringify(this.state.issues))
      const issueData = issues.map(iss => dataFromIssue(iss));
      return (
        <div className="surveySection exp-results">
          <div className="survey-green-bg"></div>

          <div className="sec1-inner copy1" ref={e => this.contentWrap = e}>
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

export default SurveySection3
