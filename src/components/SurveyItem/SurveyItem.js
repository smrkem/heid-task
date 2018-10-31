import React from 'react'

class SurveyItem extends React.Component {
    state = {
        forAgainst: '',
        importance: '',
        valid: false
    }

    constructor(props) {
        super(props)
        this.handleForAgainstChange = this.handleForAgainstChange.bind(this)
        this.handleImportanceChange = this.handleImportanceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate() {
        if (this.state.importance!=='' && this.state.forAgainst!=='' && !this.state.valid) {
            this.setState({valid: true})
        }
    }

    handleForAgainstChange(event) {
        this.setState({forAgainst: event.target.value})
    }

    handleImportanceChange(event) {
        this.setState({importance: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.finishItem({
            forAgainst: this.state.forAgainst,
            importance: this.state.importance
        })
    }

    componentWillReceiveProps() {
        this.setState({
            forAgainst: '',
            importance: '',
            valid: false
        })
    }

    render() {
        return (
            <div className="card surveyItem">
                { this.props.icon && (
                    <div><img class="card-img-top" alt="" src={this.props.icon} /></div>
                )}
                <h4 className="card-title">{this.props.title}</h4>
                <p>{this.props.content}</p>
                <form onSubmit={this.handleSubmit} >
                    <div className="row for-against">
                        <div className="range-wr">
                            <h5>How <b>for</b> or <b>against</b> are you for {this.props.title}?</h5>
                            <p>
                                <span className="input-prefix">AGAINST</span>
                                <input 
                                    name="forAgainst"
                                    value={this.state.forAgainst}
                                    onChange={this.handleForAgainstChange} 
                                    type="range" min="0" max="100" step="5" />
                                <span className="input-suffix">FOR</span>
                            </p>
                        </div>
                    </div>

                    <div className="row importance">
                        <div className="radio-wr">
                            <h5>How strongly do you feel about {this.props.title}?</h5>
                            <p>
                                <span>Not Strong At All</span>
                                {
                                    [1,2,3,4,5].map((num) => {
                                        return <input name="importance"
                                            value={num}
                                            key={num}
                                            type="radio"
                                            checked={this.state.importance === num.toString()}
                                            onChange={this.handleImportanceChange}
                                        />
                                    })
                                }
                                <span>Very Strong</span>
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="next-wr">
                            <button className="btn btn-primary"
                            type="submit"
                            disabled={!this.state.valid}
                            >
                            Next &rarr;
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SurveyItem
