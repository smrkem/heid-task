import React from 'react'
// import informationIcon from './information_blue.svg'
import IssueInfoModal from './IssueInfoModal'
import InformationIcon from '../InformationIcon/InformationIcon'


class IssuesView extends React.Component {
  state = {
    issueDetail: null,
    alertFull: false
  }

  componentDidUpdate() {
    
  }

  onDrop(e, cat) {
    const droppedIssue = JSON.parse(e.dataTransfer.getData("issue"))
    this.props.onIssueDrop(droppedIssue, cat)
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDragOverMostImportant(e) {
    const mostImportantIssues = this.props.issues.filter(iss => iss.importance2 === 'most_important');
    if (mostImportantIssues.length >= 3) {
      this.setState({alertFull: true});
    }
    else {
      e.preventDefault();
    }
  }

  onDragLeaveMostImportant(e) {
    this.setState({alertFull: false});
  }

  onDragStart(e, issue) {
    e.dataTransfer.setData("issue", JSON.stringify(issue));
  }

  showIssueDetail(issue) {
    console.log('show: ', issue);
    this.setState({issueDetail: issue})
  }

  removeIssueDetail() {
    this.setState({issueDetail: null})
  }

  render() {
    const { issues, finishedSorting } = this.props;

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
          <InformationIcon 
            onClick={() => this.showIssueDetail(i) }
          />
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
              {(issueCards.most_important.length === 0) && 
                <small style={{display: 'block', marginTop: '-10px'}}>Must select 1 - 3 issues</small>
              }
              { this.state.alertFull && 
                <small style={{display: 'block', marginTop: '-10px'}}>May only select 1 - 3 issues.</small>
              }
              
              <div className="dropWrapper"
                onDrop={e => this.onDrop(e, 'most_important')}
                onDragOver={e => this.onDragOverMostImportant(e)}
                onDragLeave={e => this.onDragLeaveMostImportant(e)}
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
            {!issueCards.uncategorized.length && (
              <div className="tray-buttons">
                <button
                  onClick={this.props.resetIssues}
                  className="btn btn-large btn-grey finishedButton"
                  >Start Over
                  </button>

                <button
                  onClick={finishedSorting}
                  disabled={!issueCards.most_important.length}
                  className="btn btn-large btn-primary finishedButton"
                  >I'm Finished
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default IssuesView