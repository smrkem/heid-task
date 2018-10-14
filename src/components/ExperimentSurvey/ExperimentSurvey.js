import React from 'react'

const ExperimentSurvey = (props) => {
    return (
        <div>
            <p>Experiment survey. blah blah blah</p>
            <button onClick={props.advanceStep}>Next</button>
        </div>
    )
}

export default ExperimentSurvey