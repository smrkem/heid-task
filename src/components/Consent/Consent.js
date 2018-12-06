import React from 'react'
import { getConsentCopy } from './consentCopy'

class SurveyConsent extends React.Component {
  state = {
    canContinue: false
  }

  constructor(props) {
    super(props)

    this.trackScroll = this.trackScroll.bind(this)
  }

  quitStudy() {
    if (window.confirm("Are you sure you wish to quite this study?")) {
      this.props.showGoodbye()
    }
  }

  trackScroll(e) {
    const elem = e.target
    if (elem.scrollTop === (elem.scrollHeight - elem.offsetHeight)) {
      this.setState({canContinue: true})
      document.getElementById('copyWindow').removeEventListener('scroll', this.trackScroll)
    }
  }
 
  render() {
    const copy = getConsentCopy()
    return (
      <div className='survey-consent container'>
        <h2>Informed Consent Form</h2>
        { copy }
        <p>
          <button
            disabled={!this.state.canContinue}
            className="btn btn-primary"
            onClick={this.props.onFinish}
            >I DO <br /> consent to participate in this study.</button>
        </p>
        <p>
          <button
            disabled={!this.state.canContinue}
            className="btn btn-warning"
            onClick={this.quitStudy.bind(this)}
            >I DO NOT<br /> consent to participate in this study.</button>
        </p>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById('copyWindow').addEventListener('scroll', this.trackScroll)
  }
  
  componentWillUnmount() {
    document.getElementById('copyWindow').removeEventListener('scroll', this.trackScroll)
  }
  
}

export default SurveyConsent
