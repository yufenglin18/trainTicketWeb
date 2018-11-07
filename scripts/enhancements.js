"use strict";
// scroll function, citation: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top
function scrollFunction() {
    //display the go top button if the page is not at the top. hide the button when at the top.
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("gotop").style.display = "block";
        if(document.getElementById("pointing")){
            document.getElementById("pointing").style.display = "block";
        }
    } else {
        document.getElementById("gotop").style.display = "none";
        if(document.getElementById("pointing")){
            document.getElementById("pointing").style.display = "none";
        }
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
window.onscroll = function() {
    scrollFunction();
};
//fancy form, inspired by https://github.com/bradtraversy/fancy_form
//array of questions
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Enter Your Phone Number', pattern: /^\d{10}$/ },
    { question: 'Enter Your Home Address', pattern: /^[A-Z a-z 0-9]{0,40}$/ },
    { question: 'Enter Your Suburb', pattern: /^[A-Z a-z]{0,20}$/ },
    { question: 'Enter Your Post Code', pattern: /^\d{4}$/ },
];
const shakeTime = 100;
const formBox = document.getElementById('fancyForm');
const nextBtn = document.getElementById('next-btn');
const inputGroup = document.getElementById('formBox');
const inputField = document.getElementById('input-field');
const inputLabel = document.getElementById('input-label');
const inputProgress = document.getElementById('input-progress');
const progress = document.getElementById('progress-bar');
let position = 0;
function init(){
    if(formBox){
        getQuestion();
        nextBtn.addEventListener('click', validate);
        inputField.addEventListener('keyup', e => {
            if (e.keyCode == 13) {
              validate();
            }
          });
    } 
}
//initiate the fucntion when the page is loaded.
window.addEventListener('load', init);
function getQuestion() {
    inputLabel.innerHTML = questions[position].question;
    inputField.type = questions[position].type || 'text';
    inputField.value = questions[position].answer || '';
    inputField.focus();
    progress.style.width = (position * 100) / questions.length + '%';
    showQuestion();
}
//display question
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}
//used for creating shaking movement
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}
//input check accroding to regex
function validate() {
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
      inputFail();
    } else {
      inputPass();
    }
}
//display typed answer on the page
function pushInAnswer(){
    document.getElementById('output').style.display = 'block';
    document.getElementById('comfirmed').innerHTML += questions[position].question.slice(11) + ": "+ questions[position].answer  + '<br />';
}
function inputFail() {
    formBox.className = 'error';
    for (let i = 0; i < 4; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 10, 0);
        setTimeout(transform, shakeTime * 4, 0, 0);
        inputField.focus();
    }
}
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 5);
    setTimeout(transform, shakeTime * 1, 0, 0);
    questions[position].answer = inputField.value;
    pushInAnswer();
    position++;
    if (questions[position]) {
      hideQuestion();
      getQuestion();
    } else {
      hideQuestion();
      formBox.className = 'close';
      progress.style.width = '100%';
      progress.style.background = '#68f82f';
      formComplete();
    }
}
function formComplete(){
    formBox.style.display = 'none';
    document.getElementById('output').style.backgroundColor = 'rgba(83, 214, 109,0.9)';
}


