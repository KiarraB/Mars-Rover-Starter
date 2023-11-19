class Rover {
   constructor(position) {
      this.position = position,
      this.mode = 'NORMAL',
      this.generatorWatts = 110
   }
   //receiveMessage function 
   receiveMessage(message) {
      //initialized response, results, resultsObj, and statusObj
      let response = {};
      response.message = message.name;
      let results = [];
      // let resultsObj = {};
      // let statusObj = {};
      //for each command i made an if statement to adhere to tests
      for (let i = 0; i < message.commands.length; i++) {
         let resultsObj = {};
         let statusObj = {};
         //checks status and returns results
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            resultsObj.completed = true;
            statusObj.mode = this.mode;
            statusObj.generatorWatts = this.generatorWatts;
            statusObj.position = this.position;
            resultsObj.roverStatus = statusObj;
            results[i] = resultsObj;
         //results alters as mode is changed
         }
         if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value;
            resultsObj.completed = true;
            results[i] = resultsObj;
         //completed (move) value alters by power mode
         }
         if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               resultsObj.completed = false;
            } else {
               this.position = message.commands[i].value;
               resultsObj.completed = true;
            }
            results[i] = resultsObj;
         }
      }
      //set response.results equal to results, returned response
      response.results = results;
      return response;
   }
}

module.exports = Rover;