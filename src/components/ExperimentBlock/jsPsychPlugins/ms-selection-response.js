const jsPsych = window.jsPsych;


jsPsych.plugins['ms-selection-response'] = (function(){
  var plugin = {};

  plugin.info = {
    name: 'ms-selection-response',
    description: '',
    parameters: {
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Question text.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {
    var response = {
      rt: null,
      selection: 3,
    };
    var new_html = '<div id="ms-selection-response-stimulus">' + trial.prompt + '</div>';
    new_html += '<div id="ms-selection-response-prompt">';
    new_html += `
    <div class="numbered-scale">
      <div class="grid-line"></div>
      <div class="items">
        <div>
          <span>${trial.labels[0]}</span>
          <span id="response_1" class="numbered-scale-tick" >|</span>
        </div>
        <div>
          <span>${trial.labels[1]}</span>
          <span id="response_2" class="numbered-scale-tick" >|</span>
        </div>
        <div>
          <span>${trial.labels[2]}</span>
          <span id="response_3" class="numbered-scale-tick selected">|</span>
        </div>
        <div>
          <span>${trial.labels[3]}</span>
          <span id="response_4" class="numbered-scale-tick" >|</span>
        </div>
        <div>
          <span>${trial.labels[4]}</span>
          <span id="response_5" class="numbered-scale-tick" >|</span>
        </div>
      </div>
    </div>
  `;
    new_html += '<p>Press left or right arrows to move cursor and "Enter" to submit.</p></div>';

    // draw
    display_element.innerHTML = new_html;

    var drawSelection = function() {
      display_element.querySelector('.numbered-scale-tick.selected').className = 'numbered-scale-tick';
      display_element.querySelector(`.numbered-scale #response_${response.selection}`).className = 'numbered-scale-tick selected';
    }
    var increaseSelection = function() {
      if (response.selection === 5) {
        response.selection = 1;
      }
      else {
        response.selection++;
      }
      drawSelection();
    }
    var decreaseSelection = function() {
      if (response.selection === 1) {
        response.selection = 5;
      }
      else {
        response.selection--;
      }
      drawSelection();
    }

    var end_trial = function() {
      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
      // clear the display
      display_element.innerHTML = '';

      var trial_data = {
        "rt": response.rt,
        "selection": response.selection
      };

      jsPsych.finishTrial(trial_data);
    }

    var after_response = function(info) {
      if (info.key === 37) {
        decreaseSelection();
      }
      else if (info.key === 39) {
        increaseSelection();
      }
      else if (info.key === 13) {
        end_trial();
      }
    }
    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: ['Enter', 'leftarrow', 'rightarrow'],
      rt_method: 'date',
      persist: true,
      allow_held_key: false
    });

  }

  return plugin;
})();
