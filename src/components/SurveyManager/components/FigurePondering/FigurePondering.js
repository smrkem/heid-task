import React from 'react'
import figurePondering from './figure_pondering.png'

const FigurePondering = (props) => {
  return (
    <div className={`figure_pondering ${props.classNames}`}>
      <img src={figurePondering} />
    </div>
  )
}

export default FigurePondering