/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_interaction_data_update: function (data) {
    console.log(data);
    saveData(subject_id + '_browserinteraction_data.csv', jsPsych.data.getInteractionData().csv())
  },
  on_finish: function() {
   console.log(jsPsych.data.get().csv());
   window.location = 'https://app.prolific.co/submissions/complete?cc=35D00DA2'
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
/*timeline.push(preload);


/* define welcome message trial */
var instructions = {
  type: jsPsychInstructions,
  pages: [
   '<h1 ><b>Welcome!</b></h1>'+
   '<p>This is an experiment investigating your perception of drum rhythms. </p>' +
   '<p>We kindly ask you to use a computer and not a phone and to sit in a <b>quiet</b> room for the duration of this </p>' +
   '<p>experiment so you can concentrate on the rhythms. Also, please do not use the Safari web browser </p>'+
   '<p style="margin-bottom: 2em">(Chrome, Edge, or Firefox are recommended). Finally, please use the best quality headphones that you have access to. </p>'+
   '<p>For the next 20 minutes, you will listen to <b>50</b> different drum rhythms. </p>' +
   '<p> After each rhythm you will be asked to <b>rate</b> the <b>complexity</b> and <b>naturalness</b> of the rhythm as well as your experience of <b>groove</b>.'+
   '<p style="margin-bottom: 2em">What is meant by complexity, naturalness and groove will be explained in the instructions on the next page. </p>' +
   '<p>First, you will be asked some questions about your musical expertise and the quality of your headphones. </p>' +
   '<p style="margin-bottom: 2em">Then, you will be able to adjust the sound volume to a comfortable level before beginning the experiment.</p>'+
   '<p>During the experiment, to confirm that you are concentrating on the rhythms, </p>' +
   '<p>the browser will automatically register whether you leave the experiment window.</p>'+
   '<p style="margin-bottom: 2em">In addition, there will be two nonsense questions throughout the experiment to confirm that you are reading the questions closely. </p>'+
    "<p>By clicking 'Next', you confirm that you have read and understood the participant information found <a href='Participant Information_GrooveGen_final_ABS_TM.pdf'target='_blank'>here</a>.</p>"+
    "<p>Click 'Next' to continue. </p>",
    '<h1><b>Instructions</b></h1>'+
    '<p>After each rhythm you will be asked to rate the <b>complexity</b> of the rhythm, that is, how difficult you imagine it would be </p>' +
    '<p>for an average drummer to play this rhythm.</p>' +
    '<p>You will also be asked to rate the <b>naturalness</b> of the rhythm, that is, how likely or plausible it is that a real</p>' +
    '<p>drummer would come up with this rhythm. </p>'+
    '<p>Finally, you will be asked to rate the degree of <b>groove</b> you experience while listening to the rhythm, that is, the degree </p>' +
    '<p>to which you experienced a pleasurable urge to move along to the rhythm. </p>' +
    '<p>During the experiment you can <b>review these definitions</b> by holding your mouse over the words <i> complex</i>, <i> natural</i>, or <i> groove</i>. </p>' +
    '<p>You will make each rating on a scale from 0 to 100, where 0 = not at all and 100 = very much. Please ensure to use the entire rating scale.</p>'+
    '<p>The order in which you do the ratings will change on each trial.</p>'+
     "<p>Click 'Next' to continue.</p>"
],
  allow_keys: false,
  show_clickable_nav: true
}
/* add this node to the timeline */
timeline.push(instructions);

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
timeline.push(demographics_2);*/


var music_status = ["I have never regularly practiced a musical instrument", "I still practice a musical instrument on a regular basis", "It has been less than 1 year since I stopped practicing regularly", "It has been more than 1 year since I stopped practicing regularly", "It has been more than 5 years since I stopped practicing regularly", "It has been more than 10 years since I stopped practicing regularly"]
var music_freq = ["I have never practiced an instrument on a regular basis", "2-5 times per month", "2-5 times per week", "Every day or almost every day"]
var music_experience = ["0", "0.5", "1", "2", "3-5", "6-9", "10 or more"]
var music_listening = ["0-15 min", "15-30 min", "30-60 min", "60-90 min", "2 hrs", "2-3 hrs", "4 hrs or more"]
var music_enjoyment = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

var musical_background = {
  type: jsPsychSurveyMultiChoice,
  preamble: "<h1>Musical background</h1>",
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
  pages: [ '<audio id="testAudio"><source src="audio/Test_gg_19.wav" type="audio/wav"></audio><h1>Sound Test</h1><p>Please test your sound by clicking the button below. You may click it multiple times to adjust your volume so you can hear it clearly. </p>' +
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
  {jibber: 'audio/Nonsense_real_33.wav'},
  {jibber: 'audio/Nonsense_gg_17.wav'},
]

var n_trials = 48

/*NORMAL TRIAL*/
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
        <p>How <dfn title="How difficult you imagine it would be for an average drummer to play this rhythm.">complex</dfn> did this rhythm sound to you?</p>`},
  {stimulus: `<div style="width:500px;">
        <p>How <dfn title="How likely or plausible it is that a real drummer would come up with this rhythm.">natural</dfn> did this rhythm sound to you?</p>`},
  {stimulus: `<div style="width:500px;">
        <p>To what degree did you experience <dfn title="The degree to which you experienced a pleasurable urge to move along to the rhythm.">groove</dfn> while listening to this rhythm?</p>`},
]

/* define a rating trial */
var rating = {
  type: jsPsychHtmlSliderResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  slider_start: 0,
  require_movement: true,
  labels: ['Not at all', 'Very much']
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
  require_movement: true,
  labels: ['Not at all', 'Very much']
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
  timeline_variables: window['Rando_'+ Math.floor((Math.random() * 2) + 1)],
}

/* define procedure for random trial*/
var nonsense = {
  timeline:[rando_non_audio, rando_non_rating]
}

/*create a count trial*/
var trial_count = 0

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
  timeline: [nonsense_conditional, audio_trial, rando_rating],
  timeline_variables: window["sound_files"],
  randomize_order: true
}

timeline.push(procedure)

/* create thank-you node */
var thanks = {
  type: jsPsychInstructions,
  pages: ['<p>The experiment is now completed. Thank you very much for participating! Please click next to let Prolific know the study was completed.'],
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
