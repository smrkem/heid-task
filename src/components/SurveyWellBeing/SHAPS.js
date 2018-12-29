import React from 'react';
import RadioGroup from './components/RadioGroup';
import SHAPSItems from './components/SHAPSItems';

const options = [
  {
    "label": "Strongly Disagree",
    "value": "1"
  },
  {
    "label": "Disagree",
    "value": "2"
  },
  {
    "label": "Agree",
    "value": "3"
  },
  {
    "label": "Strongly agree",
    "value": "4"
  },
];

export default class SHAPS extends React.Component {
  name = "SHAPS";

  constructor(props) {
    super(props);
    if (props.formData) {
      this.state = props.formData;
    } else {
      let state = {};
      Object.keys(SHAPSItems).forEach(key => {
        state[key] = null;
      });
      this.state = state;
    }

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
    const formItems = Object.keys(SHAPSItems).map(key => (
        <div key={key} className={`form-group`}>
            <p>{`${key}. ${SHAPSItems[key]}`}</p>
            <RadioGroup
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state[key]}
              name={key}
              options={options}
            />
          </div>
    ));

    let disabled = true;
    Object.keys(this.state).forEach(item => {
      if (this.state[item] !== null) {
        disabled = false;
      }
    });

    return (
      <div className="inner-copy">
        <h2>SHAPS</h2>

        <p>This questionnaire is designed to measure your ability to experience pleasure <em>in the last few days.</em> It is important to read each statement very <em>carefully</em>. Select an option to indicate how much you agree or disagree with each statement.</p>
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