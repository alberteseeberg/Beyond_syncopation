/* initialize jsPsych */
var jsPsych = initJsPsych({
  default_iti: 300,
  on_finish: function() {
   console.log(jsPsych.data.get().csv());
   window.location = 'https://shaddam.cogsciexperiment.au.dk/Done/'
  }
});

/* create timeline */
var timeline = [];

/* preload audiofiles*/
var preload = {
  type: jsPsychPreload,
  audio: window['sound_preload'],
  message: 'Please wait while the experiment is loading',
  show_detailed_errors: true
}
timeline.push(preload);

/* define welcome message trial */
var instructions = {
  type: jsPsychInstructions,
  pages: [
   '<h1 ><b>Welcome!</b></h1>'+
   '<p>This is an experiment investigating your perception of drum rhythms. </p>' +
   '<p>You will be asked to listen to several drum rhythms. After each rhythm,</p>' +
   '<p style="margin-bottom: 2.5em"> you will be asked to rate your experience of pleasure and your experience of wanting to move. </p>' +
   '<p>We kindly ask you to sit in a <b>quiet</b> room for the duration of this experiment so you can</p>' +
   '<p>concentrate on the rhythms. Also, please do not use the Safari or Firefox web browsers </p>'+
   '<p style="margin-bottom: 2.5em">(Chrome or Edge are recommended). Finally, please use the best quality headphones that you have access to.</p>'+
    '<p>Before you do the actual experiment, we would like to ask you some questions about your demographics, your hearing, and your musical expertise. </p>' +
    '<p>After having answered these questions, you will be directed to the instructions for the experiment.'+
    "<p>By clicking 'Next', you confirm that you have <b>read and understood</b> the participant information found <a href='Participant_Information_NH.pdf'target='_blank'>here</a>.</p>"+
    '<p style="margin-bottom: 2.5em">Thank you for participating.</p>' +
     "<p>Click 'Next' to continue.</p>"
],
  allow_keys: false,
  show_clickable_nav: true
}
/* add this node to the timeline */
timeline.push(instructions);

/*demographics trial*/
      
var sex_scale = ["Female", "Male", "Other", "Do not wish to inform"];
var age_scale = ["<20", "20-29", "30-39", "40-49","50-59", "60-69", "70-79", "80+", "Do not wish to inform"];

/*var demographics_1 = {
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

var demographics_2 = {
  type: jsPsychSurveyText,
  preamble: "<h1>Demographic Questionnaire</h1>",
  questions: [
    {prompt: "<b>Biological sex</b>", rows: 1, placeholder: 'M/F', name: 'gender', required: true},
    {prompt: "<b>Age</b>", name: 'Age', rows: 1, placeholder: 'Type number', required: true},
    {prompt: "<b>Country in which you spent the formative years of your childhood and youth</b>", name: 'Origin', rows: 1, required: true},
    {prompt: "<b>Country of current residency</b>", name: 'country_cur', rows: 1, required:true}
  ],
  button_label: "Next",
}
timeline.push(demographics_2);

/*hearing trial*/

var one_two = ["None", "One", "Two"];
var yes_no = ["Yes", "No"];
var scale = ["Never", "Very Rarely", "Rarely", "Occasionally", "Very Frequently", "Always"];
/*var age_scale = ["<20", "20-29", "30-39", "40-49","50-59", "60-69", "70-79", "80+", "Do not wish to inform"];*/

var hearing = {
  type: jsPsychSurveyMultiChoice,
  preamble: "<h2>Questions regarding hearing</h2>",
  questions: [	
    {prompt: "<p><b>Do you have tinnitus?</b>", options: yes_no, required: true},
    {prompt: "<p><b>Do you have a hearing aid? If so, how many?</b>", options: one_two, required: true},
    {prompt: "<p><b>Do you experience difficulties in daily life due to dizziness?</b>", options: scale, required: true, horizontal: true}
  ],
  button_label: "Next",
}
timeline.push(hearing);

var music_status = ["I have never regularly practiced a musical instrument", "I still practice a musical instrument on a regular basis", "It has been less than 1 year since I stopped practicing regularly", "It has been more than 1 year since I stopped practicing regularly", "It has been more than 5 years since I stopped practicing regularly", "It has been more than 10 years since I stopped practicing regularly"]
var music_freq = ["I have never practiced an instrument on a regular basis", "2-5 times per month", "2-5 times per week", "Every day or almost every day"]
var music_experience = ["0", "0.5", "1", "2", "3-5", "6-9", "10 or more"]
var music_listening = ["0-15 min", "15-30 min", "30-60 min", "60-90 min", "2 hrs", "2-3 hrs", "4 hrs or more"]
var music_enjoyment = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

var musical_background = {
  type: jsPsychSurveyMultiChoice,
  preamble: "<h2>Musical background</h2>",
  questions: [	
    {prompt: "<p><b>Years of formal training on a musical instrument (including voice) during my lifetime</b>", options: music_experience, required: true, horizontal: true},
    {prompt: "<p><b>Time spent on average listening attentively to music per day</b>", options: music_listening, required: true, horizontal: true},
    {prompt: "<p><b>If you have stopped practicing your instrument (including voice), how long has it been since you stopped?</b>", options: music_status, required: true},
    {prompt: "<p><b>Approximately, how often do (did) you practice your instrument (including voice)?</b>", options: music_freq, required: true},
    {prompt: "<p><b>On a scale from 1-10, how important is music to you in your everyday life?</b>", options: music_enjoyment, required: true, horizontal: true}
  ],
  button_label: "Next",
}
timeline.push(musical_background); 

var instructions2 = {
  type: jsPsychInstructions,
  pages: [
'<h1><b>Instructions</b></h1>'+
'<p>For the next 15 minutes, you will listen to <b>38</b> different drum rhythms. </p>' +
'<p>After each rhythm you will be asked to <b>rate</b> how much the rhythm makes you <b>want to move</b> and how much <b>pleasure</b> you experienced while listening to it.'+
'<p style="margin-bottom: 2.5em">"Wanting to move" refers to the urge to tap your foot, bob your head, or dance to the rhythm.</p>' +
'<p>You will make each rating on a scale from 0 to 100, where <b>0 = none/not at all</b> and <b>100 = very much</b>. Please ensure to use the entire rating scale.</p>'+
'<p style="margin-bottom: 2.5em">The order in which you do the ratings will change on each trial.</p>'+
'<p>First, you will be asked some questions about the quality of your headphones. </p>' +
'<p style="margin-bottom: 2.5em">Then, you will be able to adjust the sound volume to a comfortable level before beginning the experiment.</p>'+
'<p>There will be two nonsense questions throughout the experiment to confirm that you are reading the questions closely. </p>'+
'<p>When these appear, please choose 0 on the rating scale. </p>'+
 "<p>Click 'Next' to continue.</p>"
],
allow_keys: false,
show_clickable_nav: true
}
/* add this node to the timeline */
timeline.push(instructions2);

/*headphones quality question */
var headphone_question = {
  type: jsPsychSurveyMultiChoice,
  questions:[
    {
      prompt: "Please rate the <b>quality of the headphones</b> you are using for this experiment on a scale from 1 to 7,  <p> where 1 = low cost earbuds and 7 = professional studio-quality headphones.",
      options: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
    required:true,
    horizontal: true}
  ],
  button_label:"Next",
}

timeline.push(headphone_question);

/* check sound*/
var sound_test = {
  type: jsPsychInstructions,
  pages: [ '<audio id="testAudio"><source src="audio/Test_gg_147_32bit.wav" type="audio/wav"></audio><h1>Sound Test</h1><p>Please test your sound by clicking the button below. You may click it multiple times to adjust your volume so you can hear it clearly. </p>' +
  '<p> When you have adjusted the sound to a comfortable level, press next to continue.</p>' +
  '<p> <button onclick="playSound()" type="button" class="snd-btn"><img src="img/speaker.png" height="90 width="135" alt="Click to test sound" /></button> </p>' 
], 
  show_clickable_nav: true,
  button_label: "Next"
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


/* create variable containing the files for the nonsense-trials*/
var sound_files_nonsense = [
  {jibber: 'audio/Nonsense_gg_150_32bit.wav'},
]


/*NORMAL TRIAL*/

/*create a count trial*/
var trial_count = 0

var n_trials = 48

/* define pre-audio trial*/
var pre_audio_trial = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: 'audio/HH.wav',
  choices: "NO_KEYS",
  trial_ends_after_audio: true
}

/* define audio trial*/
var audio_trial = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  prompt: '<img src="img/sound.gif" height="260" width="500">', 
  choices: "NO_KEYS",
  trial_ends_after_audio: true
}


/* define different rating questions */
var responses = [
  {stimulus: `<div style="width:500px;">
        <p>How much did this rhythm make you want to move?</p>`},
  {stimulus: `<div style="width:500px;">
        <p>How much pleasure did you experience while listening to this rhythm?</p>`},
]

/* define a rating trial */
var rating = {
  type: jsPsychHtmlSliderResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  slider_start: 0,
  require_movement: true,
  labels: ['0 (None/not at all)','20','40','60','80', '100 (Very much)']
}

/* define procedure for rating trials */
var rando_rating = {
  timeline: [rating],
  timeline_variables: responses,
  randomize_order: true
}

/*RANDOM TRIAL*/

/* define audio trial*/
var non_audio_trial = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable('jibber'),
  prompt: '<img src="img/sound.gif" height="260" width="500">', 
  choices: "NO_KEYS",
  trial_ends_after_audio: true
}

/* define nonsense questions */
var non_responses = [
  {non_stimulus: `<div style="width:500px;">
        <p>How likely was it that a penguin made this rhythm?</p>`},
  {non_stimulus: `<div style="width:500px;">
        <p>To what degree did this rhythm sound like howling wolves?</p>`}
]

/* define a nonsense rating trial */
var non_rating = {
  type: jsPsychHtmlSliderResponse,
  stimulus: jsPsych.timelineVariable('non_stimulus'),
  slider_start: 0,
  require_movement: true,
  labels: ['0 (None/not at all)','20','40','60','80', '100 (Very much)']
}

/* define procedure for nonsense rating trials */
var rando_non_rating = {
  timeline: [non_rating],
  timeline_variables: non_responses,
  randomize_order: true
}

/* define audio procedure for nonsense trials */
var rando_non_audio = {
  timeline: [non_audio_trial],
  timeline_variables: sound_files_nonsense
}

/* define procedure for random trial*/
var nonsense = {
  timeline:[pre_audio_trial, rando_non_audio, rando_non_rating]
}

/*create a conditional timeline for the random questions*/
var nonsense_conditional = {
  timeline: [nonsense],
  conditional_function: function() {
    //increment trial count - in the first run through the timeline variables procedure, trial_count will be equal to 1
    trial_count++;
    if (trial_count % 17 == 0) {
      //if the trial count is divisible by 17, then run the random trial
      return true;
    } else {
      // otherwise skip the random trial
      return false;
    }
  }
}

/* define procedure for trials */
var procedure = {
  timeline: [nonsense_conditional, pre_audio_trial, audio_trial, rando_rating],
  timeline_variables: window["sound_files"],
  randomize_order: true
}

timeline.push(procedure)

/* create thank-you node */
var thanks = {
  type: jsPsychInstructions,
  pages: ['<p>Please click next to complete the study.'],
  allow_keys: false,
  show_clickable_nav: true,
  on_load: function () {
    saveData(subject_id + '_groove_data_NH.csv', jsPsych.data.get().csv()); 
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

/* when all nodes have been added to the timeline, initiate the experiment */
jsPsych.run(timeline);
