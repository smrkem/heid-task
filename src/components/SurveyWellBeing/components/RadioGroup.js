import React from 'react'


const RadioGroup = (props) => {
  const {
    options,
    currentValue,
    handleRadioChange,
    name,
    colCount,
    otherLabel
  } = props;

  const ulStyles = colCount ? {
    columnCount: colCount,
    columnGap: (colCount * 5) + 'px'
  } : {};

  return (
    <div>
      <ul style={ulStyles}>
          {
            options.map(option => (
                <li key={option.value} className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input"
                      type="radio"
                      name={name}
                      value={option.value}
                      checked={currentValue===option.value}
                      onChange={handleRadioChange}
                      />
                    {option.label}
                  </label>
                  { (option.value === 'other') && (
                    <div>
                      <input
                        type="text"
                        name={name + '_other'} 
                        value={props.other_value}
                        disabled={currentValue !== 'other'}
                        onChange={handleRadioChange}
                        />
                    </div>
                  )}
                </li>
            ))
          }
      </ul>
    </div>
  );
}

export default RadioGroup