var inputlist = {'tom':{'jim':'12pm','sally':'1pm'}, 'jada': {'charlie':'1pm','buyaki':'1230pm'}, 'tim':{'jim':'10am'}};
var mentees = ['jim','sally','charlie','buyaki'];

var prevMatch = [];
for (var i = 0; i < mentees.length; i++){
  prevMatch[i] = -1;
}


function single_match(mentor,seenlist){
  Logger.log(seenlist);
  for (var i = 0; i < mentees.length; i++) {
    if (inputlist[mentor][mentees[i]] && seenlist[i] == false){  //match exists and hasn't been seen
      seenlist[i] = true;
      if (prevMatch[i] == -1 || single_match(prevMatch[i],seenlist)){
        prevMatch[i] = mentor;
        return true;
      }      
    }
  }
  return false;
};

function maxmatch(){
  var tempseen;
  result = 0;
  for (var key in inputlist){
    tempseen = [];
    for (var i = 0; i < mentees.length; i++){
      tempseen[i] = false;
    } 
    if (single_match(key,tempseen)){
      result += 1;
    }   
  }
  var endlist = {};
  for (var i = 0; i < mentees.length; i++){
    if (prevMatch[i] != -1){
      endlist[prevMatch[i]] = mentees[i];
    }
  }
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName("Matches");
  newSheet.appendRow(['Mentor', 'Mentee','Time']);
  for (var key in endlist) {
    newSheet.appendRow([key, endlist[key],inputlist[key][endlist[key]]]);
  }
  Logger.log(endlist);
};

