$(function() {
	
	//var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20location%20in%20(90210%2C%2094536%2C%2094085)&format=json&diagnostics=true&callback=";
	
	var url = "js/myjson.json"; //5 locations
	
    $.getJSON(url, function(data) {
        console.log(data);
        var speed = 500;
        var autoSwitch = true;
        var autoSwitch_speed = 4000;
        
        var output = "";
        var outputNumber = "";
        var countObj = data.query.results.channel.length;
        
        console.log(countObj);
        
        for (var i = 0; i < countObj; i++)
        {
            output += "<div class='slide'>";
            output += "<h2>" + data.query.results.channel[i].location.city + ", "+ data.query.results.channel[i].location.country + "</h2>";
            output += "<h5>" + data.query.results.channel[i].item.condition.date +"</h5>";
            output += '<img src="http://l.yimg.com/a/i/us/we/52/' + data.query.results.channel[i].item.condition.code + '.gif" width="34" height="34" title="' + data.query.results.channel[i].item.condition.code + '" /><br/>';
            output += "<p>" + data.query.results.channel[i].item.condition.temp+ " &deg;F</p>";
            output += "<p>" + data.query.results.channel[i].item.condition.text + "</p>";

            var winddirection=parseInt(data.query.results.channel[i].wind.direction);
            var direction = "";
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

            output += '<p>Wind: '+direction+' at '+data.query.results.channel[i].wind.speed+' mph</p>';
            output += '<p>Humidity: '+data.query.results.channel[i].atmosphere.humidity+'%</p>'
            output += "</div>";
            
            outputNumber += "<a href='#' class='numberSlide'>" + (i+1) + "</a>";
            
            document.getElementById("slider").innerHTML = output;
            
            document.getElementById("countSlide").innerHTML = outputNumber;
        }
        
        //Add active to the first slide
        $('.slide').first().addClass('active');
        $('.numberSlide').first().addClass('active');

        // Hide all slide
        $('.slide').hide();

        // Show the first slide
        $('.active').show();

        $('#next').on('click', function(){
            nextSlide();
        });

        $('#prev').on('click', function() {
		prevSlide();
        });

        $('.numberSlide').on('click', function() {
            slideNumber($(this));
        });

        function prevSlide() {
            $('.active').removeClass('active').addClass('oldActive');
            if($('.oldActive').is(':first-child')) {
                $('.slide').last().addClass('active');
                $('.numberSlide').last().addClass('active');
            } else {
                $('.oldActive').prev().addClass('active');
            }

            $('.oldActive').removeClass('oldActive');
            $('.slide').fadeOut(speed);
            $('.active').fadeIn(speed);
        }
        
        function nextSlide() {
            $('.active').removeClass('active').addClass('oldActive');
            if($('.oldActive').is(':last-child')) {
                $('.slide').first().addClass('active');
                $('.numberSlide').first().addClass('active');
            } else {
                $('.oldActive').next().addClass('active');
            }

            $('.oldActive').removeClass('oldActive');
            
            $('.slide').fadeOut(speed);
            $('.active').fadeIn(speed);
			$('.slide').animate({left: '-=' + widthSlide});
        }

        function slideNumber(elem) {
            //Count element
            var count_elem = $('#slider').children().length;
            var getOrinalElem = elem.text();

            for (var i = 1; i <= count_elem; i++) {
                if (getOrinalElem == i) {
                    $('.active').removeClass('active');
                    $('.slide:nth-child(' + getOrinalElem + ')').addClass('active');
                    $('.slide').fadeOut(speed);
                    $('.active').fadeIn(speed);
                }
            }

            elem.addClass('active');
        }


        if(autoSwitch == true) {
            setInterval(function() { nextSlide();}, autoSwitch_speed);
        }
        
    });
    
})