function elligibility(){
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

  // Mentor Dictionaries
  var Mentor_MonDict = {};
  var Mentor_TuesDict = {};
  var Mentor_WedDict = {};
  var Mentor_ThursDict = {};
  var Mentor_FriDict = {};
  
  //Mentee Dictionary
  var Mentee_Dict = {};
  
  //var day_column = data_mentor[0].indexOf("What days of the week are you available to mentor?");
  var mon_times = data_mentor[0].indexOf("When are you free on Monday? (if you did not select Monday, please skip)");
  var tues_times = data_mentor[0].indexOf("When are you free on Tuesday? (if you did not select Tuesday, please skip)");
  var wed_times = data_mentor[0].indexOf("When are you free on Wednesday? (if you did not select Wednesday, please skip)");
  var thurs_times = data_mentor[0].indexOf("When are you free on Thursday? (if you did not select Thursday, please skip)");
  var fri_times = data_mentor[0].indexOf("When are you free on Friday? (if you did not select Friday, please skip)");
  
  var list_of_dict = [Mentor_MonDict, Mentor_TuesDict, Mentor_WedDict, Mentor_ThursDict, Mentor_FriDict];
  var list_of_times = [mon_times, tues_times, wed_times, thurs_times, fri_times];
  
  var names = data_mentor[0].indexOf("Name (First, Last)");
  
  // MENTOR DICT CONSTRUCTION
  for (var day = 0; day<5; day++){
    var current_dict = list_of_dict[day];
    var current_time = list_of_times[day];
    for (var i = 1; i < data_mentor.length; i++){
      var available = data_mentor[i][current_time];
      if (!(available == "")){
      available = available.replace(/\s/g, '');
      available = available.split(",");
      current_dict[data_mentor[i][names]] = available;
      }
    }
  }
  
  // MENTEE DICTIONARY CONSTRUCTION
  
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
  
  // IN THE CASE THAT AN AVAILABLE LUNCH TIME EVENTUALLY GETS TO THE SINGLE DIGIT TIMES (1,2,3...) THEN WE SHOULD ADD SOMETHING WHERE WE JUST ADD 1200 TO THOSE VALUES :D
  // MERGING TIMES
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
  current_dict[keys[i]] = new_list;  
 }
 }
  
}
