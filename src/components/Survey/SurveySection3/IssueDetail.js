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
              <h4>FOR Arguments:</h4>
              <ul>
                {issue.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}  
              </ul>
            </div>
            <div>
              <h4>AGAINST Arguments:</h4>
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
                The slider provided below ranges from -100 (100% AGAINST) to +100 (100% FOR). For instance, -75 (75% AGAINST) would represent some understanding/agreement with arguments FOR.  If you have a neutral stance on the topic, please set the slider to 0.
              </p>
              <p>
                Please indicate below your beliefs about <em>{issue.title}</em> by indicating the DEGREE to which you are:
              </p>
            </div>
            <div className="range-feedback">
              { parseInt(this.state.position) < 0 && (<span>AGAINST {-1 * this.state.position}%</span>)}
              { parseInt(this.state.position) === 0 && (<span>NEUTRAL</span>)}
              { parseInt(this.state.position) > 0 && (<span>FOR {this.state.position}%</span>)}
            </div>
            <div className="sec3-position-range">
              <p>
                  <span className="input-prefix">
                    <span className="input-prefix-label">AGAINST</span>
                    <span className="input-prefix-cue">◀</span>
                  </span>
                  <input 
                      name="forAgainst"
                      value={this.state.position}
                      onChange={this.handlePositionChange} 
                      type="range" min={-100} max={100} step="5" />
                  <span className="input-suffix">
                    <span className="input-suffix-cue">▶</span>
                    <span className="input-suffix-label">FOR</span>
                  </span>
              </p>
              <p>{issue.problem_statement}</p>
            </div>
            <div className="motivation">
              <p>
                How important is this issue to you and what you believe in?
              </p>
              <div className="sec3-motivation-range">
              <p>
                  <span className="input-prefix">
                    <span className="input-prefix-label">NOT AT ALL IMPORTANT</span>
                    <span className="input-prefix-cue">◀</span>
                  </span>
                  <input 
                      name="motivation"
                      value={this.state.motivation}
                      onChange={this.handleMotivationChange} 
                      type="range" min={0} max={100} />
                  <span className="input-suffix">
                    <span className="input-suffix-cue">▶</span>
                    <span className="input-suffix-label">VERY IMPORTANT</span>
                  </span>
              </p>
            
              <div className="sec3-motivation-feedback">
                <p>{this.state.motivation} %</p>
              </div>
            
            </div>
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
