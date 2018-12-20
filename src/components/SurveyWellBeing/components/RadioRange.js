import React from 'react'


const RadioRange = (props) => {
  const {
    rangeMin,
    currentValue,
    rangeMax,
    handleRadioChange,
    name,
    reversed
  } = props;

  let options = [];
  if (reversed) {
    for (let n=rangeMax; n >= rangeMin; n--) {
      options.push(n.toString());
    }
  }
  else {
    for (let n=rangeMin; n <= rangeMax; n++) {
      options.push(n.toString());
    }
  }

  return (
    <div className="radioRange">
      <ul>
          {
            options.map(o => (
                <li key={o} className="form-check">
                  <input className="form-check-input"
                      type="radio"
                      name={name}
                      id={`${name}-${o}`}
                      value={o}
                      checked={currentValue===o}
                      onChange={handleRadioChange}
                      />
                  <label htmlFor={`${name}-${o}`} className="form-check-label">
                    {o}
                  </label>
                </li>
            ))
          }
      </ul>
    </div>
  );
}

export default RadioRange