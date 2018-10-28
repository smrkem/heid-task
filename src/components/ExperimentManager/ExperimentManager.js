import React from 'react'
import { shuffle } from '../../utils'
import ExperimentBlock from '../ExperimentBlock/ExperimentBlock'

function conditionCopy(c, cause) {
  const copy = {
    "game": [
      "In this block, you will be playing to play. If you win, you will win points and increase your total score for this block. If you lose, you will lose points and reduce your total score.",
      "Please take a few moments to think about why it is important for you to win."
      ],
    "charity": [
      `In this block, you will be fighting to win money ${cause}, a social issue you believe in. The more points you WIN, the more likely it is you will win money to donate to this cause.`,
      "Please take a few moments to think about why this cause is important to you."  
      ],
    "anti-charity": [
      `In this block, you will be fighting an organization that is ${cause}. If you do not win these trials, you are at risk of donating to an organization that goes against your beliefs.`,
      "Your goal is to WIN as many trials as possible. If you WIN the trial, points will be removed from this organization and you are LESS likely to donate money to this cause. If you LOSE, points will be added to this organization and you are MORE likely to donate money to this cause.",
      "Please take a few moments to think about why it is important that you do NOT donate money to this cause. "
      ],
    "self": [
      "In this block, you will be playing to win money for yourself, to spend money on something pleasant, enjoyable, and/or fun (e.g., food, entertainment, activities, shopping, vacation).",
      "If you win, you will win points and increase the likelihood of winning money for yourself. If you lose, you will lose points and reduce the likelihood of winning money for yourself.", 
      "Please take a few moments to think about what you would do with this money and why it is important for you to win."
    ]
  }
  return copy[c]
} 

class ExperimentManager extends React.Component {
  state = {
    blocks: [],
    blockIndex: 0
  }
  constructor(props) {
      super(props)

      // create blocks here. need 8 total randomized. 2 self, 2 game, 2 anti-charity and 2 charity
      // no 2 categories should ever repeat
      // console.log(props.socialIssue)
      this.state.blocks = this.randomizeBlocks()

      this.showNextBlock = this.showNextBlock.bind(this)
  }

  randomizeBlocks() {
    let conditions = shuffle(['self', 'anti-charity', 'charity', 'game'])
    let newConditions = shuffle(['self', 'anti-charity', 'charity', 'game'])
    while (newConditions[0] === conditions[conditions.length - 1]) {
      newConditions = shuffle(['self', 'anti-charity', 'charity', 'game'])
    }
    conditions = conditions.concat(newConditions)


    let blocks = []
    // Each condition has an icon and copy

    conditions.forEach(c => {
      let condition = {
        socialIssue: ["charity", "anti-charity"].includes(c) ?
          this.props.socialIssue :
          null,
        type: c,
        copy: conditionCopy(c, this.props.socialIssue)
      }
      blocks.push({ 
        starting_duration: this.props.starting_duration,
        condition: condition,
        final_duration: null,
        block_trial_data: {},
        final_points: 0
      })
    })
    return blocks
  }

    showNextBlock() {
        this.setState({
          blockIndex: this.state.blockIndex + 1
        })
    }

    render() {
      console.log('conditions', this.state.blocks)
        return (
            <div id="exp-manager">
              <ExperimentBlock {...this.state.blocks[this.state.blockIndex] } />
            </div>
        )
    }
}

export default ExperimentManager
