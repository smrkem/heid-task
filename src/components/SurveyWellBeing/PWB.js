import React from 'react';
import RadioRange from './components/RadioRange';
import PWBItems from './components/PWBItems';

export default class PWB extends React.Component {

  constructor(props) {
    super(props);

    let state = {};
    Object.keys(PWBItems).forEach(key => {
      state[key] = null;
    });
    this.state = state;

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFieldChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleFormSubmit(e) {
    console.log("form submit!!");
    e.preventDefault();
    this.props.submitResults("PWB", this.state);
    this.props.finishStep();
  }

  render() {
    let formItems = [];
    Object.keys(this.state).forEach(item => {
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
              className="btn btn-primary"
            >
            Next</button>
          </div>
        </form>
      </div>
    )
  }
}