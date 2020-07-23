class BowlingGame {
  constructor() {
    this.frames = [];
  }

  roll(pins) {
    if (this.lastFrame && this.lastFrame.length < 2) {
      // Roll current go in the frame unless 2 turns have been taken then start new frame
      if (this.lastFrame[0] === 10) {
        this.lastFrame.push(0);
        this.frames.push([]);
      }
      this.lastFrame.push(pins);
    } else {
      this.frames.push([pins]);
    }
  }

  get score() {
    let score = 0;
    this.frames.forEach((frame, i) => {
      let currentFrameTotal;
      if (frame !== this.eleventhFrame || frame !== this.twelfthFrame) {
        // if frame 10 is strike, 11th frame is normal
        currentFrameTotal = frame[0] + frame[1];
      } // if frame 10 is spare, only add first roll of frame 11
      else currentFrameTotal = frame[1] ? frame[0] + frame[1] : frame[0];
      const previousFrame = this.frames[i - 1] || [];
      const previousFrameTotal = previousFrame
        ? previousFrame[0] + previousFrame[1]
        : 0;

      console.log("previous frame  ", previousFrame);
      console.log("currentFrameTotal ", currentFrameTotal);
      console.log("Frame ", frame);

      if (previousFrame[0] === 10) {
        // if previous frame is strike
        score += currentFrameTotal;
      } else if (previousFrameTotal === 10) {
        // if previous frame is spare

        score += frame[0];
      }
      score += currentFrameTotal;
    });

    return score;
  }

  get lastFrame() {
    return this.frames[this.frames.length - 1];
  }

  get tenthFrame() {
    return this.frames[9];
  }
  get eleventhFrame() {
    return this.frames[10];
  }
  get twelfthFrame() {
    return this.frames[11];
  }
}

module.exports = BowlingGame;
