import React from 'react';
import RadioGroup from './components/RadioGroup';

export default class BDI2 extends React.Component {
  state = {

  }

  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {finishStep} = this.props;
    return (
      <div className="inner-copy">
        <h2>BDI-2</h2>

        <p>This questionnaire consists of 21 groups of statements.  Please read each group of statements carefully, and then pick out the one statement in each group that best describes the way you have been feeling during the past week, including today.</p>
        <form>

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