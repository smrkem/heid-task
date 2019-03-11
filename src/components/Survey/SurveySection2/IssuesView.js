import React from 'react'
import IssueInfoModal from '../components/IssueInfoModal'
import InformationIcon from '../components/InformationIcon/InformationIcon'


class IssuesView extends React.Component {
  state = {
    issueDetail: null,
    alertFull: false,
    showInstructions: false
  }

  constructor(props) {
    super(props);
    this.showInstructions = this.showInstructions.bind(this);
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

  showInstructions(show=true) {
    this.setState({showInstructions: show});
  }

  render() {
    const { issues, finishedSorting } = this.props;

    const issueCards = {
      uncategorized: [],
      most_important: [],
      less_important: []
    }

    let theIssues = issues.filter(i => i.importance1 === 'important');
    if (theIssues.length < 1) {
      theIssues = issues.filter(i => i.importance1 === "somewhat-important");
    }
    if (theIssues.length < 1) {
      theIssues = issues.filter(i => i.importance1 === "not-important");
    }

    theIssues.forEach(i => {
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
    });

    if (this.state.showInstructions) {
      return (
        <div className="section2-instructions">
          <button
            className="whitePillButton"
            onClick={() => this.showInstructions(false)}
            >Hide Instructions</button>
          
          <div className="instruction-copy">
            <p>Please select your top three social issues.</p>
            <h4>Your Task:</h4>
            <ul>
              <li>Categorize each social issue as either <b>Most Important to Me</b> or <b>Less Important to Me</b> by dragging and dropping them in the appropriate box.</li>
              <li>You can have no more than 3 cards and no less than 1 card in the <b>Most Important to Me</b> or <b>Less Important to Me</b> box.</li>
              <li>You can drag items between the <b>Most Important to Me</b> and the <b>Less Important to Me</b> boxes.</li>
            </ul>
            <p>You will get the chance to read more about the social issues you think are important to you in Section III.  Just try your best in determining how important each social issue is for you.</p>
          </div>
        </div>
      )
    }
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

        <div className="showInstructions">
          <div onClick={this.showInstructions} className="whitePillButton iconExpandingButton">
              <div className="question_icon_blue btn_icon"></div>
              <span className="button_text">Show Instructions</span>
            </div>
        </div>

        <div className="goBack">
          <div onClick={this.props.goBack} className="whitePillButton iconExpandingButton">
              <div className="left_icon_blue btn_icon"></div>
              <span className="button_text">Go Back</span>
          </div>
        </div>

        <div className="some-buttons">
          

          <button
            onClick={finishedSorting}
            disabled={!issueCards.most_important.length}
            className="btn btn-large btn-primary finishedButton"
            >I'm Finished
            </button>
        </div>

  
      </div>
    )
  }
}

export default IssuesView