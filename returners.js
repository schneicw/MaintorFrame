function returning_matches() {
  
  var sheet_1 = SpreadsheetApp.openById('10DjwirhZT86BqnyoJ98R68bJa7i0mGXyLTDIJt42i64').getSheets()[0];
  var sheet_2 = SpreadsheetApp.openById('10DjwirhZT86BqnyoJ98R68bJa7i0mGXyLTDIJt42i64').getSheets()[1];
  var data_mentor = sheet_1.getDataRange().getValues();
  var data_mentee = sheet_2.getDataRange().getValues();
  
  var Matches_Dictionary = {};
  var Mentee_List = [];
  
  
  var returner = data_mentor[0].indexOf("Were you a mentor last year?");
  var mentorNamecol = data_mentor[0].indexOf("Name (first and last)");
  var menteeNamecol = data_mentor[0].indexOf("If you would prefer to be paired with the same mentee, what was your mentee's name? (First and Last name)");
  var checkMenteeNames = data_mentee[0].indexOf("Name of Student (First, Last)");
  
  //Creating a list with all mentees
  for (var i = 1; i < data_mentor.length; i++){
    if (data_mentor[i][returner] == "Yes"){
      var mentorName = data_mentor[i][mentorNamecol]
      var pastMentee = data_mentor[i][menteeNamecol];
      for (var j = 1; j < data_mentee.length; j++){
        if (data_mentee[j][checkMenteeNames] == pastMentee){
          Matches_Dictionary[mentorName] = pastMentee;
        }
      }
    }
  }
  
  Logger.log(Matches_Dictionary)
  
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName("Matches");
  newSheet.appendRow(['Mentor', 'Mentee']);
  for (var key in Matches_Dictionary) {
    newSheet.appendRow([key, Matches_Dictionary[key]]);
  }

}

  
}
