import React from 'react'
import issues from '../../issues.json'

class FadeIn extends React.Component {
  state = {
    styles: {
      opacity: 0,
      position: 'absolute',
      top: '60px',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      transition: 'opacity 0.4s ease'
    }
  }

  setOpacity() {
    let newStyles = {...this.state.styles}
    newStyles.opacity = 1
    this.setState({styles: newStyles})
  }

  componentDidMount() {
    window.setTimeout(this.setOpacity.bind(this), 600)
  }

  render() {
    return (
      <div style={this.state.styles}>
        {this.props.children}
      </div>
    )
  }
}

class SurveyInitialIssues extends React.Component {
  render() {
    return(
      <div className="surveyManager">
        <FadeIn delay={600} transitionDuration={400}>
          <div className="initialIssuesIntro">
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
            <p>jfdiopadjfa jfidopasjfio fjidsaopjf iopdasj oifpsa</p>
          </div>
        </FadeIn>
        <div className="thinker-icon"></div>
        <div className="row issue-row">
          { issues.map(issue => (
            <div key={issue.title} className="card issue-card">
              <h5 className="card-title">{issue.title}</h5>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default SurveyInitialIssues
