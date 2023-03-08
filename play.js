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

}