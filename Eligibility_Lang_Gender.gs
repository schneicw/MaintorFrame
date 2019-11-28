// WARNING: THIS DOES NOT WORK YET

function eligible(){
  eligibility = {};
  var name_col = data_mentee[0].indexOf("Name of Student (First, Last)");
  var language_col = data_mentee[0].indexOf("Does the student need a mentor that speaks Spanish?");
  var gender_col = data_mentee[0].indexOf("Gender");
  var mentor_name_col = data_mentor[0].indexOf("Name (First, Last)");
  var mentor_lang_col = data_mentor[0].indexOf("Do you speak Spanish?");
  var mentor_gender_col = data_mentor[0].indexOf("Gender");
  
  var list_of_dict = [Mentor_MonDict, Mentor_TuesDict, Mentor_WedDict, Mentor_ThursDict, Mentor_FriDict];
  for (var day = 0; day<5; day++){
    var current_dict = list_of_dict[day];
    var keys = Object.keys(current_dict);
    
    for (var i=0; i < keys.length; i++){
      var current_mentor = keys[i];
      var list_free_times = current_dict[keys[i]];
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
          
          if ((begin_mentor <= begin_mentee) && (end_mentor >= end_mentee)){
            for (var y = 0; y < current_mentee_time; y++){
            //here we have to insert gender and language preferences
            var current_mentee = current_mentee_time[y];
              for (var z = 0; z < data_mentee.length; z++){
                for (var v = 0; v < data_mentor.length; v++){
                  if (data_mentee[z][name_col] == current_mentee){
                    if (data_mentor[v][mentor_name_col] == current_mentor){
                      if (data_mentee[z][language_col] == data_mentor[v][mentor_lang_col]){
                        if (data_mentee[z][gender_col] == data_mentee[v][mentor_gender_col]){
                          eligible_matches.push(current_mentee);
                        }
                      }
                    }                
                  }                                             
                }
              }
            }
          }
        }
      }
      eligibility[keys[i]] = elligible_matches;
    }
  }
}