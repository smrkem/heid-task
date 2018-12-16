import React from 'react'
import InformationIcon from '../InformationIcon/InformationIcon'

const IssueView = ({issue, categorizeIssue}) => {
  return (
    <div className="">
      <div className="card social-values-sec1-issue-modal sec1_thought_bubble">
        <InformationIcon />
        
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
export default IssueView