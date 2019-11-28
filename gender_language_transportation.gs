function myFunction() {
  var name_col = data_mentee[0].indexOf("Name of Student (First, Last)");
  var language_col = data_mentee[0].indexOf("Does the student need a mentor that speaks Spanish?");
  var gender_col = data_mentee[0].indexOf("Gender");
  var mentor_name_col = data_mentor[0].indexOf("Name (First, Last)");
  var mentor_lang_col = data_mentor[0].indexOf("Do you speak Spanish?");
  var mentor_gender_col = data_mentor[0].indexOf("Gender");
  var mentor_transportation = data_mentor[0].indexOf("Check ALL that apply");
  
  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var mentor_sheet = ss.getSheetByName("Mentor Information Sheet");
  var mentee_sheet = ss.getSheetByName("Mentee Information Sheet");
  var lunch_sheet = ss.getSheetByName("Lunch Times");

  var data_mentor = mentor_sheet.getDataRange().getValues();
  var mentor_dimensions = mentor_sheet.getDataRange();
  var data_mentee = mentee_sheet.getDataRange().getValues();
  var mentee_dimensions = mentee_sheet.getDataRange();
  var school_lunches = lunch_sheet.getDataRange().getValues();
  var mentee_dimensions = lunch_sheet.getDataRange();
  
  var mentor_prefs = {};
  var mentee_prefs = {};
  
  for (var i = 0; i < data_mentor.length; i++){
    checklist = [];
    var first_item = "No";
    var second_item = "No";
    var third_item = "No";
    if (data_mentor[i][mentor_gender_col] == "Yes"){
      first_item = "Yes";
    }
    if (data_mentor[i][mentor_lang_col]){
      second_item = "Yes";
    }
    var transportation_list = data_mentor[i][mentor_transportation];
    transportation_list = transportation_list.replace(/\s/g, '');
    transportation_list = transportation_list.split(",");
    for (var j = 0; j < transportation_list.length; j++){
      if (transportation_list[j] == "I can ride in a carpool to get to my school" || 
          transportation_list[j] == "I have a car and am willing to drive myself to my school"){
        third_item = "Yes";
      }
    }
    checklist.push(first_item);
    checklist.push(second_item);
    checklist.push(third_item);
    mentor_prefs[data_mentor[i][name_col]] = checklist;
  }
}
