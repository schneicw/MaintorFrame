var sheet_1 = SpreadsheetApp.openById('10DjwirhZT86BqnyoJ98R68bJa7i0mGXyLTDIJt42i64').getSheets()[0];
var sheet_2 = SpreadsheetApp.openById('10DjwirhZT86BqnyoJ98R68bJa7i0mGXyLTDIJt42i64').getSheets()[1];
var data_mentor = sheet_1.getDataRange().getValues();
var mentor_dimensions = sheet_1.getDataRange();
var data_mentee = sheet_2.getDataRange().getValues();
var mentee_dimensions = sheet_2.getDataRange();
// Mentor Dictionaries
var Mentor_MonDict = {};
var Mentor_TuesDict = {};
var Mentor_WedDict = {};
var Mentor_ThursDict = {};
var Mentor_FriDict = {};
  
// Mentee Dictionaries
var Mentee_MonDict = {};
var Mentee_TuesDict = {};
var Mentee_WedDict = {};
var Mentee_ThursDict = {};
var Mentee_FriDict = {};

function build_mentor_dict() {
  
  var dayColumn = data_mentor[0].indexOf("What days of the week are you available to mentor?");
  var mon_times = data_mentor[0].indexOf("When are you free on Monday? (if you did not select Monday, please skip)");
  var tues_times = data_mentor[0].indexOf("When are you free on Tuesday? (if you did not select Tuesday, please skip)");
  var wed_times = data_mentor[0].indexOf("When are you free on Wednesday? (if you did not select Wednesday, please skip)");
  var thurs_times = data_mentor[0].indexOf("When are you free on Thursday? (if you did not select Thursday, please skip)");
  var fri_times = data_mentor[0].indexOf("When are you free on Friday? (if you did not select Friday, please skip)");
  
  // MENTOR DICT CONSTRUCTION
  for (var i = 1; i < data_mentor.length; i++) {
    var days = data_mentor[i][dayColumn];
    days = days.replace(/\s/g, '');
    days = days.split(",");
    //Logger.log(days);
    for (var j = 0; j < days.length; j++){
      //Logger.log(days[j]);
      if (days[j] == 'Monday'){
      //  Logger.log(data_mentor[i][2]);
        
        var times = data_mentor[i][mon_times];
        times = times.replace(/\s/g, '');
        times = times.split(",");
        for (var k = 0; k < times.length; k++){
          if ((times[k]) in Mentor_MonDict){
            Mentor_MonDict[times[k]].push(data_mentor[i][2]);
          }
          else{
            Mentor_MonDict[times[k]] = [];
            Mentor_MonDict[times[k]].push(data_mentor[i][2]);
          }
        }
      }
      if (days[j] == 'Tuesday'){
       // Logger.log("2");
        var times = data_mentor[i][tues_times];
        times = times.replace(/\s/g, '');
        times = times.split(",");
        for (var k = 0; k < times.length; k++){
          if ((times[k]) in Mentor_TuesDict){
            Mentor_TuesDict[times[k]].push(data_mentor[i][2]);
          }
          else{
            Mentor_TuesDict[times[k]] = [];
            Mentor_TuesDict[times[k]].push(data_mentor[i][2]);
          }
        }
      }
      if (days[j] == 'Wednesday'){
       /// Logger.log("3");
        var times = data_mentor[i][wed_times];
        times = times.replace(/\s/g, '');
        times = times.split(",");
        for (var k = 0; k < times.length; k++){
          if ((times[k]) in Mentor_WedDict){
            Mentor_WedDict[times[k]].push(data_mentor[i][2]);
          }
          else{
            Mentor_WedDict[times[k]] = [];
            Mentor_WedDict[times[k]].push(data_mentor[i][2]);
          }
        }
      }
      if (days[j] == 'Thursday'){
        //Logger.log("4");
        var times = data_mentor[i][thurs_times];
        times = times.replace(/\s/g, '');
        times = times.split(",");
        for (var k = 0; k < times.length; k++){
          if ((times[k]) in Mentor_ThursDict){
            Mentor_ThursDict[times[k]].push(data_mentor[i][2]);
          }
          else{
            Mentor_ThursDict[times[k]] = [];
            Mentor_ThursDict[times[k]].push(data_mentor[i][2]);
          }
        }
      }
      if (days[j] == 'Friday'){
        //Logger.log("5");
        var times = data_mentor[i][fri_times];
        times = times.replace(/\s/g, '');
        times = times.split(",");
        for (var k = 0; k < times.length; k++){
          if ((times[k]) in Mentor_FriDict){
            Mentor_FriDict[times[k]].push(data_mentor[i][2]);
          }
          else{
            Mentor_FriDict[times[k]] = [];
            Mentor_FriDict[times[k]].push(data_mentor[i][2]);
          }
        }
      }
    }
  }
  
  Logger.log("Monday");
  Logger.log(Mentor_MonDict);
    Logger.log("Tuesday");
  Logger.log(Mentor_TuesDict);
    Logger.log("Wednesday");
  Logger.log(Mentor_WedDict);
   Logger.log("Thursday");
  Logger.log(Mentor_ThursDict);
    Logger.log("Friday");
  Logger.log(Mentor_FriDict);
  
}  
 