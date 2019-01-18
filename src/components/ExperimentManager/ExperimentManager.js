import React from 'react'
import { shuffle, conditionCopy, randomFromInterval } from '../../utils'
import ExperimentBlock from '../ExperimentBlock/ExperimentBlock'


class ExperimentManager extends React.Component {
  state = {
    blocks: [],
    blockIndex: 0
  }
  
  constructor(props) {
      super(props)

      this.state.blocks = this.randomizeBlocks()


      // DEBUG
      // const type = "self";
      // const type = "game";
      // const type = "charity";
      // const type = "anti-charity";

      // const issue = {
      //   name: "Mandatory Child Vaccinations",
      //   position: "for"
      // } 
      // this.state.blocks[0].condition = {
      //   copy: conditionCopy(type, issue),
      //   socialIssue: issue,
      //   type: type,
      //   assessment: true
      // }
      // this.state.blocks[1].condition = {
      //   assessment: true,
      //   copy: conditionCopy("anti-charity", issue),
      //   socialIssue: issue,
      //   type: "anti-charity"
      // }


      this.showNextBlock = this.showNextBlock.bind(this)
      this.updateBlock = this.updateBlock.bind(this)
  }

  // create blocks here. need 8 total randomized. 2 self, 2 game, 2 anti-charity and 2 charity
  // no 2 categories should ever repeat
  randomizeBlocks() {
    let conditions = shuffle(['self', 'anti-charity', 'charity', 'game'])
    let newConditions = shuffle(['self', 'anti-charity', 'charity', 'game'])
    while (newConditions[0] === conditions[conditions.length - 1]) {
      newConditions = shuffle(['self', 'anti-charity', 'charity', 'game'])
    }
    conditions = conditions.concat(newConditions)


    let blocks = []
    let counts = {
      'charity': 0,
      'anti-charity': 0,
      'self': 0,
      'game': 0,
    }

    conditions.forEach(c => {
      let condition = {
        socialIssue: ["charity", "anti-charity"].includes(c) ?
          this.props.socialIssue :
          null,
        type: c,
        copy: conditionCopy(c, this.props.socialIssue)
      }

      if (counts[c] === 1) {
        condition.assessment = true;
      }
      else if (counts[c] !== 'complete' && 
        randomFromInterval(1, 3) % 2 === 0) {
        condition.assessment = true;
        counts[c] = 'complete';  
      }

      if (counts[c] !== 'complete') {
        counts[c]++;
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
      final_duration: blockData.final_duration,
      final_points: blockData.points,
      block_trial_data: blockData.data,
      block_assessment_data: blockData.assessments,
      success_rate: blockData.success_rate
    }
    delete blocks[this.state.blockIndex].condition.copy
    
    if (this.state.blockIndex < this.state.blocks.length - 1) {
      blocks[this.state.blockIndex + 1].starting_duration = blockData.final_duration
    }

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
      console.log('blocks:', this.state.blocks);
        return (
            <div id="exp-manager">
              <ExperimentBlock 
                {...this.state.blocks[this.state.blockIndex] } 
                onBlockFinish={this.updateBlock}
                initialBlock={this.state.blockIndex === 0}
                finalBlock={this.state.blockIndex === this.state.blocks.length - 1}
                />
            </div>
        )
    }
}

export default ExperimentManager
