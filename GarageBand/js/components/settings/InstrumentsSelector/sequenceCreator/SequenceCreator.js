class SequenceCreator {
  constructor(id, parentElement, width, height, color, sequence) {
    this.parentElement = parentElement;
    this.element;
    this.width = width;
    this.height = height;
    this.id = id;
    this.backgroundColor = color;
    this.AUDIO_SRC = "../../../../assets/audio/instruments";
    this.sequence = sequence;

    this.render()
  }
  render = function () {
    this.element = document.createElement("div");
    this.parentElement.appendChild(this.element);
    this.element.setAttribute(
      "class",
      `sequence-creator-container-${this.id}`
    );
    this.element.style.width = `${this.width}%`;
    this.element.style.height = `${this.width}`;
    this.element.style.backgroundColor = this.backgroundColor;
  }

  playSequence = function (){

  }

  saveSequence = function(){

  }

}
export default SequenceCreator;
