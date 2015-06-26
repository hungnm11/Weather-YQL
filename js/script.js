$(function() {

    $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2502265&format=json&diagnostics=true&callback=', function(data) {
        console.log(data);
        var output = "";
        output += "Location: " + data.query.results.channel.location.city + ", "+ data.query.results.channel.location.country + "<br/>";
        output += data.query.results.channel.item.condition.date +"<br/>";
        output += '<img src="http://l.yimg.com/a/i/us/we/52/' + data.query.results.channel.item.condition.code + '.gif" width="34" height="34" title="' + data.query.results.channel.item.condition.code + '" /><br/>';
        output += data.query.results.channel.item.condition.temp+' &deg;F<br/>';
        output += data.query.results.channel.item.condition.text;
        
        var winddirection=parseInt(data.query.results.channel.wind.direction);
        var direction='';
        switch(true)
        {
            case (winddirection==0):
                direction='N';
                break;
            case (winddirection<90):
                direction='NE';
                break;
            case (winddirection==90):
                direction='E';
                break;
            case (winddirection<180):
                direction='SE';
                break;
            case (winddirection==180):
                direction='S';
                break;
            case (winddirection<270):
                direction='SW';
                break;
            case (winddirection==270):
                direction='W';
                break;
            case (winddirection<360):
                direction='NW';
                break;
            case (winddirection==360):
                direction='N';
                break;
        }
        
        output += 'Wind: '+direction+' at '+data.query.results.channel.wind.speed+' mph<br/>';
        output += 'Humidity: '+data.query.results.channel.atmosphere.humidity+'%<br/>'
        output += 'Check ' + "<a href='"+data.query.results.channel.item.link+"'>Full Forecast</a>";
        
        document.getElementById("result").innerHTML = output;
        
    });
    
})