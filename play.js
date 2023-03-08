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
    this.paint(25);
  }

  //What does this function do?
  //I'm guessing it has something to do with the buttons in the game when they are clicked
  paint(level){
    const background = `hsl(${this.hue}, 100%, ${level}%)`;
    this.el.style.backgroundColor = background;
  }

  async press(volume) {
    this.paint(50);
    await this.play(volume);
    this.paint(25);
  }

  async play(volume = 1.0) {
    this.sound.volume = volume;
    await new Promise((resolve) => {
      this.sound.onended = resolve;
      this.sound.play();
    });
  }


}