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
    country: 'Canada',
    age: '',
    ethnic_heritage: null,
    ethnic_heritage_other: '',
    religious_affiliation: null,
    religious_affiliation_other: '',
    social_class: null
  }

  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(e) {
    this.setState({[e.target.name]: e.target.value});
    console.log('state: ', this.state);
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
    const {finishStep} = this.props;
    return (
      <div className="inner-copy">
        <h2>Demographics</h2>

        <form>
          <div className="form-group">
            <p>What is your <b>gender?</b></p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state.gender}
              name="gender"
              options={genderOptions}
            />
          </div>

          <div className="form-group">
            <p>In which country do you currently reside?</p>
            <CountrySelect
              name="country"
              value={this.state.country} 
              onChange={this.handleFieldChange} 
            />
          </div>

          <div className="form-group">
            <p>What is your age?</p>
            <input 
              name="age"
              value={this.state.age} 
              onChange={this.handleFieldChange} 
              type="number"
            />
          </div>
          
          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
            <p>What is the <b>social class</b> of the family in which you grew up (example sources of income in parenthesis)?</p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state.social_class}
              name="social_class"
              options={socialClassOptions}
            />
          </div>

          <div>
            <button
            onClick={finishStep}
            className="btn btn-primary"
            >
            Next</button>
          </div>
        </form>
      </div>
    )
  }
}