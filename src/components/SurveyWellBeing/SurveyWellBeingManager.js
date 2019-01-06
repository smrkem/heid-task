import React from 'react'
import './SurveyWellBeing.css';
import Welcome from './Welcome';
import Demographics from './Demographics';
import HEMAR from './HEMAR';
import PWB from './PWB';
import BDI2 from './BDI2';
import SHAPS from './SHAPS';
import { shuffle } from '../../utils';
import ProgressBar from './components/ProgressBar'

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
      <HEMAR key="HEMAR" submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
      <PWB key="PWB" submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
      <BDI2 key="BDI2" submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
      <SHAPS key="SHAPS" submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />
    ]);

    // Temp for determined order for dev work:
    // this.state.questionnaires = [
    //   <HEMAR submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
    //   <PWB submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
    //   <BDI2 submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />,
    //   <SHAPS submitResults={this.addResults.bind(this)} finishStep={this.advanceQuestionnaire.bind(this)} />
    // ];

  }

  showing() {
    return this.state.steps[this.state.stepIndex]
  }

  showDemographics() {
    this.setState({
      stepIndex: this.state.steps.indexOf('demographics'),
      questionnairesIndex: 0
    });
  }

  showQuestionnaire(index) {
    this.setState({
      stepIndex: this.state.steps.indexOf('questionnaires'),
      questionnairesIndex: index
    });
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

  getProgressSections() {
   let sections = [
      {
        name: 'demographics',
        label: '1',
        active: this.showing() === 'demographics',
        completed: Object.keys(this.state.results).includes('demographics') 
      }
    ];
    this.state.questionnaires.forEach( (q, ind) => {
      sections.push(
        {
          name: `questionnaire-${q.key}`,
          label: 2 + ind,
          active: this.showing() === 'questionnaires' && this.state.questionnairesIndex === ind,
          completed: Object.keys(this.state.results).includes(q.key)
        }
      )
    });

    return sections;
  }

  render() {
    const sections = this.getProgressSections();

    // Set up questionnaire with existing formData if present:
    let questionnaire = null;
    if (this.showing() === 'questionnaires') {
      const key = this.state.questionnaires[this.state.questionnairesIndex].key;
      questionnaire = React.cloneElement(
        this.state.questionnaires[this.state.questionnairesIndex],
        {formData: this.state.results[key] || null}
      );
    }
    
    return (
      <div
        ref={elem => this.contentWrap = elem}
        className={`wellbeing-page ${this.showing()}`} 
      >
        <div className="">
          <ProgressBar 
            showDemographics={this.showDemographics.bind(this)}
            showQuestionnaire={this.showQuestionnaire.bind(this)}
            sections={sections}
            />
          
        </div>

        {this.showing() === 'welcome' && (
          <Welcome finishStep={this.advanceStep.bind(this)} />
        )}

        {this.showing() === 'demographics' && (
          <Demographics 
            formData={this.state.results.demographics || null}
            submitResults={this.addResults.bind(this)}
            finishStep={this.advanceStep.bind(this)}
          />
        )}

        {this.showing() === 'questionnaires' && (
          questionnaire
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
