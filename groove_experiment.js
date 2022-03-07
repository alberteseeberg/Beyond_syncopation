var timeline = [];


var instructions = {
  type: jsPsychInstructions,
  pages: ['<p><b>Welcome!</b></p> This is an experiment investigating your perception of groove. </p>' +
   '<p>We kindly ask you to sit in <b>quiet surroundings</b> for the duration of this experiment as you will be listening to music.</p>' +
   '<p>You can use both headphones or loudspeakers, depending on your preference. </p>' +
   '<p><b>The browser will automatically record if you leave this window during the experiment</b>.</p>'+
   '<p>For the next 20 minutes, you will listen to various drum-breaks. </p>' +
   '<p>After each drum-break you will be asked to rate your experience of <b> pleasure </b> and <b> wanting to move </b> to the music </p>' +
   '<p>First, you will be asked some questions about demographics, your musical expertise and your sound setup</p>'+
   '<p>After this you will have a test trial, so you can adjust the sound volume to your preference</p>'+
   "<p>By continuing, you confirm that you have read and understood the <a href='Participant Information_NH.pdf'target='_blank'>participant information sheet</a>.</p>"+
    '<p>Click the button below to begin.</p>'],
  allow_keys: false,
  show_clickable_nav: true
}
// add this node to the timeline
timeline.push(instructions);

var soundcheck_nb = test_stimuli_array[0]
console.log(soundcheck_nb)

var preload = {
  type: jsPsychPreload,
  sound_files: ['audio/1.wav','audio/2.wav','audio/3.wav','audio/4.wav','audio/5.wav','audio/6.wav','audio/7.wav','audio/8.wav','audio/9.wav','audio/10.wav', 'audio/11.wav', 'audio/12.wav']
}
timeline.push(preload);

var calibrate = {
  type: jsPsychAudioButtonResponse,
  stimulus: 'audio/1.wav',
  prompt:
    "<h4><strong>Quick sound check</strong></h4>" +
    "<p class='gap-above'>Please adjust the volume of your device to a comfortable level where you can clearly hear the sounds. Then click 'Continue!' above.</p>" +
    "<p class='gap-above'>..........</p>" +
    "<p class='font15'>If the experiment fails to load, or you cannot hear the sounds despite having turned up the volume, close the window and open it in a different browser, e.g., Chrome, Firefox or Edge.</p>",
  choices: ["<p class='font15'><strong>Play sound again</strong></p>", "<p class='font15'><strong>Volume is comfortable now.</strong></p>" +
    "<p class='font20'><strong> Continue!</strong></p>"],
  margin_vertical: '2px'
};

loop_calibrate = {
  timeline: [calibrate],
  loop_function: function (data) {
    if (data.values()[0].button_pressed == 0) {
      return true;
    } else {
      return false;
    }
  }
};


timeline.push(loop_calibrate);

// enter fullscreen
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true
});


var sound_files = [
  {sound: 'audio/1.wav'},
  {sound: 'audio/2.wav'},
  {sound: 'audio/3.wav'},
  {sound: 'audio/4.wav'},
  {sound: 'audio/5.wav'},
  {sound: 'audio/6.wav'},
  {sound: 'audio/7.wav'},
  {sound: 'audio/8.wav'},
  {sound: 'audio/9.wav'},
  {sound: 'audio/10.wav'},
  {sound: 'audio/11.wav'},
  {sound: 'audio/12.wav'},   
]

var audio_trial = {
  type: jsPsychAudioButtonResponse,
  stimulus: jsPsych.timelineVariable('sound'),
  choices:jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  randomize_order: true
}

var likert_scale = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7"
];


var response_trial = {
  type: jsPsychSurveyLikert,
  questions: [
    {prompt: '<p>How much pleasure did you experience from listening to this drum-break?</p>', name: 'Pleasure', labels: likert_scale},
    {prompt: '<p>How much did this drum-break make you want to move?</p>', name: 'Wanting to move', labels: likert_scale},
  ]
};

var procedure = {
  timeline: [audio_trial, response_trial],
  timeline_variables: sound_files
}

timeline.push(procedure)

// create thank-you node
var thanks = {
  type: jsPsychInstructions,
  pages: ['<p>Thank you very much for participating!'],
  allow_keys: false,
  show_clickable_nav: true,
  on_load: function () {
    saveData(subject_id + '_browserinteraction_data_rep.csv', jsPsych.data.getInteractionData().csv())
    saveData(subject_id + '_inhibition_data_rep.csv', jsPsych.data.get().csv()); 
  }
}
// add this node to the timeline
timeline.push(thanks);

// saving data
function saveData(name, data){
    var url = 'record_result.php';
    var data = {filename: name, filedata: data};
  
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
              'Content-Type': 'application/json'
      })
    });
}

// add data properties
jsPsych.data.addProperties({start_time: (new Date()).toISOString()});
// this is for allocating participant numbers
//var participant_id = jsPsych.data.getURLVariable('participant');
var subject_id = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({participant: subject_id});
// add properties from prolific
var prol_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
    prol_id: prol_id,
    study_id: study_id,
    session_id: session_id,
  });

// when all nodes have been added to the timeline, initiate the experiment
jsPsych.init({
    timeline: timeline,
    on_interaction_data_update: function (data) {
      console.log(data);
      saveData(subject_id + '_browserinteraction_data.csv', jsPsych.data.getInteractionData().csv())
    },
    on_finish: function() {
    console.log(jsPsych.data.get().csv());
     window.location = 'https://github.com/alberteseeberg'
    }
});
