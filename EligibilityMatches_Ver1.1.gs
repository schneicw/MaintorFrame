/*
- FIRST VERSION OF ELIGIBILITY MATCHING -

In this version we just do a basic eligibility matching, where if mentors say they can be carpooled, 
we match them with schools where you need a car to get there on time. 

This version now has the added the function where we see the matches with what time,day, and school they would go to meet the mentee.



Reminders: (write all weird errors below that relate to code)

- if you get a -1.0 when you think you shouldn't, you have probably added a space.

*/
// INITIALIZATION
var ss =  SpreadsheetApp.getActiveSpreadsheet();
var mentor_sheet = ss.getSheetByName("Mentor Information Sheet");
var mentee_sheet = ss.getSheetByName("Mentee Information Sheet");
var lunch_sheet = ss.getSheetByName("Lunch Times");

// TURNING SHEETS INTO DATASETS
var data_mentor = mentor_sheet.getDataRange().getValues();
var mentor_dimensions = mentor_sheet.getDataRange();
var data_mentee = mentee_sheet.getDataRange().getValues();
var mentee_dimensions = mentee_sheet.getDataRange();
var school_lunches = lunch_sheet.getDataRange().getValues();
var mentee_dimensions = lunch_sheet.getDataRange();

// TO ENSURE THAT THE COLUMNS WE'RE ACCESSING ARE THE ONES WE WANT TO ACCESS
var mentee_name_col = data_mentee[0].indexOf("Name of Student (First, Last)");
var mentee_lang_col = data_mentee[0].indexOf("Does the student need a mentor that speaks Spanish?");
var mentee_gender_col = data_mentee[0].indexOf("Gender");
var mentee_transport = data_mentee[0].indexOf("School");

var mentor_name_col = data_mentor[0].indexOf("Name (First, Last)");
var mentor_lang_col = data_mentor[0].indexOf("Do you speak Spanish?");
var mentor_gender_col = data_mentor[0].indexOf("Gender");
var mentor_transport = data_mentor[0].indexOf("Check ALL that apply");

var mon_times = data_mentor[0].indexOf("When are you free on Monday? (if you did not select Monday, please skip)");
var tues_times = data_mentor[0].indexOf("When are you free on Tuesday? (if you did not select Tuesday, please skip)");
var wed_times = data_mentor[0].indexOf("When are you free on Wednesday? (if you did not select Wednesday, please skip)");
var thurs_times = data_mentor[0].indexOf("When are you free on Thursday? (if you did not select Thursday, please skip)");
var fri_times = data_mentor[0].indexOf("When are you free on Friday? (if you did not select Friday, please skip)");

// ALL DICTIONARIES WE WILL CONTINIOUSLY ACCESS

// DICTIONARIES THAT STORE MENTOR PREFERENCES AND MENTEE PREFERENCES (Gender,Language,Transporation)
var mentor_prefs = {};
var mentee_prefs = {};

// MENTOR DICTIONARIES
var Mentor_MonDict = {};
var Mentor_TuesDict = {};
var Mentor_WedDict = {};
var Mentor_ThursDict = {};
var Mentor_FriDict = {};

//MENTEE DICTIONARIES
var Mentee_Dict = {};

//MATCHES DICTIONARY
var matches = {};

//CREATED THIS LIST IN ORDER TO INDEX THROUGH ALL DICTIONARIES AT ONCE
var list_of_dict = [Mentor_MonDict, Mentor_TuesDict, Mentor_WedDict, Mentor_ThursDict, Mentor_FriDict];
var list_of_times = [mon_times, tues_times, wed_times, thurs_times, fri_times];

// SETS UP MENTOR AND MENTEE AVAILABILITY FREE TIME 
function availability(){
  
  // MENTOR DICT CONSTRUCTION
  for (var day = 0; day<5; day++){
    var current_dict = list_of_dict[day];
    var current_time = list_of_times[day];
    for (var i = 1; i < data_mentor.length; i++){
      var available = data_mentor[i][current_time];
      if (!(available == "")){
      available = available.replace(/\s/g, '');
      available = available.split(",");
      current_dict[data_mentor[i][mentor_name_col]] = available;
      }
    }
  }
    // MENTEE DICTIONARY CONSTRUCTION
  
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
}

// CHECKS FOR GENDER, LANGUAGE, AND TRANSPORTATION 
function check_preferences(){
  for (var i = 0; i < data_mentor.length; i++){
    checklist = [];
    var first_item = "Female";
    var second_item = "No";
    var third_item = "No";
    if (data_mentor[i][mentor_gender_col] == "Male"){
      first_item = "Male";
    }
    if (data_mentor[i][mentor_lang_col] == "Yes, I speak some Spanish."){
      second_item = "Yes";
    }
    var transportation_list = data_mentor[i][mentor_transport];
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
    mentor_prefs[data_mentor[i][mentor_name_col]] = checklist;
  }
  
  for (var x = 0; x < data_mentee.length; x++){
    checklist = [];
    var first_item = "Female";
    var second_item = "No";
    var third_item = "No";
    if (data_mentee[x][mentee_gender_col] == "Male"){
      first_item = "Male";
    }
    if (data_mentee[x][mentee_lang_col] == "Yes"){
      second_item = "Yes";
    }
    if (data_mentee[x][mentee_transport] == "Berney" || 
        data_mentee[x][mentee_transport] == "Blue Ridge" || 
        data_mentee[x][mentee_transport] == "Prospect Point"){
      third_item = "Yes";
    }
    var fourth_item = data_mentee[x][mentee_transport];
    checklist.push(first_item);
    checklist.push(second_item);
    checklist.push(third_item);
    checklist.push(fourth_item);
    mentee_prefs[data_mentee[x][mentee_name_col]] = checklist;
  }
}

// CONNECTING OVERLAPPING TIMES FOR MENTORS
function connecting_times(){
  for (var day = 0; day<5; day++){
    var current_dict = list_of_dict[day];
    var keys = Object.keys(current_dict);
    for(var i = 0; i < keys.length; i++){
      var list_of_times = current_dict[keys[i]];
      //intitializing the start time
      var first_item = list_of_times[0];
      var start_string = first_item.slice(0,first_item.indexOf("-"));
      var new_list = [];
      var marker = 0;
      
      for (var t = 0; t < (list_of_times.length-1); t++){
        // need to check for last time in list because of the way these comparisons are setup
        var current_string = list_of_times[t];
      
        //leftside comparison setup
        var current_end_string = current_string.slice(6,11);
        var left_comp = current_string.slice(6,8) + current_string.slice(9,11);
        var left_numb = Number(left_comp);
     
        //rightside comparison setup
        var next_string = list_of_times[t+1];
        var right_comp = next_string.slice(0,2) + next_string.slice(3,5);
        var right_numb = Number(right_comp);
        
        if (right_numb > left_numb){
          new_list.push(start_string + "-" + current_end_string);
          start_string = next_string.slice(0,first_item.indexOf("-"));
          if (t == (list_of_times.length-2)){
            marker = 1}
        }
        
        if ((t==list_of_times.length-2) && (marker == 0)){
          new_list.push(start_string + "-" + (next_string.slice(6,11)))
        }
      }
  if (marker == 1){
    new_list.push(list_of_times[(list_of_times.length-1)]);
   }
  if (new_list && new_list.length){
     current_dict[keys[i]] = new_list;  
   }
  }
 }
}

// RETURNS ELIGIBLE MENTORS AND MENTEES MATCHINGS
function eligible(){
  for (var day = 0; day<5; day++){
    var current_dict = list_of_dict[day];
    var keys = Object.keys(current_dict);
    
    for (var n = 0; n<keys.length; n++){
      var current_mentor = keys[n];
      var list_free_times = current_dict[keys[n]];
      var eligible_matches = [];
      
      for (var t = 0; t < list_free_times.length; t++){
        var current_time = list_free_times[t];
        var begin_mentor = current_time.slice(0,2) + current_time.slice(3,5);
        begin_mentor = Number(begin_mentor);
        var end_mentor = current_time.slice(6,8) + current_time.slice(9,11);
        end_mentor = Number(end_mentor);
        var mentee_times = Object.keys(Mentee_Dict);
        
        for (var o = 0; o < mentee_times.length; o++){
          var current_mentee_time = mentee_times[o];
          var begin_mentee = current_mentee_time.slice(0,2) + current_mentee_time.slice(3,5);
          begin_mentee = Number(begin_mentee);
          var end_mentee = current_time.slice(6,8) + current_time.slice(9,11);
          end_mentee = Number(end_mentee);
          var current_mentee_list = Mentee_Dict[current_mentee_time];
          
          if ((begin_mentor <= begin_mentee) && (end_mentor >= end_mentee)){
            var mentor_check = mentor_prefs[current_mentor];
            
            for (var z = 0; z < current_mentee_list.length; z++){
              var current_mentee = current_mentee_list[z];
              var mentee_check = mentee_prefs[current_mentee];
              var set_day = "";
              if (day == 0){set_day = "Monday";}
              if (day == 1){set_day = "Tuesday";}
              if (day == 2){set_day = "Wednesday";}
              if (day == 3){set_day = "Thursday";}
              if (day == 4){set_day = "Friday";}
              
              if ((mentor_check[0] == mentee_check[0]) && (mentor_check[1] == mentee_check[1]) && (mentor_check[2] == mentee_check[2])){
                eligible_matches.push([current_mentee,set_day,current_mentee_time, mentee_check[3]]);
              }
            }
          }
        }
      }
      if (eligible_matches && eligible_matches.length){
        matches[current_mentor] = eligible_matches;
      }
    }
  }
}

function main() {
  availability();
  connecting_times();
  check_preferences();
  eligible();
  Logger.log(matches);
}
main()