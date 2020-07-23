const chai = require("chai");

chai.config.truncateThreshold = 0;
const { expect } = chai;

const BowlingGame = require("../src/game");
let game;

beforeEach(() => {
  game = new BowlingGame();
});

describe("game", () => {
  const rollMany = (rolls, pins) => {
    for (let i = 0; i < rolls; i++) {
      game.roll(pins);
    }
  };
  it("returns 0 for a game of all 0s", () => {
    rollMany(20, 0);
    expect(game.score).to.equal(0);
  });
  it("returns 20 when each roll is 1", () => {
    rollMany(20, 1);
    expect(game.score).to.equal(20);
  });
  it("has one spare", () => {
    game.roll(5);
    game.roll(5);
    game.roll(3); // spare
    rollMany(17, 0);
    expect(game.score).to.equal(16);
  });
  it("has a strike", () => {
    game.roll(10);
    game.roll(3);
    game.roll(4);
    rollMany(16, 0);
    expect(game.score).to.equal(24);
  });
  it("adds one more roll if frame 10 is a spare", () => {
    rollMany(18, 1);
    game.roll(5);
    game.roll(5);
    game.roll(5);
    expect(game.score).to.equal(38);
  });
  it("adds two more rolls if frame 10 is a strike", () => {
    rollMany(18, 1);
    game.roll(10);
    game.roll(2);
    game.roll(4);
    expect(game.score).to.equal(40);
  });
  it.only("has a max score of 300", () => {
    rollMany(12, 10);
    expect(game.score).to.equal(300);
  });
});
