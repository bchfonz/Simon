const btnDescript = [ {file: 'sound1.mp3', hue: 120}, 
{file: 'sound2.mp3', hue: 0}, 
{file: 'sound1.mp3', hue: 60}, 
{file: 'sound4.mp3', hue: 240},
];

//Button class seems to be completely to make the buttons light up and make sounds both when clicked and when making the sequence
class Button{
  constructor(description, el){
    //What is el?
    this.el = el;
    this.hue = description.hue;
    this.sound = loadSound(description.file);
    //What is paint/ what does this line do?
    this.backgroundOpacity(25);
  }

  //
  backgroundOpacity(level){
    const background = `hsl(${this.hue}, 75%, ${level}%)`;
    this.el.style.backgroundColor = background;
  }

  //This functions deals with the color when clicked on or the sequence is running
  async press(volume) {
    this.paint(25);
    await this.play(volume);
    this.backgroundOpacity(5);
  }

  async play(volume = 1.0) {
    this.sound.volume = volume;
    await new Promise((resolve) => {
      this.sound.onended = resolve;
      this.sound.play();
    });
  }
}
class Game {
  //Type: Map
  buttons;
  //Type: Boolean
  allowPlayer;
  //Type: Vector
  sequence;
  //Type: Number of some sort
  playerPlaybackPos;
  //Type: Sound(?)
  mistakeSound;

  constructor() {
    this.buttons = new Map();
    this.allowPlayer = false;
    this.sequence = [];
    this.playerPlaybackPos = 0;
    this.mistakeSound = loadSound('error.mp3');

    //I think this assigns a sound and a hue to each button
    document.querySelectorAll('.game-button').forEach((el, i) => {
      if(i < btnDescript.length) {
        this.buttons.set(el.id, new Button(btnDescript[i], el));
      }
    });

    const playerEl = document.querySelector('.player-name');
    playerEl.textContent = this.getPlayerName();
  }

  async pressButton(button){
    if(this.allowPlayer){
      this.allowPlayer = false;
      await this.buttons.get(button.id).press(1.0);

      /*This is statement checks to see if the player clicked the right button. If they did
      then a button will be added to the sequence vector, the players score will be updated
      to be 1 less than the length of the sequence vector. I'm still not sure what playerPlaybackPos is used for tho*/
      if(this.sequence[this.playerPlaybackPos].el.id === button.id){
        this.playerPlaybackPos++;
        if(this.playerPlaybackPos === this.sequence.length){
          this.playerPlaybackPos = 0;
          this.addButton();
          this.updateScore(this.sequence.length -1);
          await this.playSequence();
      }
      this.allowPlayer = true;
      }else{
        this.saveScore(this.sequence.length - 1);
        this.mistakeSound.play();
        await this.buttonDance(2);
      }
    }
  }

  //activates when the reset button is pushed
  async reset(){
    this.allowPlayer = false;
    this.playerPlaybackPos = 0;
    //Sets the sequence vector to empty
    this.sequence = [];
    //Resets the score
    this.updateScore('--');
    //Highlights every button on the Simon board once
    await this.buttonDance(1);
    //Adds button to the sequence vector so the game can begin
    this.addButton();
    //Plays the sequence vector
    await this.playSequence();
    //Allows the player to play and click buttons
    this.allowPlayer = true;
  }

  getPlayerName(){
    return localStorage.getItem('userName') ?? 'Mystery player';
  }

  async playSequence(){
    await delay(500);
    for(const btn of this.sequence){
      await btn.press(1.0);
      await delay(100);
    }
  }

  addButton(){
    const btn = this.getRandomButton();
    this.sequence.push(btn);
  }

  updateScore(score){
    const scoreEl = document.querySelector('#score');
    scoreEl.textContent = score;
  }

  async buttonDance(laps = 1){
    for(let step = 0; step < laps; step++){
      for (const btn of this.buttons.values()){
        await btn,press(0.0);
      }
    }
  }

  getRandomButton(){
    let buttons = Array.from(this.buttons.values());
    return buttons[Math.floor(Math.random() * this.buttons.size)];
  }

  saveScore(score){
    const userName = this.getPlayerName();
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if(scoresText){
      scores = JSON.parse(scoresText);
    }
    scores = this.updateScores(userName, score, scores);

    localStorage.setItem('scores', JSON.stringify(scores))
  }

  updateScores(userName, score, scores){
    const date = new Date().toLocaleDateString();
    const newScore = {name: userName, score: score, date: date};

    let found = false
    for(const [i, prevScore] of scores.entries()) {
      if(score > prevScore.score){
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if(!found){
      //if the 
      scores.push(newScore);
    }
    if(scores.length > 10){
      scores.length = 10;
    }

    return scores;
  }
}
//Creates new game item
const game = new Game();

function delay(milliseconds){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}
//Loads the sounds fromt the assets file
function loadSound(fileName){
  return new Audio('assets/' + fileName)
}