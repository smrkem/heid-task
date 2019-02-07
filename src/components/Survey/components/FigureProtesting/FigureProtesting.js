import React from 'react';
import imgSrc from './protestor.png';

const FigureProtesting = (props) => {
  return (
    <div className={`figure_protesting ${props.classNames}`}>
      <div className="figure_protesting_banner">
        <span dangerouslySetInnerHTML={{ __html: props.banner}}></span>
      </div>
      <img src={imgSrc} alt="Figure Protesting" />
    </div>
  )
}

export default FigureProtesting