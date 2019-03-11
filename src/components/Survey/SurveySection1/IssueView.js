import React from 'react'
import IssueInfoModal from '../components/IssueInfoModal'
import InformationIcon from '../components/InformationIcon/InformationIcon'

class IssueView extends React.Component {
  state = {issueDetail: null}

  showIssueDetail(issue) {
    this.setState({issueDetail: issue})
  }

  removeIssueDetail() {
    this.setState({issueDetail: null})
  }

  render() {
    const {issue, categorizeIssue, children} = this.props; 
    return (
      <div className="">
        {this.state.issueDetail && (
          <IssueInfoModal 
            issue={this.state.issueDetail} 
            onCancel={this.removeIssueDetail.bind(this)}
            />
        )}

        <div className="card social-values-sec1-issue-modal sec1_thought_bubble">
          <InformationIcon 
            onClick={() => this.showIssueDetail(issue) }
          />
          
          <div className="sec1-issue-content">
            <h2>{issue.title}</h2>
            <div className="sec1-issue-bottom">
              <div className="sec1-issue-image">
                <img src={issue.image_src} alt={issue.title} />
              </div>
              <p className="sec1-issue-problem-statement">{issue.problem_statement}</p>
            </div>          
          </div>
  
          <div className="sec1-issue-selections-wr">
            <div className="sec1-issue-selections">
              <button
                className={`btn ${issue.importance1 === "not-important" ? "previously-selected" : ""}`}
                onClick={() => categorizeIssue(issue, 'not-important')}
                >NOT IMPORTANT TO ME</button>
              <button
                className={`btn ${issue.importance1 === "somewhat-important" ? "previously-selected" : ""}`}
                onClick={() => categorizeIssue(issue, 'somewhat-important')}
                >SOMEWHAT IMPORTANT TO ME</button>
              <button
                className={`btn ${issue.importance1 === "important" ? "previously-selected" : ""}`}
                onClick={() => categorizeIssue(issue, 'important')}
                >IMPORTANT TO ME</button>
            </div>
          </div>
           
          <div className="issue-navigation">
            {children}
          </div>
        </div>
      </div>
    )
  }
  
}

export default IssueView