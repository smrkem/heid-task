import React from 'react'
import 'jspsych/jspsych'
import 'jspsych/css/jspsych.css'
import 'jspsych/plugins/jspsych-html-keyboard-response'
import './jsPsychPlugins/ms-selection-response'
import 'jspsych/plugins/jspsych-fullscreen'
import { DbStaircase } from './staircase'
import './ExperimentBlock.css'
import { KeyLogger, randomFromInterval, PointsTracker } from '../../utils'
import issues from '../Survey/Issues/Issues';

const NUM_TRIALS = 25;
// const NUM_TRIALS = 3;
const jsPsych = window.jsPsych;
let keyLogger = new KeyLogger();
let pointsTracker = new PointsTracker();
let staircase = null;
const DISABLE_FULLSCREEN = false;


class ExperimentBlock extends React.Component {
  state = {
    showResults: false,
    results: {}
  }

  conditionGoals = {
    'self': '<span class="underline">WIN</span> money for yourself',
    'charity': '<span class="underline">WIN</span> money for your social issue',
    'anti-charity': '<span class="underline">AVOID LOSING</span> and risk donating money to a social issue you are against',
    'game': '<span class="underline">WIN</span> for the sake of winning',
  }

  instructionsStimuli = () => {
    const { condition } = this.props;

    let copy = ''
    condition.copy.forEach(para => {
      copy += `<p>${para}</p>`
    });

    let out = `<div class="instructions ${condition.type}">`;
    out += `<div class="icon ${this.getIconClass()}">`;
    
    if (condition.type === 'charity') {
      const position = condition.socialIssue.position;
      const signCopy = this.positionStatements[position].for_statement.replace("FOR ", "");
      out += `<div class="protest-sign"><div><span class="protest-sign-position">FOR</span> ${signCopy}</div></div>`;
    }
    else if (condition.type === 'anti-charity') {
      const position = condition.socialIssue.position;
      const signCopy = this.positionStatements[position].against_statement.replace("AGAINST ", "");
      out += `<div class="protest-sign"><div><span class="protest-sign-position">AGAINST</span> ${signCopy}</div></div>`;
    }

    out += `</div>`;
    out += `<div class="copy">${copy}</div>`;
    out += `</div>`;

    return out;
  }

  instructions = {
    type: "html-keyboard-response",
    data: { instructions: true},
    stimulus: () => {
      return (this.instructionsStimuli() +
        `<div class="instructions-response">` +
          `<p class="continue-btn">Press any key to continue.</p>` +
        "</div>"
      )
    },
    message: () => {
      return this.instructionsStimuli();
    },
    on_finish: function(data) {
      const elem = document.getElementById('jspsych-experiment')
      elem.classList.add("fullscreen")
      elem.focus()
    },
    button_label: "Begin"
  }

  preMAQ1 = {
    type: "ms-selection-response",
    prompt: () => {
      return `How important is it for you right now to ${this.conditionGoals[this.props.condition.type]}?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {preMAQ1: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  preMAQ2 = {
    type: "ms-selection-response",
    prompt: () => {
      return `How motivated are you right now to ${this.conditionGoals[this.props.condition.type]}?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {preMAQ2: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }

  midEAQintro = {
    type: "html-keyboard-response",
    stimulus: () => (
      `<div class="midEAQ">` + 
        `<p class="question-header">Please rate the extent to which you feel the following emotions at the present moment.</p>` +
        `<p class="">Press any key to begin.</p>` +
      `</div>`
    ),
    data: {midEAQintro: true}
  }
  midEAQ1 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel a sense of meaning`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ1: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ2 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel inspired`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ2: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ3 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel morally elevated`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ3: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ4 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel connected with myself`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ4: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ5 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel engaged`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ5: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ6 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel authentic`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ6: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ7 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel pride`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ7: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ8 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel`;
    },
    labels: ['Negative Emotions', '', 'Neutral', '', 'Positive Emotions'],
    data: {midEAQ8: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ9 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel carefree`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ9: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ10 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel satisfied`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ10: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ11 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel relaxed/comfortable`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ11: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  midEAQ12 = {
    type: "ms-selection-response",
    prompt: () => {
      return `I feel alert/aroused`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {midEAQ12: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }

  endHAQintro = {
    type: "html-keyboard-response",
    stimulus: () => (
      `<div class="endHAQ">` + 
        `<p class="question-header">To what degree did you approach this game round ( to ${this.conditionGoals[this.props.condition.type]} ) with each of the following intentions, whether or not you actually achieved your aim?</p>` +
        `<p class="">Press any key to begin.</p>` +
      `</div>`
    ),
    data: {midEAQintro: true}
  }
  endHAQ1 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking relaxation?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ1: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ2 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking to develop a skill, learn, or gain insight into something?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ2: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ3 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking to do what you believe in?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ3: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ4 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking pleasure?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ4: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ5 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking to pursue excellence or a personal Ideal?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ5: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ6 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking enjoyment?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ6: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ7 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking to take it easy?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ7: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ8 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking to use the best in yourself?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ8: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ9 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking fun?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ9: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  endHAQ10 = {
    type: "ms-selection-response",
    prompt: () => {
      return `Seeking to contribute to others or the surrounding world?`;
    },
    labels: ['Not at all', '', '', '', 'Very much'],
    data: {endHAQ10: true},
    on_finish: function(data) {
      data.response = data.selection;
    }
  }
  

  cue = {
    type: "html-keyboard-response",
    stimulus: () => {
      const { condition } = this.props;
      const pointVal = pointsTracker.getCurrentValue();
      let out = `<p>${pointVal} Points</p><div class="cue icon ${this.getIconClass()}">`;

      if (condition.type === 'charity') {
        const position = condition.socialIssue.position;
        const signCopy = this.positionStatements[position].for_statement.replace("FOR ", "");
        out += `<div class="protest-sign"><div><span class="protest-sign-position">FOR</span> ${signCopy}</div></div>`;
      }
      else if (condition.type === 'anti-charity') {
        const position = condition.socialIssue.position;
        const signCopy = this.positionStatements[position].against_statement.replace("AGAINST ", "");
        out += `<div class="protest-sign"><div><span class="protest-sign-position">AGAINST</span> ${signCopy}</div></div>`;
      }

      out += `</div>`;
      return out
    },
    data: { 
      cue: true,
      beginTrial: true, 
      point_value: () => pointsTracker.getCurrentValue() 
    },
    response_ends_trial: false,
    trial_duration: 1650
  }

  fixation = {
    type: "html-keyboard-response",
    stimulus: '<div style="font-size: 60px;">+</div>',
    response_ends_trial: false,
    data: {fixation: true},
    trial_duration: function() { 
      return randomFromInterval(2000, 2500) 
    },
    on_start: function(data) {
      keyLogger.keyLog = []
      document.addEventListener("keyup", keyLogger.logger)
    },
    on_finish: function(data) {
      data.presentation_duration = this.trial_duration
    }
  }

  target = {
    type: "html-keyboard-response",
    stimulus: '<div style="display: block; height: 80px; width: 80px; background: #666; border-radius: 50%;"></div>',
    choices: ['Enter', 'Space'],
    data: {target: true},
    trial_duration: function() { return staircase.getValue() },
    on_finish: function(data) {
      data.presentation_duration = this.trial_duration
      data.hit = data.rt ? true : false
      staircase.addResponse(data.hit)
      data.point_value = pointsTracker.getCurrentValue()
    }
  }

  blank1 = {
    type: "html-keyboard-response",
    stimulus: '<div></div>',
    response_ends_trial: false,
    trial_duration: function() { 
      return randomFromInterval(1500, 3000) 
    },
    data: {blank1: true},
    on_finish: function(data) {
      data.presentation_duration = this.trial_duration
      data.keylog = keyLogger.keyLog
      document.removeEventListener("keyup", keyLogger.logger)
    }
  }

  blank2 = {
    type: "html-keyboard-response",
    stimulus: '<div></div>',
    response_ends_trial: false,
    trial_duration: function() { 
      return randomFromInterval(1500, 3000) 
    },
    data: {blank2: true},
    on_finish: function(data) {
      data.presentation_duration = this.trial_duration
    }
  }

  feedback1 = {
    type: "html-keyboard-response",
    stimulus: () => {
      const targetData = JSON.parse(
        jsPsych.data.getLastTimelineData().filter({target: true}).json()
      ).pop();

      // increment if hit (decrement if anti-charity)
      const incr = ( (targetData.hit && !this.isAnti) || (!targetData.hit && this.isAnti))
      pointsTracker.setNextValue(incr)

      const sign = incr ? '+' : '-';
      const message = targetData.hit ? "WIN!" : "LOSE";
      const pointVal = targetData.point_value;
      return (
        `<div class="feedback">` +
          `<div class="feedback-message">${message}</div>` +
          `<div class="feedback-points">${sign} ${pointVal}</div>` +
        `</div>`
      )
    },
    data: { feedback1: true },
    response_ends_trial: false,
    trial_duration: 2000
  }

  constructor(props) {
    super(props)
    this.isAnti = props.condition.type === "anti-charity"

    if (props.condition.socialIssue) {
      this.selectedIssue = issues.filter(iss => iss.title === props.condition.socialIssue.name)[0];
      this.positionStatements = this.selectedIssue.position_statements;
    }
    
    staircase = new DbStaircase({
      firstVal: props.starting_duration,
      down: 2,
      stepSizes: [2, 2, 1]
    })
  }

  getIconClass() {
    let iconClass = this.props.condition.type
    iconClass += this.props.condition.socialIssue ? 
      ` ${this.props.condition.socialIssue.name}  ${this.props.condition.socialIssue.position}`
      : ''
    return iconClass  
  }

  getTimeline() {
    // const { block } = this.props.condition;
    console.log('block: ', this.props);

      const timeline = []

      this.instructions.type = this.props.initialBlock ? 'fullscreen' : 'html-keyboard-response'
      if (DISABLE_FULLSCREEN) {this.instructions.type = 'html-keyboard-response'}
      this.instructions.fullscreen_mode = this.props.initialBlock ? true : false

      timeline.push(this.instructions)
      if (this.props.condition.assessment) {
        timeline.push(this.preMAQ1);
        timeline.push(this.preMAQ2);
      }
      

      // timeline.push(this.midEA);
      const midEA = {
        timeline: [
          this.midEAQintro,
          this.midEAQ1,
          this.midEAQ2,
          this.midEAQ3,
          this.midEAQ4,
          this.midEAQ5,
          this.midEAQ6,
          this.midEAQ7,
          this.midEAQ8,
          this.midEAQ9,
          this.midEAQ10,
          this.midEAQ11,
          this.midEAQ12,
        ]
      }
      const test_procedure = {
        timeline: [
          this.cue,
          this.fixation,
          this.target,
          this.blank1,
          this.feedback1,
          this.blank2
        ],
        repetitions: NUM_TRIALS
      }
      const endHA = {
        timeline: [
          this.endHAQintro,
          this.endHAQ1,
          this.endHAQ2,
          this.endHAQ3,
          this.endHAQ4,
          this.endHAQ5,
          this.endHAQ6,
          this.endHAQ7,
          this.endHAQ8,
          this.endHAQ9,
          this.endHAQ10
        ]
      }

      if (this.props.condition.assessment) {
        const testProc1 = {...test_procedure};
        const reps = testProc1.repetitions;

        let newIndex = Math.floor(reps/2);
        if ( newIndex > 8 ) {
          newIndex += randomFromInterval(-3, 4);
        }
        testProc1.repetitions = newIndex;
        timeline.push(testProc1);

        timeline.push(midEA);

        const testProc2 = {...test_procedure};
        testProc2.repetitions = NUM_TRIALS - newIndex;
        timeline.push(testProc2);

        timeline.push(endHA);
      }
      else {
        timeline.push(test_procedure);
      }

      

      if (this.props.finalBlock) {
        if (!DISABLE_FULLSCREEN) {
          timeline.push({
            type: 'fullscreen',
            fullscreen_mode: false
          })
        }
      }

      return timeline
  }

  render() {
    if (this.state.showResults) {
      return <pre>{JSON.stringify(this.state.results, null, 2)}</pre>
    }

    return (
        <div id="jspsych-experiment"
          ref={(exp) => { this.experiment = exp }}
        >
          Experiment here
        </div>
    )
  }

  initExperiment() {
    keyLogger = new KeyLogger()
    pointsTracker = new PointsTracker()
    this.isAnti = this.props.condition.type === "anti-charity"

    if (this.props.condition.socialIssue) {
      this.selectedIssue = issues.filter(iss => iss.title === this.props.condition.socialIssue.name)[0];
      this.positionStatements = this.selectedIssue.position_statements;
    }
    

    this.setState({ results: {} })
    staircase = new DbStaircase({
      firstVal: this.props.starting_duration,
      down: 2,
      stepSizes: [2, 2, 1]
    })

    jsPsych.init({
      timeline: this.getTimeline(),
      on_finish: this.onExperimentFinish.bind(this),
      display_element: 'jspsych-experiment'
    })
    this.experiment.focus()
  }

  componentDidMount() {
      this.initExperiment()
  }

  componentDidUpdate(prevProps) {
    if (this.props.condition !== prevProps.condition) {
      this.initExperiment()
    }
  }

  onExperimentFinish() {
      const trialData = JSON.parse(
          jsPsych.data.get().json()
      )
      const data = this.collectTrials(trialData);
      const results = {
        points: pointsTracker.currentTotal,
        point_values: pointsTracker.values.splice(0, pointsTracker.values.length - 1),
        final_duration: data[data.length - 1].target_presentation_duration,
        data: data,
        assessments: this.collectAssessments(trialData),
        success_rate: data.filter(trial => trial.hit).length / data.length
      }


      this.setState({ results })

      this.props.onBlockFinish(results)
  }

  collectAssessments(trialData) {
    const assessments = {};
    trialData.forEach( (trialPart) => {
      [
        'preMAQ1',
        'preMAQ2',
        'midEAQ1',
        'midEAQ2',
        'midEAQ3',
        'midEAQ4',
        'midEAQ5',
        'midEAQ6',
        'midEAQ7',
        'midEAQ8',
        'midEAQ9',
        'midEAQ10',
        'midEAQ11',
        'midEAQ12',
        'endHAQ1',
        'endHAQ2',
        'endHAQ3',
        'endHAQ4',
        'endHAQ5',
        'endHAQ6',
        'endHAQ7',
        'endHAQ8',
        'endHAQ9',
        'endHAQ10'
      ].forEach((n) => {
        if (trialPart[n]) {
          assessments[`${n}_time_elapsed`] = trialPart.time_elapsed;
          assessments[`${n}_response`] = trialPart.response;
        }
      })

    });
    return assessments;
  }

  collectTrials(trialData) {
    const trials = []
    let currentTrial = null
    let trialIndex = 1
    trialData.forEach( (trialPart) => {
        delete trialPart.stimulus

        if (trialPart.beginTrial) {
            if (currentTrial) {
                trials.push(currentTrial)
            }
            currentTrial = {index: trialIndex++}
        }

        [
          'cue',
          'fixation',
          'target',
          'blank1',
          'feedback1',
          'blank2'
        ].forEach((n) => {
          if (trialPart[n]) {
            currentTrial[`${n}_time_elapsed`] = trialPart.time_elapsed
          }
        })

        

        if (trialPart.fixation) {
          currentTrial.responded_early = trialPart.rt || false
        }

        if (trialPart.target) {
          currentTrial.hit = trialPart.hit
          currentTrial.rt = trialPart.rt
          currentTrial.target_presentation_duration = trialPart.presentation_duration
        }

        if (trialPart.blank1) {
          currentTrial.responded_late = trialPart.rt || false
          currentTrial.suspect_cheating = ( trialPart.keylog.length > 2)
          currentTrial.num_responses = trialPart.keylog.length
        }

        if (trialPart.point_value) {
          currentTrial.point_value = trialPart.point_value
        }
    })
    trials.push(currentTrial)
    return trials
  }

  // pointsArrow(direction, pointVal) {
  //   const height = 20 + Math.floor((pointVal/1000) * 100);
  //   let arrow = `<div class="feedback-arrow" style="height: ${height}px">`;
  //   if (direction === 'up') {
  //     arrow += `<div class="arrowhead-up"></div>`;
  //     arrow += `<div class="arrowshaft"></div>`;
  //   }
  //   else {
  //     arrow += `<div class="arrowshaft"></div>`;
  //     arrow += `<div class="arrowhead-down"></div>`;
  //   }
  //   arrow += `</div>`;
  //   return arrow;
  // }

}

export default ExperimentBlock