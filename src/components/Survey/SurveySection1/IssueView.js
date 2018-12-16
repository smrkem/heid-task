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
    const {issue, categorizeIssue} = this.props; 
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
                className="btn"
                onClick={() => categorizeIssue(issue, 'not-important')}
                >NOT<br /> IMPORTANT</button>
              <button
                className="btn"
                onClick={() => categorizeIssue(issue, 'somewhat-important')}
                >SOMEWHAT<br /> IMPORTANT</button>
              <button
                className="btn"
                onClick={() => categorizeIssue(issue, 'important')}
                >IMPORTANT</button>
            </div>
          </div>
           
        </div>
      </div>
    )
  }
  
}

export default IssueView