import React from 'react'
import informationIcon from './information_blue.svg'
import IssueInfoModal from './IssueInfoModal'


class IssuesView extends React.Component {
  state = {
    issueDetail: null
  }

  onDrop(e, cat) {
    const droppedIssue = JSON.parse(e.dataTransfer.getData("issue"))
    this.props.onIssueDrop(droppedIssue, cat)
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDragStart(e, issue) {
    e.dataTransfer.setData("issue", JSON.stringify(issue));
  }

  showIssueDetail(issue) {
    this.setState({issueDetail: issue})
  }

  removeIssueDetail() {
    this.setState({issueDetail: null})
  }

  render() {
    const { issues } = this.props;

    const issueCards = {
      uncategorized: [],
      most_important: [],
      less_important: []
    }

    issues.filter(i => i.importance1 === 'important').forEach(i => {
      issueCards[i.importance2].push(
        <div 
          draggable
          onDragStart={e => this.onDragStart(e, i)}
          key={i.title}
          className="card issue-card"
          >
          <h5 className="card-title">{i.title}</h5>
          <div 
            className="information-icon"
            onClick={() => this.showIssueDetail(i) }
            >
              <img src={informationIcon} alt="info" />
            </div>
        </div>
      )
    })
    return (
      <div>
        {this.state.issueDetail && (
          <IssueInfoModal 
            issue={this.state.issueDetail} 
            onCancel={this.removeIssueDetail.bind(this)}
            />
        )}
        <div className="issue-drop">
            
            <div className="cat most_important">
              <h3>Most Important To Me</h3>
              <div className="dropWrapper"
                onDrop={e => this.onDrop(e, 'most_important')}
                onDragOver={e => this.onDragOver(e)}
              >
                {issueCards.most_important}
              </div>
            </div>

            <div className="cat less_important">
              <h3>Less Important To Me</h3>
              <div className="dropWrapper"
                onDrop={e => this.onDrop(e, 'less_important')}
                onDragOver={e => this.onDragOver(e)}
              >
                {issueCards.less_important}
              </div>
            </div>
        </div>
        <div className="issue-queue">
          <div className="issue-row">
            {issueCards.uncategorized}
          </div>
        </div>
      </div>
    )
  }
}

export default IssuesView