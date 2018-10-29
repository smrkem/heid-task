import React from 'react'
import axios from 'axios'
import './ExperimentSurvey.css'
import SurveyItem from '../SurveyItem/SurveyItem'
import issues from '../../issues.json'


const HEID_API_URL = "https://5rp983l6qc.execute-api.us-east-1.amazonaws.com/develop/survey-submissions"

function makeid(num) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  
    for (var i = 0; i < num; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

class ExperimentSurvey extends React.Component {
    state = {
        showing: 'intro',
        surveyItems: issues,
        surveyResults: [],
        surveyFinished: false,
        submittedResults: false,
    }

    constructor(props) {
        super(props)
        console.log('iss: ', issues)

        this.surveyNext = this.surveyNext.bind(this)

        this.state.participantId = makeid(7)
    }

    beginSurvey() {
        this.setState({showing: 0})
    }

    completeSurvey() {
        this.setState({showing: 'finished', surveyFinished: true})

        // post results to api
        const payload = {
            results: this.state.surveyResults,
            participantId: this.state.participantId
        }
        axios.post(HEID_API_URL, payload).then(response => {
            console.log(response);
            let data = response.data
            console.log('data: ', data)
            this.setState({submittedResults: true})
        }).catch(error => {
            console.log(error)
        })
    }

    componentDidUpdate() {
        if (this.state.showing === this.state.surveyItems.length) {
            this.completeSurvey()
        }
    }

    surveyNext(values) {
        let results = this.state.surveyResults.concat({
            itemIndex: this.state.showing,     
            ...values
        })
        this.setState({
            surveyResults: results,
            showing: this.state.showing + 1
        })
    }

    render() {
        console.log("state: ", this.state)
        if (this.state.showing === 'intro') {
            return (
                <div>
                    <p>This is the HEID survey intro copy.</p>
                    <p>Click below to begin the survey.</p>
                    <p>Your participantId is: {this.state.participantId}</p>
                    <button onClick={this.beginSurvey.bind(this)}>Next</button>
                </div>
            )
        }
        else if (Number.isInteger(this.state.showing)) {
            return (
                <div>
                    <p>Showing {this.state.showing + 1} of {this.state.surveyItems.length}.</p>
                    <SurveyItem 
                        {...this.state.surveyItems[this.state.showing]}
                        finishItem={this.surveyNext}
                        />
                </div>
            )
        }
        else if (this.state.surveyFinished) {
            return (
                <div className="container">
                    <h3>The survey is now complete :)</h3>
                    <p>Survey results are displayed below.</p>
                    <pre>
                        {JSON.stringify(this.state.surveyResults, null, 3)}
                    </pre>
                    { this.state.submittedResults && (
                        <div>
                            <pre>Submitted Results!!!</pre>
                            <p>Click the button below to begin the practice trial.</p>
                            <button className="btn btn-primary" onClick={this.props.advanceStep}>Start</button>
                        </div>
                    )}
                </div>
            )
        }

    }
}


export default ExperimentSurvey