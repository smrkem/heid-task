import React from 'react'


class SurveyWellBeing extends React.Component {
  state = {
    showContinue: false
  }

  showContinue() {
    this.setState({showContinue: true})
  }

  render() {
    if (this.state.showContinue) {
      return (
        <div>
          <h2>Would you like to take a break or move on to the next task?</h2>
          <button
            onClick={this.props.onFinish}
            className="btn btn-primary">Next Task</button>
        </div>
      )
    }
    return (
      <div>
        <h2>Wellbeing Questionnaires</h2>
        <p>
          <button
            onClick={this.showContinue.bind(this)}
            className="btn btn-primary"
          >Next</button>
        </p>
      </div>
    )
  }
}

export default SurveyWellBeing
