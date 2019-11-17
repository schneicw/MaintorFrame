// CURRENTLY NOT WORKING
function myFunction() {
  var list_of_times = ["11:00-11:40", "11:20-12:00", "11:40-12:20", "12:30-12:50"];
  var first_item = list_of_times[0];
  var start_string = first_item.slice(0,first_item.indexOf("-"));
  for (var t = 0; t < (list_of_times.length); t++){
    if (!(t = (list_of_times.length - 1))){
    var new_list = [];
    var current_string = list_of_times[t];
    
    //working on the first string
    var end_string = current_string.slice(6,11);
    var end_time = current_string.slice(6,8) + current_string.slice(9,11);
    var end_number = Number(end_time);
   
    //working on the second string
    //first compare the second time of one string and the first time of the next
    var next_string = list_of_times[t+1];
    var next_string_start = next_string.slice(0,next_string.indexOf(":")) + next_string.slice(3,next_string.indexOf("-"));
    var next_start_number = Number(next_string_start);
    Logger.log(next_string_start)
    
    if (next_start_number > end_number){
      new_list.push(start_string + "-" + end_string);
      start_string = next_string.slice(0,next_string.indexOf("-"));
    }
    }
  }
  //Logger.log(new_list)
}
