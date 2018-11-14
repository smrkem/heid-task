import React from 'react'


class SurveySection1 extends React.Component {
  state = { 
    steps: [
      'welcome',
      'copy1',
      'copy2',
      // 'issues',
      'goodbye'
    ],
    stepIndex: 0
  }

  advanceStep() {
    this.setState({stepIndex: this.state.stepIndex + 1})
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
            <h2>Section 1</h2>      
            <p>
              In this section, you will be presented with a short description of 19 controversial social issue.
            </p>
            <p>
              The goal is to determine which of these social issues are most important to you and what you believe in. 
            </p>
              
            <p>
              <b>Your Task:</b><br />
              Indicate how important each social issue is to you and what you believe in by clicking on one of three possible boxes:
              <div>&#x25cb; Not Important to Me</div>
              <div>&#x25cb; Somewhat Important to Me</div>
              <div>&#x25cb; Very Important to Me</div>
            </p>

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

    

    if (this.showing() === 'goodbye') {
      return (
        <div className="green-bg surveySection thinker-icon-center">
          <h1 className="topBanner">Thank You for completing the Social Values Task!</h1>
          <button
            className="btn btn-large"
          >
            Finish</button>
        </div>
      )
    }

  }
}

export default SurveySection1