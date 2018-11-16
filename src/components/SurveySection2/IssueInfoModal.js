import React from 'react'

const IssueInfoModal = ({issue, onCancel}) => {
  return (
    <div onClick={onCancel} className="issueInfoModal">
      <div className="social-values-copy-modal" onClick={e => e.stopPropagation()}>
        <div onClick={onCancel} className="issueInfoModal-cancel">
          <span>X</span>
        </div>
        <h1>{issue.title}</h1>
        <h3>{issue.problem_statement}</h3>
        <div 
            style={{backgroundImage: `url(/images/${issue.image})`}}
            className="IssueInfoModal-issueImage"
        ></div>
        <div className="issueInfoModal-copy">
          {issue.content.map((p, ind) => (
            <p key={ind}>{p}</p>
          ))}
        </div>

      </div>
    </div>
  )
}

export default IssueInfoModal
