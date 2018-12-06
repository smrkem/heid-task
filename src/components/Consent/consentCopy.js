import React from 'react'

const getConsentCopy = () => {
  return (
      <div id="copyWindow" className="consent-copy">
        <p>
          <span className="bold">Purpose of Experiment: </span>
          to validate the following survey as a measure of your social and political beliefs.
        </p>
        <p>
          <span className="bold">Procedure of Experiment: </span>
          the experiment will be as follows:<br />
          1) Wellbeing Measures (~5 minutes)<br />
          2) Social Values Task<br />
          3) Hedonic and Eudaimonic Incentive Delay Task<br />
        </p>
        <p>
          <span className="bold">Results of Experiment: </span>
          I understand that the investigator <span className="bold">DOES NOT</span> intend to analyze and publish the results of this study. The purpose of this study is to validate this survey as a measure to be used in future neuroimaging research and is not intended for publication. Should I wish to receive a copy of the results I will provide my e-mail address when prompted at the end of the study.
        </p>
        <p>
          <span className="bold">Possible Benefits: </span>
          Some benefits I may expect to receive from participating in this study are:<br />
          1) knowledge that there are researchers interested in my social and political beliefs.<br />
          2) contributing to affective neuroscience and the study of positive emotions by helping to validate a novel neuroimaging task.<br />
        </p>
        <p>
          <span className="bold">Possible Risks: </span>
          The researchers have taken precautions to mitigate any risks involved in participating in this study. Questions will ask about your beliefs on a number of divisive social issues, which could elicit some anxiety related to sharing an opinion that is controversial. I understand that my responses are kept confidential and there will be no identifying information associated with my answers; as such, there will be no way to connect your responses with your identiy. I understand that I may take a break and/or withdraw from the study with no penalty. I understand that if I have concerns I can speak to the lead investigators of this study.
        </p>
        <p>
          <span className="bold">Confidentiality and Anonymity: </span>
          I understand that all of the data collected are anonymous at collection and will remain anonymous. I understand that I will not provide any personally identifying information nor will my responses be associated with such information.
        </p>
        <div>
          <span className="bold">Voluntary Participation, Withdrawal, and Limitations to Withdrawal: </span>
          I understand the following:
          <ul>
            <li>My participation is entirely voluntary, I can choose to leave questions blank rather than answer them, if I change my mind about participating I may withdraw my responses at the end of the study.</li>
            <li>I will have my opportunity to withdraw made clear to me just prior to the end of the study; upon my withdrawal any responses collected from me will be destroyed, there are no undesirable consequences for withdrawing.</li>
            <li>After completing the study I will no longer be able to withdraw as my responses will not be linked with my identity, my responses are anonymous. </li>
            <li>To withdraw I must do so when prompted during the debriefing page at the end of the study; closing an incomplete survey will not withdraw my responses.</li>
          </ul>
        </div>
        <p>
          <span className="bold">Questions: </span>
          I understand that I may e-mail questions to the primary investigator, Lê-Anh Dinh-Williams, a PhD student at the University of Toronto and that concerns may also be addressed to the investigator’s supervisor or to the University's Office of Research Ethics:
        </p>
        <p>
          <span className="bold">Study e-mail: </span> themindfulawarenesslab@gmail.com<br />
          Investigator: Lê-Anh Dinh-Williams, e-mail: leanh.dinh.williams@mail.utoronto.ca
        </p>
        <p>
          Investigator’s Supervisor: Professor Norman Farb, e-mail: norman.farb@utoronto.ca<br />
          Office of Research Ethics: e-mail: ethics.review@utoronto.ca or tel: 416-9463273
        </p>
      </div>
  )
}

export {
  getConsentCopy
}