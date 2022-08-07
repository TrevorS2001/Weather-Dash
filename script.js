var searchButton = $(".search");
var apiKey ="a17e1499228be1f9c294ac18b234c7d7";
var count = 0;

for (var i = 0; i < localStorage.length; i++){

    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>"+city+"</li>");
};

searchButton.click(function (){

    var searchInput = $(".searchInput").val();
    var url ="https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&Appid="+apiKey+"&units=imperial";
    var fiveDays ="https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&Appid="+apiKey+"&units=imperial";
    if (searchInput ==""){
        console.log("SearchInput");
    } else{
        $.ajax({
            url: url,
            method:"GET"
        }).then(function (input){

         var cityName = $(".list-group").addClass("list-group-item");
         cityName.append("<li>"+input.name+"</li>");
         count = count+1;

         var currentCard = $(".currentCard").append("<div>").addClass("card-body");
         currentCard.empty();
         var currentName = currentCard.append("<p>");
         currentCard.append(currentName);
         var timeUTC = new Date(input.dt * 1000);
         currentName.append(input.name+""+timeUTC.toLocaleDateString("en-US"));
         currentName.append(`<img src="https://openweathermap.org/img/wn/${input.weather[0].icon}@2x.png">`);
         var currentTempurature = currentName.append("<p>");
         currentName.append(currentTempurature);
         currentTempurature.append("<p>"+"Temperature:"+input.main.temp+"</p>");

         currentTempurature.append("<p>"+"Humidity:"+input.main.humidity+"%"+"</p>");

         currentTempurature.append("<p>"+"Wind Speed:"+input.wind.speed+"</p>");
         var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=a17e1499228be1f9c294ac18b234c7d7=${input.coord.lat}&lon=${input.coord.lon}`;
        $.ajax({
                url: urlUV,
                method:"GET"
        }).then(function (input){
                var UV = currentTempurature.append("<p>"+"UV Index:"+input.value+"</p>").addClass("card-text");
                UV.addClass("UV");
                currentTempurature.append(UV);
        });
        });
        $.ajax({
            url: fiveDays,
            method:"GET"
        }).then(function (input){

            var day = [0, 6, 12, 18, 24];
            var fiveDayCard = $(".fiveDayOne").addClass("card-text");
            fiveDayCard.empty();
            day.forEach(function (i){
                var FiveDayTimeUTC1 = new Date(input.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayCard.append("<div class=fiveDayColor>"+"<p>"+FiveDayTimeUTC1+"</p>"+`<img src="https://openweathermap.org/img/wn/${input.list[i].weather[0].icon}.png">`
                +"<p>"+"Temperature:"+input.list[i].main.temp+"</p>"+"<p>"+"Humidity:"+input.list[i].main.humidity+"%"+"</p>"+"</div>");
            })
        });
    }
});
