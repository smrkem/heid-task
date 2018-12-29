import React from 'react'


const ProgressBar = (props) => {
  const {sections} = props;
  return (
    <div className="ProgressBar">
      {sections.map(({
        label,
        active,
        completed
      }) => {
        let className = active ? "active" : "";
        className += completed ? " completed" : "";

        return (
          <section 
            key={label} 
            className={className}
            >
            {label}
          </section>
        )
      })}
    </div>
  )
}

export default ProgressBar
