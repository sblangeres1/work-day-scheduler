var m = moment();
var formattedDate = m.format('dddd, MMMM Do YYYY');
var currentHour = m.format('H');
var dateText = $('#currentDay');
var saveData = [];

dateText.text(formattedDate);

//Creating the time blocks
function createHours(){
    for (var hour = 9; hour < 18; hour++){
        var hourEl = document.createElement("div");
        var row = document.createElement("div");
        var hourBoxEl = document.createElement("div");
        var descEl = document.createElement("div");
        var timingEl = document.createElement("div");
        var textBox = document.createElement("textarea");
        var saveBtn = document.createElement("button");

        hourEl.setAttribute('id', String(hour));
        saveBtn.textContent = "SAVE";
        hourEl.className = "time-block";
        row.className = "row";
        hourBoxEl.className = "hour";
        descEl.className = "description";
        saveBtn.className = "saveBtn";

        //Formatting displayed time for time blocks
        if (hour > 12){
            hourBoxEl.textContent = hour - 12 + "PM";
        } else {
            hourBoxEl.textContent = hour + "AM";
        }

        //Changing color of time blocks based on current time
        if (hour == currentHour){
            timingEl.className = "present";
        }
        else if (hour < currentHour){
            timingEl.className = "past";
        }
        else {
            timingEl.className = "future";
        }

         $('.container').append(hourEl);
         hourEl.append(row);
         row.append(hourBoxEl);
         row.append(descEl);
         row.append(saveBtn);
         descEl.append(timingEl);
         timingEl.append(textBox);

    }
}

//Loading all saved data
function load(){
    var inputs = JSON.parse(localStorage.getItem('inputs'));
    saveData = inputs;
    console.log(inputs)
    //Checking to make sure there is items in local storage
    if (inputs != null){
        inputs.forEach(function(input){
            var el = $('#' + input.id);
            el.find('textarea').val(input.text);
        });
        for(var i = 0; i < saveData.length; i++){
            if (saveData[i].text.trim().length < 1){
                saveData.splice(i, 1);
            }
        }
    }
    
    //Getting rid of empty datasaves on page refresh
    
}


createHours();
load();

//Saving the contents of chosen hour on click of save button
$('.saveBtn').on("click", function(event){
    var rowEl = $(this).parent();
    var textInput = rowEl.find("textarea").val();
    var thisId = $(this).parents('.time-block').attr('id');
    //removing old data saves for same hour
    for(var i = 0; i < saveData.length; i++){
        if (thisId == saveData[i].id){
            saveData.splice(i,1);
        }
    }
    saveData.push({id: thisId, text: textInput})
    localStorage.setItem('inputs', JSON.stringify(saveData));
})

