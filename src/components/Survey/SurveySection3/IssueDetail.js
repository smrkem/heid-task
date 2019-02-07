import React from 'react'

class IssueDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      motivation: 0
    }

    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleMotivationChange = this.handleMotivationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePositionChange(event) {
    this.setState({position: event.target.value});
  }

  handleMotivationChange(event) {
    this.setState({motivation: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.finishIssue({...this.state});
    this.setState({
      position: 0,
      motivation: 0
    });
}
  
  render() {
    const issue = this.props.issue;

    return (
      <div className="sec3-issueDetail">
        <div className="sec3-issue-copy">
          <h3 className="text-center">{issue.problem_statement}</h3>
          <div className="sec3-issue-copywrap">
            <div className="issue-info-modal-image">
              <img src={issue.image_src} alt={issue.title} />
            </div>
            
            <div>
              {issue.description.map((p, ind) => (
                <p key={ind}>{p}</p>
              ))}
            </div>
            <div>
              <h4>FOR {issue.position_statements.for_statement}:</h4>
              <ul>
                {issue.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}  
              </ul>
            </div>
            <div>
              <h4>FOR {issue.position_statements.alternate_statement}:</h4>
              <ul>
                {issue.cons.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}  
              </ul>
            </div>
            
          </div>
        </div>
        <div className="sec3-issue-bottomForm">
          <form onSubmit={this.handleSubmit}>
            <div>
              <p><b>{issue.position_statement}</b></p>
              <p>
                The slider provided below ranges from being 100% FOR one side of the debate ---- to ---- 100% FOR the other side of the debate.
              </p>
              <p>
                Please indicate which side of the debate you lean on and how strong your opinion is on this topic.
              </p>
              <p>
                For instance, the position 75% FOR Same-Sex Marriage would represent being FOR gay couple's right to marry, but with some hesitations or understanding/agreement with the opposing view on this issue (e.g., reserving marital rights to heterosexual couples).
              </p>
              <p>
                You cannot be “neutral” on this issue, and will have to decide which side of the debate you are on.
              </p>
            </div>
            <div className="range-feedback">
              { parseInt(this.state.position) < 0 && (<span>FOR {issue.position_statements.alternate_statement} {-1 * this.state.position}%</span>)}
              { parseInt(this.state.position) === 0 && (<span>NEUTRAL</span>)}
              { parseInt(this.state.position) > 0 && (<span>FOR {issue.position_statements.for_statement} {this.state.position}%</span>)}
            </div>
            <div className="sec3-position-range">
              <p>
                  <span className="input-prefix">
                    <span className="input-prefix-label">FOR <br />{issue.position_statements.alternate_statement}</span>
                    <span className="input-prefix-cue"></span>
                  </span>
                  <input 
                      name="forAgainst"
                      value={this.state.position}
                      onChange={this.handlePositionChange} 
                      type="range" min={-100} max={100} step="5" />
                  <span className="input-suffix">
                    <span className="input-suffix-cue"></span>
                    <span className="input-suffix-label">FOR <br />{issue.position_statements.for_statement}</span>
                  </span>
              </p>
              {/* <p>{issue.problem_statement}</p> */}
            </div>

            <div>
              <button 
                className="btn btn-black btn-large"
                disabled={(parseInt(this.state.position) === 0)}
                type="submit"
                >Next</button>
            </div>            
          </form>
        </div>
      </div>
      
    )
  }
}

export default IssueDetail
