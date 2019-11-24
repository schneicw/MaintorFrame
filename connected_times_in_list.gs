function myFunction() {
  var list_of_times = ["11:00-11:40", "11:20-12:00", "12:10-12:20", "12:30-12:50"];
  //intitializing the start time
  var first_item = list_of_times[0];
  var start_string = first_item.slice(0,first_item.indexOf("-"));
  //intializing new list and marker
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
  Logger.log(new_list)
}
