function single_match(mentor,seenlist,a){
  for (var i = 0; i < mentees.length; i++) {
    //Logger.log(a);
    for (var t = 0; t < a[mentor].length; t++){    
      if (mentees[i] == a[mentor][t] && seenlist[i] == false){  //match exists and hasn't been seen
        seenlist[i] = true;
       // Logger.log(seenlist);
        if (prevMatch[i] == -1 || single_match(prevMatch[i],seenlist, a)){
          prevMatch[i] = mentor;
          return true;
        }      
      }
    }
  }
  return false;
};

function maxmatch(a){
  //Logger.log(a);
  var tempseen;
  result = 0;
  for (var key in a){
    //Logger.log(key);
    tempseen = [];
    for (var i = 0; i < mentees.length; i++){
      tempseen[i] = false;
    }
    if (single_match(key,tempseen,a)){
      result += 1;
    }   
  }
  var endlist = {};
  for (var i = 0; i < mentees.length; i++){
    if (prevMatch[i] != -1){
      //Logger.log('wefwef');
      endlist[prevMatch[i]] = mentees[i];
    }
  }
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName("Matches");
  newSheet.appendRow(['Mentor', 'Mentee', 'School', 'Mon', 'Tues','Wed', 'Thurs', 'Fri']);
  for (var key in endlist) { 
    
    //////////////////Monday//////////////////
    if(typeof Mentors[key].getMonday() === 'undefined') {
       var mon = 'None';
    }
    else{
      var mon =  Mentors[key].getMonday().toString();
    }
    //////////////////Tuesday//////////////////
    if(typeof Mentors[key].getTuesday() === 'undefined') {
       var tues = 'None';
    }
    else{
      var tues =  Mentors[key].getTuesday().toString();
    }
    //////////////////Wednesday//////////////////
    if(typeof Mentors[key].getWednesday() === 'undefined') {
       var wed = 'None';
    }
    else{
      var wed =  Mentors[key].getWednesday().toString();
    }
    //////////////////Thursday//////////////////
    if(typeof Mentors[key].getThursday() === 'undefined') {
       var thurs = 'None';
    }
    else{
      var thurs =  Mentors[key].getThursday().toString();
    }
    //////////////////Friday//////////////////
    if(typeof Mentors[key].getFriday() === 'undefined') {
       var fri = 'None';
    }
    else{
      var fri =  Mentors[key].getFriday().toString();
    }
    newSheet.appendRow([key, endlist[key],Mentees[endlist[key]].getSchool(), mon,tues,wed,thurs,fri]);
    //newSheet.appendRow([key, endlist[key],Mentees[endlist[key]].getSchool(), mon,tues,wed,thurs,fri]);
  }
  //Logger.log(endlist);
};
                        
                        



function main(){
  check_preferences();
  eligible();
  remove_uneligible();
  var matches = output_for_matching();
  Logger.log(matches);
  maxmatch(matches);
}


