function mentee_dict() {
  
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var mentor_sheet = ss.getSheetByName("Mentor Information Sheet");
  var mentee_sheet = ss.getSheetByName("Mentee Information Sheet");
  var school_sheet = ss.getSheetByName("Lunch Times")
  
  var data_mentor = mentor_sheet.getDataRange().getValues();
  var data_mentee = mentee_sheet.getDataRange().getValues(); 
  var school_lunches = school_sheet.getDataRange().getValues();
  
  var Mentee_Dict = {};
  // if you get a -1.0 when you think you shouldn't, you have probably added a space.
  
  var grade_dict = {"Kindergarten": 1, "1st Grade": 2, "2nd Grade": 3, "3rd Grade": 4, "4th Grade": 5, "5th Grade": 6}
  var school_col = data_mentee[0].indexOf("School");
  var grade_col = data_mentee[0].indexOf("Grade");
  var name_col = data_mentee[0].indexOf("Name of Student (First, Last)");
  
  for(var i = 1; i < data_mentee.length; i++){
    var mentee_school = data_mentee[i][school_col];
    var mentee_grade = data_mentee[i][grade_col];
    var time = school_lunches[grade_dict[mentee_grade]][school_lunches[0].indexOf(mentee_school)];
    var name = data_mentee[i][name_col];
    //Mentee_Dict[time] = name;
    if (time in Mentee_Dict){
            Mentee_Dict[time].push(name);
          }
    else{
            Mentee_Dict[time] = [];
            Mentee_Dict[time].push(name);
      }
  }
  Logger.log(Mentee_Dict)
}
