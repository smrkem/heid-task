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
      'questionnaires',
      'showResults'
    ],
    questionnaires: [],
    stepIndex: 0,
    questionnairesIndex: 0,
    results: {}
  }
  contentWrap = null;

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
      console.log('Done With Well being');
      this.props.submitWellbeingData(this.state.results);
      this.props.onFinish();
    }

    this.setState({stepIndex: this.state.stepIndex + 1});
    // this.contentWrap && this.contentWrap.scrollTo(0,0);
  }

  advanceQuestionnaire() {
    if (this.state.questionnairesIndex === this.state.questionnaires.length - 1) {
      this.advanceStep();
    }

    this.setState({questionnairesIndex: this.state.questionnairesIndex + 1});
    this.contentWrap && this.contentWrap.scrollTo(0,0);
  }

  addResults(questionnaire, data) {
    let results = {...this.state.results};
    results[questionnaire] = data;
    this.setState({results});
  }

  getProgressValue() {
    let progress = 0;
    if (this.showing()==='questionnaires') {
      progress = 20 + (this.state.questionnairesIndex * 20);
    }
    return progress;
  }

  render() {
    const progress = this.getProgressValue();

    return (
      <div
        ref={elem => this.contentWrap = elem}
        className={`wellbeing-page ${this.showing()}`} 
      >
        <div className="progress">
          <div className="progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: `${progress}%`}}
            ></div>
        </div>

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


        {this.showing() === 'showResults' && (
          <div className="surveySection exp-results">
            <h1 className="">Wellbeing Questionnaire Results</h1>
            <div className="">
              <p>Wellbeing Questionnaire completed by user.</p>
              <p>Store the data on the server. Need to associate with some kind of user_id.</p>
              <p>Data at this point shown below:</p>
              <div className="exp-data">
                <pre>{JSON.stringify(this.state.results, null, 3)}</pre>
              </div>
            </div>
            <button
              className="btn btn-black btn-large"
              onClick={() => this.advanceStep()}
            >
              Continue</button>
          </div>
        )}

      </div>
    )
  }
}

export default SurveyWellBeingManager
