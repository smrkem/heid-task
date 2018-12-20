import React from 'react';
import RadioGroup from './components/RadioGroup';

export default class SHAPS extends React.Component {
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
        <h2>SHAPS</h2>

        <p>This questionnaire is designed to measure your ability to experience pleasure <em>in the last few days.</em> It is important to read each statement very <em>carefully</em>. Select an option to indicate how much you agree or disagree with each statement.</p>
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