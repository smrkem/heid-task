import React from 'react';
import RadioRange from './components/RadioRange';
import PWBItems from './components/PWBItems';


const Legend = (props) => (
  <div className="form-legend">
    <div>Strongly disagree</div>
    <div>Moderately disagree</div>
    <div>Slightly disagree</div>
    <div>Slightly agree</div>
    <div>Moderately agree</div>
    <div>Strongly agree</div>
  </div>
)

export default class PWB extends React.Component {
  name = 'PWB';
  
  constructor(props) {
    super(props);
    if (props.formData) {
      this.state = props.formData;
    } else {
      let state = {};
      Object.keys(PWBItems).forEach(key => {
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
    let disabled = true;
    let formItems = [];
    let i = 1;
    Object.keys(this.state).forEach(item => {
      if (this.state[item] !== null) {
        disabled = false;
      }
      formItems.push(
          <div key={item} className="pwb-item">
            <p>{PWBItems[item].prompt}</p>
            <RadioRange
              handleRadioChange={this.handleFieldChange}
              currentValue={this.state[item]}
              name={item}
              rangeMin={1}
              rangeMax={6}
              reversed={PWBItems[item].reversed}
            />
          </div>
      )
      if (i % 3 === 0 && i !== Object.keys(this.state).length) {
        formItems.push(<Legend key={`${item}-legend`} />)
      }
      i++;
    });
    return (
      <div className="inner-copy pwb">
        <h2>PWB</h2>

        <p>Please indicate your degree of agreement to the following sentences:</p>
        <form onSubmit={this.handleFormSubmit}>
          <div className="grid-lines"></div>
          <div className="form-group">
            <div className="form-legend">
              <div>Strongly disagree</div>
              <div>Moderately disagree</div>
              <div>Slightly disagree</div>
              <div>Slightly agree</div>
              <div>Moderately agree</div>
              <div>Strongly agree</div>
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