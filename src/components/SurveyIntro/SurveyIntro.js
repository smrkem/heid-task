import React from 'react'

class SurveyIntro extends React.Component {
  render() {
    return (
      <div className='survey-intro container'>
        <h2>Welcome to the Social Values Task</h2>
        <p>Introductory copy placeholder. Click below to begin the survey</p>
        <p>
          <button
            onClick={this.props.onFinish}
            className="btn btn-primary">
            Begin
          </button>
        </p>
      </div>
    )
  }
}

export default SurveyIntro
