import React from 'react'
import { shuffle } from '../../../utils'


class SurveyFinal extends React.Component {
  randomMargin() {
    return Math.floor((Math.random() * 8) + 1) * 0.25;
  }

  render() {
    let issues = shuffle(JSON.parse(JSON.stringify(this.props.issues)));    
    return(
      <div className="surveySection surveyFinal exp-results">
        <div className="survey-green-bg"></div>
        <div className="thank-you-copy">
          <h4>Thank you for playing!</h4>
          <button
            className="btn btn-primary"
            onClick={this.props.finishSurvey}>Next</button>
        </div>
        <div className="row issue-row">
          { issues.map(issue => {
            let className = "card issue-card";
            // if (issue.importance2 === 'most_important') {
            //   className += " most_important";
            // }
            if (issue.selectedIssue) {
              className += " most_important selected_issue";
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
