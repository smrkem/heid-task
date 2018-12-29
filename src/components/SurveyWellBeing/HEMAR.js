import React from 'react';
import RadioRange from './components/RadioRange';
import HEMARItems from './components/HEMARItems';

export default class HEMAR extends React.Component {
  name = "HEMAR";

  constructor(props) {
    super(props);
    let state = {};
    Object.keys(HEMARItems).forEach(key => {
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
    let formItems = [];
    let disabled = true;
    Object.keys(this.state).forEach(item => {
      if (this.state[item] !== null) {
        disabled = false;
      }
      formItems.push(
          <div key={item} className="hemar-item">
            <p>{HEMARItems[item]}</p>
            <RadioRange
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state[item]}
              name={item}
              rangeMin={1}
              rangeMax={7}
            />
          </div>
      )
    });
    
    return (
      <div className="inner-copy hemar">
        <h2>HEMA-R</h2>

        <p>To what degree do you typically approach your activities (e.g., social, occupational, recreational) with each of the following intentions, whether or not you actually achieve your aim?</p>
        <form onSubmit={this.handleFormSubmit}>

          <div className="form-group">
            <div className="form-legend">
              <div>Not at all</div>
              <div>Very Much</div>
            </div>
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