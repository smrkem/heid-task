import React from 'react'


const ProgressBar = (props) => {
  const {sections} = props;

  const onClick = (e) => {
    if (!e.target.className.includes('completed')) {
      return;
    }
    const index = parseInt(e.target.dataset.index);
  
    if (index === 1) {
      props.showDemographics();
    } else {
      props.showQuestionnaire(index - 2);
    }

  }
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
            data-index={label}
            onClick={(e) => onClick(e)}
            >
            {label}
          </section>
        )
      })}
    </div>
  )
}

export default ProgressBar
