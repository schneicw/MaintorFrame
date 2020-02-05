/*
- FIRST VERSION OF ELIGIBILITY MATCHING -
In this version we just do a basic eligibility matching, where if mentors say they can be carpooled, 
we match them with schools where you need a car to get there on time. 
This version now has the added the function where we see the matches with what time,day, and school they would go to meet the mentee.
Reminders: (write all weird errors below that relate to code)
- if you get a -1.0 when you think you shouldn't, you have probably added a space.
*/

// CLASSES
var Mentor = function(name, gender, language, transport, mon_t, tues_t, weds_t, thurs_t, fri_t){
  this.name = name;
  this.gender = gender;
  this.language = language;
  this.transport = transport;
  this.monday_times = mon_t;
  this.tuesday_times = tues_t;
  this.wednesday_times = weds_t;
  this.thursday_times = thurs_t;
  this.friday_times = fri_t;
  this.matches = [];
  
  this.getName = function(){
    return this.name;
  }
  this.getGender = function(){
    return (this.gender);
  }
  this.getLanguage = function(){
    return this.language;
  }
  this.getTransport = function(){
    return this.transport;
  }
  this.getMonday = function(){
    return this.monday_times;
  }
  this.getTuesday = function(){
    return this.tuesday_times;
  }
  this.getWednesday = function(){
    return this.wednesday_times;
  }
  this.getThursday = function(){
    return this.thursday_times;
  }
  this.getFriday = function(){
    return this.friday_times;
  }
  this.addMatch = function(person){
    var temp_list = this.matches;
    temp_list.push(person);
    this.matches = temp_list;
  }
  this.getMatches = function(){
    return this.matches;}
}

var Mentee = function(name, gender, language, transport, school, time){
  this.name = name;
  this.gender = gender;
  this.language = language;
  this.transport = transport;
  this.school = school;
  this.time = time;
  
  this.getName = function(){
    return this.name;
  }
  this.getGender = function(){
    return this.gender;
  }
  this.getLanguage = function(){
    return this.language;
  }
  this.getTransport = function(){
    return this.transport;
  }
  this.getTime = function(){
    return this.time;
  }
  this.getSchool = function(){
    return this.school;
  }
}

// INITIALIZATION
var ss =  SpreadsheetApp.getActiveSpreadsheet();
var mentor_sheet = ss.getSheetByName("Mentor Information Sheet");
var mentee_sheet = ss.getSheetByName("Mentee Information Sheet");
var lunch_sheet = ss.getSheetByName("Lunch Times");


// *************************************** MACROS *****************************************
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

var grade_dict = {"Kindergarten": 1, "1st Grade": 2, "2nd Grade": 3, "3rd Grade": 4, "4th Grade": 5, "5th Grade": 6}
var school_col = data_mentee[0].indexOf("School");
var grade_col = data_mentee[0].indexOf("Grade");
var name_col = data_mentee[0].indexOf("Name of Student (First, Last)");

// *****************************************************************************************

// ALL DICTIONARIES WE WILL CONTINIOUSLY ACCESS

// DICTIONARIES THAT STORE MENTOR PREFERENCES AND MENTEE PREFERENCES (Gender,Language,Transporation)
var mentor_prefs = {};
var mentee_prefs = {};

// MENTOR DICTIONARIES
/*
var Monday = "";
var Tuesday = "";
var Wednesday = "";
var Thursday = "";
var Friday = "";
*/

//MENTEE DICTIONARIES
var Mentee_Dict = {};

//MATCHES DICTIONARY
var matches = {};

// Mentor and Mentee Object Dictionaries
var Mentors = {};
var Mentees = {};

//CREATED THIS LIST IN ORDER TO INDEX THROUGH ALL DICTIONARIES AT ONCE
//var list_of_days = [Monday, Tuesday, Wednesday, Thursday, Friday];
var list_of_times = [mon_times, tues_times, wed_times, thurs_times, fri_times];


// CHECKS FOR GENDER, LANGUAGE, AND TRANSPORTATION 
function check_preferences(){
  for (var i = 1; i < data_mentor.length; i++){
    var current_mentor = data_mentor[i];
    var mentor_name = data_mentor[i][mentor_name_col];
    var gender = "";
    var language = "";
    var transport = "No";

    if (data_mentor[i][mentor_lang_col] == "Yes, I speak some Spanish."){
      language = "Yes";
    }
    else{
      language = "No";
    }
   
    gender = data_mentor[i][mentor_gender_col];
    
    var transportation_list = data_mentor[i][mentor_transport];

    //transportation_list = transportation_list.replace(/\s/g, '');
    transportation_list = transportation_list.split(",");
    
    for (var j = 0; j < transportation_list.length; j++){
      if (transportation_list[j] == "I can ride in a carpool to get to my school" || 
          transportation_list[j] == "I have a car and am willing to drive myself to my school"){
        transport = "Yes";
      }
    }
    
    //mentor_name = mentor_name.replace(/\s/g, '');
    var temp_dict = {};
    for (var day = 0; day < 5; day++){
       var current_time = list_of_times[day];
       var available = data_mentor[i][current_time];
       if (!(available == "")){
         available = available.replace(/\s/g, '');
         available = available.split(",");
         //Logger.log(available);
         var times_available = connecting_times(available);
         if (day == 0){
           temp_dict["Monday"] = times_available;
         }
         if (day == 1){
           temp_dict["Tuesday"] = times_available;
         }
         if (day == 2){
           temp_dict["Wednesday"] = times_available;
         }
         if (day == 3){
           temp_dict["Thursday"] = times_available;
         }
         if (day == 4){
           temp_dict["Friday"] = times_available;
         }
       }
    }
    
    var mentor = new Mentor(mentor_name, gender, language, transport, temp_dict["Monday"], temp_dict["Tuesday"], temp_dict["Wednesday"], temp_dict["Thursday"], temp_dict["Friday"]);
    Mentors[mentor_name] = mentor;
  }
  
  
  for (var x = 1; x < data_mentee.length; x++){
    var mentee_name = data_mentee[x][mentee_name_col];
    var transportation = "No";
    var gender = data_mentee[x][mentee_gender_col];
    var language = data_mentee[x][mentee_lang_col];
   
    if (data_mentee[x][mentee_transport] == "Berney" || 
        data_mentee[x][mentee_transport] == "Blue Ridge" || 
        data_mentee[x][mentee_transport] == "Prospect Point"){
      transportation = "Yes";
    }
    
    var school = data_mentee[x][mentee_transport];
    var mentee_school = data_mentee[x][school_col];
    var mentee_grade = data_mentee[x][grade_col];
    var time = [school_lunches[grade_dict[mentee_grade]][school_lunches[0].indexOf(mentee_school)]];
    
    //Logger.log(gender);
    var mentee = new Mentee(mentee_name, gender, language, transportation, school, time);
    Mentees[mentee_name] = mentee;
  }
  //Logger.log(Mentees["Robert Bobert"].getLanguage())
}

// CONNECTING OVERLAPPING TIMES FOR MENTORS
function connecting_times(input_list){
  //Logger.log("Original List:" + input_list)
  
      var list_of_times = input_list;
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
    //Logger.log("New List:" + new_list)
     return new_list;  
  }
}


function time_to_value(input_list){
  //Logger.log(input_list)
  if (input_list == undefined){
    return "empty";
  }
  //Logger.log("hi" + input_list)
  var temp_list = [];
  for (var t= 0; t < input_list.length; t++){
    //Logger.log(input_list[t])
    var current_time = input_list[t];
    var begin_time = current_time.slice(0,2) + current_time.slice(3,5);
    begin_time = Number(begin_time);
    //Logger.log(begin_time)
    var end_time = current_time.slice(6,8) + current_time.slice(9,11);
    end_time = Number(end_time);
    temp_list.push([begin_time, end_time]);
   }
    //Logger.log(temp_list)
    return temp_list;
    //Logger.log(temp_list)
}

function compatability_check(mentor_times, mentee_times, mentor, mentee, day){
  for (i = 0; i<mentor_times.length; i++){
    var current_mentor_time = mentor_times[i];
    var mentee_time = mentee_times[0];
    if ((current_mentor_time[0] <= mentee_time[0]) && (current_mentor_time[1] >= mentee_time[1])){
      if ((mentor.getGender() == mentee.getGender()) && (mentor.getLanguage() == mentee.getLanguage()) && (mentor.getTransport == mentor.getTransport)){
        //Logger.log("Mentee Name:" + mentee.getName())
        //Logger.log("day:" + day)
        //Logger.log("Meeting Time:" + mentee.getTime())
        //Logger.log("School:" + mentee.getSchool())
        
        mentor.addMatch([mentee.getName(), day, mentee.getTime(), mentee.getSchool()]);
      }
    }
  }
}

// RETURNS ELIGIBLE MENTORS AND MENTEES MATCHINGS
function eligible(){
  var list_of_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  var Mentor_Keys = Object.keys(Mentors);
  var Mentee_Keys = Object.keys(Mentees);
    for (var n = 0; n<Mentor_Keys.length; n++){
      var current_mentor = Mentors[Mentor_Keys[n]]; //this is grabbing the object value from the key
      var monday_free_times = time_to_value(current_mentor.getMonday());
      var tuesday_free_times = time_to_value(current_mentor.getTuesday());
      var wednesday_free_times = time_to_value(current_mentor.getWednesday());
      var thursday_free_times = time_to_value(current_mentor.getThursday());
      var friday_free_times = time_to_value(current_mentor.getFriday());
      var list_of_free_times = [monday_free_times, tuesday_free_times, wednesday_free_times, thursday_free_times, friday_free_times];
      var eligible_matches = [];
      
      for (var o = 0; o < Mentee_Keys.length; o++){
        var current_mentee = Mentees[Mentee_Keys[o]];
        //Logger.log(current_mentee.getTime());
        var mentee_free_time = time_to_value(current_mentee.getTime());
        //Logger.log(mentee_free_time[0], mentee_free_time[1])
        
        for (var i = 0; i < list_of_days.length; i++){
          var current_day = list_of_days[i];
          var current_free_times = list_of_free_times[i];
          if (!(current_free_times == "empty")){
            //Logger.log(current_free_times)
            //Logger.log(mentee_free_time)
            //Logger.log(current_mentor)
            //Logger.log(current_mentee)
            //Logger.log(current_day)
            compatability_check(current_free_times, mentee_free_time, current_mentor, current_mentee, current_day);
          }
        }
      }
    }
}

function remove_uneligible(){
  var mentor_keys = Object.keys(Mentors);
    for (i=0; i<mentor_keys.length; i++){
      var current_mentor = Mentors[mentor_keys[i]];
      var matches = current_mentor.getMatches();
      if (matches === undefined || matches.length == 0) {
        delete Mentors[mentor_keys[i]];
    }
  }
}

function output_for_matching(){
   var prematching_dict = {};
   var mentor_keys = Object.keys(Mentors);
      for (i=0; i<mentor_keys.length; i++){
        var current_mentor_name = mentor_keys[i];
        var current_mentor = Mentors[mentor_keys[i]];
        var matches = current_mentor.getMatches();
        var temp_list = [];
        for (j=0; j<matches.length; j++){
          var current_info = matches[j];
          if (!(temp_list.indexOf(current_info[0]) >= 0)) {
            temp_list.push(current_info[0]);
            //Logger.log('Hi')
          }
        }
        prematching_dict[current_mentor_name] = temp_list;
      }
      return prematching_dict;
}
// NOTES
//need to maybe fix some areas where there are multiple available times for a mentor in a day that aren't concatenated
//also need to decide what to do with mentors who are not elligible with any mentees besides remove them

function main(){
  check_preferences();
  eligible();
  remove_uneligible();
  var matching_input = output_for_matching();
  Logger.log(matching_input);
}



