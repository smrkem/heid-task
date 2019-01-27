import React, {Component} from 'react';
import FigurePondering from '../components/FigurePondering/FigurePondering'

class FinalChoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: props.issues
    }

    this.selectFinal = this.selectFinal.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  selectFinal(issue) {
    let issues = JSON.parse(JSON.stringify(this.state.issues));
    issues.forEach(iss => {
      delete iss.selectedIssue;
      if (iss.title === issue.title) {
        iss.selectedIssue = true;
      }
    })
    this.setState({issues});
  }

  onContinue() {
    const selectedIssue = this.state.issues.filter(iss => iss.selectedIssue)[0];
    this.props.setSelectedIssue(selectedIssue);
  }

  render() {
    const finalIssue = this.state.issues.filter(iss => iss.selectedIssue)[0];
    
    let position = "";
    if (finalIssue) {
      position = finalIssue.position < 0 ? 
        finalIssue.position_statements.alternate_statement :
        finalIssue.position_statements.for_statement;
    }
    return (
      <div className="surveySection sec3">
        <div className="survey-black-bg"></div>
  
        <div className="sec1-inner copy1">
          <div className="social-values-copy-modal">
            <p>In the next task, you will have the opportunity to fight for one of these causes (i.e., donate $75 towards it). Please carefully select the cause you would be MOST MOTIVATED to fight for in the next task by clicking one of these options:</p>
            <ul>
              {this.state.issues.map(iss => {
                let pos = iss.position < 0 ? 
                  iss.position_statements.alternate_statement :
                  iss.position_statements.for_statement;
                
                return (
                  <li key={iss.title}>
                    <button
                      className="btn btn-primary finalIssueSelection"
                      disabled={iss.selectedIssue}
                      onClick={() => this.selectFinal(iss)}
                    >FOR {pos}</button>
                  </li>)
              })}
            </ul>
            {finalIssue && (
              <div className="sec3-finalChoice-finalIssue">
                <p>Amazing! You have decided to fight <b>FOR {position}</b></p>
                <p>Click "Continue" when you are ready.</p>
                <div className="continueButton">
                  <button
                    className="btn btn-black btn-lg"
                    onClick={this.onContinue}
                    >
                    Continue
                  </button>
                </div>
              </div>  
            )}
            
          </div>
        </div>

        <FigurePondering classNames="figure_pondering_left_bottom" />
      </div>
    )
  }

}

export default FinalChoice;
