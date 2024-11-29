const MAX_EXECUTION_TIME = 1000 * 60 * 5;  // this sets the max runtime to 5 minutes (giving us a little buffer to wind down and exit the script gracefully)
const NOW = Date.now();

  const isTimeLeft = () => {
  return MAX_EXECUTION_TIME > Date.now() - NOW;
};

  // this cleans up our temporary triggers so we don't clutter the trigger interface
  let trigId = PropertiesService.getScriptProperties().getProperty('timeTriggerId');
  if (trigId != null) {
    removeTrigger(trigId);
  }  


//************************************************************************************************* */
// MAIN SCRIPT FUNCTIONALITY HERE
// you need to incorporate a "isTimeLeft()" call in the main script to determine when you need to exit.
// for example, in a for loop, you can do something like:
// for (i=0; i<data.length && isTimeLeft(); i++) { // rest of your code }
// this will exit your for loop once 5 minutes have elapsed
// keep in mind that you will need a way to record where you were at, so you can either record something
// in the Google Sheets for the rows that were processed, or you can save the value of "i" to a script property
// (like how we save and reference the timed trigger id)
//**** */

 if (!isTimeLeft()){
    // you may want to incorporate any graceful endings to your script here   
    let newTime = minutesLater(5);
    let id = ScriptApp.newTrigger('mainScript').timeBased().at(newTime).create().getUniqueId();
    PropertiesService.getScriptProperties().setProperty('timeTriggerId',id);
  }


// returns the datetime a specified amount of minutes later
function minutesLater(minutes) {
let now = new Date();
  let nowInMS = now.getTime();
  let add = minutes * 60 * 1000; // add 5 minutes
  let newTime = nowInMS + add;
  let futureDate = new Date(newTime);
  return futureDate;
}

// checks and removes trigger with specific trigger Id
function removeTrigger(trigId){
  let triggers = ScriptApp.getProjectTriggers();
  for (i=0;i<triggers.length;i++){
    if (triggers[i].getUniqueId() == trigId){
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}
