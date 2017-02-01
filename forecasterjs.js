
function displayJSON(obj) {
    "use strict";
    var i;
    var weather_out = "<table class = sample>",
        
        tableHeadings = "<thead>" +
        "<tr>" +
        "<th name='dayCol'>Day</th>" +
        "<th name='weatherCol'>Weather</th>" +
        "<th name='iconCol'></th>"+
        "<th name='mintempCol'>Min. Temp</th>" +
        "<th name='maxtempCol'>Max.Temp</th>"+
        "<th name='humidityCol'>Humidity</th>"+
        "<th name='speedCol'>Windspeed</th>" +
        "<th name='pressureCol'>Pressure</th>" +
        "<th name='buttonCol'></th>"+
        "</tr>" +
        "</thead>";
        
        weather_out += tableHeadings; 
       
        //help with connecting a form to a function in javascript was found courtasy of W3 schools user Stephen Wrighton and Miquel at http://stackoverflow.com/questions/683498/calling-javascript-from-a-html-form
        
        var formday = document.getElementById("day").value;
        
        for (i = 0; i < formday; i++) {
            var day = i+1;
            var weatherdescription = obj.list[i].weather[0].description;
            var mintemp = obj.list[i].temp.min;
            var maxtemp = obj.list[i].temp.max;
            var humidity = obj.list[i].humidity;
            var speed = obj.list[i].speed;
            var pressure = obj.list[i].pressure;
            var icon = obj.list[i].weather[0].icon;
            var iconUrl = ("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
            
            weather_out += "<tr><td name='dayCol'>" +day+"</td><td name='weatherCol'>"+ weatherdescription + "</td><td name='iconCol'>" + iconUrl + "</td><td name='mintempCol'>" + mintemp + "°C" + "</td><td name='maxtempCol'>" + maxtemp + "°C" + "</td><td name='humidityCol'>" + humidity + "%" + "</td><td name='speedCol'>" + speed + "m/s" + "</td><td name='pressureCol'>" + pressure + "hPa" + "</td><td><button class='detailbtn' onclick='detailed(" + day + ")'> More Details!</button></td></tr>";
            
        };
    
    document.getElementById("weather").innerHTML = weather_out;
};

//Write this parse seperate because then the page will load without any days displaying and gives the user the chance to choose the days he/she wants

function parsedaily(){
    var xmlhttp = new XMLHttpRequest();
    var url = "Daily.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var parsedObj = JSON.parse(xmlhttp.responseText);
            displayJSON(parsedObj);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    }


function showhide(column, elem){
    if (elem.checked)
        dp = "table-cell";
    else
        dp = "none";
    tds = document.getElementsByTagName('tr');
    for (i=0; i<tds.length; i++)
        tds[i].childNodes[column].style.display = dp;
}


function detailed(daynumber){


    function displayJSONdetailed(detailedObj) {
        "use strict";
    
        var detailedInfo, datetime, cloudiness, rain, windDirection, currenttemp;
    
        var i;
    
        var weatherdetailed_out = "<table>",
        
            detailedtableheadings = "<thead>" +
            "<tr>" +
            "<th name='datetimeCol'>Date and Time</th>" +
            "<th name='detailedInfoCol'>Details</th>" +
            "<th name='cloudiness'>Clouds</th>"+
            "<th name='rain'>Rain</th>"+
            "<th name='windDirectionCol'>Wind Direction</th>" +
            "<th name='currenttempCol'>Current Temperature</th>" +
            "</tr>" +
            "</thead>";
    
       
        if (daynumber == 1){
            daynumber = [0, 1, 2, 3, 4];}
    
        else if (daynumber === 2){
            daynumber = [5, 6, 7, 8, 9, 10, 11, 12];}
    
        else if (daynumber === 3) {
            daynumber = [13, 14, 15, 16, 17, 18, 19, 20];}
    
        else if (daynumber === 4) {
            daynumber = [21, 22, 23, 24, 25, 26, 27, 28];}
    
        else if (daynumber === 5) {
            daynumber = [29, 30, 31, 32, 33, 34, 35, 36];}
    
        weatherdetailed_out += detailedtableheadings; 
        console.log(daynumber);
       
        for (i in daynumber) {
            console.log(daynumber);
            console.log(i);
            var x = daynumber[i];
            detailedInfo =  detailedObj.list[x].weather[0].description;
            datetime = detailedObj.list[x].dt_txt;
            cloudiness = detailedObj.list[x].clouds.all;
            rain = detailedObj.list[x].rain['3h'];
            windDirection = detailedObj.list[x].wind.deg;
            currenttemp = detailedObj.list[x].main.temp;
            
            
            
            weatherdetailed_out += "<tr><td>" + datetime +"</td><td >"+ detailedInfo + "</td><td >" + cloudiness + "</td><td>" + rain + "</td><td>" + windDirection + " degrees" + "</td><td>" + currenttemp + "°C" + "</td></tr>";
        };
    
    document.getElementById("detailedweather").innerHTML = weatherdetailed_out;
    console.log(weatherdetailed_out);
};

var xmlhttpdetailed = new XMLHttpRequest();
    var urldetailed = "Detailed.json";
    xmlhttpdetailed.onreadystatechange = function () {
    if (xmlhttpdetailed.readyState == 4 && xmlhttpdetailed.status == 200) {
        var detailedObj = JSON.parse(xmlhttpdetailed.responseText);    
        displayJSONdetailed(detailedObj);
        }
    };
   
    xmlhttpdetailed.open("GET", urldetailed, true);
    xmlhttpdetailed.send();

}