import React from 'react'
import informationIcon from '../components/InformationIcon/information_blue.svg'

const Copy1 = () => (
<div>
  <h2 className="sec1-inner-h2">Social Values Task - Section II</h2>      
  <p>
    The social issues that were categorized as important will be presented again.
  </p>
  <p>
    This time, you will be asked to select your top three social issues.
  </p>
    
  <div>
    <p>
      <b>Your Task:</b>
    </p>
    <ul>
      <li>Categorize each social issue as either <b>Most Important to Me</b> or <b>Less Important to Me</b> by dragging and dropping them in the appropriate box.</li>
      <li>You can have no more than 3 cards and no less than 1 card  in the <b>Most Important Box</b>.</li>
      <li>You can drag items between the <b>Most Important to Me</b> and the <b>Less Important to Me</b> boxes.</li>
    </ul>
  </div>

  <p>
  If you wish for more information on the social issue presented, please click the 
  &nbsp;
    <img src={informationIcon} alt="information icon" height="20" width="20" style={{verticalAlign: 'text-bottom'}} />
    &nbsp;
  button presented with each social issue.
  </p>
</div>
)

export default Copy1
