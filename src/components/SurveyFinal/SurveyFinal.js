import React from 'react'

class SurveyFinal extends React.Component {
  randomMargin() {
    return Math.floor((Math.random() * 4) + 1) * 0.5;
  }

  render() {
    console.log('final: ', this.props.issues);
    return(
      <div className="green-bg surveySection surveyFinal exp-results">
        <div className="row issue-row">
          { this.props.issues.map(issue => {
            let className = "card issue-card";
            if (issue.importance2 === 'most_important') {
              className += " most_important";
            }
            if (issue.selectedIssue) {
              className += " selected_issue";
            }
            const styles = {
              marginTop: `${this.randomMargin()}rem`,
              marginRight: `${this.randomMargin()}rem`,
              marginBottom: `${this.randomMargin()}rem`,
              marginLeft: `${this.randomMargin()}rem`,
            }
            return (
              <div key={issue.title} className={className} style={styles}>
                <h5 className="card-title">{issue.title}</h5>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SurveyFinal
