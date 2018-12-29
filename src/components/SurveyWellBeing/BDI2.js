import React from 'react';
import BDI2Items from './components/BDI2Items';
import RadioGroup from './components/RadioGroup';

export default class BDI2 extends React.Component {
  name = "BDI2"

  constructor(props) {
    super(props);
    let state = {};
    Object.keys(BDI2Items).forEach(key => {
      state[key] = null;
    });
    this.state = state;

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  handleFieldChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.submitResults(this.name, this.state);
    this.props.finishStep();
  }

  render() {
    const formItems = Object.keys(BDI2Items).map(key => {
      const item = BDI2Items[key];
      const options = [];
      Object.keys(item.options).forEach(value => {
        options.push({
          label: item.options[value],
          value: value
        })
      })
      return (
        <div key={key} className={`form-group`}>
            <p>{item.heading}</p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state[key]}
              name={key}
              options={options}
            />
          </div>
      )
    });

    let disabled = true;
    Object.keys(this.state).forEach(item => {
      if (this.state[item] !== null) {
        disabled = false;
      }
    });


    return (
      <div className="inner-copy">
        <h2>BDI-2</h2>

        <p>This questionnaire consists of 21 groups of statements.  Please read each group of statements carefully, and then pick out the <b>one statement</b> in each group that best describes the way you have been feeling during the <b>past week, including today.</b></p>
        <form onSubmit={this.handleFormSubmit}>


          <div className="form-items">
            {formItems}
          </div>

          <div className="submit-button">
            <button
            disabled={disabled}
            className="btn btn-primary"
            >
            Next</button>
          </div>
        </form>
      </div>
    )
  }
}