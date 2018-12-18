import React from 'react'

const Welcome = (props) => {
  const {finishStep} = props;
  return (
    <div className="inner-copy">
      <h1>Wellbeing and Depression Questionnaires</h1>
      <p>In the next section, you will be asked to complete 5 questionnaires measuring your levels of wellbeing and depression. Please respond as truthfully and accurately as you can, and also please remember that these are very subjective questions and that there are no right or wrong answers.</p>
      <button
        onClick={finishStep}
        className="btn btn-large btn-primary"
        >
        Next</button>
    </div>
  );
}

export default Welcome
