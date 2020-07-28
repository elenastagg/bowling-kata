class BowlingGame {
  constructor() {
    this.rolls = [];
  }

  roll(pins) {
    this.rolls.push(pins);
  }

  isSpare(frameScore) {
    return frameScore === 10;
  }
  spareBonus(rollIndex) {
    return 10 + this.rolls[rollIndex + 2];
  }

  isStrike(rollIndex) {
    return this.rolls[rollIndex] === 10;
  }

  strikeBonus(rollIndex) {
    return 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  get score() {
    let score = 0;
    let rollIndex = 0;

    for (let frameCount = 0; frameCount < 10; frameCount += 1) {
      const frameScore = this.rolls[rollIndex] + this.rolls[rollIndex + 1];
      if (this.isStrike(rollIndex)) {
        score += this.strikeBonus(rollIndex);
        rollIndex += 1;
      } else if (this.isSpare(frameScore)) {
        score += this.spareBonus(rollIndex);
        rollIndex += 2;
      } else {
        score += frameScore;
        rollIndex += 2;
      }
    }
    return score;
  }
}

module.exports = BowlingGame;
