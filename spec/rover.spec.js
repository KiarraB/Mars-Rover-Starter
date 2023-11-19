const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", () => {
    let rover = new Rover(2);
    expect(rover.position).toEqual(2);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });
  it("response returned by receiveMessage contains the name of the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Name of message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    expect(rover.receiveMessage(message).results.length).toEqual(2);
  });
  it("responds correctly to the status check command", () => {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status Check Message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.position).toEqual(98382);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  });
  it("responds correctly to the mode change command", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Mode Change Message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 369)];
    let message = new Message('Move Message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
  });
  it("responds with the position for the move command", () => {
    let commands = [new Command('MOVE', 55555), new Command('STATUS_CHECK')];
    let message = new Message('Position Response Move Message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
  });

});
