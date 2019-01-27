import React, {Component} from 'react';
import FigureProtesting from '../components/FigureProtesting/FigureProtesting';
import RadioRange from '../../SurveyWellBeing/components/RadioRange';


const Legend = () => (
  <div className="form-legend">
    <div>Not at all</div>
    <div>Very Much</div>
  </div>
)

class FinalDetails extends Component {
  state = {
    svt3_q1: null,
    svt3_q2: null,
    svt3_q3: null,
    svt3_q4: null,
    finalIssueDescription: ''
  }

  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  canSubmit() {
    return (
      this.state.svt3_q1 &&
      this.state.svt3_q2 &&
      this.state.svt3_q3 &&
      this.state.svt3_q4 &&
      this.state.finalIssueDescription
    )
  }

  handleFieldChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log("SUBMITTING: ", this.state);
    this.props.finishFinalIssue(this.state);
  }


  render() {
    const position = this.props.issue.position > 0 ? 
      this.props.issue.position_statements.for_statement :
      this.props.issue.position_statements.alternate_statement;
      
    return (
      <div className="surveySection sec3 finalDetails">
  
        <div className="sec1-inner copy1">

          <FigureProtesting 
              banner={`FOR<br />${position}`}
              classNames="sec3_figure_protesting" />

          <div className="social-values-copy-modal">
            
            <form 
              onSubmit={this.handleFormSubmit}
            >
              <p>Please answer the following questions to help clarify why you wish to promote <b>{position}</b>.</p>
              <div className="svt3_q">
                <p>How much does this issue matter to you personally?</p>
                <div>
                  <Legend />
                  <RadioRange
                    handleRadioChange={this.handleFieldChange}
                    currentValue={this.state.svt3_q1}
                    name={'svt3_q1'}
                    rangeMin={1}
                    rangeMax={5}
                  />
                </div>
                
              </div>

              <div className="svt3_q">
                <p>How motivated would you be to engage in a debate with someone that disagrees with you on this issue?</p>
                <div>
                  <Legend />
                  <RadioRange
                    handleRadioChange={this.handleFieldChange}
                    currentValue={this.state.svt3_q2}
                    name={'svt3_q2'}
                    rangeMin={1}
                    rangeMax={5}
                  />
                </div>
              </div>

              <div className="svt3_q">
                <p>How much does it bother you when someone disagrees with you on this issue?</p>
                <div>
                  <Legend />
                  <RadioRange
                    handleRadioChange={this.handleFieldChange}
                    currentValue={this.state.svt3_q3}
                    name={'svt3_q3'}
                    rangeMin={1}
                    rangeMax={5}
                  />
                </div>
              </div>

              <div className="svt3_q">
                <p>How motivated would you be to devote time (e.g., protesting, volunteering, debating) and/or money to fight for this cause?</p>
                <div>
                  <Legend />
                  <RadioRange
                    handleRadioChange={this.handleFieldChange}
                    currentValue={this.state.svt3_q4}
                    name={'svt3_q4'}
                    rangeMin={1}
                    rangeMax={5}
                  />
                </div>
              </div>
              <p>
                Please write in 5 sentences or less WHY you chose to fight FOR {position} (e.g., what do you believe in and/or why it is motivating to fight for):
              </p>
              <p>
                <textarea 
                  className="finalIssue-textarea"
                  name="finalIssueDescription"
                  value={this.state.finalIssueDescription} 
                  onChange={this.handleFieldChange} 
                  maxLength={500} />
                <small>{500 - this.state.finalIssueDescription.length} remaining</small>
              </p>

              <p style={{textAlign: 'right'}}>
                <button
                  className="btn btn-primary"
                  disabled={!this.canSubmit()}
                >Finish</button>
              </p>
            </form>
            
          </div>
        </div>

        
      </div>
    )
  }

}

export default FinalDetails;
