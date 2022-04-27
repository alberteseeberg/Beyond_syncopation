/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_interaction_data_update: function (data) {
    console.log(data);
    saveData(subject_id + '_browserinteraction_data.csv', jsPsych.data.getInteractionData().csv())
  },
  on_finish: function() {
   console.log(jsPsych.data.get().csv());
   window.location = 'https://github.com/alberteseeberg'
  }
});

/* create timeline */
var timeline = [];

/* define welcome message trial */
var instructions = {
  type: jsPsychInstructions,
  pages: [
   '<h1><b>Welcome!</b></h1>'+
   '<p>This is an experiment investigating your perception of drum rhythms. </p>' +
   '<p>We kindly ask you to sit in a <b>quiet</b> room for the duration of this experiment so you can concentrate on listening to the rhythms. </p>' +
   '<p>Please use the best quality headphones that you have access to. For the next 20 minutes, you will listen to various drum rhythms.</p>'+
   '<p>After each rhythm you will be asked to rate the <b>complexity</b> and <b>naturalness</b> of the rhythm as well as your <b>experience of groove</b> </p>' +
   '<p>First, you will be asked some questions about your musical expertise and the quality of your headphones. </p>' +
   '<p>Then you will be able to adjust the sound volume to your preference before beginning the experiment.</p>'+
   '<p>During the experiment, to confirm that you are concentrating on the rhythms, </p>' +
   '<p> <b>the browser will automatically register whether you leave the experiment window. </b></p>'+
   '<p>In addition, there will be three nonsense questions throughout the experiment to confirm that you are reading the questions closely.  </p>'+
    "<p>By clicking 'Next', you confirm that you have read and understood the participant information found <a href='Participant Information_NH.pdf'target='_blank'>here</a>.</p>"+
    "<p>Click 'Next' to continue. </p>",
    '<h1><b>Instructions</b></h1>'+
    '<p>After each rhythm you will be asked to rate the <b>complexity</b> of the rhythm, that is, how predictable or unpredictable </p>' +
    '<p>each event in the rhythm is or how difficult it would be to dance to the rhythm.</p>' +
    '<p>You will also be asked to rate the <b>naturalness</b> of the rhythm, that is, how likely or plausible it is that a real</p>' +
    '<p>drummer might play this rhythm. </p>'+
    '<p>Finally, you will be asked to rate the degree of <b>groove</b> you experience while listening to the rhythm, that is, the degree </p>' +
    '<p>to which you experienced a pleasurable urge to move along to the rhythm. </p>' +
    '<p>It will be possible to see the definitions again, if you hold your mouse over <i> complex</i>, <i> natural</i>, or <i> groove</i> in a trial. </p>' +
    '<p>You will make each rating on a scale from 0 to 100, where 0 = none/not at all/strongly disagree and 100 = very much/strongly agree. </p>'+
    '<p>The order in which you do the ratings will change on each trial.</p>'+
     "<p>Click 'Next' to continue.</p>"
],
  allow_keys: false,
  show_clickable_nav: true
}
/* add this node to the timeline */
timeline.push(instructions);


/* preload audiofiles*/
var preload = {
  type: jsPsychPreload,
  sound_files: ['audio/GG_42_BD_SN_HH.mp3','audio/GOM_SN_BD_HH_Ver2.mp3','audio/GOM_SN_BD_Ver2.mp3','audio/GOM_SN_HH_Ver2.mp3','audio/GOM_SN_Ver2.mp3']
}
timeline.push(preload);

/*demographics trial*/
      
/*var sex_scale = ["Female", "Male", "Other", "Do not wish to inform"];
var age_scale = ["<20", "20-29", "30-39", "40-49","50-59", "60-69", "70-79", "80+", "Do not wish to inform"];

var demographics_1 = {
  type: jsPsychSurveyMultiChoice,
  preamble: "<h1>Demographic Questionnaire</h1>",
  questions: [	
    {prompt: "Sex", options: sex_scale, required: true},
    {prompt: "Age", options: age_scale, required: true}
  ],
  button_label: "Next",
}
timeline.push(demographics_1);

/**	demographics 2 includes text responses
This includes both short and long responses
to create a long response, increase the number of rows
**/

/*var demographics_2 = {
  type: jsPsychSurveyText,
  preamble: "<h1>Demographic Questionnaire</h1>",
  questions: [
    {prompt: "Country in which you spent the formative years of your childhood and youth", rows: 1, required: true},
    {prompt: "Country of current residency", rows: 1, required:true}
  ],
  button_label: "Next",
}
timeline.push(demographics_2);


var music_status = ["Non-musician", "Hobby musician", "Amateur musician", "Professional musician"]
var music_experience = ["0-1 year", "2-5 years", "6-8 years", "9 or more"]
var music_listening = ["0-1 hours", "2-5 hours", "6-8 hours", "9 or more"]
var music_enjoyment = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

var musical_background = {
  type: jsPsychSurveyMultiChoice,
  preamble: "<h1>Musical background</h1>",
  questions: [	
    {prompt: "<b>Which of the following options describes you the best?</b>", options: music_status, required: true, horizontal: true},
    {prompt: "<b>How much time have you spent on musical training? (instrument lessons, singing lessons, band practice, etc.)</b>", options: music_experience, horizontal:true, required: true},
    {prompt: "<b>How much time do you weekly spend on listening to music? (intentionally)</b>", options: music_listening, horizontal:true, required: true},
    {prompt: "<b>On a scale from 1-10, how important is music to you in your everyday life?</b>", options: music_enjoyment, horizontal: true, required: true}
  ],
  button_label: "Next",
}
/*timeline.push(musical_background); 

/* check sound*/
var sound_test = {
  type: jsPsychInstructions,
  pages: [ '<audio id="testAudio"><source src="audio/badum.wav" type="audio/wav"></audio><h1>Sound Test</h1><p>Please test your sound by clicking the button below. You may click it multiple times to adjust your volume so you can hear it clearly. </p>' +
  '<p> When you have adjusted the sound to a comfortable level, press next to continue.</p>' +
  '<p> <button onclick="playSound()" type="button" class="snd-btn"><img src="img/speaker.png" height="90 width="135" alt="Click to test sound" /></button> </p>' 
], 
  show_clickable_nav: true,
  button_label: "Next",
};

/**	This function plays the sound in the sound check **/
function playSound(){
	var x = document.getElementById("testAudio");
	x.play();
}

timeline.push(sound_test);

/* enter fullscreen */
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true
});

/* create variable containing the files*/
var sound_files = [
  {sound: 'audio/GG_42_BD_SN_HH.mp3'},
  {sound: 'audio/GOM_SN_BD_HH_Ver2.mp3'},
  {sound: 'audio/GOM_SN_BD_Ver2.mp3'},
  {sound: 'audio/GOM_SN_HH_Ver2.mp3'},
  {sound: 'audio/GOM_SN_Ver2.mp3'},
]


/* define audio trial*/
var audio_trial = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable('sound'),
  prompt: '<img src="img/sound.gif" height="260" width="500">', 
  choices: "NO_KEYS",
  trial_ends_after_audio: true
}

/* define different rating instructions */
var responses = [
  {stimulus: `<div style="width:500px;">
        <p>How <dfn title="How predictable or unpredictable each event in the rhythm is or how difficult it would be to dance to the rhythm.">complex</dfn> did you find this rhythm?</p>`},
  {stimulus: `<div style="width:500px;">
        <p>How <dfn title="How likely or plausible it is that a real drummer might play this rhythm.">natural</dfn> did you find this rhythm?</p>`},
  {stimulus: `<div style="width:500px;">
        <p>How much <dfn title="The degree to which you experienced a pleasurable urge to move along to the rhythm.">groove</dfn> did you experience while listening to this rhythm?</p>`},
]

/* define a rating trial */
var rating = {
  type: jsPsychHtmlSliderResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  require_movement: true,
  labels: ['None at all', 'Very much']
}

/* define procedure for rating trials */
var rando_rating = {
  timeline: [rating],
  timeline_variables: responses,
  randomize_order: true
}

/* define procedure for trials */
var procedure = {
  timeline: [audio_trial, rando_rating],
  timeline_variables: sound_files,
  randomize_order: true
}

timeline.push(procedure)

/* create thank-you node */
var thanks = {
  type: jsPsychInstructions,
  pages: ['<p>Thank you very much for participating!'],
  allow_keys: false,
  show_clickable_nav: true,
  on_load: function () {
    saveData(subject_id + '_browserinteraction_data_rep.csv', jsPsych.data.getInteractionData().csv())
    saveData(subject_id + '_groove_data_rep.csv', jsPsych.data.get().csv()); 
  }
}

timeline.push(thanks);


/* time stamp function, format YYYYMMDDhhmmss*/
function stamp(){
  var dt = new Date(); 
  var year = dt.getFullYear(); 
  var month = ((dt.getMonth()+1)<10?'0':'') + (dt.getMonth()+1); 
  var day = (dt.getDate()<10?'0':'') + dt.getDate(); 
  var hour = (dt.getHours()<10?'0':'') + dt.getHours(); 
  var minute = (dt.getMinutes()<10?'0':'') + dt.getMinutes(); 
  var second = (dt.getSeconds()<10?'0':'') + dt.getSeconds(); 
  var stamp = year +''+ month +''+ day +''+ hour +''+ minute +''+ second ; 
  return stamp;
};

/* saving data */
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




/* add data properties */
jsPsych.data.addProperties({start_time: (new Date()).toISOString()});
/* this is for allocating participant numbers*/
var participant_id = jsPsych.data.getURLVariable('participant');
var subject_id = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({participant: subject_id});
/* add properties from prolific */
var prol_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
    prol_id: prol_id,
    study_id: study_id,
    session_id: session_id,
  });

/* when all nodes have been added to the timeline, initiate the experiment */
jsPsych.run(timeline);
