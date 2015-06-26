$(document).ready(function() {
	var speed = 500;
	var autoSwitch = true;
	var autoSwitch_speed = 4000;

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

    
    
	var jqxhr = $.getJSON("js/json.js", function(data) {
        var items = [];
        $.each(data, function(key, val) {
            items.push("<li class='" + key  + "'>'" + val + "'</li>");
        });
        
        $("<ul/>", {
            "class": "my-calss",
            html: items.join( "" )
        }).appendTo("body");
        
    }).done(function() {
        console.log('second success');
    });

	
	
});