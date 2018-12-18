import React from 'react'
import './SurveyWellBeing.css';
import Welcome from './Welcome';
import Demographics from './Demographics';

class SurveyWellBeingManager extends React.Component {
  state = { 
    steps: [
      'welcome',
      'demographics',
      'questionnaires'
    ],
    questionnaires: [],
    stepIndex: 0,
    questionnairesIndex: 0
  }

  showing() {
    return this.state.steps[this.state.stepIndex]
  }

  advanceStep() {
    if (this.state.stepIndex === this.state.steps.length - 1) {
      // Done with WellBeing
    }

    this.setState({stepIndex: this.state.stepIndex + 1});
    // this.contentWrap && this.contentWrap.scrollTo(0,0);
  }


  render() {
    return (
      <div className={`wellbeing-page ${this.showing()}`} >
        {this.showing() === 'welcome' && (
          <Welcome finishStep={this.advanceStep.bind(this)} />
        )}

        {this.showing() === 'demographics' && (
          <Demographics finishStep={this.advanceStep.bind(this)} />
        )}

      </div>
    )
  }
}

export default SurveyWellBeingManager
