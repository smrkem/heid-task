import React from 'react';
import CountrySelect from './components/CountrySelect';
import RadioGroup from './components/RadioGroup';
import { 
  genderOptions,
  ethnicOptions,
  religiousAffiliationOptions,
  socialClassOptions
} from './components/DemographicsOptions';


export default class Demographics extends React.Component {
  state = {
    gender: null,
    country: 'United States',
    age: '',
    ethnic_heritage: null,
    ethnic_heritage_other: '',
    religious_affiliation: null,
    religious_affiliation_other: '',
    social_class: null,
    errors: []
  }

  constructor(props) {
    super(props);
    if (props.formData) {
      for (const key in props.formData) {
        this.state[key] = props.formData[key];
      }
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFieldChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleFormSubmit(e) {
    e.preventDefault();

    let errors = this.validateErrors();
    if (!errors.length) {
      const data = {...this.state}
      delete data.errors;

      this.props.submitResults("demographics", data);
      this.props.finishStep();
    }
    this.setState({errors});
  }

  validateErrors() {
    let errors = [];
    [
      'gender',
      'country',
      'age',
      'ethnic_heritage',
      'religious_affiliation',
      'social_class'
    ].forEach(n => {
      if (!this.state[n]) {
        errors.push(n)
      }
    });

    return errors;
    // return [];
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ethnic_heritage !== "other" && prevState.ethnic_heritage === "other") {
      this.setState({ethnic_heritage_other: ""})
    }

    if (this.state.religious_affiliation !== "other" && prevState.religious_affiliation === "other") {
      this.setState({religious_affiliation_other: ""})
    }
  }

  render() {
    const genderError = this.state.errors.includes('gender') ? 'error' : '';
    const countryError = this.state.errors.includes('country') ? 'error' : '';
    const ageError = this.state.errors.includes('age') ? 'error' : '';
    const ethnic_heritageError = this.state.errors.includes('ethnic_heritage') ? 'error' : '';
    const religious_affiliationError = this.state.errors.includes('religious_affiliation') ? 'error' : '';
    const social_classError = this.state.errors.includes('social_class') ? 'error' : '';

    return (
      <div className="inner-copy">
        <h2>Demographics</h2>

        <form onSubmit={this.handleFormSubmit}>

          <div className={`form-group ${genderError}`}>
            <p>What is your <b>gender?</b></p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state.gender}
              name="gender"
              options={genderOptions}
            />
          </div>

          <div className={`form-group ${countryError}`}>
            <p>In which country do you currently reside?</p>
            <CountrySelect
              name="country"
              value={this.state.country} 
              onChange={this.handleFieldChange} 
            />
          </div>

          <div className={`form-group ${ageError}`}>
            <p>What is your age?</p>
            <input 
              name="age"
              value={this.state.age} 
              onChange={this.handleFieldChange} 
              type="number"
            />
          </div>
          
          <div className={`form-group ${ethnic_heritageError}`}>
            <p>What is your <b>ethnic heritage?</b></p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state.ethnic_heritage}
              name="ethnic_heritage"
              colCount={3}
              options={ethnicOptions}
              other_value={this.state.ethnic_heritage_other}
            />
          </div>

          <div className={`form-group ${religious_affiliationError}`}>
            <p>What, if any, is your <b>religious affiliation?</b></p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state.religious_affiliation}
              name="religious_affiliation"
              colCount={2}
              options={religiousAffiliationOptions}
              other_value={this.state.religious_affiliation_other}
            />
          </div>

          <div className={`form-group ${social_classError}`}>
            <p>What is the <b>social class</b> of the family in which you grew up (example sources of income in parenthesis)?</p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state.social_class}
              name="social_class"
              options={socialClassOptions}
            />
          </div>

          <div className="submit-button">
            <button
              type="submit"
              className="btn btn-primary"
            >
            Next</button>
          </div>
        </form>
      </div>
    )
  }
}