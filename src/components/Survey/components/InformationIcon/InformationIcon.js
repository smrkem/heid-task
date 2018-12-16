import React from 'react'
import informationIcon from './information_blue.svg'

const InformationIcon = (props) => (
  <div 
    className="information-icon"
    onClick={props.onClick}
    >
      <img src={informationIcon} alt="info" />
  </div>
)

export default InformationIcon