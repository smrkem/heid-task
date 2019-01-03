import React from 'react';

const Break = (props) => {
  return (
    <div className="take-a-break">
      <div>
        <h2>Would you like to take a break or move on to the next task?</h2>
        <button
          onClick={props.onFinish}
          className="btn btn-primary btn-large">Next Task</button>        
      </div>
    </div>
  )
}

export default Break