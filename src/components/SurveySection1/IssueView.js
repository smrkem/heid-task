import React from 'react'

const IssueView = ({issue, categorizeIssue}) => {
  return (
    <div className="black-bg surveySection thinker-icon-bottom-left">
      <div className="card social-values-sec1-issue-modal">
        <h2>{issue.title}</h2>
        <div className="sec1-issue-bottom">
          <div 
            style={{backgroundImage: `url(/images/${issue.image})`}}
            className="sec1-issue-image"></div>
          <p className="sec1-issue-problem-statement">{issue.problem_statement}</p>
        </div>          
      </div>
      <div className="sec1-issue-selections">
        <button
          className="btn btn-info"
          onClick={() => categorizeIssue(issue, 'not-important')}
          >NOT<br /> IMPORTANT</button>
        <button
          className="btn btn-info"
          onClick={() => categorizeIssue(issue, 'somewhat-important')}
          >SOMEWHAT<br /> IMPORTANT</button>
        <button
          className="btn btn-info"
          onClick={() => categorizeIssue(issue, 'important')}
          >IMPORTANT</button>
      </div>
    </div>
  )
}
export default IssueView