import React from 'react'
import { shuffle, conditionCopy } from '../../utils'
import ExperimentBlock from '../ExperimentBlock/ExperimentBlock'

class ExperimentManager extends React.Component {
  state = {
    blocks: [],
    blockIndex: 0
  }
  constructor(props) {
      super(props)

      // create blocks here. need 8 total randomized. 2 self, 2 game, 2 anti-charity and 2 charity
      // no 2 categories should ever repeat
      this.state.blocks = this.randomizeBlocks()

      this.showNextBlock = this.showNextBlock.bind(this)
      this.updateBlock = this.updateBlock.bind(this)
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
    
    // return blocks.splice(0,2)
    return blocks
  }

  updateBlock(blockData) {
    let blocks = this.state.blocks.slice()
    blocks[this.state.blockIndex] = {
      ...this.state.blocks[this.state.blockIndex],
      final_points: blockData.points,
      block_trial_data: blockData.data
    }
    delete blocks[this.state.blockIndex].condition.copy

    this.setState({ blocks })
    this.showNextBlock()
  }

  showNextBlock() {
    if (this.state.blockIndex === this.state.blocks.length - 1) {
      // Showing last block. No more to show.
      this.props.advanceStep(this.state.blocks)
    }
    else {
      this.setState({
        blockIndex: this.state.blockIndex + 1
      })
    }
  }

    render() {
        return (
            <div id="exp-manager">
              <ExperimentBlock 
                {...this.state.blocks[this.state.blockIndex] } 
                onBlockFinish={this.updateBlock}
                />
            </div>
        )
    }
}

export default ExperimentManager
