import React from 'react'

const ExperimentIntroduction = (props) => {
    return (
        <div>
          <p>Blah, blah, blah...</p>
          <p>Click below to begin the experiment.</p>
          <button onClick={props.advanceStep}>START</button>
        </div>
    )
}

export default ExperimentIntroduction