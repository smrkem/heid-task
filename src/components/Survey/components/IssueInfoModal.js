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
        <div className="issue-info-modal-image">
          <img src={issue.image_src} alt={issue.title} />
        </div>
        <div className="issueInfoModal-copy">
          <div>
            {issue.description.map((p, ind) => (
              <p key={ind}>{p}</p>
            ))}
          </div>
          <div>
            <h4>PROS:</h4>
            <ul>
              {issue.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}  
            </ul>
          </div>
          <div>
            <h4>CONS:</h4>
            <ul>
              {issue.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}  
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default IssueInfoModal
