// Get sound effects for this page.
const unequiptool = new Audio('media/sfx/unequiptool.wav');
unequiptool.volume = 0.1;
const toggle = new Audio('media/sfx/toggle.mp3');
toggle.volume = 0.3;
const buttonClick = new Audio('media/sfx/buttonclick.mp3');
buttonClick.volume = 0.5;
const pressStart = new Audio('media/sfx/press-start.mp3');
pressStart.volume = 0.6;
const back = new Audio('media/sfx/back.mp3');
back.volume = 0.3 ;
const pluck = new Audio('media/sfx/pluck.mp3');
pluck.volume = 0.3 ;

//Play the sound.
var soundFlag = true;

function soundRestart(audio) {
    if (soundFlag) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.currentTime = 0;
        }
    }
}


// Toggle sound
const sound = document.getElementById('toggleSound');
sound.addEventListener('click', function () {
    if (soundFlag) {
        soundRestart(unequiptool);
        soundFlag = false;
        sound.src = 'media/images/sound_off.png';
    } else {
        soundFlag = true;
        //Is needed twice because when pressed to open there is no sound because soundFlag is false;
        soundRestart(toggle);
        sound.src = 'media/images/sound_on.png';
    }
});

const soundboard = document.getElementById('soundboard');
const instructions = document.getElementById('soundboard-instructions');
// Show Soundboard Instructions.
soundboard.addEventListener('mouseover', function(evt){
    if(evt.target.nodeName == 'IMG'){
      if(languageFlag=='english'){
        if(evt.target.id == 'toggleSound'){
          if(soundFlag == false){
            instructions.innerHTML = "";
            instructions.innerHTML = "Turn ON sound effects";
          }else{
            instructions.innerHTML = "";
            instructions.innerHTML = "Turn OFF sound effects";
          }
        }
      }else if(languageFlag=='greek'){
        if(evt.target.id == 'toggleSound'){
          if(soundFlag == false){
            instructions.innerHTML = "";
            instructions.innerHTML = "Ενεργοποίησε τα ηχητικά εφέ";
          }else{
            instructions.innerHTML = "";
            instructions.innerHTML = "Απενεργοποίησε τα ηχητικά εφέ";
          }
        }
      }
    }
});

soundboard.addEventListener('click', function(evt){
    if(evt.target.nodeName == 'IMG'){
      if(languageFlag=='english'){
        if(evt.target.id == 'toggleSound'){
          if(soundFlag == false){
            instructions.innerHTML = "";
            instructions.innerHTML = "Sound Effects are OFF";
          }else{
            instructions.innerHTML = "";
            instructions.innerHTML = "Sound Effects are ON";
          }
        }
      }else if(languageFlag=='greek'){
        if(evt.target.id == 'toggleSound'){
          if(soundFlag == false){
            instructions.innerHTML = "";
            instructions.innerHTML = "Tα ηχητικά εφέ απενεργοποιήθηκαν";
          }else{
            instructions.innerHTML = "";
            instructions.innerHTML = "Tα ηχητικά εφέ ενεργοποιήθηκαν";
          }
        }
      }
    }
});


// Delete Soundboard Instructions.
document.body.addEventListener('mouseover', function(evt){
    if(evt.target.nodeName != 'IMG'){
      instructions.innerHTML = "";
    }
});