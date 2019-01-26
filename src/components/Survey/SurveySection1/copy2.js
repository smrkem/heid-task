import React from 'react'
import informationIcon from '../components/InformationIcon/information_blue.svg'


const Copy2 = () => (
  <div>
    <h2 className="sec1-inner-h2">Social Values Task - Section I</h2>      
    <p>
    In this section, you will be presented with a short description of 20 controversial social issues.
    </p>
    <div>
      <p>
        <b>Your Task:</b><br />
        Indicate how important each social issue is to you and what you believe in by clicking on one of three possible boxes:
      </p>
      <p>
        <b>&#x25cb; Not Important to Me</b><br />
        <b>&#x25cb; Somewhat Important to Me</b><br />
        <b>&#x25cb; Important to Me</b>
      </p>
    </div>

    <p>
    If you wish for more information on the social issue presented, please click the 
    &nbsp;
    <img src={informationIcon} alt="information icon" height="20" width="20" style={{verticalAlign: 'text-bottom'}} />
    &nbsp;
     icon presented with each social issue (in the top right corner).
    </p>
  </div>
)

export default Copy2
