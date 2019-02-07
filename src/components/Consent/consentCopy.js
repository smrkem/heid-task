import React from 'react';
import logoSrc from './university-of-toronto-logo.png';

const getConsentCopy = () => {
  return (
      <div id="copyWindow" className="consent-copy">
        <div className="">
          <img src={logoSrc} alt="University Of Toronto logo" />
        </div>
        <h2>Informed Consent Form</h2>
        <p>
          <span className="bold">Purpose of Experiment: </span>
          to explore the emotional and motivational effects of working towards money for the self and social causes.
        </p>
        <p>
          <span className="bold">Expected Time Requirement: </span>
          1-hour session.
        </p>
        <p>
          <span className="bold">Procedure of Experiment: </span>
          the experiment will be as follows:
        </p>
        <div>
          <ol>
            <li>I will fill in some questionnaires on depression and wellbeing (6 minutes);</li>
            <li>I will complete a Social Values Task involving the selection of a social issue that is viewed as personally meaningful and important to me (10 minutes);</li>
            <li>
              I will complete a reward task (44 minutes) wherein I will be working towards hitting a target within a narrow window of time to win additional money (up to 225 USD in total) for:
              <ol type="a">
                <li><b>Self:</b> Winning 75 USD for yourself that you can spend on anything you like.</li>
                <li><b>Charity:</b> Winning 75 USD to donate to a charity that fights for a social issue you believe in (e.g., marriage equality, gun rights).</li>
                <li><b>Anti-Charity:</b> Avoid donating money for a social cause that is antithetic to your beliefs.</li>
              </ol>
              For instance, if I believe in stem cell research, then I am fighting to win 75 USD for myself, 75 USD for a charity that donates to stem cell research, AND fighting to NOT donate 75 USD to a charity that is trying to abolish stem cell research (if I lose the anti-charity trials of this task, I will be forced to donate 75 USD to this cause). This will be explained in greater detail during the task.
            </li>
            <li>During both the Social Values Task and reward task, I will be answering questions on my current emotional state and motivation.</li>
          </ol>
        </div>

        <p>
          <span className="bold">Results of Experiment: </span>
          I understand that the investigator intends to analyze and publish the results of this study. Should I wish to receive a copy of the results I will add my e-mail address to sign-up provided at the end of the study.
        </p>

        <p>
          <span className="bold">Possible Benefits: </span>
          Some benefits I may expect to receive from participating in this study are:
        </p>
        <div>
          <ol>
            <li>momentary increases in positive emotions and positive mood;</li>
            <li>satisfaction from entering a weekly competition wherein the top 10 participants with the greatest score for each condition (i.e., self, charity, anti-charity) will win 75 USD. As such, if you are in the top 10 participants for the Charity condition, you will win 75 USD to donate to your charity of choice, based on the social issue you selected as important. If you are in the top 10 participants in the Self condition, you will win 75 USD for yourself as pocket money (sent to your MTurk account).</li>
            <li>an opportunity to contribute to scientific research on emotions and affective neuroscience.</li>
          </ol>
        </div>
        <p>
          <span className="bold">Possible Risks: </span>
          While the tasks may be stressful in the moment, the researchers do not foresee any long-term risks to me for participating in this study. If I do experience feelings of discomfort at any point during the study, I recognize that I am free to refrain from answering any question, or withdraw from the study at any time, without penalty, and will still receive credit for my participation regardless of my completion of the study.
        </p>
        <p>
          <span className="bold">Confidentiality and Anonymity: </span>
          I understand that all of the data collected will remain strictly confidential. Only people associated with the study will have confidential access to my data, <b>including the research ethics program of the University of Toronto that may request access to study data to help ensure participant protection procedures are followed.</b> This consent form will be stored separately, and my responses will not be associated with my name; instead, my name will be converted to a code number when the researchers store the data. I understand that my de-identified responses will be shared on the Open Science Framework ( <a href="https://osf.io/" target="_blank" rel="noopener noreferrer">https://osf.io/</a> ).
        </p>
        <p>
          <span className="bold">Limits to Confidentiality: </span>
          I understand that there are regular legal limitations to confidentiality. I understand that confidentiality is limited upon disclosure of plans to harm myself or others, or in the case of a demand to testify in court proceedings. I understand that the information collected in this study is not expected to lead to these conditions.
        </p>
        <p>
          <span className="bold">Voluntary Participation and Withdrawal: </span>
          I understand that my participation is entirely voluntary, that I may withdraw at any time during the study. Upon my withdrawal any responses collected from me will be destroyed. I understand that there are no undesirable consequences for withdrawing.
        </p>
        <p>
          <span className="bold">Limitations to Withdrawal: </span>
          I understand that after completing the study I will no longer be able to withdraw as my responses will not be linked with my identity, that is, my responses will be anonymous. To withdraw I must do so before completing the study. I understand that I will have my last opportunity to withdraw made clear to me just prior to the end of the study.
        </p>
        <p>
          <span className="bold">Questions: </span>
          I understand that I may e-mail questions to the primary investigator, Le-Anh Dinh-Williams, a PhD student at the University of Toronto. I understand that concerns may also be addressed to the investigator’s supervisor or to the University's Office of Research Ethics:
        </p>
        <p>
          <span className="bold">Study e-mail: </span> eudaimonic.reward@gmail.com<br />
          Investigator: Lê-Anh Dinh-Williams, e-mail: leanh.dinh.williams@mail.utoronto.ca<br />
          Investigator’s Supervisor: Professor Norman Farb, e-mail: norman.farb@utoronto.ca<br />
          Office of Research Ethics: e-mail: ethics.review@utoronto.ca or tel: 416-946-3273
        </p>

        <p>
          Upon completion of my participation, I will receive a full written explanation about the rationale and predictions underlying this experiment. 
        </p>
      </div>
  )
}

export {
  getConsentCopy
}