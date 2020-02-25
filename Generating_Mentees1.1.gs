function new_mentee_sheet(){
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var new_sheet = activeSpreadsheet.getSheetByName("Generated Mentee Information Sheet");
  
   if (new_sheet != null) {
        activeSpreadsheet.deleteSheet(new_sheet);
    }
    
    new_sheet = activeSpreadsheet.insertSheet();
    new_sheet.setName("Generated Mentee Information Sheet");
    new_sheet.appendRow(['Name of Student (First, Last)', 'School', 'Gender', 'Grade', 'Please indicate the gender of the mentor that the mentee should be placed with.','Does the student need a mentor that speaks Spanish?']);
    add_mentees(new_sheet, 60);
}

// ****************************************************************
//https://gist.github.com/tkon99/4c98af713acc73bed74c
//Credit to tkon99
/*
function cap_first(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function get_random_int(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

function generate_name(){
	var first_name = ["Adrian", "Alex", "Cleo",  ]
	var last_name = [];

	var name = cap_first(first_name[getRandomInt(0, first_name.length + 1)]) + ' ' + cap_first(last_name[getRandomInt(0, last_name.length + 1)]);
	return name;
}
*/
//****************************************************************

function add_mentee_row(current_sheet, count){
  var Name = "Mentee Number" + " "  + count.toString();
  var School, Gender, Grade, Gender_Pref, Spanish_Req;
  
  if (Math.random() <= 0.5){
    Gender = "Male";
  }
  else{
    Gender = "Female";
  }
  
  if (Math.random() <= 0.1){
    Spanish_Req = "Yes";
  }
  else{
    Spanish_Req = "No";
  }
  
  var random_int_grade = Math.random();
  
  if (random_int_grade <= 0.2){
    Grade = "1st Grade";
  }
  else if ((random_int_grade > 0.2) && (random_int_grade <= 0.4)){
    Grade = "2nd Grade";
  }
  else if ((random_int_grade > 0.4) && (random_int_grade <= 0.6)){
    Grade = "3rd Grade";
  }
  else if ((random_int_grade > 0.6) && (random_int_grade <= 0.8)){
    Grade = "4th Grade";
  }
  else {
    Grade = "5th Grade";
  }
  
  var random_int_school = Math.random();
  
  if (random_int_school <= 0.2){
    School = "Blue Ridge";
  }
  else if ((random_int_school > 0.2) && (random_int_school <= 0.4)){
    School = "Sharpstein";
  }
  else if ((random_int_school > 0.4) && (random_int_school <= 0.6)){
    School = "Berney";
  }
  else if ((random_int_school > 0.6) && (random_int_school <= 0.8)){
    School = "Edison";
  }
  else {
    School = "Green Park";
  }
  
  var random_int_gender_pref = Math.random();
  
  if (random_int_gender_pref <= 0.33){
    Gender_Pref = "Male";
  }
  else if ((random_int_gender_pref > 0.33) && (random_int_gender_pref <= 0.66)){
    Gender_Pref = "Female";
  }
  else{
    Gender_Pref = "No preference"  // HAVE TO ADD THIS OPTION TO PREMATCHING
  } 
  
  current_sheet.appendRow([Name, School, Gender, Grade, Gender_Pref, Spanish_Req]);
}

function add_mentees(current_sheet, number_mentees){
  for (var i=1; i < (number_mentees+1); i++){
    add_mentee_row(current_sheet, i);
  }
}