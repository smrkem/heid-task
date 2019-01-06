import React from 'react'
import { getConsentCopy } from './consentCopy'
import './Consent.css';


class SurveyConsent extends React.Component {
  constructor(props) {
    super(props)
  }

  quitStudy() {
    if (window.confirm("Are you sure you wish to quite this study?")) {
      this.props.showGoodbye()
    }
  }
 
  render() {
    const copy = getConsentCopy()
    return (
      <div className='survey-consent container'>
        <h1 className="topBanner">Welcome to the HEID Task!</h1>
        { copy }
        <p>
          <button
            className="btn btn-primary"
            onClick={this.props.onFinish}
            >I DO <br /> consent to participate in this study.</button>
        </p>
        <p>
          <button
            className="btn btn-warning"
            onClick={this.quitStudy.bind(this)}
            >I DO NOT<br /> consent to participate in this study.</button>
        </p>
      </div>
    )
  }

}

export default SurveyConsent
