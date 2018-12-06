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
            <div 
                style={{backgroundImage: `url(/images/${issue.image})`}}
                className="sec3-issue-image"
            ></div>
            {issue.content.map((p, ind) => (
            <p key={ind}>{p}</p>
          ))}
          </div>
        </div>
        <div className="sec3-issue-bottomForm">
          <form onSubmit={this.handleSubmit}>
            <div>
              <p><b>{issue.position_statement}</b></p>
              <p>
                The slider provided below ranges from -100 (100% AGAINST) to +100 (100% FOR). For instance, -75 (75% AGAINST) would represent some understanding/agreement with arguments FOR.  If you have a neutral stance on the topic, please set the slider to 0.
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
            </div>
            <div className="motivation">
              <p>
                How passionately are your beliefs about {issue.title}?
              </p>
              <div className="sec3-motivation-range">
              <p>
                  <span className="input-prefix">
                    <span className="input-prefix-label">LESS PASSIONATE</span>
                    <span className="input-prefix-cue">◀</span>
                  </span>
                  <input 
                      name="motivation"
                      value={this.state.motivation}
                      onChange={this.handleMotivationChange} 
                      type="range" min={0} max={7} />
                  <span className="input-suffix">
                    <span className="input-suffix-cue">▶</span>
                    <span className="input-suffix-label">MORE PASSIONATE</span>
                  </span>
              </p>
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
