import React from 'react';
import issues from '../Survey/Issues/Issues';
import './HEIDWelcome.css';
import img1src from './heid-welcome-1.png';
import img2src from './heid-welcome-2.png';
import img3src from './heid-welcome-3.png';

const HEIDWelcome = ({socialIssue, advanceStep}) => {
  // temp for dev work
  socialIssue = {
    name: "Abortion Laws",
    position: "for"
  }
  const selectedIssue = issues.filter(iss => iss.title === socialIssue.name)[0];
  const positionStatements = selectedIssue.position_statements[socialIssue.position];
  
  return (
    <div className="HEIDWelcome">
      <div>
        <h2 className="text-center">Welcome to the HEID Task!</h2>
        <p>
          <b>Estimated time: </b><br />
          40 minutes
        </p>
          
        <p>
          In the next task, you will be playing a game to increase your chances of winning money for yourself and the social issue you believe in.
        </p>
        <p>
          More specifically, you will have the opportunity to compete in a weekly competition to:
        </p>
        <ol>
          <li><b>WIN $75 USD for yourself</b> to spend on fun, relaxing activities, or anything of your choosing.</li>
          <li><b>WIN $75 USD that will be donated to a charity that is consistent with your beliefs</b> about {selectedIssue.title} and fights {positionStatements.for_statement}.</li>
          <li><b>AVOID LOSING and be forced to donate $75 USD to a charity that is opposed to your beliefs</b> about {selectedIssue.title} and fights {positionStatements.against_statement}.</li>
        </ol>
        <p><b>The winner of the weekly competition is the top scorer within each category (1-3). You will be informed by Monday of the following week if you have won!</b></p>

        <h3 className="underlined-heading">Specific Instructions:</h3>
        <p>
          <b>Your goal in each game round is to win as many points as possible. If you win a trial, you will win the point value of that trial; if you lose a trial, you will lose the point value of that trial. Each trial is worth a different amount of points.</b>
        </p>

        <p>
          At the start of each game round (8 total), you will be instructed on what you are fighting for, reminded of instructions, and asked to answer a few questions about how you are feeling. 
        </p>
        <p>
          Then, you will be presented with a number of trials where you will first view how many points you are fighting for, followed by a fixation cross (+) displayed at the center of the screen.
        </p>
        <p className="welcome-inner-image">
          <img src={img1src} alt="" />
        </p>
        <p>
          This fixation cross will then quickly and randomly change into the Grey Circle Target. Your goal is to press ENTER when you see this target as quickly as possible. <b>To win (or avoid losing)</b>, you need to press <b>ENTER</b> on your keyboard when the Grey Circle target appears and BEFORE it disappears. The grey circle target will remain on the screen for less than 250 milliseconds on average, so you will need to respond as quickly as you can. 
        </p>
        <p>
          Of note, <b>you cannot hit the ENTER key BEFORE seeing the target or multiple times</b>, this will result in points being removed from your total score. Hit the enter key only once you see the target.
        </p>
        <p>
          In addition, the faster you hit the target, the quicker you will finish this task! 
        </p>
        <p className="welcome-inner-image">
          <img src={img2src} alt="" />
        </p>
        <p>
          Following, you will see a money bag and arrow that will display whether you won or lost this trial, and by how much. A larger arrow upwards suggests a big win (smaller arrow upwards- small win) and a larger arrow downward suggest a big loss (smaller arrow downward - small loss). 
        </p>
        <p className="welcome-inner-image">
          <img src={img3src} alt="" />
        </p>
        <p>
          <b>You will complete a number of trials in a row where your goal is to win as many points as possible, and then move on to the next game round.</b>
        </p>
        <p>
          <button
            onClick={advanceStep}
            className="continue-btn btn btn-primary btn-lg">Continue</button>  
        </p>
        
      </div>
    </div>
  )
}

export default HEIDWelcome;
