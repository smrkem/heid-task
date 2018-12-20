import React from 'react'
import './SurveyWellBeing.css';
import Welcome from './Welcome';
import Demographics from './Demographics';
import HEMAR from './HEMAR';
import PWB from './PWB';
import BDI2 from './BDI2';
import SHAPS from './SHAPS';
import { shuffle } from '../../utils';

class SurveyWellBeingManager extends React.Component {
  state = { 
    steps: [
      'welcome',
      'demographics',
      'questionnaires'
    ],
    questionnaires: [],
    stepIndex: 0,
    questionnairesIndex: 0,
    results: {}
  }

  constructor(props) {
    super(props);
    this.state.questionnaires = shuffle([
      <HEMAR submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
      <PWB submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
      <BDI2 submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
      <SHAPS submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />
    ]);

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

  advanceQuestionnaire() {
    if (this.state.questionnairesIndex === this.state.questionnaires.length - 1) {
      this.advanceStep();
    }

    this.setState({questionnairesIndex: this.state.questionnairesIndex + 1});
  }

  addResults(questionnaire, data) {
    let results = {...this.state.results};
    results[questionnaire] = data;
    this.setState({results});
  }


  render() {
    if (this.showing()==='questionnaires') {
      console.log("questionnaires state: ", this.state);
    }

    return (
      <div className={`wellbeing-page ${this.showing()}`} >
        {this.showing() === 'welcome' && (
          <Welcome finishStep={this.advanceStep.bind(this)} />
        )}

        {this.showing() === 'demographics' && (
          <Demographics 
            submitResults={this.addResults.bind(this)}
            finishStep={this.advanceStep.bind(this)}
          />
        )}

        {this.showing() === 'questionnaires' && (
          this.state.questionnaires[this.state.questionnairesIndex]
        )}

      </div>
    )
  }
}

export default SurveyWellBeingManager
